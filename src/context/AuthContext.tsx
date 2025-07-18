import { createContext, useContext, ReactNode } from 'react';
import { getSession } from '../lib/session';

interface AuthContextType {
  logout: () => void;
  checkIsTokenValid: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const logout = () => {

  };

  const checkIsTokenValid = (): boolean => {
    const session = getSession();

    if (!session) return false;

    if (session) {
      const isExpired = Math.floor(Date.now() / 1000) > session.exp!;

      if (isExpired) {
        return false;
      }
    }

    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        checkIsTokenValid
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