// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Define the shape of your authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = (token: string) => {
    localStorage.setItem('token', token); // Save token in localStorage (or sessionStorage)
    setIsAuthenticated(true);             // Update the state to reflect login
  };

  const logout = () => {
    localStorage.removeItem('token');      // Remove token from localStorage
    setIsAuthenticated(false);             // Update the state to reflect logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
