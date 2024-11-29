import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
    const [publicCvs, setPublicCvs] = useState([]);
    const [error, setError] = useState(null);

    // Récupérer les CV publics
    useEffect(() => {
        const fetchPublicCvs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3000/api/cv");
                setPublicCvs(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des CV publics :", error);
                setError("Impossible de charger les CV publics. Veuillez réessayer plus tard.");
            }
        };

        fetchPublicCvs();
    }, []);

    return (
        <div className="bg-gray-50">
            {/* Section Hero */}
            <header className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Bienvenue sur CV Manager
                    </h1>
                    <p className="text-lg mb-6">
                        Générez, modifiez et gérez vos CV en toute simplicité.
                    </p>
                    <a
                        href="/register"
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-medium hover:bg-gray-200"
                    >
                        Créer un compte
                    </a>
                </div>
            </header>

            {/* Section Fonctionnalités */}
            <section className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-6">Pourquoi utiliser CV Manager ?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold text-blue-500 mb-4">Créer un CV</h3>
                        <p className="text-gray-600">
                            Utilisez notre éditeur intuitif pour concevoir des CV
                            professionnels rapidement.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold text-blue-500 mb-4">Partager vos CV</h3>
                        <p className="text-gray-600">
                            Rendez vos CV publics pour quils soient accessibles par les recruteurs.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold text-blue-500 mb-4">Modifier à volonté</h3>
                        <p className="text-gray-600">
                            Modifiez vos CV à tout moment avec des informations à jour.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section CV Publics */}
            <section className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-6 text-center">CV publics</h2>
                {error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : publicCvs.length === 0 ? (
                    <p className="text-center text-gray-600">
                        Aucun CV public disponible pour le moment.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {publicCvs.map((cv) => (
                            <div
                                key={cv._id}
                                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-bold text-blue-500">
                                    {cv.personalInfo?.nom || "Nom non spécifié"}{" "}
                                    {cv.personalInfo?.prenom || "Prénom non spécifié"}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {cv.personalInfo?.description || "Aucune description disponible."}
                                </p>
                                <div className="mt-4">
                                    <a
                                        href={`/cv/${cv._id}`}
                                        className="text-blue-500 hover:underline text-sm"
                                    >
                                        Voir le CV
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; {new Date().getFullYear()} CV Manager. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
