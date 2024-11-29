import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CvDetailsPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [cv, setCv] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [newRecommendation, setNewRecommendation] = useState("");
    const [error, setError] = useState(null);
    const [recommendationError, setRecommendationError] = useState(null);

    useEffect(() => {
        const fetchCv = async () => {
            try {
                const cvResponse = await axios.get(`https://node-project-u3nz.onrender.com/api/cv/${id}`);
                setCv(cvResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération du CV :", error);
                setError("Impossible de charger ce CV. Veuillez réessayer plus tard.");
            }
        };

        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem("token");
                const recommendationsResponse = await axios.get(
                    `https://node-project-u3nz.onrender.com/api/recommendations/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setRecommendations(recommendationsResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des recommandations :", error);
                setRecommendationError(
                    error.response?.status === 401
                        ? "Connectez-vous pour voir et ajouter des recommandations."
                        : "Impossible de charger les recommandations."
                );
            }
        };

        fetchCv();
        if (user) fetchRecommendations();
    }, [id, user]);

    const handleAddRecommendation = async () => {
        if (!newRecommendation.trim()) return;
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://node-project-u3nz.onrender.com/api/recommendations",
                { cvId: id, message: newRecommendation },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRecommendations((prev) => [...prev, response.data]);
            setNewRecommendation("");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recommandation :", error);
            setRecommendationError("Impossible d'ajouter la recommandation.");
        }
    };

    const styles = {
        container: {
            maxWidth: "1200px",
            margin: "2rem auto",
            padding: "2rem",
            fontFamily: "'Roboto', sans-serif",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
        },
        main: {
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
        },
        header: {
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
        },
        avatar: {
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#e2e8f0",
            flexShrink: 0,
        },
        name: {
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1a202c",
        },
        description: {
            fontSize: "1rem",
            color: "#4a5568",
        },
        section: {
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        },
        sectionTitle: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#2d3748",
        },
        listItem: {
            marginBottom: "0.75rem",
            fontSize: "1rem",
            color: "#4a5568",
        },
        recommendations: {
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        recommendationCard: {
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#f7fafc",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
        recommendationForm: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        textarea: {
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "1rem",
        },
        button: {
            backgroundColor: "#3182ce",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            textAlign: "center",
            fontWeight: "bold",
        },
    };

    if (error) {
        return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
    }

    if (!cv) {
        return <p style={{ textAlign: "center", color: "gray" }}>Chargement du CV...</p>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.main}>
                {/* Header Section */}
                <div style={styles.header}>
                    <img
                        src="https://img.freepik.com/psd-gratuit/illustration-3d-avatar-ligne_23-2151303097.jpg"
                        alt={`${cv.personalInfo?.nom} ${cv.personalInfo?.prenom}`}
                        style={styles.avatar}
                    />
                    <div>
                        <h1 style={styles.name}>
                            {cv.personalInfo?.nom} {cv.personalInfo?.prenom}
                        </h1>
                        <p style={styles.description}>
                            {cv.personalInfo?.description || "Description non spécifiée"}
                        </p>
                    </div>
                </div>

                {/* Education Section */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Éducation</h2>
                    <ul>
                        {cv.education?.length > 0 ? (
                            cv.education.map((edu, index) => (
                                <li key={index} style={styles.listItem}>
                                    <strong>{edu.diplomes}</strong> ({edu.startDate} - {edu.endDate})
                                </li>
                            ))
                        ) : (
                            <p>Aucune information éducative spécifiée.</p>
                        )}
                    </ul>
                </div>

                {/* Experience Section */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Expériences professionnelles</h2>
                    <ul>
                        {cv.experience?.length > 0 ? (
                            cv.experience.map((exp, index) => (
                                <li key={index} style={styles.listItem}>
                                    <strong>{exp.postes_occupes}</strong> chez{" "}
                                    {exp.entreprises} ({exp.startDate} - {exp.endDate})
                                    <p>{exp.missions}</p>
                                </li>
                            ))
                        ) : (
                            <p>Aucune expérience spécifiée.</p>
                        )}
                    </ul>
                </div>
            </div>

            <div style={styles.recommendations}>
                <h2 style={styles.sectionTitle}>Recommandations</h2>
                {user ? (
                    <>
                        {recommendations.length === 0 ? (
                            <p>Aucune recommandation disponible pour ce CV.</p>
                        ) : (
                            recommendations.map((rec) => (
                                <div key={rec._id} style={styles.recommendationCard}>
                                    <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                                        {rec.userId.username}
                                    </p>
                                    <p>{rec.message}</p>
                                </div>
                            ))
                        )}

                        <div style={styles.recommendationForm}>
                            <textarea
                                style={styles.textarea}
                                value={newRecommendation}
                                onChange={(e) => setNewRecommendation(e.target.value)}
                                placeholder="Ajoutez une recommandation..."
                            ></textarea>
                            <button style={styles.button} onClick={handleAddRecommendation}>
                                Ajouter une recommandation
                            </button>
                        </div>
                    </>
                ) : (
                    <p style={{ color: "#4a5568" }}>
                        Connectez-vous pour voir ou ajouter des recommandations.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CvDetailsPage;
