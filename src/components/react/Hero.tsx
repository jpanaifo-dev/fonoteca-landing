import React, { useState, useEffect } from 'react';
import { type translations } from '../../i18n/data';
import { landingImages } from '../../config/landingImages';

interface HeroProps {
    content: typeof translations.es.hero;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % content.titles_animate.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [content.titles_animate.length]);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={landingImages.hero.src}
                    alt={landingImages.hero.alt}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-dark/60 mix-blend-multiply"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-left">
                <div className="max-w-4xl">
                    <div className="h-[3em] md:h-[4em] lg:h-[5em] mb-6 flex items-end">
                        <h1
                            key={currentTitleIndex}
                            className="text-5xl md:text-6xl lg:text-8xl font-light text-white tracking-wide animate-fade-up min-h-[1.2em]"
                        >
                            <span className="text-accent-green">
                                {content.titles_animate[currentTitleIndex]}
                            </span>
                        </h1>
                    </div>

                    <p className="text-lg text-gray-200 mb-10 max-w-2xl font-light animate-fade-up delay-200">
                        {content.description}
                    </p>

                    <a
                        href="#species"
                        className="inline-block bg-white font-semibold py-4 px-10 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 animate-fade-up delay-300 shadow-lg text-accent-green uppercase"
                    >
                        {content.cta}
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    ></path>
                </svg>
            </div>

            <style>{`
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fade-up 1s ease-out forwards;
                }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.4s; }
            `}</style>
        </section>
    );
};
