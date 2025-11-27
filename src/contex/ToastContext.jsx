import React, { createContext, useContext, useState, useMemo } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

// Componente visual simple para simular una notificación Toastify
const Toast = ({ type, message, onClose }) => {
    const style = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
        backgroundColor: type === 'success' ? '#047857' : (type === 'error' ? '#dc2626' : '#facc15'),
        transition: 'opacity 0.3s ease-in-out',
    };

    return (
        <div style={style} onClick={onClose}>
            {message}
        </div>
    );
};

// Proveedor de Contexto (ToastProvider)
export const ToastProvider = ({ children }) => {
    const [toastState, setToastState] = useState(null);

    const showToast = (type, message, duration = 3000) => {
        setToastState({ type, message });

        setTimeout(() => {
            setToastState(null);
        }, duration);
    };

    const toast = useMemo(() => ({
        success: (message, duration) => showToast('success', message, duration),
        error: (message, duration) => showToast('error', message, duration),
        info: (message, duration) => showToast('info', message, duration),
        // Función para simular el confirm que reemplazará window.confirm()
        confirm: (message, onConfirm, onCancel = () => {}) => {
            if (window.confirm(message)) { // Usamos window.confirm para la simulación
                onConfirm();
            } else {
                onCancel();
            }
        },
    }), []);

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {toastState && <Toast 
                type={toastState.type} 
                message={toastState.message} 
                onClose={() => setToastState(null)} 
            />}
        </ToastContext.Provider>
    );
};