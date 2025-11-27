import React from 'react';
import { Sparkles } from 'lucide-react';

const MenuEspecialPage = () => {
    const styles = {
        main: { padding: '2rem', flexGrow: 1, textAlign: 'center', color: 'white', fontFamily: 'sans-serif' },
        title: { fontSize: '3rem', fontWeight: '800', color: '#facc15', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        subtitle: { fontSize: '1.2rem', color: '#ccc' },
        container: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '2rem' },
        card: { backgroundColor: '#374151', padding: '1.5rem', borderRadius: '0.75rem', width: '300px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' },
        cardTitle: { fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }
    };
    
    return (
        <div style={styles.main}>
            <h1 style={styles.title}><Sparkles size={40} style={{ marginRight: '0.5rem' }} /> Menú Especial de la Semana</h1>
            <p style={styles.subtitle}>¡Ediciones limitadas que solo el Rock Food te puede ofrecer!</p>
            
            <div style={styles.container}>
                {/* Cards de ejemplo */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Doble de Trueno</h2>
                    <p>Hamburguesa con queso azul y cebolla caramelizada. (No disponible en API)</p>
                    <p style={{ color: '#facc15', fontWeight: 'bold', marginTop: '1rem' }}>$15.99</p>
                </div>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Guitarra Frita</h2>
                    <p>Papas fritas con queso cheddar, bacon y jalapeños.</p>
                    <p style={{ color: '#facc15', fontWeight: 'bold', marginTop: '1rem' }}>$8.50</p>
                </div>
            </div>
        </div>
    );
};

export default MenuEspecialPage;