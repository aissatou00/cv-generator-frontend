import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faShareAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext.jsx";

const HomePage = () => {
    const [publicCvs, setPublicCvs] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPublicCvs = async () => {
            try {
                const response = await axios.get("https://node-project-u3nz.onrender.com/api/cv");
                setPublicCvs(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des CV publics :", error);
                setError("Impossible de charger les CV publics. Veuillez réessayer plus tard.");
            }
        };

        fetchPublicCvs();
    }, []);

    const styles = {
        container: {
            fontFamily: "'Arial', sans-serif",
            color: "#1a202c",
        },
        hero: {
            backgroundColor: "#2563eb",
            color: "#ffffff",
            textAlign: "center",
            padding: "4rem 1.5rem",
        },
        heroTitle: {
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
        },
        heroText: {
            fontSize: "1.25rem",
            marginBottom: "2rem",
        },
        heroButton: {
            backgroundColor: "#ffffff",
            color: "#2563eb",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "background-color 0.3s",
        },
        section: {
            padding: "4rem 1.5rem",
            textAlign: "center",
        },
        sectionTitle: {
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "2rem",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
        },
        card: {
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "1.5rem",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
        },
        icon: {
            fontSize: "2rem",
            color: "#2563eb",
            marginBottom: "1rem",
        },
        footer: {
            backgroundColor: "#1a202c",
            color: "#ffffff",
            textAlign: "center",
            padding: "2rem 1.5rem",
        },
    };

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <header style={styles.hero}>
                <h1 style={styles.heroTitle}>Bienvenue sur CV TESTER</h1>
                <p style={styles.heroText}>
                    Générez, modifiez et soumettez vos CV en toute simplicité.
                </p>
            

                {user ? (
                    <p style={styles.heroText}>Bienvenue,
                        <a
                            href="#cv"
                            style={{
                                color: "#84a65a",
                                textDecoration: "none",
                                fontWeight: "bold",

                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#1e40af")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#84a65a")}
                        >
                            regardez nos CVs
                        </a>{" "}
                        !
                    </p>
                    ) : (
                    <a
                    href="/register"
                    style={styles.heroButton}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
                        Créer un compte
                    </a>
             <a
                    href="#cv"
                    style={styles.heroButton}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
                       Voir les CVs
                    </a>
                )}
            </header>

            {/* Features Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Pourquoi utiliser CV Tester ?</h2>
                <div style={styles.grid}>
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faFileAlt} style={styles.icon} />
                        <h3>Créer un CV</h3>
                        <p>Utilisez notre éditeur intuitif pour concevoir des CV professionnels rapidement.</p>
                    </div>
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faShareAlt} style={styles.icon} />
                        <h3>Partager vos CV</h3>
                        <p>Rendez vos CV publics pour recevoir des conseilles .</p>
                    </div>
                    <div style={styles.card}>
                        <FontAwesomeIcon icon={faEdit} style={styles.icon} />
                        <h3>Modifier à volonté</h3>
                        <p>Modifiez vos CV à tout moment avec des informations à jour.</p>
                    </div>
                </div>
            </section>

            {/* Public CVs Section */}
            <section id="cv" style={styles.section}>
                <h2 style={styles.sectionTitle}>CV publics</h2>
                {error ? (
                    <p style={{ color: "#e53e3e" }}>{error}</p>
                ) : publicCvs.length === 0 ? (
                    <p style={{ color: "#4a5568" }}>Aucun CV public disponible pour le moment.</p>
                ) : (
                    <div style={styles.grid}>
                        {publicCvs.map((cv) => (
                            <div
                                key={cv._id}
                                style={styles.card}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                                }}
                            >
                                {/* Section Image */}
                                <img
                                    src={ "https://img.freepik.com/psd-gratuit/illustration-3d-avatar-ligne_23-2151303097.jpg?t=st=1732893433~exp=1732897033~hmac=bec2d9338fb67bc734b021a974c040c8c78a9e5353ce6e14233b5153357c2d00&w=1060"}
                                    alt={`${cv.personalInfo?.nom || "Nom non spécifié"} ${
                                        cv.personalInfo?.prenom || "Prénom non spécifié"
                                    }`}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginBottom: "1rem",
                                        border: "2px solid #2563eb",
                                        display: "block",
                                        margin: "0 auto",
                                    }}
                                />

                                {/* Section Informations */}
                                <div style={{ textAlign: "center" }}>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2563eb" }}>
                                        {cv.personalInfo?.nom || "Nom non spécifié"}{" "}
                                        {cv.personalInfo?.prenom || "Prénom non spécifié"}
                                    </h3>
                                    <p style={{ fontSize: "0.875rem", color: "#4a5568" }}>
                                        {cv.personalInfo?.description || "Profession non spécifiée"}
                                    </p>
                                </div>

                                {/* Bouton Voir Plus */}
                                <a
                                    href={`/cv/${cv._id}`}
                                    style={{
                                        marginTop: "1rem",
                                        display: "inline-block",
                                        fontSize: "0.875rem",
                                        color: "#2563eb",
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Voir le CV complet
                                </a>
                            </div>
                        ))}
                    </div>
                )}

            </section>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; {new Date().getFullYear()} CV Manager. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default HomePage;
