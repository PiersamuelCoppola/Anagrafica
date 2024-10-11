import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        isAuthenticated,
        setIsAuthenticated,
    };

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
