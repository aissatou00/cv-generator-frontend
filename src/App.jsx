import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CVDetails from './pages/CVDetails';
//import NotFound from './pages/NotFound';
//import Header from './components/Header';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <Router>
              <Navbar />  {/* La barre de navigation est placée ici */}
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
                    <Route path="/cv/:id" element={<CVDetails />} />
                    
                    
                </Routes>
              </div>  
            </Router>
        </AuthProvider>
    );
}

export default App;
