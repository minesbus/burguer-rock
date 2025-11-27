import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importaciones de Contextos (Proveedores)
import { AuthProvider } from './contex/AuthContext.jsx'; 
import { MusicProvider } from './contex/MusicContext.jsx'; 
import { UIProvider } from './contex/UIContext.jsx'; 
import { ProductProvider } from './contex/ProductContext.jsx'; 
import { CartProvider } from './contex/CartContext.jsx'; 
import { ToastProvider } from './contex/ToastContext.jsx'; // Toastify

// Importaciones de Vistas y Componentes
import BurguerPage from './component/BurguerPage.jsx'; 
import RockolaPage from './component/RockolaPage.jsx'; 
import LoginScreen from './component/LoginScreen.jsx'; // Nota: Usamos el casing que tienes (loginScreen)
import PrivateRoute from './component/PrivateRoute.jsx'; 
import Header from './component/Header.jsx'; 
import Footer from './component/Footer.jsx'; 
import CrudPage from './component/CrudPage.jsx'; // Nota: Usamos el casing que tienes (crudpage)
import FloatingJukebox from './component/FloatingJukebox.jsx';
import CarritoPage from './component/CarritoPage.jsx'; 
import PostresPage from './component/PostresPage.jsx'; // Usaremos esta
import MenuEspecialPage from './component/MenuEspecialPage.jsx'; // Lo mantenemos por si lo usas en otra ruta

// Componente para la página de error 404 (si es necesario)
const NotFound = () => (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>
        🤘 404 - Ruta Rockera No Encontrada 🤘
    </div>
);


const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <MusicProvider>
                    <UIProvider>
                        <ProductProvider> 
                            <CartProvider>
                                <ToastProvider> 
                                    
                                    <div className="app-container">
                                        
                                        <Header /> 

                                        <div className="app-content-body">
                                            <Routes>
                                                
                                                {/* 1. RUTA RAÍZ (PÚBLICA): La Rockola */}
                                                <Route path="/" element={<RockolaPage />} />
                                                
                                                {/* 2. CATÁLOGO (PÚBLICO): El menú de hamburguesas */}
                                                <Route path="/burguers" element={<BurguerPage />} />
                                                
                                                {/* 3. POSTRES (PÚBLICO): CORRECCIÓN: Apuntamos a PostresPage.jsx */}
                                                <Route path="/postres" element={<PostresPage />} /> 

                                                {/* 4. MENÚ ESPECIAL (PÚBLICO): Mantenemos la ruta para el archivo existente */}
                                                <Route path="/menu-especial" element={<MenuEspecialPage />} />

                                                {/* 5. LOGIN (PÚBLICO): Formulario de acceso */}
                                                <Route path="/login" element={<LoginScreen />} />
                                                
                                                {/* 6. RUTA PROTEGIDA: Carrito (Pagar) */}
                                                <Route 
                                                    path="/carrito" 
                                                    element={<PrivateRoute><CarritoPage /></PrivateRoute>} 
                                                />

                                                {/* 7. RUTA PROTEGIDA: CRUD (Administración) */}
                                                <Route 
                                                    path="/crud" 
                                                    element={<PrivateRoute><CrudPage /></PrivateRoute>} 
                                                />
                                                <Route 
                                                    path="/crud/edit/:id" 
                                                    element={<PrivateRoute><CrudPage /></PrivateRoute>} 
                                                />
                                                
                                                {/* 8. Ruta 404/Fallback */}
                                                <Route path="*" element={<NotFound />} />
                                                
                                            </Routes>
                                        </div>
                                        
                                        <Footer /> 
                                    </div>
                                    
                                    <FloatingJukebox />

                                </ToastProvider>
                            </CartProvider>
                        </ProductProvider>
                    </UIProvider>
                </MusicProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;