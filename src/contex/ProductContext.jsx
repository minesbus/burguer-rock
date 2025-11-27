import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// CLAVE: ESTA URL DEBE SER REEMPLAZADA POR LA URL DE TU API MOCK REAL
const MOCK_API_URL = 'https://690fa2d345e65ab24ac46de4.mockapi.io/prductos';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

// ASEGÚRATE DE QUE LA EXPORTACIÓN SEA CORRECTA
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para CONSUMIR la API Mock
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(MOCK_API_URL);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: Fallo al cargar la API de productos.`);
            }
            const data = await response.json();
            
            setProducts(data); 

        } catch (err) {
            setError(err.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

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