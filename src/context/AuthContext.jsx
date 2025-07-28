import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for user data and token in local storage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('cleanstreet_user');
    const storedToken = localStorage.getItem('token'); // Retrieve token
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    // Assuming userData now contains a 'token' field from the backend
    const { token, ...userWithoutToken } = userData;
    setUser(userWithoutToken);
    localStorage.setItem('cleanstreet_user', JSON.stringify(userWithoutToken));
    if (token) {
      localStorage.setItem('token', token); // Store token separately
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cleanstreet_user');
    localStorage.removeItem('token'); // Remove token on logout
  };

  // Simple check for admin role
  const isAdmin = user && user.role === 'ADMIN';

  // Provide user, login, logout, and isAdmin through the context
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 