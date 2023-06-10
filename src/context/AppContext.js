import { useState, createContext, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};
