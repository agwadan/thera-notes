// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const login = (authToken: string) => {
    setIsAuthenticated(true);
    setToken(authToken);
    // Optionally, store the token in AsyncStorage for persistent login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    // Optionally, remove the token from AsyncStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
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
