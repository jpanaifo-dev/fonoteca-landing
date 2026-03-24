import React from 'react';
import { type Species } from '../../data/species';

interface PlaylistCarouselProps {
    allSpecies: Species[];
    lang: 'es' | 'en' | 'pt';
}

export const PlaylistCarousel: React.FC<PlaylistCarouselProps> = ({ allSpecies, lang }) => {
    const playAudio = (species: Species) => {
        if (species.audios.length === 0) return;
        const mainAudio = species.audios[0];
        const event = new CustomEvent('play-audio', {
            detail: {
                title: mainAudio.title,
                artist: `${species[`commonName_${lang}`]} (${species.scientificName})`,
                url: mainAudio.url,
                image: species.mainImage,
                spectrogram: mainAudio.spectrogramImage
            }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="relative group/carousel">
            {/* Scroll Container */}
            <div className="flex gap-5 overflow-x-auto pb-6 pt-2 px-2 scroll-smooth snap-x snap-mandatory scrollbar-none items-stretch">
                {allSpecies.map((species) => (
                    <div
                        key={species.id}
                        className="flex-none snap-start"
                    >
                        <div className="bg-white dark:bg-[#121b28] p-4 rounded-xl shadow-sm border border-gray-100/80 dark:border-gray-800 group hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer h-full flex flex-col"
                            onClick={() => playAudio(species)}
                        >
                            {/* Card Image Wrapper */}
                            <div className="relative aspect-square rounded-lg overflow-hidden mb-3 shadow-sm">
                                <img
                                    src={species.mainImage}
                                    alt={species[`commonName_${lang}`] as string}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Overlay & Play button */}
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        className="w-11 h-11 rounded-full bg-accent-green text-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-accent-green/90"
                                        disabled={species.audios.length === 0}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-current"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col">
                                <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate mb-0.5" title={species[`commonName_${lang}`] as string}>
                                    {species[`commonName_${lang}`]}
                                </h4>
                                <p className="text-xs text-gray-400 dark:text-gray-500 truncate italic mb-2">
                                    {species.scientificName}
                                </p>
                                <div className="mt-auto flex items-center justify-between text-[11px] text-gray-400">
                                    <span className="bg-gray-50 dark:bg-gray-800/80 px-1.5 py-0.5 rounded-md border border-gray-100 dark:border-gray-800">
                                        {species.category}
                                    </span>
                                    <span>
                                        {species.audios.length} {lang === 'es' ? 'audios' : 'audios'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Styles for Scrollbar Hide */}
            <style>{`
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};
