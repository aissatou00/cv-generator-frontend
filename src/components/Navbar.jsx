// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';  // Vous pouvez ajouter un fichier CSS pour styliser la barre de navigation

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CV Generator
        </Link>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="navbar-link">Register</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
