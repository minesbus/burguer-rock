import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contex/AuthContext.jsx'; 

// Componente para proteger las rutas
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth(); 

    const loadingStyle = {
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#111827', // bg-gray-900
        color: '#ef4444', // text-red-500
        fontSize: '1.25rem', // text-xl
        fontWeight: 'bold', 
    };

    // 1. Mostrar estado de carga mientras verifica el token
    if (loading) {
        return <div style={loadingStyle}>🤘 CARGANDO EL ROCK...</div>; 
    }

    // 2. Si el usuario está autenticado, permite el acceso al componente (children)
    if (isAuthenticated) {
        return children;
    }

    // 3. Si no está logueado (y ya terminó de cargar), lo redirige a la página de login (/)
    return <Navigate to="/" replace={true} />;
};

export default PrivateRoute;