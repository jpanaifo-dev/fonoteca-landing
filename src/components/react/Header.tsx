import React, { useState, useEffect } from 'react';
import { type translations } from '../../i18n/data';

interface HeaderProps {
    content: typeof translations.es.nav;
    logoSrc: string;
}

export const Header: React.FC<HeaderProps> = ({ content, logoSrc }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? "hidden" : "";
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-4" : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center h-full">
                    <a
                        href="#"
                        className={`group flex gap-3 items-center transition-colors duration-300 ${isScrolled ? "text-primary-dark" : "text-white"}`}
                    >
                        <img
                            src={logoSrc}
                            alt="Logo IIAP"
                            className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                        <span className="text-sm md:text-base font-medium max-w-[260px] leading-tight">
                            Instituto de Investigaciones de la Amazonía Peruana
                        </span>
                    </a>

                    <button
                        onClick={toggleMenu}
                        className="group flex flex-col gap-1.5 w-8 cursor-pointer z-50"
                    >
                        <span
                            className={`block w-full h-0.5 transition-all group-hover:bg-accent-green ${isScrolled ? "bg-primary-dark" : "bg-white"}`}
                        ></span>
                        <span
                            className={`block w-3/4 h-0.5 ml-auto transition-all group-hover:bg-accent-green group-hover:w-full ${isScrolled ? "bg-primary-dark" : "bg-white"}`}
                        ></span>
                        <span
                            className={`block w-full h-0.5 transition-all group-hover:bg-accent-green ${isScrolled ? "bg-primary-dark" : "bg-white"}`}
                        ></span>
                    </button>
                </div>
            </header>

            {/* Overlay Menu */}
            <div
                className={`fixed inset-0 z-[60] transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-primary-dark/90 backdrop-blur-sm"
                    onClick={toggleMenu}
                ></div>

                {/* Menu Content */}
                <div
                    className={`absolute right-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white text-primary-dark shadow-2xl transform transition-transform duration-500 delay-100 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    {/* Organic Edge */}
                    <div className="absolute top-0 left-0 w-24 h-full -translate-x-1/2 overflow-hidden pointer-events-none hidden md:block">
                        <div className="w-[200%] h-full bg-white rounded-l-[100%] absolute right-0"></div>
                    </div>

                    <div className="relative z-10 h-full flex flex-col p-12 justify-center">
                        <button
                            onClick={toggleMenu}
                            className="absolute top-8 right-8 text-primary-dark hover:text-accent-green transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>

                        <nav className="space-y-6 text-3xl font-light">
                            {Object.entries(content).map(([key, label]) => (
                                <a
                                    key={key}
                                    href="#"
                                    className="block hover:text-accent-green hover:translate-x-2 transition-all"
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>

                        <div className="mt-12 pt-12 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                © 2025 Instituto de Investigaciones de la Amazonía Peruana
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
