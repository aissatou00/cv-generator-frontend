import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../styles/login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5000/api/auth/login", formData, {
                headers: { "Content-Type": "application/json" },
            });

            const { token } = response.data;

            if (token) {
               
                localStorage.setItem("token", token);

                
                toast.success("Connexion réussie !");
                navigate("/dashboard");
            } else {
                throw new Error("Erreur lors de la connexion.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Échec de la connexion.");
            toast.error(error || "Échec de la connexion.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
                >
                    Login
                </button>
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
