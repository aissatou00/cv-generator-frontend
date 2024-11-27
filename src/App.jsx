import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import classNames from 'classnames';
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login.jsx";


function App() {

  return (
      <>
          <div className="p-3" >
              <Routes>
               <Route path="/register" element={<Register/>}/>
               <Route path="/login" element={<Login/>}/>
              </Routes>
          </div>


      </>
  )
}

export default App
