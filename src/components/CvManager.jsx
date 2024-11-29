import { useState, useEffect } from "react";
import axios from "axios";
import CvEditor from "./CvEditor";

const CvManager = () => {
    const [cvs, setCvs] = useState([]);
    const [editingCv, setEditingCv] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCvs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3000/api/cv/user", {
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

    const handleSave = async (updatedCv) => {
        try {
            if (updatedCv._id) {
                const response = await axios.put(
                    `http://127.0.0.1:3000/api/cv/${updatedCv._id}`,
                    updatedCv,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setCvs((prevCvs) =>
                    prevCvs.map((cv) => (cv._id === updatedCv._id ? response.data : cv))
                );
            } else {
                const response = await axios.post("http://127.0.0.1:3000/api/cv/create", updatedCv, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCvs((prevCvs) => [...prevCvs, response.data]);
            }
            setEditingCv(null);
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du CV :", error);
        }
    };

    const handleDelete = async (cvId) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/api/cv/${cvId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCvs((prevCvs) => prevCvs.filter((cv) => cv._id !== cvId));
        } catch (error) {
            console.error("Erreur lors de la suppression du CV :", error);
        }
    };

    if (loading) return <div style={styles.loading}>Chargement des CVs...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Gérer Mes CVs</h1>
            {editingCv ? (
                <CvEditor currentCv={editingCv} onSave={handleSave} />
            ) : (
                <div style={styles.grid}>
                    {cvs.map((cv) => (
                        <div key={cv._id} style={styles.card}>
                            <h3 style={styles.cardTitle}>{cv.nom} {cv.prenom}</h3>
                            <p style={styles.cardDescription}>{cv.description}</p>
                            <div style={styles.cardActions}>
                                <button
                                    onClick={() => setEditingCv(cv)}
                                    style={styles.editButton}
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(cv._id)}
                                    style={styles.deleteButton}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "24px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "'Arial', sans-serif",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "24px",
        color: "#1f2937",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "16px",
    },
    cardTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "8px",
        color: "#1f2937",
    },
    cardDescription: {
        fontSize: "14px",
        color: "#4b5563",
        marginBottom: "16px",
    },
    cardActions: {
        display: "flex",
        justifyContent: "space-between",
    },
    editButton: {
        backgroundColor: "#3b82f6",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
    },
    deleteButton: {
        backgroundColor: "#e53e3e",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
    },
    loading: {
        fontSize: "16px",
        color: "#4b5563",
        textAlign: "center",
        marginTop: "24px",
    },
};

export default CvManager;
