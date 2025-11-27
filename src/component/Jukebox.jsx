
import React from "react";
import { useMusic } from "../contex/MusicContext.jsx"; 
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"; 
// 1. ELIMINAMOS LA IMPORTACIÓN DEL ARCHIVO, YA QUE ESTÁ EN PUBLIC/

const Jukebox = () => {
    
    // Obtener todo lo necesario del Contexto de Música
    const { 
        isPlaying, 
        currentTrack, 
        togglePlay,
        playNext, 
        playPrevious,
        initialTracks
    } = useMusic();

    const trackInfo = currentTrack || { title: "Elige una canción...", artist: "Rockola Inactiva" };
    const trackCount = initialTracks ? initialTracks.length : 0; 

    return (
        <div className="jukebox-container-content">
            {/* 2. CLAVE: Usamos la ruta absoluta desde la raíz de public/ */}
            <img 
                src="public/imagenes/rocola1.JPG" 
                alt="Imagen de Rockola" 
                className="jukebox-image" // Clase para controlar el tamaño en index.css
            />
            
            

            {/* Info de la Canción Actual */}
            

            {/* Controles de Reproducción */}
            <div className="controls-container">
                <button 
                    onClick={playPrevious} 
                    className="control-button"
                    disabled={trackCount === 0}
                    aria-label="Anterior"
                >
                    <SkipBack size={32} />
                </button>
                
                <button 
                    onClick={togglePlay} 
                    className={`play-button ${trackCount === 0 ? 'disabled' : ''}`}
                    disabled={trackCount === 0}
                    aria-label={isPlaying ? "Pausa" : "Reproducir"}
                >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                </button>
                
                <button 
                    onClick={playNext} 
                    className="control-button"
                    disabled={trackCount === 0}
                    aria-label="Siguiente"
                >
                    <SkipForward size={32} />
                </button>
            </div>
        </div>
    );
};

export default Jukebox;