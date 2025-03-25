import "./global.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbars from "./components/Navbars"; // Fixed import
import Homepage from "./pages/Homepage";
import Login from "./pages/Loginpage";
import Profile from "./pages/Profilepage";
import Settings from "./pages/Settingpage";
import Signup from "./pages/Signuppage";

const App = () => {
  return (
    <>
      <button className="btn">Default</button>
      <Navbars />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} /> {/* Lowercased for consistency */}
      </Routes>
      </>
    
  );
};

export default App;
