// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
 
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("user")) {
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);


  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response);
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  };

 
  const register = async (userData) => {
    const response = await authService.register(userData);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
