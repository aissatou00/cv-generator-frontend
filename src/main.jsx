import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./context/AuthContext.jsx";
import CustomNavbar from "./components/Navbar.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
  </StrictMode>,
)
