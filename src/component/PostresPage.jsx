import React from 'react';
import { Cake, Cookie, Coffee, IceCream, Star } from 'lucide-react';

const PostresPage = () => {
    // Estilos basados en la paleta rockera de tu index.css
    const styles = {
        main: { 
            padding: '2rem', 
            flexGrow: 1, 
            textAlign: 'center', 
            color: 'white', 
            fontFamily: 'sans-serif',
            background: 'transparent', // CLAVE: Hacemos el fondo transparente para ver el tablero
            minHeight: '100vh'
        },
        title: { 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            color: '#F2A6CA', // Rojo Rock
            marginBottom: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            textShadow: '0 0 10px rgba(242, 166, 202, 0.5)' // Sombra neón rosa
        },
        subtitle: { 
            fontSize: '1.4rem', 
            color: '# F2A6CA', // Rosa principal
            marginBottom: '3rem',
            fontWeight: '600'
        },
        container: { 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginTop: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
        },
        card: { 
            backgroundColor: '#f396c0ff ', // Color de tarjeta oscuro
            padding: '1.5rem', // Reducimos un poco el padding
            borderRadius: '1rem', 
            width: '300px', 
            boxShadow: '0 8px 15px rgba(0,0,0,0.6)',
            border: '2px solid #0856FD', // Borde rosa
            transition: 'transform 0.3s',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
        },
        cardHover: {
            transform: 'scale(1.05)',
        },
        cardTitle: { 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#0856FD', // Amarillo para el título
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
            borderBottom: '1px solid #374151',
            paddingBottom: '0.5rem'
        },
        price: {
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#eadbdbff', // Rojo para el precio
            marginTop: '1rem'
        },
        cardImage: {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
        }
    };
    
    // Datos de POSTRES reales (sustituimos las hamburguesas)
    const desserts = [
        { 
            icon: <Cookie size={28} style={{ marginRight: '0.5rem' }} />, 
            title: "The Rolling Brownie", 
            desc: "Brownie con doble de chocolate amargo, nueces y salsa de caramelo salado.", 
            price: 7.50, 
            imageUrl: 'https://i.pinimg.com/1200x/3d/a2/ac/3da2ac9aff4b1b47fb674783745ebaa1.jpg' // URL de internet simulada
        },
        { 
            icon: <IceCream size={28} style={{ marginRight: '0.5rem' }} />, 
            title: "Cherry Bomb Shake", 
            desc: "Malteada espesa de vainilla con cerezas, crema batida y un toque de ron.", 
            price: 9.00, 
            imageUrl: 'https://i.pinimg.com/736x/8f/22/af/8f22af6fb457333ccaabe171d1eebe92.jpg' 
        },
        { 
            icon: <Cake size={28} style={{ marginRight: '0.5rem' }} />, 
            title: "Velvet Cake Encore", 
            desc: "Red Velvet Cake suave con glaseado de queso crema y chispas de cacao.", 
            price: 8.50,
            imageUrl: 'https://i.pinimg.com/1200x/43/48/56/434856e5ebbbf48440e8748c4a4bfe9d.jpg'
        },
        { 
            icon: <Coffee size={28} style={{ marginRight: '0.5rem' }} />, 
            title: "Black Sabbath Coffee", 
            desc: "Café expreso doble con licor de café y crema batida. Solo para rockeros duros.", 
            price: 6.00,
            imageUrl: 'https://i.pinimg.com/736x/75/f7/fb/75f7fb5f9b3037b9d320ec39e4d7220d.jpg'
        },
    ];

    return (
        <div style={styles.main}>
            <h1 style={styles.title}><Star size={50} style={{ marginRight: '1rem' }} /> Postres: ¡El Encore Dulce!</h1>
            <p style={styles.subtitle}>Finaliza tu show con nuestros clásicos caseros.</p>
            
            <div style={styles.container}>
                {desserts.map((dessert, index) => (
                    <div 
                        key={index} 
                        style={styles.card}
                        onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
                        onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.card)}
                    >
                        {/* IMAGEN DE INTERNET */}
                        <img 
                            src={dessert.imageUrl}
                            alt={dessert.title}
                            style={styles.cardImage}
                        />

                        <h2 style={styles.cardTitle}>{dessert.icon} {dessert.title}</h2>
                        <p style={{ color: '#ccc' }}>{dessert.desc}</p>
                        <p style={styles.price}>${dessert.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostresPage;