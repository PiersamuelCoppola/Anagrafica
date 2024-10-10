import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    // Se l'utente è autenticato, renderizza il componente figlio
    // altrimenti, reindirizza alla pagina di login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
