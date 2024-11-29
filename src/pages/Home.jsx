import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css';

function Home() {
  const [cvData, setCvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel API pour récupérer les CVs publics
    const fetchCvs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/cvs/public');
        setCvData(response.data); // Remplir avec les données des CVs
      } catch (error) {
        setError('Erreur de chargement des CVs.'); // Gestion des erreurs
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, []);

  

  

  return (
    <div className="home-container">
      {/* Section d'introduction */}
      <header className="home-header">
        <h1>Bienvenue sur CV TESTER</h1>
        <p>Découvrez et explorez des CVs publics créés par des utilisateurs du monde entier.</p>
      </header>

      {/* Liste des CVs publics */}
      <section className="cv-list-section">
        <h2>CV publics</h2>
        <div className="cv-list">
          {cvData.map((cv) => (
            <div key={cv.id} className="cv-card">
              <h3>{cv.name}</h3>
              <p>{cv.role}</p>
              <Link to={`/cv/${cv.id}`} className="btn">Voir le CV complet</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
