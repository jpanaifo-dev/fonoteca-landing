import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioPlayerProps {
    audioUrl: string;
    title?: string;
    artist?: string;
    description?: string;
    spectrogramImage?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, artist, description, spectrogramImage }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    // Sync with global PersistentPlayer
    useEffect(() => {
        const handleAudioStatus = (event: CustomEvent) => {
            const { url, status, currentTime, isPlaying: globalIsPlaying } = event.detail;

            // Only sync if this player's URL matches the global player's URL
            if (url === audioUrl) {
                if (status === 'play' || status === 'timeupdate') {
                    setIsPlaying(globalIsPlaying);

                    // Sync cursor position
                    if (wavesurferRef.current) {
                        // Avoid setting time if it's drift is minimal to prevent jitter
                        // But precise sync is needed.
                        const current = wavesurferRef.current.getCurrentTime();
                        if (Math.abs(current - currentTime) > 0.1) {
                            wavesurferRef.current.setTime(currentTime);
                        }
                    }

                    setCurrentTime(formatTime(currentTime));
                } else if (status === 'pause' || status === 'finish') {
                    setIsPlaying(false);
                }
            } else {
                // If another track started playing, stop this one
                if (isPlaying) setIsPlaying(false);
            }
        };

        window.addEventListener('audio-status-update' as any, handleAudioStatus);
        return () => window.removeEventListener('audio-status-update' as any, handleAudioStatus);
    }, [audioUrl, isPlaying]);

    useEffect(() => {
        if (!containerRef.current || !audioRef.current) return;

        // Initialize WaveSurfer
        wavesurferRef.current = WaveSurfer.create({
            container: containerRef.current,
            // We use MediaElement for loading, but we won't play it directly if syncing
            // Actually, for visualization we might need it, but to prevent double audio, we won't strictly bind it to play
            // unless we want local visualization ONLY.
            // Since we want to control PersistentPlayer, we just load for the waveform rendering.
            height: 48,
            waveColor: spectrogramImage ? 'rgba(255, 255, 255, 0.2)' : '#4b5563',
            progressColor: spectrogramImage ? 'rgba(29, 185, 84, 0.8)' : '#1db954',
            cursorColor: '#1db954',
            barWidth: 2,
            barGap: 3,
            barRadius: 3,
            normalize: true,
            interact: true, // Allow user to click timeline
        });

        // Load audio to generate waveform
        wavesurferRef.current.load(audioUrl);

        wavesurferRef.current.on('ready', () => {
            const d = wavesurferRef.current?.getDuration() || 0;
            setDuration(formatTime(d));
        });

        // seek interaction
        wavesurferRef.current.on('interaction', (newTime) => {
            // If user scrubs locally, we should tell global player to seek?
            // Not implemented in global player yet (seeking via event).
            // For now, this just updates local view.
            // Ideally we dispatch a 'seek' event.
        });

        return () => {
            wavesurferRef.current?.destroy();
        };
    }, [audioUrl]);

    // Handle Play/Pause
    const togglePlay = () => {
        if (isPlaying) {
            const event = new CustomEvent('pause-audio');
            window.dispatchEvent(event);
        } else {
            const event = new CustomEvent('play-audio', {
                detail: {
                    title: title || 'Unknown Title',
                    artist: artist || 'Unknown Artist',
                    url: audioUrl,
                    image: spectrogramImage || '/images/default-audio.png',
                    spectrogram: spectrogramImage
                }
            });
            window.dispatchEvent(event);
        }
    };

    const rewind = () => {
        const event = new CustomEvent('rewind-audio');
        window.dispatchEvent(event);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const isDriveFile = audioUrl.includes('docs.google.com') || audioUrl.includes('drive.google.com');
    let drivePreviewUrl = '';
    if (isDriveFile) {
        const idMatch = audioUrl.match(/id=([a-zA-Z0-9_-]+)/) || audioUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (idMatch && idMatch[1]) {
            drivePreviewUrl = `https://drive.google.com/file/d/${idMatch[1]}/preview`;
        }
    }

    return (
        <div className="bg-primary-dark text-white rounded-3xl p-6 shadow-2xl border border-white/10 relative overflow-hidden group">
            {description && (
                <div className="mb-6 z-10 relative">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Descripción del Audio</h3>
                    <p className="font-light text-gray-200">{description}</p>
                </div>
            )}

            {/* Hidden Audio Element for WaveSurfer Source - kept for potential visualizer reuse later, though visualizer logic removed to simplify sync */}
            <audio ref={audioRef} crossOrigin="anonymous" src={audioUrl} />

            <div className="flex items-center gap-4 mb-4 z-10 relative">
                {/* Rewind Button */}
                <button
                    onClick={rewind}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                    title="Rebobinar 10s"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </button>

                <button
                    onClick={togglePlay}
                    className="flex-shrink-0 w-14 h-14 rounded-full bg-accent-green text-primary-dark flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-accent-green/20"
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

                <div className="flex-grow relative h-12">
                    {/* Spectrogram Background */}
                    {spectrogramImage && (
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60 rounded-lg pointer-events-none"
                            style={{ backgroundImage: `url(${spectrogramImage})` }}
                        ></div>
                    )}

                    {/* WaveSurfer Container */}
                    <div ref={containerRef} className="w-full h-full cursor-pointer relative z-10" />
                </div>
            </div>

            <div className="flex justify-between text-xs font-mono text-gray-400 z-10 relative px-1 mt-2">
                <span>{currentTime}</span>
                <span>{duration}</span>
            </div>

            {/* Spectrogram Expand Button */}
            {spectrogramImage && (
                <button
                    onClick={() => window.open(spectrogramImage, '_blank')}
                    className="absolute top-4 right-4 text-xs bg-black/40 hover:bg-black/60 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-all z-20 flex items-center gap-2"
                    title="Ver espectrograma en tamaño completo"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                    Ampliar Espectrograma
                </button>
            )}

            {/* Iframe Fallback for Testing / Curiosity */}
            {drivePreviewUrl && (
                <div className="mt-6 pt-4 border-t border-white/10 z-10 relative">
                    <p className="text-gray-400 text-xs mb-2">Visor Alternativo (Google Drive Iframe):</p>
                    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/5 h-[80px]">
                        <iframe 
                            src={drivePreviewUrl}
                            width="100%" 
                            height="100%"
                            className="border-0"
                            allow="autoplay"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
