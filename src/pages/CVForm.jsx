import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/cvform.css';

function CVForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // Si c'est une modification de CV existant
    const [cvData, setCvData] = useState({
        personalInfo: {
            nom: '',
            prenom: '',
            description: '',
        },
        education: [{ diplomes: '', certification: '', formations: '', startDate: '', endDate: '' }],
        experience: [{ postes_occupes: '', missions: '', entreprises: '', startDate: '', endDate: '' }],
        visibility: true,
    });

    // Si c'est une modification, charger les données du CV existant
    useEffect(() => {
        if (id) {
            const fetchCV = async () => {
                const response = await fetch(`https://node-project-u3nz.onrender.com/api/cv/${id}`);
                const data = await response.json();
                setCvData(data);
            };
            fetchCV();
        }
    }, [id]);

    // Fonction pour gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, key] = name.split('.');
        
        setCvData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [key]: value,
            }
        }));
    };

    // Ajouter une nouvelle entrée dans les sections "education" ou "experience"
    const addField = (section) => {
        setCvData((prevData) => ({
            ...prevData,
            [section]: [...prevData[section], { diplomes: '', certification: '', formations: '', startDate: '', endDate: '' }]
        }));
    };

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assurez-vous que le token JWT est dans le localStorage
        const method = id ? 'PUT' : 'POST';
        const url = id ? `https://node-project-u3nz.onrender.com/api/cv/${id}` : 'https://node-project-u3nz.onrender.com/api/cv';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cvData),
        });

        const result = await response.json();
        if (response.ok) {
            toast.success('CV saved successfully');
            navigate('/dashboard');
        } else {
            toast.error(result.message || 'Error occurred');
        }
    };

    return (
        <div className="cv-form-container">
            <h2>{id ? 'Edit CV' : 'Create CV'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Personal Info */}
                <div>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="personalInfo.nom"
                        value={cvData.personalInfo.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Prénom</label>
                    <input
                        type="text"
                        name="personalInfo.prenom"
                        value={cvData.personalInfo.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="personalInfo.description"
                        value={cvData.personalInfo.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Education */}
                <h3>Education</h3>
                {cvData.education.map((edu, index) => (
                    <div key={index}>
                        <div>
                            <label>Diplôme</label>
                            <input
                                type="text"
                                name={`education.${index}.diplomes`}
                                value={edu.diplomes}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Certification</label>
                            <input
                                type="text"
                                name={`education.${index}.certification`}
                                value={edu.certification}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Formations</label>
                            <input
                                type="text"
                                name={`education.${index}.formations`}
                                value={edu.formations}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <input
                                type="date"
                                name={`education.${index}.startDate`}
                                value={edu.startDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>End Date</label>
                            <input
                                type="date"
                                name={`education.${index}.endDate`}
                                value={edu.endDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => addField('education')}>Add Education</button>

                {/* Experience */}
                <h3>Experience</h3>
                {cvData.experience.map((exp, index) => (
                    <div key={index}>
                        <div>
                            <label>Poste Occupé</label>
                            <input
                                type="text"
                                name={`experience.${index}.postes_occupes`}
                                value={exp.postes_occupes}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Missions</label>
                            <input
                                type="text"
                                name={`experience.${index}.missions`}
                                value={exp.missions}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Entreprise</label>
                            <input
                                type="text"
                                name={`experience.${index}.entreprises`}
                                value={exp.entreprises}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <input
                                type="date"
                                name={`experience.${index}.startDate`}
                                value={exp.startDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>End Date</label>
                            <input
                                type="date"
                                name={`experience.${index}.endDate`}
                                value={exp.endDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => addField('experience')}>Add Experience</button>

                {/* Visibility */}
                <div>
                    <label>Visible to Others</label>
                    <input
                        type="checkbox"
                        name="visibility"
                        checked={cvData.visibility}
                        onChange={(e) => setCvData({ ...cvData, visibility: e.target.checked })}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">{id ? 'Update CV' : 'Create CV'}</button>
            </form>
        </div>
    );
}

export default CVForm;
