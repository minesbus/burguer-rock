import React, { useState } from 'react';
import { useMusic } from "../contex/MusicContext.jsx"; // <-- AJUSTADO A MINÚSCULAS
import { Play, Pause, SkipForward, SkipBack, Music, ChevronDown } from "lucide-react";

// Este componente se renderiza en App.jsx para estar siempre visible.
const FloatingJukebox = () => {
    
    // CLAVE: Siempre mantenemos este estado en false para ocultar el panel por defecto.
    const [isOpen, setIsOpen] = useState(false); 

    const { 
        isPlaying, 
        currentTrack, 
        togglePlay, 
        playNext, 
        playPrevious,
        initialTracks
    } = useMusic();

    const trackInfo = currentTrack || initialTracks[0];
    const trackCount = initialTracks ? initialTracks.length : 0; 
    
    // Estilos CSS para el componente flotante
    const styles = {
        // Botón principal de la consola
        floatButton: {
            position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 100,
            padding: '0.75rem', backgroundColor: '#dc2626', color: 'white', 
            borderRadius: '50%', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
            border: 'none', cursor: 'pointer', transition: 'transform 0.2s',
            transform: 'scale(1)',
        },
        floatButtonHover: { transform: 'scale(1.1)' },

        // Panel de la consola (Lo hacemos invisible y no interactuable si isOpen es falso)
        panel: {
            position: 'fixed', right: '1rem', bottom: '4.5rem', zIndex: 99,
            width: '280px', backgroundColor: '#1f2937', color: 'white', 
            padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s, opacity 0.3s', 
            // CLAVE: ESTO CONTROLA SI SE VE O NO LA CAJA NEGRA
            transform: isOpen ? 'translateY(0)' : 'translateY(1rem)', 
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none', 
        },
       
        controlsContainer: {
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
        },
        controlsButton: {
            padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer',
            color: '#ccc', transition: 'color 0.2s',
        },
        playButton: {
            padding: '0.75rem', backgroundColor: '#facc15', color: '#111827',
            borderRadius: '50%', border: 'none', cursor: 'pointer',
        },
    };

    return (
        <>
            {/* 1. Panel de la Jukebox (El que muestra la info de la canción) */}
            {/* Solo se muestra si el usuario hace clic en el botón flotante */}
            <div style={styles.panel}> 
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#facc15' }}>Reproductor</h3>
                    <button onClick={() => setIsOpen(false)} style={styles.controlsButton}>
                        <ChevronDown size={20} />
                    </button>
                </div>
                
                {/* Info de la Canción Actual */}
                <div style={styles.infoBox}>
                    <p style={{ fontWeight: '600', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{trackInfo.title}</p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{trackInfo.artist}</p>
                    <small style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Canciones cargadas: {trackCount}</small>
                </div>

                {/* Controles */}
                <div style={styles.controlsContainer}>
                    <button 
                        onClick={playPrevious} 
                        style={styles.controlsButton}
                        disabled={trackCount <= 1}
                        onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                        onMouseOut={(e) => e.currentTarget.style.color = styles.controlsButton.color}
                    >
                        <SkipBack size={24} />
                    </button>
                    
                    <button 
                        onClick={togglePlay} 
                        style={styles.playButton}
                        disabled={trackCount === 0}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fde047'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.playButton.backgroundColor}
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                    </button>
                    
                    <button 
                        onClick={playNext} 
                        style={styles.controlsButton}
                        disabled={trackCount <= 1}
                        onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                        onMouseOut={(e) => e.currentTarget.style.color = styles.controlsButton.color}
                    >
                        <SkipForward size={24} />
                    </button>
                </div>
            </div>

            {/* 2. Botón Flotante (Siempre visible y controlando el panel) */}
            <button
                style={styles.floatButton}
                onClick={() => setIsOpen(!isOpen)}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.floatButtonHover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, { transform: 'scale(1)' })}
                aria-label={isOpen ? "Cerrar consola de música" : "Abrir consola de música"}
            >
                <Music size={24} /> 
            </button>
        </>
    );
};

export default FloatingJukebox;