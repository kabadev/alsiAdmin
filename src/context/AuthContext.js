import { useState, createContext, useEffect } from "react";
import React from "react";
import axios from "../config/axios";
import axiosPrivate from "../config/axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  axios.defaults.baseURL = "http://localhost:5000/api";
  // axios.defaults.baseURL = "https://apikafaa.cyclic.app/api";

  const config = {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  };

  const checkAuth = async () => {
    try {
      await axios.get("/refresh/auth", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setAuth(true);
    } catch (error) {
      setAuth(false);
      navigate("/login");
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.get("/refresh", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setAccessToken(res.data.accessToken);
    } catch (error) {
      setAuth(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  setInterval(() => {
    refreshToken();
  }, 6000000);

  // setTimeout(() => {
  //   refreshToken;
  // }, 600000);

  useEffect(() => {
    checkAuth();
  }, []);

  // const BASE_URL = "https://apikafaa.cyclic.app/api";
  const BASE_URL = "http://localhost:5000/api";

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        config,
        accessToken,
        setAccessToken,
        BASE_URL,
        checkAuth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
