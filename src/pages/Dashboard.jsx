import { useState } from "react";
import CvManager from "../components/CvManager"; // Gestion des CVs
import UserProfile from "../components/UserProfile"; // Profil utilisateur
import CvEditor from "../components/CvEditor"; // Éditeur de CV

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("manage"); // Onglet actif
    const [editingCv, setEditingCv] = useState(null); // CV en cours de modification

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
            overflowY: "auto",
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
    };

    return (
        <div style={styles.container}>
            {/* Menu latéral */}
            <div style={styles.sidebar}>
                <h2 style={styles.menuTitle}>Menu</h2>
                <ul>
                    <li>
                        <button
                            onClick={() => setActiveTab("create")}
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
                    <li>
                        <button
                            onClick={() => setActiveTab("profile")}
                            style={styles.menuItem(activeTab === "profile")}
                        >
                            Mon Profil
                        </button>
                    </li>
                </ul>
            </div>

            {/* Zone de contenu principale */}
            <div style={styles.content}>
                {/* Création ou modification d'un CV */}
                {activeTab === "create" && (
                    <div style={styles.contentBox}>
                        <h2 style={styles.contentTitle}>
                            {editingCv ? "Modifier un CV" : "Créer un CV"}
                        </h2>
                        <CvEditor
                            onSave={() => setActiveTab("manage")} // Retourner à l'onglet de gestion après sauvegarde
                            currentCv={editingCv} // Passer le CV à modifier ou null pour une création
                        />
                    </div>
                )}

                {/* Gestion des CVs */}
                {activeTab === "manage" && (
                    <div style={styles.contentBox}>
                        <h2 style={styles.contentTitle}>Mes CVs</h2>
                        <CvManager
                            onEdit={(cv) => {
                                setEditingCv(cv);
                                setActiveTab("create");
                            }}
                        />
                    </div>
                )}

                {/* Profil utilisateur */}
                {activeTab === "profile" && (
                    <div style={styles.contentBox}>
                        <h2 style={styles.contentTitle}>Mon Profil</h2>
                        <UserProfile />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
