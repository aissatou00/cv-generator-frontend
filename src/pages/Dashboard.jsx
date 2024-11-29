import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';


function Dashboard() {
    const [userCV, setUserCV] = useState(null); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchUserCV = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/cv/mine', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
    
                const data = await response.json();
                setUserCV(data); 
            } catch (err) {
                console.error('Failed to fetch user CV:', err);
                setError('Impossible de charger votre CV. Veuillez réessayer.');
            } finally {
                setLoading(false); 
            }
        };
    
        fetchUserCV();
    }, []);
    

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
                                        const response = await fetch('http://127.0.0.1:5000/api/cv/mine', {
                                            method: 'DELETE',
                                            headers: {
                                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                                            }
                                        });
    
                                        if (!response.ok) {
                                            throw new Error(`HTTP error! Status: ${response.status}`);
                                        }
    
                                        setUserCV(null);
                                        toast.success('CV supprimé avec succès !');
                                    } catch (error) {
                                        console.error('Erreur lors de la suppression :', error);
                                        toast.error('Échec de la suppression du CV.');
                                    }
                                }}
                            >
                                Supprimer le CV
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>Vous n'avez pas encore de CV.</p>
                        <Link to="/create-cv" className="btn btn-success">
                            Créer un CV
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default Dashboard;
