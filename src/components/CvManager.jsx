import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CvManager = ({ onEdit }) => {
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // For navigation to the CV details page

    useEffect(() => {
        const fetchCvs = async () => {
            try {
                const response = await axios.get("https://node-project-u3nz.onrender.com/api/cv/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCvs(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des CVs :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCvs();
    }, []);

    const handleDelete = async (cvId) => {
        try {
            await axios.delete(`https://node-project-u3nz.onrender.com/api/cv/${cvId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCvs((prevCvs) => prevCvs.filter((cv) => cv._id !== cvId));
        } catch (error) {
            console.error("Erreur lors de la suppression du CV :", error);
        }
    };

    const handleView = (cvId) => {
        navigate(`/cv/${cvId}`); // Redirect to the CV details page
    };

    if (loading) return <p>Chargement des CVs...</p>;

    return (
        <div>
            {cvs.length === 0 ? (
                <p>Vous n'avez pas encore de CV.</p>
            ) : (
                <div>
                    {cvs.map((cv) => (
                        <div key={cv._id} style={styles.card}>
                            <h3>{cv.personalInfo.nom} {cv.personalInfo.prenom}</h3>
                            <p>{cv.personalInfo.description || "Aucune description."}</p>
                            <button
                                onClick={() => onEdit(cv)}
                                style={{ ...styles.button, backgroundColor: "#3b82f6" }}
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(cv._id)}
                                style={{ ...styles.button, backgroundColor: "#e53e3e" }}
                            >
                                Supprimer
                            </button>
                            <button
                                onClick={() => handleView(cv._id)}
                                style={{ ...styles.button, backgroundColor: "#48bb78" }}
                            >
                                Voir le CV
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    card: {
        marginBottom: "16px",
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    button: {
        marginTop: "8px",
        marginRight: "8px",
        padding: "8px 16px",
        color: "#ffffff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default CvManager;
