import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.js';
import Hover from 'wavesurfer.js/dist/plugins/hover.js';

interface AudioPlayerProps {
    audioUrl: string;
    title?: string;
    artist?: string;
    description?: string;
    spectrogramImage?: string; // Kept for backward compatibility if pre-rendered is needed
    autoplay?: boolean;
    onFinish?: () => void;
    isModalContainer?: boolean;
    onClose?: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
    audioUrl, 
    title, 
    artist, 
    description, 
    spectrogramImage, 
    autoplay, 
    onFinish,
    isModalContainer,
    onClose,
    onNext,
    onPrev,
    hasNext,
    hasPrev
}) => {
    // Refs for DOM elements
    const waveformRef = useRef<HTMLDivElement>(null);
    const spectrogramRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    
    // WaveSurfer instance
    const wavesurferRef = useRef<WaveSurfer | null>(null);

    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const [isReady, setIsReady] = useState(false);
    const [volume, setVolume] = useState(1);
    const [zoom, setZoom] = useState(1); // Min 1, Max 100

    const [isModalView, setIsModalView] = useState(isModalContainer || false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        setIsModalView(isModalContainer || false);
    }, [isModalContainer]);

    const handleClose = () => {
        if (isModalContainer && onClose) {
            onClose();
        } else {
            setIsModalView(false);
            setIsFullScreen(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 10);
        return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
    };

    useEffect(() => {
        if (!waveformRef.current || !spectrogramRef.current || !timelineRef.current) return;

        // Limpiar instancia previa si existe
        if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
        }

        // Crear instancia de WaveSurfer con Plugins para Análisis Científico
        const ws = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#4a5568',
            progressColor: '#1db954',
            cursorColor: '#ffffff',
            cursorWidth: 2,
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
            height: 60,
            normalize: true,
            minPxPerSec: 50, // Permite zoom granular
            plugins: [
                Spectrogram.create({
                    container: spectrogramRef.current,
                    labels: true,
                    labelsBackground: 'transparent',
                    labelsColor: '#9ca3af',
                    splitChannels: false,
                }),
                Timeline.create({
                    container: timelineRef.current,
                    height: 24,
                    timeInterval: 0.5,
                    primaryLabelInterval: 5,
                    style: {
                        fontSize: '10px',
                        color: '#6b7280',
                    }
                }),
                Hover.create({
                    lineColor: 'rgba(255, 255, 255, 0.5)',
                    lineWidth: 1,
                    labelBackground: 'rgba(0, 0, 0, 0.75)',
                    labelColor: '#fff',
                    labelSize: '11px',
                }),
            ]
        });

        wavesurferRef.current = ws;

        // Cargar audio
        ws.load(audioUrl);

        // Eventos
        ws.on('ready', () => {
            setIsReady(true);
            setDuration(formatTime(ws.getDuration()));
            ws.setVolume(volume);
            if (autoplay) {
                ws.play();
            }
        });

        ws.on('audioprocess', () => {
            setCurrentTime(formatTime(ws.getCurrentTime()));
        });

        ws.on('seeking', () => {
            setCurrentTime(formatTime(ws.getCurrentTime()));
        });

        ws.on('play', () => setIsPlaying(true));
        ws.on('pause', () => setIsPlaying(false));
        ws.on('finish', () => {
            setIsPlaying(false);
            if (onFinish) {
                onFinish();
            }
        });

        return () => {
            ws.destroy();
        };
    }, [audioUrl]);

    // Ocasionalmente WaveSurfer requiere actualizar su layour al cambiar isModalView
    useEffect(() => {
        const ws = wavesurferRef.current;
        if (ws) {
            // Un pequeño retraso permite que la transición CSS termine antes de redibujar
            setTimeout(() => {
                if (waveformRef.current) {
                     window.dispatchEvent(new Event('resize'));
                }
            }, 300);
        }
    }, [isModalView, isFullScreen]);

    // Handle Play/Pause
    const togglePlay = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
        }
    };

    // Handle Zoom
    const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newZoom = Number(e.target.value);
        setZoom(newZoom);
        if (wavesurferRef.current) {
            wavesurferRef.current.zoom(newZoom * 50); // Múltiplo para mejor pxPerSec
        }
    };

    // Handle Volume
    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = Number(e.target.value);
        setVolume(newVol);
        if (wavesurferRef.current) {
            wavesurferRef.current.setVolume(newVol);
        }
    };

    const containerClasses = isModalView 
        ? `fixed z-[200] flex flex-col bg-[#121212] shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all overflow-hidden ${isFullScreen ? 'inset-0 w-full h-full rounded-none' : 'inset-0 w-[95vw] h-[95vh] md:w-[85vw] md:h-[85vh] m-auto rounded-xl border border-gray-800'}`
        : `w-full bg-[#121212] flex flex-col rounded-xl overflow-hidden border border-gray-800 shadow-2xl font-sans relative`;

    return (
        <>
            {isModalView && <div className="fixed inset-0 z-[190] bg-black/95 backdrop-blur-md pointer-events-auto" onClick={handleClose}></div>}
            
            <div className={containerClasses}>
                {/* Cabecera Técnica */}
                <div className="bg-[#1a1a1a] px-4 sm:px-6 py-3 border-b border-gray-800 flex justify-between items-center sm:min-h-[64px] flex-shrink-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                        {/* Controles Navigacion opcionales para Modal */}
                        {(onPrev || onNext) && (
                            <div className="flex items-center flex-shrink-0">
                                <button onClick={onPrev} disabled={!hasPrev} className={`p-1.5 rounded-full transition-colors ${!hasPrev ? 'text-gray-700 cursor-not-allowed opacity-50' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`} title="Anterior">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                                </button>
                                <button onClick={onNext} disabled={!hasNext} className={`p-1.5 rounded-full transition-colors ${!hasNext ? 'text-gray-700 cursor-not-allowed opacity-50' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`} title="Siguiente">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                </button>
                                <div className="w-px h-5 bg-gray-700 mx-2 hidden sm:block"></div>
                            </div>
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-accent-green hidden sm:block flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                        <div className="truncate">
                            <h4 className="text-gray-200 font-bold text-sm tracking-wide truncate">{title || 'Análisis Espectral'}</h4>
                            <p className="text-gray-500 text-xs truncate">{artist}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {!isReady && (
                            <span className="text-accent-green text-xs animate-pulse flex items-center gap-2 mr-2">
                                <svg className="animate-spin h-3 w-3 text-accent-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <span className="hidden sm:inline">Procesando...</span>
                            </span>
                        )}
                        
                        {isModalView ? (
                            <>
                                <button onClick={() => setIsFullScreen(!isFullScreen)} className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-gray-800" title={isFullScreen ? "Reducir" : "Pantalla Completa"}>
                                    {isFullScreen ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25H15m5.25 0v-4.5m0 4.5L15 15" /></svg>
                                    )}
                                </button>
                                <button onClick={handleClose} className="text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors p-1.5 rounded-lg" title="Cerrar">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsModalView(true)} className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-gray-800 flex items-center justify-center" title="Expandir Interfaz Acústica">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25H15m5.25 0v-4.5m0 4.5L15 15" /></svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Ventana de Visualización Gráfica */}
                <div className={`relative w-full bg-black group p-[1px] flex flex-col ${isModalView ? 'flex-1 overflow-hidden' : ''}`}>
                    {/* 1. Timeline Top */}
                    <div ref={timelineRef} className="w-full bg-[#181818] flex-shrink-0" />
                    
                    {/* 2. Spectrogram (Ecolocalización, Frecuencias Altas) */}
                    <div 
                        ref={spectrogramRef} 
                        className={`w-full relative overflow-hidden flex-1`}
                        style={{ minHeight: isModalView ? '150px' : '200px' }}
                    />

                    {/* 3. Waveform Clásico */}
                    <div ref={waveformRef} className="w-full relative bg-[#111111] overflow-hidden border-t border-gray-900 flex-shrink-0" />
                </div>

                {/* Controles del Reproductor (Estilo Consola Profesional) */}
                <div className="bg-[#181818] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800 flex-shrink-0">
                    {/* Play/Pause & Time */}
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                        <button
                            onClick={togglePlay}
                            disabled={!isReady}
                            className="w-12 h-12 flex-shrink-0 bg-accent-green text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-accent-green/10"
                        >
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 ml-1">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                        
                        <div className="font-mono text-sm tracking-wider flex items-center gap-2">
                            <span className="text-accent-green font-medium min-w-[50px]">{currentTime}</span>
                            <span className="text-gray-600">/</span>
                            <span className="text-gray-400 min-w-[50px]">{duration}</span>
                        </div>
                    </div>

                    {/* Herramientas (Zoom & Vol) */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 bg-[#121212] px-4 py-2 rounded-lg border border-gray-800/60">
                        {/* Zoom Control */}
                        <div className="flex items-center gap-2" title="Zoom del Espectrograma">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                            </svg>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                step="0.5"
                                value={zoom}
                                onChange={handleZoom}
                                className="w-20 md:w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-green"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                        </div>

                        <div className="w-px h-6 bg-gray-800 hidden sm:block"></div>

                        {/* Volume Control */}
                        <div className="flex items-center gap-2" title="Volumen">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={volume}
                                onChange={handleVolume}
                                className="w-16 md:w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-green"
                            />
                        </div>
                    </div>
                </div>
                
                {description && !isModalView && (
                    <div className="px-6 py-3 bg-[#111] border-t border-gray-900 text-xs text-gray-500 flex-shrink-0">
                        <span className="font-semibold text-gray-400 mr-2">CONTEXTO:</span>
                        {description}
                    </div>
                )}
            </div>
        </>
    );
};
