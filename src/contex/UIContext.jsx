import React, { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const UIContext = createContext();

// Hook personalizado para usar el contexto de la UI
export const useUI = () => useContext(UIContext);

// 2. Componente Provider
export const UIProvider = ({ children }) => {
    // Estado para controlar la visibilidad de la Rockola (Jukebox)
    const [isJukeboxOpen, setIsJukeboxOpen] = useState(false);
    
    // Función para alternar la visibilidad de la Rockola
    const toggleJukebox = () => {
        setIsJukeboxOpen(prev => !prev);
    };

    const value = {
        isJukeboxOpen,
        toggleJukebox
    };

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
};
