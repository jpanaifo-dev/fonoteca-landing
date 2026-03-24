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
                                <span key={i} className="block mt-1 font-extralight tracking-tight opacity-95">
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
                        className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 bg-white/5 backdrop-blur-md text-white font-light py-3 px-10 rounded-full hover:bg-white hover:text-[#04070a] transition-all duration-500 animate-fade-in delay-300 shadow-2xl group"
                    >
                        <span>{content.cta}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
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
                .animate-fade-up { animation: fade-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
                .animate-scroll-dot { animation: scroll-dot 1.5s ease-in-out infinite; }
                .delay-200 { animation-delay: 0.3s; }
                .delay-300 { animation-delay: 0.6s; }
            `}</style>
        </section>
    );
};

