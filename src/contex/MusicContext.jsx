import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';


// 1. CLAVE: ELIMINAMOS LOS IMPORTS. EN SU LUGAR, DEFINIMOS LAS RUTAS PÚBLICAS.
// ESTO ASUME QUE HAS MOVIDO LA CARPETA 'assets' A LA CARPETA 'public'.

// Rutas Públicas Absolutas (inician con '/')
const TRACK_URL_1 = '/assets/Sultans Of Swing.mp3';
const TRACK_URL_2 = '/assets/Cotton.mp3';
const TRACK_URL_3 = '/assets/jailhouse rock.mp3';
const TRACK_URL_4 = '/assets/Green River.mp3';
const TRACK_URL_5 = '/assets/Rock Around The Clock.mp3';
// Agrega aquí los demás si los tienes (ej: const TRACK_URL_6 = '/assets/Otro.mp3';)



const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
    
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // LISTA DE TEMAS (USAMOS LAS VARIABLES DE URLS PÚBLICAS)
    const initialTracks = useMemo(() => [
        { title: "Sultans Of Swing", artist: "Dire Straits", fileUrl: TRACK_URL_1 }, 
        { title: "Cotton", artist: "AC/DC", fileUrl: TRACK_URL_2 }, 
        { title: "Jailhouse Rock", artist: "Elvis Presley", fileUrl: TRACK_URL_3 }, 
        { title: "Green river", artist: "Queen", fileUrl: TRACK_URL_4 }, 
        { title: "Rock Around The Clock", artist: "AC/DC", fileUrl: TRACK_URL_5 }, 
        
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
            url: track.fileUrl, // Aquí usamos la URL de cadena de texto
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
                console.error(`Error crítico al cargar el MP3: ${track.fileUrl}. Verifica la ruta en /public/assets/ y el formato.`, e);
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