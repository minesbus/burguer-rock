import React, { useMemo } from 'react';
import { ShoppingCart, Trash2, XCircle, DollarSign, Package } from 'lucide-react';
import { useCart } from '../contex/CartContext.jsx';
import { useAuth } from '../contex/AuthContext.jsx';
import { useToast } from '../contex/ToastContext.jsx'; // Usar Toastify

const CarritoPage = () => {
    const { cartItems, total, removeFromCart, setCartItems, totalItems } = useCart();
    const { isAuthenticated } = useAuth();
    const toast = useToast();

    // Lógica para simular el pago (Checkout)
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.error("¡El carrito está vacío! Agrega algo antes de pagar.");
            return;
        }

        // Simulación: El pago es un proceso asíncrono
        toast.info("Procesando pago...", 1500);

        setTimeout(() => {
            // Éxito: Mostrar notificación, vaciar carrito y redirigir
            toast.success(`¡Pago de $${total.toFixed(2)} exitoso! Tu pedido va en camino.`, 4000);
            setCartItems([]); // Vaciar el carrito
            // No redirigimos aquí, dejamos que el usuario vea el mensaje y el carrito vacío.
        }, 1500);
    };
    
    // Estilos CSS
    const styles = {
        main: { minHeight: '100vh', padding: '2rem', flexGrow: 1, color: 'white', fontFamily: 'sans-serif' },
        title: { fontSize: '2.5rem', fontWeight: '800', color: '#F2A6CA', marginBottom: '1rem', textAlign: 'center' },
        container: { display: 'flex', gap: '2rem', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' },
        itemsSection: { flex: '2 1 600px', minWidth: '300px' },
        summarySection: { flex: '1 1 300px', backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.5)', height: 'fit-content' },
        card: { display: 'flex', backgroundColor: '#374151', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' },
        image: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem', marginRight: '1rem' },
        itemInfo: { flexGrow: 1 },
        itemTitle: { fontWeight: 'bold', fontSize: '1.1rem', color: 'white' },
        itemPrice: { color: '#facc15', fontWeight: '600', fontSize: '1rem' },
        removeButton: { background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' },
        checkoutButton: { width: '100%', padding: '1rem', backgroundColor: '#db2777', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1.5rem', fontSize: '1.1rem' },
        emptyMessage: { textAlign: 'center', color: '#9ca3af', fontSize: '1.5rem', padding: '3rem' }
    };

    if (cartItems.length === 0) {
        return (
            <div style={styles.main}>
                <h1 style={styles.title}>CARRITO DE COMPRAS</h1>
                <div style={styles.emptyMessage}>
                    <ShoppingCart size={60} style={{ marginBottom: '1rem' }} />
                    <p>¡Tu carrito está esperando tu primer tema rockero!</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.main}>
            <h1 style={styles.title}><ShoppingCart size={40} style={{ marginRight: '0.5rem' }} /> TU PEDIDO ROCKERO</h1>
            
            <div style={styles.container}>
                
                {/* SECCIÓN DE PRODUCTOS */}
                <div style={styles.itemsSection}>
                    {cartItems.map(item => (
                        <div key={item.id} style={styles.card}>
                            <img 
                                src={item.imagen || 'https://placehold.co/80x80/374151/fff?text=IMG'} 
                                alt={item.title} 
                                style={styles.image} 
                            />
                            <div style={styles.itemInfo}>
                                <p style={styles.itemTitle}>{item.title}</p>
                                <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Cantidad: {item.quantity}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>
                                    <XCircle size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RESUMEN DE PAGO */}
                <div style={styles.summarySection}>
                    <h2 style={{ fontSize: '1.5rem', color: 'white', borderBottom: '1px solid #4b5563', paddingBottom: '0.75rem', marginBottom: '1rem' }}>Resumen del Pedido</h2>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#ccc' }}>
                        <p style={{ display: 'flex', alignItems: 'center' }}><Package size={18} style={{ marginRight: '0.5rem' }} /> Artículos ({totalItems})</p>
                        <p>${total.toFixed(2)}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#facc15', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '1px solid #4b5563', paddingTop: '1rem' }}>
                        <p>Total a Pagar</p>
                        <p>${total.toFixed(2)}</p>
                    </div>

                    {/* BOTÓN DE CHECKOUT */}
                    <button onClick={handleCheckout} style={styles.checkoutButton}>
                        <DollarSign size={24} style={{ marginRight: '0.5rem' }} />
                        Simular Pago
                    </button>
                    
                    {/* MENSAJE DE RUTA PROTEGIDA */}
                    {!isAuthenticated && (
                        <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '0.9rem', marginTop: '1rem' }}>
                            *Debes iniciar sesión para procesar el pago.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarritoPage;