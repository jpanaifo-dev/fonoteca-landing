import React from 'react';

interface SpeciesCardProps {
    id: string;
    name: string;
    scientific: string;
    image: string;
    lang: string;
}

export const SpeciesCard: React.FC<SpeciesCardProps> = ({ id, name, scientific, image, lang }) => {
    const link = `/${lang}/species/${id}`;

    return (
        <a
            href={link}
            className="group block relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent-green/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 h-[400px]"
        >
            {/* Image Container */}
            <div className="h-full w-full relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-accent-green/90 text-primary-dark text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm">
                    Audio Disponible
                </span>
                <h3 className="text-2xl font-bold mb-1 group-hover:text-accent-green transition-colors duration-300">
                    {name}
                </h3>
                <p className="text-gray-300 italic font-serif">
                    {scientific}
                </p>

                {/* Arrow Icon */}
                <div className="absolute right-8 bottom-8 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-accent-green">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </div>
        </a>
    );
};
