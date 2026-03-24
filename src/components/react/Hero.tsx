import React, { useState, useEffect } from 'react';
import { type translations } from '../../i18n/data';

interface HeroProps {
    content: typeof translations.es.hero;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % content.titles_animate.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [content.titles_animate.length]);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Space Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080d15] via-[#0c1622] to-[#04070a]">
                {/* Glowing radial centers */}
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-teal-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-emerald-500/5 rounded-full blur-[120px]"></div>

                {/* Curved Earth Element at bottom */}
                <div className="absolute -bottom-[70%] md:-bottom-[65%] left-1/2 -translate-x-1/2 w-[160%] md:w-[120%] aspect-square rounded-full bg-[#04070a] border-t-2 border-accent-green/30 shadow-[0_-30px_60px_rgba(20,184,166,0.12)] flex justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-teal-900/30 to-transparent"></div>
                </div>
            </div>

            {/* Content centered */}
            <div className="relative z-10 container mx-auto px-6 text-center mt-[-40px]">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <div className="min-h-[160px] md:min-h-[120px] mb-4 flex items-center justify-center">
                        <h1
                            key={currentTitleIndex}
                            className="text-4xl md:text-6xl lg:text-8xl font-light text-white tracking-wide animate-fade-up leading-tight"
                        >
                            {content.titles_animate[currentTitleIndex]}
                        </h1>
                    </div>

                    <p className="text-base md:text-xl text-gray-300/90 mb-8 max-w-2xl font-light animate-fade-in delay-200 mt-2 px-4">
                        {content.description}
                    </p>

                    <a
                        href="#library"
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

