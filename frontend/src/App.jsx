import "./global.css";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Fixed import
import Homepage from "./pages/Homepage";
import Login from "./pages/Loginpage";
import Profile from "./pages/Profilepage";
import Settings from "./pages/Settingpage";
import Signup from "./pages/Signuppage";
import  useAuthStore  from "./Store/useAuthStore.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./Store/useThemeStore.js";




const App = () => {
  const { authUser, checkAuth,isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if(!authUser && isCheckingAuth){
    return(
     
<div class="flex justify-center items-center h-screen w-screen">
  <div
    class="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
  >
    <div
      class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 backdrop-blur-md"
    ></div>
  </div>
</div>

)
      }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
      <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        
        
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
