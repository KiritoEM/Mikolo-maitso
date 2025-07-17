import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setTempUser: (user: User) => void;
  tempUser: User | null;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tempUser, setTempUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    // Ceci serait remplacé par un appel d'API réel en production
    try {
      // Simulation d'un appel d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulation de connexion réussie
      setUser({
        id: '1',
        username: 'user',
        email,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    // Ceci serait remplacé par un appel d'API réel en production
    try {
      // Simulation d'un appel d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stocker en tant qu'utilisateur temporaire jusqu'à la fin du profil
      setTempUser({
        username,
        email,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    } else if (tempUser) {
      setUser({ ...tempUser, ...userData, id: '1' });
      setTempUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        tempUser,
        setTempUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};