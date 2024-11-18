import React, { useState } from 'react';
import NavBar from '../components/nav-bar/nav-bar';
import Container from '../components/container/container';
import Footer from '../components/footer/footer';
import Chatbot from '../components/ChatBot/chatbot';
import './home.css';

const Home: React.FC = () => {
  const [showAssistanceForm, setShowAssistanceForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleShowForm = () => {
    setShowAssistanceForm(true);
  };

  const handleCloseForm = () => {
    setShowAssistanceForm(false);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="home-layout">
      <NavBar onAssistClick={handleShowForm} onProfileClick={handleShowProfile} />
      <Container
        showForm={showAssistanceForm}
        showProfile={showProfile}
        onCloseForm={handleCloseForm}
        onCloseProfile={handleCloseProfile} showStatus={false} onCloseStatus={function (): void {
          throw new Error('Function not implemented.');
        } }      />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Home;
