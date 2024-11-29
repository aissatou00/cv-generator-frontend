
import './App.css'
import {Route, Router, Routes} from "react-router-dom";
import Register from "./pages/Register.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login.jsx";
import CustomNavbar from "./components/Navbar.jsx";


function App() {
    return (
        <div className="container">
            <div className="navbar">
                <CustomNavbar />
            </div>

            <div className="content">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

