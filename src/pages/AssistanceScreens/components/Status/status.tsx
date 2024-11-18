import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../../Firebase/firebaseConfig';
import './status.css';

interface StatusItem {
  id: string; // ID do documento no Firestore
  userId: string; // ID do usuário autenticado
  titulo: string; // Título do serviço
  status: string; // Status atual (ex.: "Pendente", "Concluído")
  dataEnvio: string; // Data de envio do formulário
}

const Status: React.FC = () => {
  const [statusList, setStatusList] = useState<StatusItem[]>([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "formassistance"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          userId: doc.data().userId,
          titulo: doc.data().titulo,
          status: doc.data().status || "Pendente",
          dataEnvio: doc.data().dataEnvio || new Date().toISOString().split('T')[0],
        })) as StatusItem[];

        // Ordenar: Mais recentes primeiro; mover "Concluído" para o final
        const sortedData = data
          .sort((a, b) => new Date(b.dataEnvio).getTime() - new Date(a.dataEnvio).getTime())
          .sort((a, b) => (a.status === "Concluído" ? 1 : 0) - (b.status === "Concluído" ? 1 : 0));

        setStatusList(sortedData);
      } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setStatusList((prevList) =>
        prevList.filter((item) => {
          const itemTime = new Date(item.dataEnvio).getTime();
          const hoursDifference = (now - itemTime) / (1000 * 60 * 60);
          return !(item.status === "Concluído" && hoursDifference > 32); // Remover após 32 horas
        })
      );
    }, 60000); // Checar a cada minuto

    return () => clearInterval(interval); // Limpar intervalo quando o componente desmontar
  }, []);

  return (
    <div className="status-container">
      <h2>Status dos Serviços</h2>
      <table className="status-table">
        <thead>
          <tr>
            <th>ID do Usuário</th>
            <th>Título</th>
            <th>Status</th>
            <th>Data de Envio</th>
          </tr>
        </thead>
        <tbody>
          {statusList.map((item) => (
            <tr key={item.id}>
              <td>{item.userId}</td>
              <td>{item.titulo}</td>
              <td className={`status-${item.status.toLowerCase()}`}>{item.status}</td>
              <td>{item.dataEnvio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Status;
