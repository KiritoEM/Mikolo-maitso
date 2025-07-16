import React, { createContext, useState } from "react";
import mockUser from "../data/userMock";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [loading, setLoading] = useState(false);
    // const [user, setUser] = useState(mockUser[0]);
  // const [user, setUser] = useState({ ...mockUser[0], profile_picture: null });
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    setLoading(true);
    const foundUser = mockUser.find(
      (u) => u.email === email && u.password === password
    );
    setTimeout(() => {
      if (foundUser) {
        setUser(foundUser);
      } else {
        alert("Identifiants incorrects");
      }
      setLoading(false);
    }, 1000);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
