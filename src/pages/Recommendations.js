import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { cvId } = useParams();

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await fetch(`/api/cvs/${cvId}/recommendations`);
      const data = await response.json();
      setRecommendations(data);
    };
    fetchRecommendations();
  }, [cvId]);

  return (
    <div className="container">
      <h1>Recommandations</h1>
      <div>
        {recommendations.map((rec) => (
          <div key={rec._id}>
            <p>{rec.text}</p>
            <p>- {rec.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
