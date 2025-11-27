import React, { useState } from 'react';
import { Loader2, Volume2 } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

// Rutas corregidas (asumimos 'contex' sin 't' si tu carpeta es así)
import { useAuth } from '../contex/AuthContext.jsx'; 

const LoginScreen = () => { 
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Por favor, ingresa tu correo y contraseña.');
            return;
        }

        setIsLoading(true);
        try {
            const success = await login(email, password); 
            
            if (success) {
                // REDIRECCIÓN TRAS LOGIN: Navegamos al carrito (ruta protegida)
                navigate('/carrito'); 
            } else {
                setError('Credenciales incorrectas (Usa: rock / 1234).');
            }
            
        } catch (err) {
            setError('Fallo el inicio de sesión.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        // Usamos el main-login-container para centrar el formulario en la página /login
        <main className="main-login-container">
            
            {/* TARJETA DE LOGIN SOLA */}
            <div className="login-card" style={{ maxWidth: '400px' }}> {/* Estilo inline para reducir el ancho */}
                <div> 
                    <div className="login-logo-container">
                        <Loader2 size={48} color="#F2A6CA" className="animate-spin-slow" />
                    </div>
                    <h1 className="app-title">Acceso de Administración</h1>
                    <p className="app-subtitle">
                        Inicia sesión para acceder al carrito y CRUD.
                    </p>

                    <form onSubmit={handleLogin} className="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        
                        <div>
                            <label htmlFor="email" className="input-label">Usuario/Email</label>
                            <input
                                type="text" 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="rock" 
                                className="input-field"
                                required
                            />
                        </div>

                        
                        <div>
                            <label htmlFor="password" className="input-label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="1234" 
                                className="input-field"
                                required
                            />
                        </div>

                        
                        {error && (
                            <div className="error-box">
                                {error}
                            </div>
                        )}

                        
                        <button
                            type="submit"
                            className={`login-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                            style={{ position: 'relative', overflow: 'hidden' }}
                        >
                            {isLoading ? (
                                <div className="button-content-loading">
                                    <Loader2 size={20} color="#fff" className="animate-spin" />
                                    Accediendo...
                                </div>
                            ) : 'Iniciar Sesión'}
                        </button>
                    </form>
                </div>

                {/* Secciones de Información Adicional */}
                <div className="info-sections-container">
                    <InfoSection icon={<Volume2 size={20} color="#f472b6" />} title="Mejor Audio" description="La calidad de sonido para tu experiencia." />
                </div>
            </div>
        </main>
    );
};

// Componente auxiliar InfoSection (debe estar definido en el archivo)
const InfoSection = ({ icon, title, description }) => (
    <div className="info-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div className="info-icon-wrapper" style={{ flexShrink: 0, marginTop: '4px' }}>{icon}</div>
        <div>
            <h3 className="info-title" style={{ fontSize: '1rem', fontWeight: '600', color: '#fff' }}>{title}</h3>
            <p className="info-description" style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{description}</p>
        </div>
    </div>
);

export default LoginScreen;