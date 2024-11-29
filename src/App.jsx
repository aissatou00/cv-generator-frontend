import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CVDetails from './pages/CVDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CVForm from './pages/CVForm';

function App() {
    return (
        <AuthProvider>
            <Router>
                {/* ToastContainer placé globalement */}
                <ToastContainer 
                    position="top-right" 
                    autoClose={5000} 
                    hideProgressBar={false} 
                    newestOnTop={false} 
                    closeOnClick 
                    rtl={false} 
                    pauseOnFocusLoss 
                    draggable 
                    pauseOnHover 
                    theme="light"
                />
                
                {/* Navbar et contenu de l'application */}
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/create-cv" element={<CVForm />} />
                        <Route path="/edit-cv" element={<CVForm />} />
                        <Route path="/cv/:id" element={<CVDetails />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
