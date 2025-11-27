import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
// Eliminamos useNavigate de aquí para que solo maneje el estado de autenticación.

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // 1. Usaremos 'isAuthenticated' para ser claros.
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // 2. Estado de carga: CRUCIAL para evitar redirecciones flash al inicio.
    const [loading, setLoading] = useState(true);

    // Efecto para verificar el token al cargar la aplicación.
    useEffect(() => {
        // Simula la verificación de token al cargar la app
        const token = localStorage.getItem('userToken'); // Usamos 'userToken' como en tu versión.
        if (token === 'valid_rock_token') { // Asumimos este es el token que guardaremos.
            setIsAuthenticated(true);
        }
        // Marcar la carga como completada, permitiendo que PrivateRoute funcione.
        setLoading(false);
    }, []);

    // Función de login (simulada)
    const login = useCallback(async (email, password) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña espera para simular red
        
        // Credenciales de prueba
        if (email === 'rock' && password === '1234') {
            const token = 'valid_rock_token';
            localStorage.setItem('userToken', token);
            setIsAuthenticated(true);
            setLoading(false);
            return true;
        } else {
            setLoading(false);
            return false;
        }
    }, []);

    // Función de logout
    const logout = useCallback(() => {
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
        // NO navegar aquí, eso lo hace el componente Header o LoginScreen
    }, []);

    const contextValue = useMemo(() => ({
        isAuthenticated, // Usamos este nombre en toda la app.
        loading,
        login,
        logout,
    }), [isAuthenticated, loading, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};




