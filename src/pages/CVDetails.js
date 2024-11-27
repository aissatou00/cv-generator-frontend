import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CVDetails = () => {
  const [cv, setCv] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCv = async () => {
      const response = await fetch(`/api/cvs/${id}`);
      const data = await response.json();
      setCv(data);
    };
    fetchCv();
  }, [id]);

  return (
    <div className="container">
      <h1>{cv.firstName} {cv.lastName}</h1>
      <p>{cv.description}</p>
      {/* Affichez ici les autres détails du CV */}
    </div>
  );
};

export default CVDetails;
