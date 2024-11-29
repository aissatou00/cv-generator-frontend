import { useState } from "react";
import PropTypes from "prop-types";

const Modal = ({ currentCv, onClose, onSave }) => {
    const [formData, setFormData] = useState(
        currentCv || {
            personalInfo: { nom: "", prenom: "", description: "" },
            education: [{ diplomes: "", certification: "", startDate: "", endDate: "" }],
            experience: [{ postes_occupes: "", missions: "", entreprises: "", startDate: "", endDate: "" }],
            visibility: true,
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value },
        }));
    };

    const handleNestedChange = (index, section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    const addSection = (section) => {
        setFormData((prev) => ({
            ...prev,
            [section]: [...prev[section], {}],
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">
                    {currentCv ? "Modifier CV" : "Ajouter CV"}
                </h2>
                <div className="space-y-4">
                    {/* Personal Info */}
                    <h3 className="text-lg font-semibold">Informations personnelles</h3>
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom"
                        value={formData.personalInfo.nom}
                        onChange={handleChange}
                        className="border p-2 rounded-lg w-full"
                    />
                    <input
                        type="text"
                        name="prenom"
                        placeholder="Prénom"
                        value={formData.personalInfo.prenom}
                        onChange={handleChange}
                        className="border p-2 rounded-lg w-full"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.personalInfo.description}
                        onChange={handleChange}
                        className="border p-2 rounded-lg w-full"
                    />

                    {/* Education Section */}
                    <h3 className="text-lg font-semibold">Éducation</h3>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="space-y-2 border-b pb-4 mb-4">
                            <input
                                type="text"
                                placeholder="Diplôme"
                                value={edu.diplomes || ""}
                                onChange={(e) =>
                                    handleNestedChange(index, "education", "diplomes", e.target.value)
                                }
                                className="border p-2 rounded-lg w-full"
                            />
                            <input
                                type="text"
                                placeholder="Certification"
                                value={edu.certification || ""}
                                onChange={(e) =>
                                    handleNestedChange(index, "education", "certification", e.target.value)
                                }
                                className="border p-2 rounded-lg w-full"
                            />
                            <div className="flex space-x-4">
                                <input
                                    type="date"
                                    placeholder="Date de début"
                                    value={edu.startDate || ""}
                                    onChange={(e) =>
                                        handleNestedChange(index, "education", "startDate", e.target.value)
                                    }
                                    className="border p-2 rounded-lg w-1/2"
                                />
                                <input
                                    type="date"
                                    placeholder="Date de fin"
                                    value={edu.endDate || ""}
                                    onChange={(e) =>
                                        handleNestedChange(index, "education", "endDate", e.target.value)
                                    }
                                    className="border p-2 rounded-lg w-1/2"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addSection("education")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Ajouter une éducation
                    </button>

                    {/* Experience Section */}
                    <h3 className="text-lg font-semibold">Expérience professionnelle</h3>
                    {formData.experience.map((exp, index) => (
                        <div key={index} className="space-y-2 border-b pb-4 mb-4">
                            <input
                                type="text"
                                placeholder="Poste occupé"
                                value={exp.postes_occupes || ""}
                                onChange={(e) =>
                                    handleNestedChange(index, "experience", "postes_occupes", e.target.value)
                                }
                                className="border p-2 rounded-lg w-full"
                            />
                            <textarea
                                placeholder="Missions"
                                value={exp.missions || ""}
                                onChange={(e) =>
                                    handleNestedChange(index, "experience", "missions", e.target.value)
                                }
                                className="border p-2 rounded-lg w-full"
                            />
                            <input
                                type="text"
                                placeholder="Entreprise"
                                value={exp.entreprises || ""}
                                onChange={(e) =>
                                    handleNestedChange(index, "experience", "entreprises", e.target.value)
                                }
                                className="border p-2 rounded-lg w-full"
                            />
                            <div className="flex space-x-4">
                                <input
                                    type="date"
                                    placeholder="Date de début"
                                    value={exp.startDate || ""}
                                    onChange={(e) =>
                                        handleNestedChange(index, "experience", "startDate", e.target.value)
                                    }
                                    className="border p-2 rounded-lg w-1/2"
                                />
                                <input
                                    type="date"
                                    placeholder="Date de fin"
                                    value={exp.endDate || ""}
                                    onChange={(e) =>
                                        handleNestedChange(index, "experience", "endDate", e.target.value)
                                    }
                                    className="border p-2 rounded-lg w-1/2"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addSection("experience")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Ajouter une expérience
                    </button>

                    {/* Visibility Toggle */}
                    <div className="flex items-center space-x-2 mt-4">
                        <label className="text-sm font-medium text-gray-700">
                            Visibilité :
                        </label>
                        <select
                            value={formData.visibility ? "public" : "private"}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    visibility: e.target.value === "public",
                                }))
                            }
                            className="border rounded-lg p-2"
                        >
                            <option value="public">Public</option>
                            <option value="private">Privé</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
};

// Ajouter les PropTypes pour valider les props
Modal.propTypes = {
    currentCv: PropTypes.shape({
        personalInfo: PropTypes.shape({
            nom: PropTypes.string,
            prenom: PropTypes.string,
            description: PropTypes.string,
        }),
        education: PropTypes.arrayOf(
            PropTypes.shape({
                diplomes: PropTypes.string,
                certification: PropTypes.string,
                startDate: PropTypes.string,
                endDate: PropTypes.string,
            })
        ),
        experience: PropTypes.arrayOf(
            PropTypes.shape({
                postes_occupes: PropTypes.string,
                missions: PropTypes.string,
                entreprises: PropTypes.string,
                startDate: PropTypes.string,
                endDate: PropTypes.string,
            })
        ),
        visibility: PropTypes.bool,
    }),
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Modal;
