import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CVDetails() {
    const { id } = useParams();
    const [cv, setCv] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await fetch(`https://node-project-u3nz.onrender.com/api/cv/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCv(data);
            } catch (err) {
                console.error('Failed to fetch CV:', err);
                setError('Impossible de charger le CV.');
            }
        };

        fetchCV();
    }, [id]);

    if (error) {
        return (
            <div>
                <p className="text-danger">{error}</p>
                <button onClick={() => window.location.reload()}>Réessayer</button>
            </div>
        );
    }

    if (!cv) {
        return (
            <div className="loading-spinner">
                <p>Chargement en cours...</p>
            </div>
        );
    }

    return (
        <div className="cv-details">
            <h1>{cv.firstname} {cv.lastname}</h1>
            <p>{cv.description}</p>
            <div className="section">
                <h3>Éducation</h3>
                {cv.education.length > 0 ? (
                    <ul>
                        {cv.education.map((edu, index) => (
                            <li key={index}>
                                <strong>{edu.degree}</strong> - {edu.institution}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune information d'éducation disponible.</p>
                )}
            </div>
            <div className="section">
                <h3>Expériences Professionnelles</h3>
                {cv.experience.length > 0 ? (
                    <ul>
                        {cv.experience.map((exp, index) => (
                            <li key={index}>
                                <strong>{exp.position}</strong> chez {exp.company}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune expérience professionnelle disponible.</p>
                )}
            </div>
        </div>
    );
}

export default CVDetails;
