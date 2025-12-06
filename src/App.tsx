import { BrowserRouter, Routes, Route } from "react-router";
import { useAuth0 } from '@auth0/auth0-react';

import './App.css'
import './global.css';
import Home from "./app/Home";
import LoginSignup from "./lib/LoginSignup";
import Navbar from "./app/components/Navbar/Navbar";
import CreatePet from "./app/CreatePet/CreatePet";
import Pets from "./app/Pets/Pets";

function App() {
  const { isAuthenticated, error } = useAuth0();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (true || isAuthenticated) {
    return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pets" element={<Pets />} />
        <Route path="/CreatePet" element={<CreatePet />} />
      </Routes>
    </BrowserRouter>
  )
  } else {
    return <LoginSignup />
  }

  
}

export default App
