import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// 1. IMPORTANTE: Usamos la variable de entorno de Vite.
// Si no está definida en el entorno (Vercel/Netlify), usará el valor por defecto (la URL fija).
const DEFAULT_API_URL = 'https://690fa2d345e65ab24ac46de4.mockapi.io/prductos';
const MOCK_API_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_URL;

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para CONSUMIR la API Mock
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Usamos la constante MOCK_API_URL
            const response = await fetch(MOCK_API_URL); 
            
            if (!response.ok) {
                // Si falla, mostramos qué URL estaba intentando usar
                throw new Error(`Error ${response.status}: Fallo al cargar desde: ${MOCK_API_URL}`);
            }
            
            const data = await response.json();
            setProducts(data); 

        } catch (err) {
            setError(err.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []); // fetchProducts no tiene dependencias que cambien

    // Función para SIMULAR BORRADO
    const deleteProduct = useCallback(async (id) => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
        console.log(`Simulación: Producto con ID ${id} borrado de la lista visible.`);
    }, []);


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const contextValue = useMemo(() => ({
        products,
        loading,
        error,
        fetchProducts,
        deleteProduct,
    }), [products, loading, error, fetchProducts, deleteProduct]);

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};