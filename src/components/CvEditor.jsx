import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CvEditor = ({ onSave, currentCv }) => {
    const [formData, setFormData] = useState({
        personalInfo: { nom: "", prenom: "", description: "" },
        education: [{ diplomes: "", certification: "", formations: 1, startDate: "", endDate: "" }],
        experience: [{ postes_occupes: "", missions: "", entreprises: "", startDate: "", endDate: "" }],
        visibility: true,
    });

    // Charger les données du CV si `currentCv` est fourni
    useEffect(() => {
        console.log("currentCv reçu :", currentCv); // Debug: afficher currentCv
        if (currentCv) {
            const initialData = {
                personalInfo: {
                    nom: currentCv.nom || "",
                    prenom: currentCv.prenom || "",
                    description: currentCv.description || "",
                },
                education: currentCv.education || [
                    { diplomes: "", certification: "", formations: 1, startDate: "", endDate: "" },
                ],
                experience: currentCv.experience || [
                    { postes_occupes: "", missions: "", entreprises: "", startDate: "", endDate: "" },
                ],
                visibility: currentCv.visibility !== undefined ? currentCv.visibility : true,
            };
            console.log("Données initialisées dans formData :", initialData); // Debug
            setFormData(initialData);
        }
    }, [currentCv]);

    // Debug: afficher formData à chaque modification
    useEffect(() => {
        console.log("formData mis à jour :", formData);
    }, [formData]);

    const handleNestedChange = (index, section, field, value) => {
        console.log(`Modification dans ${section}[${index}] - Champ : ${field} - Nouvelle valeur : ${value}`); // Debug
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const addSection = (section) => {
        console.log(`Ajout d'une nouvelle section dans ${section}`); // Debug
        setFormData((prev) => ({
            ...prev,
            [section]: [
                ...prev[section],
                section === "education"
                    ? { diplomes: "", certification: "", formations: prev[section].length + 1, startDate: "", endDate: "" }
                    : { postes_occupes: "", missions: "", entreprises: "", startDate: "", endDate: "" },
            ],
        }));
    };

    const removeSection = (section, index) => {
        console.log(`Suppression de ${section}[${index}]`); // Debug
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = () => {
        const formattedData = {
            nom: formData.personalInfo.nom,
            prenom: formData.personalInfo.prenom,
            description: formData.personalInfo.description,
            education: formData.education.map((edu) => ({
                ...edu,
                startDate: edu.startDate ? new Date(edu.startDate).toISOString() : null,
                endDate: edu.endDate ? new Date(edu.endDate).toISOString() : null,
            })),
            experience: formData.experience.map((exp) => ({
                ...exp,
                startDate: exp.startDate ? new Date(exp.startDate).toISOString() : null,
                endDate: exp.endDate ? new Date(exp.endDate).toISOString() : null,
            })),
            visibility: formData.visibility,
        };

        console.log("Données prêtes à être sauvegardées :", formattedData); // Debug
        onSave(formattedData);
    };

    return (
        <div
            style={{
                padding: "24px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                maxWidth: "800px",
                margin: "auto",
                fontFamily: "'Arial', sans-serif",
                color: "#333",
            }}
        >
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
                {currentCv ? "Modifier un CV" : "Créer un CV"}
            </h2>

            {/* Informations personnelles */}
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
                Informations personnelles
            </h3>
            <input
                type="text"
                placeholder="Nom"
                value={formData.personalInfo.nom}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, nom: e.target.value },
                    }))
                }
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    width: "100%",
                    marginBottom: "12px",
                }}
            />
            <input
                type="text"
                placeholder="Prénom"
                value={formData.personalInfo.prenom}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, prenom: e.target.value },
                    }))
                }
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    width: "100%",
                    marginBottom: "12px",
                }}
            />
            <textarea
                placeholder="Description"
                value={formData.personalInfo.description}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, description: e.target.value },
                    }))
                }
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    width: "100%",
                    marginBottom: "24px",
                }}
            />

            {/* Section Éducation */}
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>Éducation</h3>
            {formData.education.map((edu, index) => (
                <div
                    key={index}
                    style={{
                        borderBottom: "1px solid #eee",
                        paddingBottom: "16px",
                        marginBottom: "16px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Diplôme"
                        value={edu.diplomes || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "education", "diplomes", e.target.value)
                        }
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "12px",
                            width: "100%",
                            marginBottom: "12px",
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Certification"
                        value={edu.certification || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "education", "certification", e.target.value)
                        }
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "12px",
                            width: "100%",
                            marginBottom: "12px",
                        }}
                    />
                    <div style={{ display: "flex", gap: "12px" }}>
                        <input
                            type="date"
                            value={edu.startDate || ""}
                            onChange={(e) =>
                                handleNestedChange(index, "education", "startDate", e.target.value)
                            }
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "12px",
                                flex: "1",
                            }}
                        />
                        <input
                            type="date"
                            value={edu.endDate || ""}
                            onChange={(e) =>
                                handleNestedChange(index, "education", "endDate", e.target.value)
                            }
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "12px",
                                flex: "1",
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeSection("education", index)}
                        style={{
                            marginTop: "12px",
                            color: "#e53e3e",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => addSection("education")}
                style={{
                    backgroundColor: "#4299e1",
                    color: "#fff",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "24px",
                }}
            >
                Ajouter une éducation
            </button>

            {/* Section Expérience */}
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
                Expérience professionnelle
            </h3>
            {formData.experience.map((exp, index) => (
                <div
                    key={index}
                    style={{
                        borderBottom: "1px solid #eee",
                        paddingBottom: "16px",
                        marginBottom: "16px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Poste occupé"
                        value={exp.postes_occupes || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "experience", "postes_occupes", e.target.value)
                        }
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "12px",
                            width: "100%",
                            marginBottom: "12px",
                        }}
                    />
                    <textarea
                        placeholder="Missions"
                        value={exp.missions || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "experience", "missions", e.target.value)
                        }
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "12px",
                            width: "100%",
                            marginBottom: "12px",
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Entreprise"
                        value={exp.entreprises || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "experience", "entreprises", e.target.value)
                        }
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "12px",
                            width: "100%",
                            marginBottom: "12px",
                        }}
                    />
                    <div style={{ display: "flex", gap: "12px" }}>
                        <input
                            type="date"
                            value={exp.startDate || ""}
                            onChange={(e) =>
                                handleNestedChange(index, "experience", "startDate", e.target.value)
                            }
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "12px",
                                flex: "1",
                            }}
                        />
                        <input
                            type="date"
                            value={exp.endDate || ""}
                            onChange={(e) =>
                                handleNestedChange(index, "experience", "endDate", e.target.value)
                            }
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "12px",
                                flex: "1",
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeSection("experience", index)}
                        style={{
                            marginTop: "12px",
                            color: "#e53e3e",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => addSection("experience")}
                style={{
                    backgroundColor: "#4299e1",
                    color: "#fff",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "24px",
                }}
            >
                Ajouter une expérience
            </button>

            {/* Gestion de la visibilité */}
            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                <label style={{ marginRight: "8px", fontWeight: "500" }}>Visibilité :</label>
                <input
                    type="checkbox"
                    checked={formData.visibility}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            visibility: e.target.checked,
                        }))
                    }
                    style={{ width: "20px", height: "20px" }}
                />
                <span style={{ marginLeft: "8px" }}>
                    {formData.visibility ? "Public" : "Privé"}
                </span>
            </div>

            <button
                onClick={handleSubmit}
                style={{
                    marginTop: "24px",
                    backgroundColor: "#48bb78",
                    color: "#fff",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    width: "100%",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Sauvegarder le CV
            </button>
        </div>
    );
};

CvEditor.propTypes = {
    onSave: PropTypes.func.isRequired,
    currentCv: PropTypes.object,
};

export default CvEditor;
