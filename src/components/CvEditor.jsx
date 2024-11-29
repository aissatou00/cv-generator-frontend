import { useState } from "react";
import PropTypes from "prop-types";

const CvEditor = ({ onSave }) => {
    const [formData, setFormData] = useState({
        personalInfo: { nom: "", prenom: "", description: "" },
        education: [{ diplomes: "", certification: "", startDate: "", endDate: "" }],
        experience: [{ postes_occupes: "", missions: "", entreprises: "", startDate: "", endDate: "" }],
        visibility: true,
    });

    // Gérer les changements pour les champs imbriqués
    const handleNestedChange = (index, section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    // Ajouter une nouvelle section (éducation ou expérience)
    const addSection = (section) => {
        setFormData((prev) => ({
            ...prev,
            [section]: [...prev[section], {}],
        }));
    };

    // Supprimer une section (éducation ou expérience)
    const removeSection = (section, index) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index),
        }));
    };

    // Gérer la soumission
    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Créer/Modifier un CV</h2>

            {/* Informations personnelles */}
            <h3 className="text-lg font-semibold">Informations personnelles</h3>
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
                className="border rounded-lg p-2 w-full mb-4"
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
                className="border rounded-lg p-2 w-full mb-4"
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
                className="border rounded-lg p-2 w-full mb-6"
            />

            {/* Section Éducation */}
            <h3 className="text-lg font-semibold">Éducation</h3>
            {formData.education.map((edu, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                    <input
                        type="text"
                        placeholder="Diplôme"
                        value={edu.diplomes || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "education", "diplomes", e.target.value)
                        }
                        className="border rounded-lg p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Certification"
                        value={edu.certification || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "education", "certification", e.target.value)
                        }
                        className="border rounded-lg p-2 w-full mb-2"
                    />
                    <div className="flex space-x-4">
                        <input
                            type="date"
                            placeholder="Date de début"
                            value={edu.startDate || ""}
                            onChange={(e) =>
                                handleNestedChange(index, "education", "startDate", e.target.value)
                            }
                            className="border rounded-lg p-2 w-1/2"
                        />
                        <input
                            type="date"
                            placeholder="Date de fin"
                            value={edu.endDate || ""}
                            onChange={(e) =>
                                handleNestedChange(index, "education", "endDate", e.target.value)
                            }
                            className="border rounded-lg p-2 w-1/2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeSection("education", index)}
                        className="text-red-500 mt-2"
                    >
                        Supprimer
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => addSection("education")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6"
            >
                Ajouter une éducation
            </button>

            {/* Section Expérience */}
            <h3 className="text-lg font-semibold">Expérience professionnelle</h3>
            {formData.experience.map((exp, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                    <input
                        type="text"
                        placeholder="Poste occupé"
                        value={exp.postes_occupes || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "experience", "postes_occupes", e.target.value)
                        }
                        className="border rounded-lg p-2 w-full mb-2"
                    />
                    <textarea
                        placeholder="Missions"
                        value={exp.missions || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "experience", "missions", e.target.value)
                        }
                        className="border rounded-lg p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Entreprise"
                        value={exp.entreprises || ""}
                        onChange={(e) =>
                            handleNestedChange(index, "experience", "entreprises", e.target.value)
                        }
                        className="border rounded-lg p-2 w-full mb-2"
                    />
                    <div className="flex space-x-4">
                        <input
                            type="date"
                            placeholder="Date de début"
                            value={exp.startDate || ""}
                            onChange={(e) =>
                                handleNestedChange(index, "experience", "startDate", e.target.value)
                            }
                            className="border rounded-lg p-2 w-1/2"
                        />
                        <input
                            type="date"
                            placeholder="Date de fin"
                            value={exp.endDate || ""}
                            onChange={(e) =>
                                handleNestedChange(index, "experience", "endDate", e.target.value)
                            }
                            className="border rounded-lg p-2 w-1/2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeSection("experience", index)}
                        className="text-red-500 mt-2"
                    >
                        Supprimer
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => addSection("experience")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6"
            >
                Ajouter une expérience
            </button>

            {/* Gestion de la visibilité */}
            <div className="flex items-center mt-4">
                <label className="mr-4 font-medium">Visibilité :</label>
                <input
                    type="checkbox"
                    checked={formData.visibility}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            visibility: e.target.checked,
                        }))
                    }
                    className="w-6 h-6"
                />
                <span className="ml-2">{formData.visibility ? "Public" : "Privé"}</span>
            </div>

            <button
                onClick={handleSubmit}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
            >
                Sauvegarder le CV
            </button>
        </div>
    );
};

// Validation des props
CvEditor.propTypes = {
    onSave: PropTypes.func.isRequired,
};

export default CvEditor;
