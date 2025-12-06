import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioPlayerProps {
    audioUrl: string;
    description?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, description }) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    useEffect(() => {
        if (!waveformRef.current) return;

        // Initialize WaveSurfer
        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#4b5563',
            progressColor: '#1db954', // Spotify green
            cursorColor: '#1db954',
            barWidth: 2,
            barGap: 3,
            barRadius: 3,
            height: 80,
            normalize: true,
            backend: 'WebAudio',
        });

        // Load Audio
        wavesurferRef.current.load(audioUrl);

        // Events
        wavesurferRef.current.on('ready', () => {
            const d = wavesurferRef.current?.getDuration() || 0;
            setDuration(formatTime(d));
        });

        wavesurferRef.current.on('audioprocess', () => {
            const c = wavesurferRef.current?.getCurrentTime() || 0;
            setCurrentTime(formatTime(c));
        });

        wavesurferRef.current.on('finish', () => {
            setIsPlaying(false);
        });

        return () => {
            wavesurferRef.current?.destroy();
        };
    }, [audioUrl]);

    const togglePlay = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="bg-primary-dark text-white rounded-3xl p-6 shadow-2xl border border-white/10">
            {description && (
                <div className="mb-6">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Descripción del Audio</h3>
                    <p className="font-light text-gray-200">{description}</p>
                </div>
            )}

            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={togglePlay}
                    className="flex-shrink-0 w-14 h-14 rounded-full bg-accent-green text-primary-dark flex items-center justify-center hover:scale-105 transition-transform"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-1">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                <div className="flex-grow">
                    <div ref={waveformRef} className="w-full cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                </div>
            </div>

            <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>{currentTime}</span>
                <span>{duration}</span>
            </div>
        </div>
    );
};
