import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NavHeader.css";

const NavHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const hiddenRoutes = ["/", "/login", "/register", "/forgotpassword"];
  if (!user || hiddenRoutes.includes(location.pathname)) return null;

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8080/logout', {
                credentials: 'include'
            });
            logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    }
  return (
    <div className="bg-black mt-16 border-b border-lightblue">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - App name and welcome message */}
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-offwhite">
            Money Matters
          </span>
          <span className="text-offwhite">
            Welcome, {user.username}
          </span>
        </div>
        
        {/* Right side - Status indicator and logout */}
        <div className="flex items-center gap-4">
          <span className="flex items-center text-offwhite">
            <span className="h-2 w-2 bg-lightgreen rounded-full mr-2"></span>
            Online
          </span>
          <button 
            onClick={handleLogout}
            className="text-offwhite hover:bg-lightblue hover:text-black px-4 py-2 rounded-full transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavHeader;