import { useState, useEffect } from "react";
import CvEditor from "../components/CvEditor";
//import UserInfo from "../components/UserInfo";
import axios from "axios";
import './../index.css'

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("create");
    //const [userInfo, setUserInfo] = useState(null); // Données utilisateur
    const [currentCv, setCurrentCv] = useState(null); // CV à modifier ou créer

   useEffect(() => {
     {/*     // Charger les infos utilisateur
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3000/api/auth/protected", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUserInfo(response.data.user);
            } catch (error) {
                console.error("Erreur lors de la récupération des infos utilisateur :", error);
            }
        };*/}



        // Charger le CV utilisateur si existant
        const fetchUserCv = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3000/api/cv/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data && response.data.length > 0) {
                    setCurrentCv(response.data[0]); // Supposons qu'un utilisateur n'a qu'un seul CV
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des CV :", error);
            }
        };

       // fetchUserInfo();
        fetchUserCv();
    }, []);

    // Sauvegarder ou mettre à jour le CV
    const saveCv = async (cvData) => {
        try {
            if (currentCv) {
                // Modifier un CV existant
                const response = await axios.put(
                    `http://127.0.0.1:3000/api/cv/${currentCv._id}`,
                    cvData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setCurrentCv(response.data); // Mettre à jour localement
            } else {
                // Créer un nouveau CV
                const response = await axios.post("http://127.0.0.1:3000/api/cv/create", cvData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCurrentCv(response.data); // Mettre à jour localement
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du CV :", error);
        }
    };

    {/*  // Sauvegarder les infos utilisateur
    const saveUserInfo = async (userData) => {
        try {
            const response = await axios.put("http://127.0.0.1:3000/api/auth/user", userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUserInfo(response.data); // Mettre à jour localement
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des infos utilisateur :", error);
        }
    };
*/}
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Menu latéral */}
            <div className="w-1/4 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Menu</h2>
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => setActiveTab("create")}
                            className={`w-full text-left px-4 py-2 rounded-lg ${
                                activeTab === "create" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            Créer un CV
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab("edit")}
                            className={`w-full text-left px-4 py-2 rounded-lg ${
                                activeTab === "edit" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            Modifier mon CV
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab("info")}
                            className={`w-full text-left px-4 py-2 rounded-lg ${
                                activeTab === "info" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            Mes infos
                        </button>
                    </li>
                </ul>
            </div>

            {/* Zone de contenu principale */}
            <div className="w-3/4 p-6">
                {activeTab === "create" && (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Créer un CV</h2>
                        <CvEditor onSave={saveCv} />
                    </div>
                )}

                {activeTab === "edit" && currentCv && (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Modifier mon CV</h2>
                        <CvEditor currentCv={currentCv} onSave={saveCv} />
                    </div>
                )}

                {/*   {activeTab === "info" && userInfo && (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mes informations</h2>
                        <UserInfo user={userInfo} onSave={saveUserInfo} />
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default DashboardPage;
