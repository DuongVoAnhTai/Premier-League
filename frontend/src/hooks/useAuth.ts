"use client";

import { useState, useEffect } from "react";
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuth = (): AuthState => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      throw new Error("Error during login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    isAuthenticated: !!token,
    token,
    login,
    logout,
  };
};

export default useAuth;