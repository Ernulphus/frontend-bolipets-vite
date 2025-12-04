import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { useAuth0 } from '@auth0/auth0-react';

import './App.css'
import './global.css';
import Home from "./app/Home";
import LoginSignup from "./lib/LoginSignup";
import Navbar from "./app/components/Navbar/Navbar";
import CreatePet from "./app/CreatePet/CreatePet";

function App() {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreatePet" element={<CreatePet />} />
      </Routes>
    </BrowserRouter>
  )
  } else {
    return <LoginSignup />
  }

  
}

export default App
