import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // El carrito guardará objetos { id, title, price, imagen, quantity }
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Si el producto ya existe, incrementamos la cantidad
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += 1;
                return updatedItems;
            } else {
                // Si es un producto nuevo, lo agregamos con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Calcular el total de artículos y el precio total
    const total = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cartItems]);

    const totalItems = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    }, [cartItems]);

    const value = useMemo(() => ({
        cartItems,
        total,
        totalItems,
        addToCart,
        removeFromCart,
        setCartItems // Útil para restablecer el carrito al pagar
    }), [cartItems, total, totalItems]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};