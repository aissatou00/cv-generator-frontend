import './App.css';
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login.jsx";
import CustomNavbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import CvDetailsPage from "./pages/CvDetailsPage.jsx";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

function App() {
    return (
        <AuthProvider>
                <CustomNavbar />
                <div className="content">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/cv/:id" element={<CvDetailsPage />} />
                    </Routes>
                </div>
        </AuthProvider>
    );
}

export default App;
