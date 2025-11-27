import React, { useState } from 'react';
import { useProducts } from '../contex/ProductContext.jsx'; // Usamos el contexto de productos
import { useAuth } from '../contex/AuthContext.jsx'; // Para ver si el usuario es administrador
import { useCart } from '../contex/CartContext.jsx'; // Para añadir al carrito
import { useToast } from '../contex/ToastContext.jsx'; // Para notificaciones
import { Trash2, ShoppingCart, Search, ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BurguerPage = () => {
    // Consumir datos de la API y Contextos
    const { products, loading, error, deleteProduct } = useProducts();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const toast = useToast();
    const navigate = useNavigate();

    // ESTADOS PARA REQUERIMIENTO #4: BÚSQUEDA Y PAGINACIÓN
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 8; // Mostrar 8 productos por página

    const styles = {
        main: { padding: '2rem', flexGrow: 1, color: 'white', fontFamily: 'sans-serif' },
        header: { textAlign: 'center', marginBottom: '2rem' },
        title: { fontSize: '2.5rem', fontWeight: '800', color: '#F2A6CA', marginBottom: '0.5rem' },
        subtitle: { fontSize: '1.25rem', color: '#9ca3af' },
        searchContainer: { display: 'flex', justifyContent: 'center', marginBottom: '2rem' },
        searchInput: { width: '100%', maxWidth: '400px', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #4b5563', backgroundColor: '#374151', color: 'white', fontSize: '1rem' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' },
        card: { backgroundColor: '#1f2937', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.5)', transition: 'transform 0.2s', color: 'black' },
        cardHover: { transform: 'translateY(-5px)' },
        image: { width: '100%', height: '200px', objectFit: 'cover' },
        body: { padding: '1.5rem', backgroundColor: '#F396C0' },
        productTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' },
        price: { fontSize: '1.75rem', fontWeight: '800', color: '#fefefe', marginBottom: '1rem' },
        actions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' },
        buyButton: { padding: '0.75rem 1.5rem', backgroundColor: '#0856FD', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', transition: 'background-color 0.2s' },
        deleteButton: { background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0.5rem', transition: 'color 0.2s' },
        editButton: { background: 'none', border: 'none', color: '#0856fdff', cursor: 'pointer', padding: '0.5rem', transition: 'color 0.2s', marginRight: '0.5rem' },
        paginationContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem', color: 'white' },
        paginationButton: { padding: '0.5rem 1rem', backgroundColor: '#dc2626', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }
    };

    if (loading) return <div style={{ ...styles.main, textAlign: 'center', fontSize: '2rem', color: '#facc15' }}>Cargando el Menú Rockero... 🤘</div>;
    if (error) return <div style={{ ...styles.main, color: '#dc2626', textAlign: 'center', fontSize: '1.5rem' }}>Error: {error}</div>;

    // LÓGICA DE BÚSQUEDA (Requerimiento #4)
    const filteredProducts = products.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // LÓGICA DE PAGINACIÓN (Requerimiento #4)
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // LÓGICA DE COMPRA (Usando Toastify)
    const handleBuy = (product) => {
        addToCart(product);
        toast.success(`¡"${product.title || 'Producto'}" añadido al carrito!`, 2000);
    };

    // LÓGICA DE BORRADO (Usando Toastify y confirm simulado)
    const handleDelete = (id, title) => {
        toast.confirm(`¿Seguro que quieres eliminar "${title || 'este producto'}"? (Simulación)`,
            () => {
                deleteProduct(id);
                toast.error(`Producto ${title} eliminado.`, 2000);
            }
        );
    };

    return (
        <div style={styles.main}>
            <div style={styles.header}>
                <h1 style={styles.title}>MENÚ ROCK & ROLL</h1>
                <p style={styles.subtitle}>Las mejores hamburguesas para un concierto épico.</p>
            </div>

            {/* BARRA DE BÚSQUEDA (Requerimiento #4) */}
            <div style={styles.searchContainer}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                    <Search size={20} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Busca por nombre o descripción..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Resetear a la primera página al buscar
                        }}
                        style={{ ...styles.searchInput, paddingLeft: '3rem' }}
                    />
                </div>
            </div>

            <div style={styles.grid}>
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <div
                            key={product.id}
                            style={styles.card}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
                            onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.card)}
                        >
                            {/* IMAGEN: Usamos product.imagen según tu MockAPI */}
                            <img
                                src={product.imagen || 'https://placehold.co/400x300/1F2937/fff?text=No+Image'}
                                alt={product.title}
                                style={styles.image}
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/400x300/1F2937/fff?text=Error+Loading+Image'} // Fallback
                            />
                            <div style={styles.body}>
                                {/* NOMBRE: Usamos product.title según tu MockAPI */}
                                <h2 style={styles.productTitle}>{product.title || "Sin Título"}</h2>
                                <p style={{ color: '#555', marginBottom: '1rem' }}>{product.description}</p>
                                <div style={{ ...styles.actions, borderTop: '1px solid #111827', paddingTop: '1rem' }}>
                                    <span style={styles.price}>${parseFloat(product.price).toFixed(2)}</span>

                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        {/* BOTONES DE ADMINISTRACIÓN (Solo visibles si está logueado) */}
                                        {isAuthenticated && (
                                            <>
                                                {/* Botón de Editar */}
                                                <button
                                                    onClick={() => navigate(`/crud/edit/${product.id}`)}
                                                    style={styles.editButton}
                                                    title="Editar Producto (UPDATE)"
                                                >
                                                    <Edit size={20} color="currentColor" />
                                                </button>

                                                {/* Botón de Borrar */}
                                                <button
                                                    onClick={() => handleDelete(product.id, product.title)}
                                                    style={styles.deleteButton}
                                                    title="Eliminar Producto (DELETE)"
                                                >
                                                    <Trash2 size={20} color="currentColor" />
                                                </button>
                                            </>
                                        )}

                                        {/* Botón de Comprar (Añadir al carrito, es público) */}
                                        <button
                                            style={styles.buyButton}
                                            title="Agregar al Carrito"
                                            onClick={() => handleBuy(product)} // Pasamos el producto completo
                                        >
                                            <ShoppingCart size={20} style={{ marginRight: '0.5rem' }} />
                                            Añadir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.5rem', color: '#ccc' }}>
                        No se encontraron productos rockeros. 🎸
                    </div>
                )}
            </div>

            {/* PAGINADOR (Requerimiento #4) */}
            {totalPages > 1 && (
                <div style={styles.paginationContainer}>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ ...styles.paginationButton, backgroundColor: currentPage === 1 ? '#6b7280' : styles.paginationButton.backgroundColor }}
                    >
                        <ChevronLeft size={20} /> Anterior
                    </button>

                    <span style={{ fontSize: '1rem' }}>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ ...styles.paginationButton, backgroundColor: currentPage === totalPages ? '#6b7280' : styles.paginationButton.backgroundColor }}
                    >
                        Siguiente <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default BurguerPage;