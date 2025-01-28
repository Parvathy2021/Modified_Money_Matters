import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Page Components
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./pages/profile/Profile";

// Layout Components
import NavHeader from "./Components/navHeader/NavHeader";
import Footer from "./Components/footer/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
