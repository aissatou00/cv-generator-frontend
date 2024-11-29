import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';


function Dashboard() {
    const [userCV, setUserCV] = useState(null); // Stocke le CV de l'utilisateur
    const [error, setError] = useState(null); // Gère les erreurs de requête
    const [loading, setLoading] = useState(true); // Gère l'état de chargement

    useEffect(() => {
        const fetchUserCV = async () => {
            try {
                const response = await fetch('https://node-project-u3nz.onrender.com/api/cv/mine', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envoi du token d'authentification
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUserCV(data); // Met à jour les données du CV de l'utilisateur
            } catch (err) {
                console.error('Failed to fetch user CV:', err);
                setError('Impossible de charger votre CV. Veuillez réessayer.');
            } finally {
                setLoading(false); // Arrête le chargement
            }
        };

        fetchUserCV();
    }, []);

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenue dans votre espace personnel.</p>
            <div className="mt-4">
                <h3>Votre CV</h3>
                {userCV ? (
                    <div>
                        <p>
                            <strong>Nom : </strong>{userCV.firstname} {userCV.lastname}
                        </p>
                        <p>
                            <strong>Description : </strong>{userCV.description}
                        </p>
                        <p>
                            <strong>Expériences pédagogiques :</strong>
                        </p>
                        <ul>
                            {userCV.education.map((edu, index) => (
                                <li key={index}>{edu.degree} - {edu.institution}</li>
                            ))}
                        </ul>
                        <p>
                            <strong>Expériences professionnelles :</strong>
                        </p>
                        <ul>
                            {userCV.experience.map((exp, index) => (
                                <li key={index}>{exp.position} - {exp.company}</li>
                            ))}
                        </ul>
                        <div className="mt-3">
                            <Link to="/edit-cv" className="btn btn-primary">Modifier le CV</Link>
                            <button
                                className="btn btn-danger ms-2"
                                onClick={async () => {
                                    try {
                                        const response = await fetch('https://node-project-u3nz.onrender.com/api/cv/mine', {
                                            method: 'DELETE',
                                            headers: {
                                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                                            }
                                        });

                                        if (!response.ok) {
                                            throw new Error(`HTTP error! Status: ${response.status}`);
                                        }

                                        setUserCV(null);
                                        alert('CV supprimé avec succès !');
                                    } catch (error) {
                                        console.error('Erreur lors de la suppression :', error);
                                        alert('Échec de la suppression du CV.');
                                    }
                                }}
                            >
                                Supprimer le CV
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Vous n'avez pas encore de CV. <Link to="/create-cv">Créer un CV</Link></p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
