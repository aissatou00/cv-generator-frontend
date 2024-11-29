import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { user, logout } = useContext(AuthContext); // Récupérer l'utilisateur connecté
    const [userInfo, setUserInfo] = useState({ username: "", email: "" });
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://node-project-u3nz.onrender.com/api/user/info", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo({ username: response.data.username, email: response.data.email });
            } catch (err) {
                setError("Erreur lors de la récupération des informations utilisateur.");
            }
        };

        fetchUserInfo();
    }, []);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "https://node-project-u3nz.onrender.com/api/user/update",
                { ...userInfo, ...passwords },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSuccess("Informations mises à jour avec succès.");
            if (passwords.newPassword) {
                logout(); // Déconnexion si le mot de passe a été modifié
                setTimeout(() => navigate("/login"), 2000); // Redirection après déconnexion
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Une erreur s'est produite lors de la mise à jour des informations."
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in passwords) {
            setPasswords((prev) => ({ ...prev, [name]: value }));
        } else {
            setUserInfo((prev) => ({ ...prev, [name]: value }));
        }
    };

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "2rem auto",
            padding: "2rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Roboto', sans-serif",
        },
        title: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#2d3748",
        },
        label: {
            display: "block",
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#4a5568",
        },
        input: {
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            marginBottom: "1rem",
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
            fontWeight: "bold",
            textAlign: "center",
        },
        error: {
            color: "red",
            marginBottom: "1rem",
        },
        success: {
            color: "green",
            marginBottom: "1rem",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Mon Profil</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
            <form onSubmit={handleUpdateUser}>
                <div>
                    <label style={styles.label}>Nom dutilisateur { user.nom}</label>
                    <input
                        type="text"
                        name="username"
                        value={userInfo.username}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div>
                    <label style={styles.label}>Mot de passe actuel</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div>
                    <label style={styles.label}>Nouveau mot de passe</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>
                    Mettre à jour
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
