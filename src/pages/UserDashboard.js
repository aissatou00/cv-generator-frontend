import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [cvs, setCvs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data.user);
      setCvs(data.cvs);
    };
    fetchUserData();
  }, []);

  return (
    <div className="container">
      <h1>Bienvenue {user?.firstName} {user?.lastName}</h1>
      <h2>Vos CV</h2>
      <button onClick={() => history.push('/cv/create')}>Créer un nouveau CV</button>
      <div>
        {cvs.map(cv => (
          <div key={cv._id}>
            <h3>{cv.firstName} {cv.lastName}</h3>
            <button onClick={() => history.push(`/cv/edit/${cv._id}`)}>Modifier</button>
            <button>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
