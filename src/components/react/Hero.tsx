import React, { useState, useEffect } from 'react';
import { type translations } from '../../i18n/data';

interface HeroProps {
    content: typeof translations.es.hero;
    lang: string;
}

export const Hero: React.FC<HeroProps> = ({ content, lang }) => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % content.titles_animate.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [content.titles_animate.length]);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                    alt="Forest Background"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/logo-mini.webp';
                    }}
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#04070a]"></div>
            </div>

            {/* Content centered */}
            <div className="relative z-10 container mx-auto px-6 text-center mt-[-40px]">
                <div className="max-w-9xl mx-auto flex flex-col items-center">
                    <div className="min-h-[160px] md:min-h-[120px] mb-4 flex items-center justify-center">
                        <h1
                            key={currentTitleIndex}
                            className="text-4xl md:text-6xl lg:text-[112px] font-light text-white tracking-wide animate-fade-up leading-none flex flex-col gap-1"
                        >
                            {content.titles_animate[currentTitleIndex].split('|').map((part, i) => (
                                <span key={i} className="block mt-1 font-extralight tracking-tight">
                                    {part.trim()}
                                </span>
                            ))}
                        </h1>
                    </div>

                    <p className="text-base md:text-xl text-gray-300/90 mb-8 max-w-2xl font-light animate-fade-in delay-200 mt-2 px-4">
                        {content.description}
                    </p>

                    <a
                        href={`/${lang}/species`}
                        className="flex flex-col items-center gap-8 animate-fade-in delay-300 group mt-10 md:mt-12"
                    >
                        <div className="flex items-center gap-8 md:gap-12">
                            {/* Left Spectrogram */}
                            <div className="flex items-end gap-2 md:gap-3 h-20 md:h-24 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-1"></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-3"></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-2" style={{animationDelay: '0.5s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-1" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-2"></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-3" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-2" style={{animationDelay: '0.4s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-1" style={{animationDelay: '0.3s'}}></div>
                            </div>
                            
                            {/* Play Button */}
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent-green/20 border-2 border-accent-green/50 backdrop-blur-md flex items-center justify-center group-hover:bg-accent-green group-hover:scale-110 transition-all duration-500 shadow-[0_0_50px_rgba(29,185,84,0.5)]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 md:w-20 md:h-20 text-white ml-2 md:ml-4">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                            </div>

                            {/* Right Spectrogram */}
                            <div className="flex items-end gap-2 md:gap-3 h-20 md:h-24 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-1" style={{animationDelay: '0.3s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-2" style={{animationDelay: '0.4s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-3" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-2"></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-1" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-2" style={{animationDelay: '0.5s'}}></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-3"></div>
                                <div className="w-2 md:w-3 h-full bg-accent-green rounded-full animate-spectro-1"></div>
                            </div>
                        </div>
                        <span className="text-xl md:text-2xl mt-4 border-b-2 border-white/0 group-hover:border-white/50 pb-1 font-bold text-white/80 group-hover:text-white transition-colors tracking-[0.25em] uppercase">
                            {content.cta}
                        </span>
                    </a>
                </div>
            </div>

            {/* Aesthetic Mouse Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-1 backdrop-blur-sm">
                    <div className="w-1 h-2 bg-accent-green rounded-full animate-scroll-dot"></div>
                </div>
            </div>

            <style>{`
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scroll-dot {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(12px); opacity: 0; }
                }
                @keyframes spectro {
                    0%, 100% { transform: scaleY(0.3); }
                    50% { transform: scaleY(1); }
                }
                .animate-fade-up { animation: fade-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
                .animate-scroll-dot { animation: scroll-dot 1.5s ease-in-out infinite; }
                .animate-spectro-1 { animation: spectro 1.2s ease-in-out infinite; transform-origin: bottom; }
                .animate-spectro-2 { animation: spectro 0.9s ease-in-out infinite 0.2s; transform-origin: bottom; }
                .animate-spectro-3 { animation: spectro 1.5s ease-in-out infinite 0.4s; transform-origin: bottom; }
                .delay-200 { animation-delay: 0.3s; }
                .delay-300 { animation-delay: 0.6s; }
            `}</style>
        </section>
    );
};

