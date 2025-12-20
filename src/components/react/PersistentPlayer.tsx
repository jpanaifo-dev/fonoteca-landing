import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioTrack {
    title: string;
    artist: string;
    url: string;
    image?: string;
}

export const PersistentPlayer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [track, setTrack] = useState<AudioTrack | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        // Listen for custom events to play audio
        const handlePlayAudio = (event: CustomEvent<AudioTrack>) => {
            const newTrack = event.detail;
            setTrack(newTrack);
        };

        window.addEventListener('play-audio' as any, handlePlayAudio);
        return () => window.removeEventListener('play-audio' as any, handlePlayAudio);
    }, []);

    useEffect(() => {
        if (track && containerRef.current) {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }

            wavesurfer.current = WaveSurfer.create({
                container: containerRef.current,
                waveColor: '#4B5563',
                progressColor: '#8DC63F',
                cursorColor: '#8DC63F',
                barWidth: 2,
                barGap: 3,
                height: 40,
                normalize: true,
                url: track.url,
            });

            wavesurfer.current.on('ready', () => {
                wavesurfer.current?.play();
                setIsPlaying(true);
            });

            wavesurfer.current.on('finish', () => {
                setIsPlaying(false);
            });

            wavesurfer.current.on('click', () => {
                wavesurfer.current?.play();
                setIsPlaying(true);
            });

            return () => {
                wavesurfer.current?.destroy();
            };
        }
    }, [track]);

    const togglePlay = () => {
        if (wavesurfer.current) {
            wavesurfer.current.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    if (!track) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-2xl z-[100] transition-all duration-300">
            <div className="container mx-auto flex items-center gap-6">
                {/* Track Info */}
                <div className="flex items-center gap-4 min-w-[200px] max-w-[300px]">
                    {track.image && (
                        <img src={track.image} alt={track.title} className="w-12 h-12 rounded-lg object-cover" />
                    )}

                    <div className="overflow-hidden">
                        <h4 className="font-bold text-primary-dark dark:text-white truncate">{track.title}</h4>
                        <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                    </div>
                </div>

                {/* Controls */}
                <button
                    onClick={togglePlay}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-green text-white hover:brightness-110 transition-all flex-shrink-0"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-current">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-current ml-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                    )}
                </button>

                {/* Waveform */}
                <div className="flex-1" ref={containerRef}></div>

                {/* Close/Minimize (Optional, for now just hidden if no track) */}
                <button onClick={() => setTrack(null)} className="text-gray-400 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
