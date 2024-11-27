import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cvs, setCvs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const response = await fetch('/api/cvs'); // Endpoint pour récupérer les CV
        const data = await response.json();
        setCvs(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des CV :', error);
      }
    };

    fetchCvs();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredCvs = cvs.filter((cv) =>
    `${cv.firstName} ${cv.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Liste des CV</h1>
      <input
        type="text"
        placeholder="Rechercher par nom ou prénom..."
        value={search}
        onChange={handleSearch}
        className="form-control mb-4"
      />
      <ul>
        {filteredCvs.map((cv) => (
          <li key={cv._id}>
            <Link to={`/cv/${cv._id}`}>
              {cv.firstName} {cv.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
