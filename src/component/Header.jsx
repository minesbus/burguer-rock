import React, { useState } from 'react';
import { LogOut, ShoppingCart, PlusCircle, Menu } from 'lucide-react'; 
import { useNavigate, Link } from 'react-router-dom'; 

import { useAuth } from '../contex/AuthContext.jsx'; // Usando la ruta 'contex'
import { useMusic } from '../contex/MusicContext.jsx'; // Usando la ruta 'contex'

const Header = () => {
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();
    const { stopMusic } = useMusic();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const handleLogout = () => {
        stopMusic();
        logout();
        navigate('/'); // Redirect to the Rockola (root page)
    };

    const handleNavigation = (path) => {
        setIsMenuOpen(false); // Close menu after navigation (for mobile)
        navigate(path);
    };

    // Estilos CSS (inmutables para evitar el cambio de comportamiento)
    const styles = {
        header: {
            position: 'sticky', top: 0, zIndex: 50,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#0856fdff',
            borderBottom: '4px solid #ef38afff',
        },
        container: {
            maxWidth: '1280px', margin: '0 auto', padding: '0 1rem',
            paddingTop: '0.75rem', paddingBottom: '0.75rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        },
        logoContainer: {
            display: 'flex', alignItems: 'center', cursor: 'pointer',
        },
        logoImage: {
            height: '40px', width: '40px', borderRadius: '50%', 
            objectFit: 'cover', border: '2px solid #dc26a5ff', marginRight: '0.5rem', 
        },
        logoText: {
            fontWeight: '800', color: 'white', fontSize: '1.25rem'
        },
        buttonBase: {
            fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem',
            transition: 'all 0.2s', cursor: 'pointer', border: 'none', background: 'none',
            fontSize: '1rem',
        },
        navLink: {
            color: '#ccc', marginRight: '1rem', display: 'flex', alignItems: 'center', textDecoration: 'none',
            padding: '0.5rem 0',
        },
        navLinkHover: { color: '#208feaff' },
        logoutButton: {
            border: '1px solid #f93895ff', color: '#fff',
            backgroundColor: '#dc2626',
            display: 'flex', alignItems: 'center',
            marginLeft: '1rem', 
        },
        logoutButtonHover: { backgroundColor: '#b91c1c', color: '#fff' },
        loginButton: {
            color: '#fff', padding: '0.5rem 1rem',
            backgroundColor: '#208feaff',
            borderRadius: '0.25rem',
            marginLeft: '1rem', 
        },
        loginButtonHover: { backgroundColor: '#1e40af', color: '#fff' },
        menuToggle: {
            background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem',
        },
        mobileMenu: {
            position: 'absolute', top: '56px', left: 0, right: 0, backgroundColor: '#111827',
            borderTop: '1px solid #374151', padding: '1rem', boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
            display: isMenuOpen ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start',
            zIndex: 49,
        },
        navGroup: {
            display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end',
        }
    };

    // Internal component that defines the navigation items
    const NavItems = () => (
        <>
            {/* PUBLIC LINK 1: Burger Catalog (Menu) */}
            <Link 
                to="/burguers" 
                style={styles.navLink} 
                onMouseOver={(e) => e.currentTarget.style.color = styles.navLinkHover.color}
                onMouseOut={(e) => e.currentTarget.style.color = styles.navLink.color}
            >
                Menú
            </Link>
            
            {/* PUBLIC LINK 2: Desserts (THE MISSING ONE) */}
            <Link 
                to="/postres" 
                style={styles.navLink} 
                onMouseOver={(e) => e.currentTarget.style.color = styles.navLinkHover.color}
                onMouseOut={(e) => e.currentTarget.style.color = styles.navLink.color}
            >
                Postres 🎂
            </Link>
            
            {/* PROTECTED LINKS: Only show if isAuthenticated is true */}
            {isAuthenticated && (
                <>
                    {/* PROTECTED ROUTE 1: Cart */}
                    <Link 
                        to="/carrito" 
                        style={styles.navLink} 
                        onMouseOver={(e) => e.currentTarget.style.color = styles.navLinkHover.color}
                        onMouseOut={(e) => e.currentTarget.style.color = styles.navLink.color}
                    >
                        <ShoppingCart size={20} color="currentColor" style={{ marginRight: '0.25rem' }} /> Carrito
                    </Link>
                    
                    {/* PROTECTED ROUTE 2: CRUD (Administration) */}
                    <Link 
                        to="/crud" 
                        style={styles.navLink} 
                        onMouseOver={(e) => e.currentTarget.style.color = styles.navLinkHover.color}
                        onMouseOut={(e) => e.currentTarget.style.color = styles.navLink.color}
                    >
                        <PlusCircle size={20} color="currentColor" style={{ marginRight: '0.25rem' }} /> CRUD
                    </Link>
                </>
            )}
        </>
    );

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                {/* 1. LOGO AND HOME */}
                <div 
                    style={styles.logoContainer}
                    onClick={() => navigate('/')}
                >
                    <img
                        src="/imagenes/LOGUITO.jpg" 
                        alt="Logo de Rock Food"
                        style={styles.logoImage}
                    />
                    <span style={styles.logoText}>Rock Food</span>
                </div>

                {/* 2. NAVIGATION AND BUTTONS CONTAINER */}
                <div style={styles.navGroup}>
                    
                    {/* DESKTOP LINKS (desktop-nav) - Visible on large screens via CSS */}
                    <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
                        <NavItems />
                    </nav>

                    {/* ACTION BUTTON (Login/Logout) */}
                    {isAuthenticated ? (
                        <button 
                            style={{ ...styles.buttonBase, ...styles.logoutButton }}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.logoutButtonHover)}
                            onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.logoutButton)}
                            onClick={handleLogout}
                        >
                            <LogOut size={18} color="currentColor" style={{ marginRight: '0.5rem' }} />
                            Salir
                        </button>
                    ) : (
                        <button 
                            style={{ ...styles.buttonBase, ...styles.loginButton }}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.loginButtonHover)}
                            onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.loginButton)}
                            onClick={() => handleNavigation('/login')} 
                        >
                            Entrar
                        </button>
                    )}
                
                    {/* MOBILE MENU BUTTON (Shows the Menu icon) - Hidden on large screens via CSS */}
                    <button 
                        style={styles.menuToggle}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="mobile-menu-button"
                    >
                        <Menu size={24} />
                    </button>
                </div>

            </div>
            
            {/* Mobile Menu Content (Appears when clicking Menu) */}
            {isMenuOpen && <div style={styles.mobileMenu} className="mobile-nav">
                <NavItems />
                {/* Action button in mobile menu */}
                {isAuthenticated ? (
                    <button 
                        style={{ ...styles.buttonBase, ...styles.logoutButton, marginTop: '1rem', width: '100%' }}
                        onClick={handleLogout}
                    >
                        <LogOut size={18} color="currentColor" style={{ marginRight: '0.5rem' }} />
                        Salir
                    </button>
                ) : (
                    <button 
                        style={{ ...styles.buttonBase, ...styles.loginButton, marginTop: '1rem', width: '100%' }}
                        onClick={() => handleNavigation('/login')}
                    >
                        Entrar
                    </button>
                )}
            </div>}
        </header>
    );
};
export default Header;