import { useState, useEffect } from "react";
import CvEditor from "../components/CvEditor";
import axios from "axios";

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("create"); // Onglet actif : création ou gestion
    const [cvs, setCvs] = useState([]); // Liste des CVs
    const [editingCv, setEditingCv] = useState(null); // CV en cours de modification
    const [loading, setLoading] = useState(true); // État de chargement

    useEffect(() => {
        // Récupérer les CVs de l'utilisateur connecté
        const fetchUserCvs = async () => {
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

        fetchUserCvs();
    }, []);

    const saveCv = async (cvData) => {
        try {
            if (editingCv) {
                // Modifier un CV existant
                const response = await axios.put(
                    `https://node-project-u3nz.onrender.com/api/cv/${editingCv._id}`,
                    cvData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setCvs((prev) =>
                    prev.map((cv) => (cv._id === editingCv._id ? response.data : cv))
                );
                setEditingCv(null);
            } else {
                // Créer un nouveau CV
                const response = await axios.post("https://node-project-u3nz.onrender.com/api/cv/create", cvData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCvs((prev) => [...prev, response.data]);
            }
            setActiveTab("manage");
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du CV :", error);
        }
    };

    const deleteCv = async (cvId) => {
        try {
            await axios.delete(`https://node-project-u3nz.onrender.com/api/cv/${cvId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCvs((prev) => prev.filter((cv) => cv._id !== cvId));
        } catch (error) {
            console.error("Erreur lors de la suppression du CV :", error);
        }
    };

    const styles = {
        container: {
            display: "flex",
            height: "100vh",
            backgroundColor: "#f8fafc",
        },
        sidebar: {
            width: "25%",
            backgroundColor: "#ffffff",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        menuTitle: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "24px",
            color: "#1f2937",
        },
        menuItem: (isActive) => ({
            width: "100%",
            textAlign: "left",
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: isActive ? "#3b82f6" : "#e5e7eb",
            color: isActive ? "#ffffff" : "#1f2937",
            cursor: "pointer",
            marginBottom: "16px",
        }),
        content: {
            width: "75%",
            padding: "24px",
        },
        contentBox: {
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        contentTitle: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#1f2937",
        },
        button: {
            marginTop: "16px",
            padding: "12px 16px",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
        },
    };

    return (
        <div style={styles.container}>
            {/* Menu latéral */}
            <div style={styles.sidebar}>
                <h2 style={styles.menuTitle}>Menu</h2>
                <ul>
                    <li>
                        <button
                            onClick={() => {
                                setEditingCv(null);
                                setActiveTab("create");
                            }}
                            style={styles.menuItem(activeTab === "create")}
                        >
                            Créer un CV
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab("manage")}
                            style={styles.menuItem(activeTab === "manage")}
                        >
                            Gérer mes CVs
                        </button>
                    </li>
                </ul>
            </div>

            {/* Zone de contenu principale */}
            <div style={styles.content}>
                {loading && <p>Chargement des CVs...</p>}

                {/* Création d'un CV */}
                {activeTab === "create" && (
                    <div style={styles.contentBox}>
                        <h2 style={styles.contentTitle}>Créer un CV</h2>
                        <CvEditor onSave={saveCv} />
                    </div>
                )}

                {/* Gestion des CVs */}
                {activeTab === "manage" && (
                    <div style={styles.contentBox}>
                        <h2 style={styles.contentTitle}>Mes CVs</h2>
                        {cvs.length === 0 ? (
                            <p>Vous navez pas encore de CV.</p>
                        ) : (
                            <div>
                                {cvs.map((cv) => (
                                    <div
                                        key={cv._id}
                                        style={{
                                            marginBottom: "16px",
                                            padding: "16px",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            backgroundColor: "#ffffff",
                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <h3 style={{ marginBottom: "8px" }}>
                                            {cv.personalInfo.nom} {cv.personalInfo.prenom}
                                        </h3>
                                        <p>
                                            <strong>Description :</strong>{" "}
                                            {cv.personalInfo.description || "Non spécifiée"}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setEditingCv(cv);
                                                setActiveTab("create");
                                            }}
                                            style={{
                                                ...styles.button,
                                                backgroundColor: "#3b82f6",
                                                marginRight: "8px",
                                            }}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => deleteCv(cv._id)}
                                            style={{
                                                ...styles.button,
                                                backgroundColor: "#e53e3e",
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
