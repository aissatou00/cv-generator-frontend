import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const CustomNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false); // État pour gérer la visibilité du dropdown

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const styles = {
        navbar: {
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        container: {
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
        },
        logo: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            textDecoration: "none",
            color: "#ffffff",
        },
        navLinks: {
            display: "flex",
            gap: "1rem",
            alignItems: "center",
        },
        link: {
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "color 0.3s",
        },
        dropdown: {
            position: "relative",
            cursor: "pointer",
        },
        dropdownContent: {
            position: "absolute",
            top: "100%",
            right: "0",
            backgroundColor: "#ffffff",
            color: "#000000",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            display: dropdownVisible ? "block" : "none", // Contrôle via l'état
            minWidth: "150px",
            zIndex: 1000,
        },
        dropdownItem: {
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            textAlign: "left",
            width: "100%",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        dropdownItemHover: {
            backgroundColor: "#f3f4f6",
        },
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                {/* Logo */}
                <Link to="/" style={styles.logo}>
                    CV TESTER
                </Link>

                {/* Navigation Links */}
                <div style={styles.navLinks}>
                    <Link to="/" style={styles.link}>
                        Home
                    </Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" style={styles.link}>
                                Dashboard
                            </Link>
                            <div style={styles.dropdown}>
                                <button
                                    onClick={toggleDropdown} // Toggle le dropdown au clic
                                    style={styles.link}
                                >
                                    <FontAwesomeIcon icon={faUser} />{" "}
                                    <span>{user.name || "User"}</span>
                                </button>
                                <div style={styles.dropdownContent}>
                                    <button
                                        onClick={logout}
                                        style={styles.dropdownItem}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSignOutAlt}
                                            style={{ marginRight: "8px" }}
                                        />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.link}>
                                Login
                            </Link>
                            <Link to="/register" style={styles.link}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default CustomNavbar;
