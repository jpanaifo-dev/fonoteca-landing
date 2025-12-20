import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioTrack {
    title: string;
    artist: string;
    url: string;
    image?: string;
    spectrogram?: string;
}

export const PersistentPlayer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [track, setTrack] = useState<AudioTrack | null>(null);
    const [playlist, setPlaylist] = useState<AudioTrack[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Valid ref to manage autoplay intent
    const playOnLoad = useRef(false);

    // Dispatch status updates to sync other players
    const dispatchStatus = (status: 'play' | 'pause' | 'timeupdate' | 'finish', time?: number, duration?: number) => {
        if (!track) return;

        const event = new CustomEvent('audio-status-update', {
            detail: {
                url: track.url,
                status,
                currentTime: time ?? wavesurfer.current?.getCurrentTime() ?? 0,
                duration: duration ?? wavesurfer.current?.getDuration() ?? 0,
                isPlaying: status === 'play' || (status === 'timeupdate' && isPlaying)
            }
        });
        window.dispatchEvent(event);
    };

    useEffect(() => {
        // Listen for custom events to play audio
        const handlePlayAudio = (event: CustomEvent<AudioTrack>) => {
            const newTrack = event.detail;
            if (track?.url === newTrack.url) {
                // If same track, just play
                wavesurfer.current?.play();
            } else {
                playOnLoad.current = true; // User interaction always implies play
                setTrack(newTrack);
            }
        };

        const handlePauseAudio = () => {
            wavesurfer.current?.pause();
        };

        const handleRewindAudio = () => {
            if (wavesurfer.current) {
                wavesurfer.current.skip(-10);
            }
        };

        // Listen for playlist initialization
        const handleSetPlaylist = (event: CustomEvent<{ playlist: AudioTrack[], startAtIndex?: number, autoplay?: boolean }>) => {
            const { playlist: newPlaylist, startAtIndex = 0, autoplay = false } = event.detail;
            setPlaylist(newPlaylist);
            if (newPlaylist.length > 0) {
                const startTrack = newPlaylist[startAtIndex];
                // Only update track if it changes to avoid WaveSurfer re-init loop if dispatched multiple times
                if (track?.url !== startTrack.url) {
                    playOnLoad.current = autoplay;
                    setTrack(startTrack);
                    setCurrentIndex(startAtIndex);
                }
            }
        };

        window.addEventListener('play-audio' as any, handlePlayAudio);
        window.addEventListener('pause-audio' as any, handlePauseAudio);
        window.addEventListener('rewind-audio' as any, handleRewindAudio);
        window.addEventListener('set-playlist' as any, handleSetPlaylist);
        return () => {
            window.removeEventListener('play-audio' as any, handlePlayAudio);
            window.removeEventListener('pause-audio' as any, handlePauseAudio);
            window.removeEventListener('rewind-audio' as any, handleRewindAudio);
            window.removeEventListener('set-playlist' as any, handleSetPlaylist);
        };
    }, [track]);

    // Sync playlist index if track changes via other means (e.g. play-audio event)
    useEffect(() => {
        if (track && playlist.length > 0) {
            const idx = playlist.findIndex(t => t.url === track.url);
            if (idx !== -1) {
                setCurrentIndex(idx);
            }
        }
    }, [track, playlist]);

    // Check for global playlist on mount (Fix for race conditions)
    useEffect(() => {
        const globalPlaylist = (window as any).FONOTECA_PLAYLIST;
        if (globalPlaylist && !track) {
            const { playlist: newPlaylist, startAtIndex = 0, autoplay = false } = globalPlaylist;
            setPlaylist(newPlaylist);
            if (newPlaylist.length > 0) {
                const startTrack = newPlaylist[startAtIndex];
                playOnLoad.current = autoplay;
                setTrack(startTrack);
                setCurrentIndex(startAtIndex);
            }
        }
    }, []);

    useEffect(() => {
        if (track && containerRef.current) {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }

            wavesurfer.current = WaveSurfer.create({
                container: containerRef.current,
                waveColor: track.spectrogram ? 'rgba(75, 85, 99, 0.2)' : '#4B5563',
                progressColor: track.spectrogram ? 'rgba(141, 198, 63, 0.8)' : '#8DC63F',
                cursorColor: '#8DC63F',
                barWidth: 2,
                barGap: 3,
                height: 64, // Slightly larger for better visibility
                normalize: true,
                url: track.url,
                autoplay: false, // Managed manually via playOnLoad
            });

            wavesurfer.current.on('ready', () => {
                if (playOnLoad.current) {
                    wavesurfer.current?.play();
                }
                dispatchStatus(playOnLoad.current ? 'play' : 'pause');
            });

            wavesurfer.current.on('play', () => {
                setIsPlaying(true);
                dispatchStatus('play');
            });

            wavesurfer.current.on('pause', () => {
                setIsPlaying(false);
                dispatchStatus('pause');
            });

            wavesurfer.current.on('finish', () => {
                setIsPlaying(false);
                dispatchStatus('finish');
            });

            wavesurfer.current.on('audioprocess', (time) => {
                setCurrentTime(time);
                dispatchStatus('timeupdate', time);
            });

            return () => {
                wavesurfer.current?.destroy();
            };
        }
    }, [track]);

    const togglePlay = () => {
        if (wavesurfer.current) {
            wavesurfer.current.playPause();
        }
    };

    const rewind = () => {
        if (wavesurfer.current) {
            wavesurfer.current.skip(-10);
        }
    };

    const playNext = () => {
        if (currentIndex < playlist.length - 1) {
            const nextIndex = currentIndex + 1;
            playOnLoad.current = true;
            setCurrentIndex(nextIndex);
            setTrack(playlist[nextIndex]);
        }
    };

    const playPrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            playOnLoad.current = true;
            setCurrentIndex(prevIndex);
            setTrack(playlist[prevIndex]);
        }
    };

    if (!track) return null;

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-800 p-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[100] backdrop-blur-md transition-all duration-300">
                <div className="container mx-auto flex items-center justify-between xl:justify-start gap-4 lg:gap-8">
                    {/* Track Info */}
                    <div className="flex items-center gap-4 w-60 lg:w-80 flex-shrink-0 cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        <div className="relative group/img bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                            {(track.spectrogram || track.image) && (
                                <img
                                    src={track.spectrogram || track.image}
                                    alt={track.title}
                                    className="w-16 h-16 object-cover opacity-90 group-hover/img:opacity-100 transition-opacity bg-blend-multiply dark:bg-blend-screen"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow-md">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h3" />
                                </svg>
                            </div>
                        </div>

                        <div className="overflow-hidden">
                            <h4 className="font-bold text-base text-primary-dark dark:text-white truncate" title={track.title}>{track.title}</h4>
                            <p className="text-sm text-gray-500 truncate" title={track.artist}>{track.artist}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 flex-shrink-0 order-2 xl:order-none">
                        {/* Prev Button */}
                        <button
                            onClick={playPrev}
                            disabled={currentIndex <= 0}
                            className={`p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${currentIndex <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary-dark dark:hover:text-white'}`}
                            title="Anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Rewind Button */}
                        <button
                            onClick={rewind}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:text-primary-dark dark:hover:text-white"
                            title="Rebobinar 10s"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </button>

                        {/* Play/Pause */}
                        <button
                            onClick={togglePlay}
                            className="w-14 h-14 flex items-center justify-center rounded-full bg-accent-green text-white hover:brightness-110 hover:scale-105 transition-all shadow-md"
                        >
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 fill-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 fill-current ml-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>
                            )}
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={playNext}
                            disabled={currentIndex >= playlist.length - 1}
                            className={`p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${currentIndex >= playlist.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary-dark dark:hover:text-white'}`}
                            title="Siguiente"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Waveform */}
                    <div className="flex-1 relative h-14 lg:h-16 flex items-center group min-w-0 order-1 xl:order-none w-full xl:w-auto mt-4 xl:mt-0">
                        {/* Time Indicator - Floating */}
                        <div className="absolute -top-6 left-0 text-xs font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
                        </div>

                        <div className="w-full h-full relative rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                            {track.spectrogram && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none mix-blend-overlay"
                                    style={{ backgroundImage: `url(${track.spectrogram})` }}
                                ></div>
                            )}
                            <div ref={containerRef} className="absolute inset-0"></div>
                        </div>
                    </div>


                </div>
            </div>

            {/* Gallery Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div className="relative max-w-5xl w-full h-auto max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsModalOpen(false)} className="absolute -top-12 right-0 text-white hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col gap-6 w-full items-center overflow-auto max-h-[85vh]">
                            {/* Use a simple list/stack of available images for now, or just the main ones */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full place-items-center">
                                {track.spectrogram && (
                                    <div className="bg-white rounded-xl p-2 w-full max-w-lg">
                                        <h5 className="text-gray-500 text-sm mb-2 text-center">Espectrograma</h5>
                                        <div className="bg-black rounded-lg overflow-hidden">
                                            <img src={track.spectrogram} alt="Spectrogram" className="w-full h-auto object-contain" />
                                        </div>
                                    </div>
                                )}
                                {track.image && (
                                    <div className="bg-white rounded-xl p-2 w-full max-w-lg">
                                        <h5 className="text-gray-500 text-sm mb-2 text-center">Imagen de Referencia</h5>
                                        <img src={track.image} alt={track.title} className="w-full h-auto object-cover rounded-lg" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
