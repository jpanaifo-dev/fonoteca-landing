import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { type Species } from '../../data/species';

interface PlaylistCarouselProps {
    allSpecies: Species[];
    lang: 'es' | 'en' | 'pt';
}

export const PlaylistCarousel: React.FC<PlaylistCarouselProps> = ({ allSpecies, lang }) => {
    // Correct Embla alignment and structure support
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

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
        <div className="relative group/carousel w-full">
            {/* Scroll Container */}
            <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex pb-6 pt-2 px-2 items-stretch">
                    {allSpecies.map((species) => (
                        <div
                            key={species.id}
                            className="flex-none w-[272px] lg:w-[320px] pr-6 select-none"
                        >
                            <div className="bg-white dark:bg-[#121b28] p-4 rounded-2xl shadow-sm border border-gray-100/80 dark:border-gray-800 group hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 h-full flex flex-col"
                            >
                                {/* Card Image Wrapper */}
                                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 shadow-sm">
                                    <img
                                        src={species.mainImage}
                                        alt={species[`commonName_${lang}`] as string}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                    />

                                    {/* Overlay icon trigger background layout */}
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button
                                            onClick={() => playAudio(species)}
                                            className="w-12 h-12 rounded-full bg-accent-green text-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-accent-green/90"
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

                                    {/* Actions footer triggers */}
                                    <div className="mt-3 flex items-center gap-2 w-full">
                                        <button
                                            onClick={() => playAudio(species)}
                                            className="flex-1 py-1.5 rounded-xl bg-accent-green hover:bg-accent-green/80 text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-all shadow-sm"
                                            disabled={species.audios.length === 0}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Escuchar
                                        </button>
                                        <a
                                            href={`/${lang}/species/${species.id}`}
                                            className="flex-1 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-accent-green text-center text-gray-600 dark:text-gray-300 hover:text-accent-green text-[11px] font-medium transition-all"
                                        >
                                            Detalles
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons (Always visible on Desktop to ensure UX works) */}
            <div className="hidden md:flex gap-2 absolute top-[-50px] right-2 z-10">
                <button onClick={scrollPrev} className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-accent-green hover:text-accent-green transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button onClick={scrollNext} className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-accent-green hover:text-accent-green transition-all shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
            </div>
        </div>
    );
};
