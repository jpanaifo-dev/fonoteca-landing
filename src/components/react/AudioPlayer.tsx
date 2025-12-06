import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioPlayerProps {
    audioUrl: string;
    description?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, description }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    useEffect(() => {
        if (!containerRef.current || !audioRef.current) return;

        // Initialize WaveSurfer with explicit media element
        wavesurferRef.current = WaveSurfer.create({
            container: containerRef.current,
            media: audioRef.current,
            waveColor: '#4b5563',
            progressColor: '#1db954',
            cursorColor: '#1db954',
            barWidth: 2,
            barGap: 3,
            barRadius: 3,
            height: 48,
            normalize: true,
        });

        wavesurferRef.current.load(audioUrl);

        // Events
        wavesurferRef.current.on('ready', () => {
            const d = wavesurferRef.current?.getDuration() || 0;
            setDuration(formatTime(d));
            // Initialize visualizer only after user interaction context is unlocked usually,
            // but we can prep it here.
            setupVisualizer();
        });

        wavesurferRef.current.on('audioprocess', () => {
            const c = wavesurferRef.current?.getCurrentTime() || 0;
            setCurrentTime(formatTime(c));
        });

        // Sync React state with WaveSurfer events
        wavesurferRef.current.on('play', () => setIsPlaying(true));
        wavesurferRef.current.on('pause', () => setIsPlaying(false));
        wavesurferRef.current.on('finish', () => setIsPlaying(false));

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            wavesurferRef.current?.destroy();
        };
    }, [audioUrl]);

    // Handle Visualizer Drawing Loop
    useEffect(() => {
        if (isPlaying) {
            drawVisualizer();
        } else {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        }
    }, [isPlaying]);

    const setupVisualizer = () => {
        if (!audioRef.current || analyserRef.current) return; // Prevent double setup

        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const source = audioContext.createMediaElementSource(audioRef.current);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;

            source.connect(analyser);
            analyser.connect(audioContext.destination);

            analyserRef.current = analyser;
        } catch (e) {
            console.error("Audio Context setup error:", e);
        }
    };

    const drawVisualizer = () => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationFrameRef.current = requestAnimationFrame(draw);

            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * canvas.height; // Scale to canvas height

                // Styling
                const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
                gradient.addColorStop(0, 'rgba(29, 185, 84, 0.8)'); // Spotify green equivalent
                gradient.addColorStop(1, 'rgba(29, 185, 84, 0.1)');

                ctx.fillStyle = gradient;

                // Draw rounded top bar
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x, canvas.height - barHeight, barWidth, barHeight, [4, 4, 0, 0]);
                } else {
                    ctx.rect(x, canvas.height - barHeight, barWidth, barHeight);
                }
                ctx.fill();

                x += barWidth + 2;
            }
        };

        draw();
    };

    const togglePlay = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="bg-primary-dark text-white rounded-3xl p-6 shadow-2xl border border-white/10 relative overflow-hidden group">
            {description && (
                <div className="mb-6 z-10 relative">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Descripción del Audio</h3>
                    <p className="font-light text-gray-200">{description}</p>
                </div>
            )}

            {/* Hidden Audio Element for WaveSurfer Source */}
            <audio ref={audioRef} crossOrigin="anonymous" />

            {/* Visualizer Canvas Overlay */}
            <canvas
                ref={canvasRef}
                width={600}
                height={150}
                className="absolute bottom-0 left-0 w-full h-full opacity-30 pointer-events-none z-0 mix-blend-screen"
            />

            <div className="flex items-center gap-4 mb-4 z-10 relative">
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

                <div className="flex-grow relative">
                    {/* WaveSurfer Container */}
                    <div ref={containerRef} className="w-full cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
                </div>
            </div>

            <div className="flex justify-between text-xs font-mono text-gray-400 z-10 relative px-1">
                <span>{currentTime}</span>
                <span>{duration}</span>
            </div>
        </div>
    );
};
