import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import * as Tone from 'tone';

// 1. CLAVE: IMPORTAR LAS 6 CANCIONES (¡AJUSTA LOS NOMBRES EXACTOS DE TUS ARCHIVOS!)
import track1 from '/assets/sultans of swing.mp3'; // O el nombre que tengas (ej: Sultans Of Swing.mp3)
import track2 from '/assets/cotton.mp3';
import track3 from '/assets/jailhouse rock.mp3';
import track4 from '/assets/green river.mp3'; // Asumo que tienes 3 más
import track5 from '/assets/rock around the clock.mp3';



const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
    
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // LISTA DE TEMAS (USAMOS LAS VARIABLES IMPORTADAS)
    const initialTracks = useMemo(() => [
        { title: "Sultans of Swing", artist: "Dire Straits", fileUrl: track1 }, 
        { title: "cotton", artist: "AC/DC", fileUrl: track2 }, 
        { title: "Jailhouse Rock", artist: "Elvis Presley", fileUrl: track3 }, 
        { title: "green river", artist: "Queen", fileUrl: track4 }, 
        { title: "rock around the clock", artist: "AC/DC", fileUrl: track5 }, 
        
        { title: "Rockola Inactiva", artist: "Rockola Inactiva", fileUrl: null }, // Último tema nulo para el loop
    ], []);
    
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    // Limpieza al desmontar
    useEffect(() => {
        return () => {
            if (currentPlayer) {
                currentPlayer.stop();
                currentPlayer.dispose();
            }
            if (Tone.Transport.state === 'started') {
                 Tone.Transport.stop(); 
            }
        };
    }, [currentPlayer]);

    // Función principal para cargar y reproducir el tema actual
    const loadAndPlayTrack = useCallback(async (track) => {
        if (!track || !track.fileUrl) {
            // Si el tema es nulo (Rockola Inactiva), detenemos todo
            if (currentPlayer) {
                currentPlayer.stop();
                currentPlayer.dispose();
                setCurrentPlayer(null);
            }
            setIsPlaying(false);
            return;
        }

        // 1. Detenemos y eliminamos el reproductor anterior antes de cargar el nuevo
        if (currentPlayer) {
            currentPlayer.stop();
            currentPlayer.dispose();
            setCurrentPlayer(null);
        }

        // 2. Aseguramos que el AudioContext esté activo
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        
        // 3. Creamos un nuevo Player para la nueva canción
        const newPlayer = new Tone.Player({
            url: track.fileUrl,
            loop: true,
            volume: -10,
            onload: () => {
                // 4. Reproducir
                if (Tone.context.state === 'running') {
                    newPlayer.start(0);
                    Tone.Transport.start();
                    setIsPlaying(true);
                }
            },
            onerror: (e) => {
                console.error(`Error crítico al cargar el MP3: ${track.fileUrl}. Verifica la ruta en src/assets/ y el formato.`, e);
                setIsPlaying(false);
            }
        }).toDestination();
        
        setCurrentPlayer(newPlayer);
    }, [currentPlayer]);


    const stopMusic = useCallback(() => {
        if (currentPlayer) {
            // Pausamos el reproductor y el transporte
            currentPlayer.stop();
        }
        Tone.Transport.stop();
        setIsPlaying(false);
    }, [currentPlayer]);

    // Función que se llama desde el clic del usuario (Play/Pause)
    const togglePlay = useCallback(async () => {
        const track = initialTracks[currentTrackIndex];

        if (!isPlaying) {
            // Opción 1: Si ya hay un reproductor cargado (y estaba en pausa), lo reanudamos.
            if (currentPlayer && currentPlayer.buffer.loaded && currentPlayer.state === 'stopped' && track.fileUrl) {
                 await Tone.start();
                 currentPlayer.start(0);
                 Tone.Transport.start();
                 setIsPlaying(true);
            } else {
                // Opción 2: Si es la primera vez o si cambiamos de tema, cargamos la pista.
                loadAndPlayTrack(track);
            }
        } else {
            stopMusic();
        }
    }, [isPlaying, currentPlayer, loadAndPlayTrack, initialTracks, currentTrackIndex, stopMusic]);
    
    // Funciones de navegación (para la Jukebox)
    const playNext = useCallback(() => {
        const nextIndex = (currentTrackIndex + 1) % initialTracks.length;
        setCurrentTrackIndex(nextIndex);
        
        // Cargar y reproducir el siguiente tema
        loadAndPlayTrack(initialTracks[nextIndex]);
    }, [currentTrackIndex, initialTracks, loadAndPlayTrack]);

    const playPrevious = useCallback(() => {
        const prevIndex = (currentTrackIndex - 1 + initialTracks.length) % initialTracks.length;
        setCurrentTrackIndex(prevIndex);

        // Cargar y reproducir el tema anterior
        loadAndPlayTrack(initialTracks[prevIndex]);
    }, [currentTrackIndex, initialTracks, loadAndPlayTrack]);

    const value = useMemo(() => ({
        isPlaying,
        togglePlay,
        stopMusic,
        currentTrack: initialTracks[currentTrackIndex],
        initialTracks,
        playNext,
        playPrevious,
    }), [isPlaying, togglePlay, stopMusic, currentTrackIndex, initialTracks, playNext, playPrevious]);

    return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};