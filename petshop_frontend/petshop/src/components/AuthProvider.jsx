import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    return username ? { username, role } : null;
  });

  const login = (id, username, role) => {
    setUser({ username, role });
    localStorage.setItem('id', id);         // Store the user's ID
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
