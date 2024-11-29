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

    useEffect(() => {
        const fetchCvAndRecommendations = async () => {
            try {
                const token = localStorage.getItem("token");
                const cvResponse = await axios.get(`https://node-project-u3nz.onrender.com/api/cv/${id}`);
                setCv(cvResponse.data);

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
                console.error("Erreur lors de la récupération des données :", error);
                setError(
                    error.response?.status === 401
                        ? "Vous devez être connecté pour voir les recommandations."
                        : "Impossible de charger les données."
                );
            }
        };

        fetchCvAndRecommendations();
    }, [id]);

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
            setError("Impossible d'ajouter la recommandation.");
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
                        src={ "https://img.freepik.com/psd-gratuit/illustration-3d-avatar-ligne_23-2151303097.jpg?t=st=1732893433~exp=1732897033~hmac=bec2d9338fb67bc734b021a974c040c8c78a9e5353ce6e14233b5153357c2d00&w=1060"} // Image dynamique ou par défaut
                        alt={`${cv.personalInfo?.nom} ${cv.personalInfo?.prenom}`}
                        style={styles.avatar} // Applique les styles définis
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

                {/* Contact Section
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Contact</h2>
                    <p>
                        <strong>Email :</strong> {cv.contact?.email || "Non spécifié"}
                    </p>
                    <p>
                        <strong>Téléphone :</strong> {cv.contact?.phone || "Non spécifié"}
                    </p>
                </div> */}

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

                {user && (
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
                )}
            </div>
        </div>
    );
};

export default CvDetailsPage;
