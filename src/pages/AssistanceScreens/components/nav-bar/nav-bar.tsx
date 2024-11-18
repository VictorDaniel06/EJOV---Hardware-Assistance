import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './nav-bar.css';

interface NavBarProps {
  onAssistClick: () => void;
  onProfileClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAssistClick, onProfileClick }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="logo-placeholder desktop-only">
        <img src="src/assets/LogoEJOV-notext.png" alt="LogoNoText" />
      </Link>
      <button className="menu-button" onClick={toggleMenu}>☰</button>
      <div className={`nav-options ${menuOpen ? 'open' : ''}`}>
        <Link to="/home" className="logo-placeholder mobile-only">
          <img src="src/assets/LogoEJOV-notext.png" alt="LogoNoText" />
        </Link>
        <span className="nav-item" onClick={onAssistClick}>ASSISTÊNCIA</span>
        <Link to="/status" className={`nav-item ${location.pathname === '/status' ? 'selected' : ''}`}>STATUS</Link>
        <div className="profile-icon-placeholder mobile-only">
          <button className="profile-icon-button" onClick={onProfileClick}>
          </button>
        </div>
      </div>
      <div className="profile-icon-placeholder desktop-only">
        <button className="profile-icon-button" onClick={onProfileClick}>
          <img src="" alt="Profile Icon" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
