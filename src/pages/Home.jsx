// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

function Home() {
    const [cvs, setCVs] = useState([]);

    useEffect(() => {
        const fetchCVs = async () => {
            const response = await fetch('https://node-project-u3nz.onrender.com/api/cv');
            const data = await response.json();
            setCVs(data);
        };

        fetchCVs();
    }, []);

    return (
        <div>
            <h1>List of CVs</h1>
            <ul>
                {cvs.map((cv) => (
                    <li key={cv._id}>
                        <Link to={`/cv/${cv._id}`}>
                            {cv.username} 
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
