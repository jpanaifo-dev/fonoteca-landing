import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Play, Info, MapPin, ArrowRight } from 'lucide-react';
import type { Species } from '../../data/species';

interface SpeciesCardProps {
    species: Species;
    viewMode?: 'grid' | 'list';
    lang: string;
}

// Sub-component for media display (images/iframes)
const MediaViewer: React.FC<{
    src: string;
    alt: string;
    className: string;
    onLoaded: () => void;
    isLoaded: boolean;
    fallback?: string;
}> = ({ src, alt, className, onLoaded, isLoaded, fallback = '/images/logo-mini.webp' }) => {
    const driveIdMatch = src.match(/id=([a-zA-Z0-9_-]+)/) || src.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const isDrive = src.includes('docs.google.com') || src.includes('drive.google.com');
    const [hasError, setHasError] = React.useState(false);

    if (!src || hasError) {
        return (
            <img src={fallback} className={className} alt="Fallback" onLoad={onLoaded} />
        );
    }

    if (isDrive && driveIdMatch) {
        const driveId = driveIdMatch[1];
        return (
            <div className="relative w-full h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-3 h-3 border border-accent-green border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <iframe
                    src={`https://drive.google.com/file/d/${driveId}/preview`}
                    className={`${className} border-0 pointer-events-none transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    allow="autoplay"
                    title={alt}
                    onLoad={onLoaded}
                    loading="lazy"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-3 h-3 border border-accent-green border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={onLoaded}
                onError={() => setHasError(true)}
            />
        </div>
    );
};

export const SpeciesCard: React.FC<SpeciesCardProps> = ({ species, viewMode = 'grid', lang }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const coverImage = species.mainImage || '/images/logo-mini.webp';

    const categoryTitles: Record<string, string> = {
        Amphibians: lang === 'es' ? 'Anfibios' : lang === 'pt' ? 'Anfíbios' : 'Amphibians',
        Birds: lang === 'es' ? 'Aves' : 'Birds',
        Crickets: lang === 'es' ? 'Grillos' : lang === 'pt' ? 'Grilos' : 'Crickets',
        Mammals: lang === 'es' ? 'Mamíferos' : lang === 'pt' ? 'Mamíferos' : 'Mammals',
        Reptiles: 'Reptiles'
    };

    const commonName = useMemo(() => {
        if (lang === 'en') return species.commonName_en;
        if (lang === 'pt') return species.commonName_pt;
        return species.commonName_es;
    }, [species, lang]);

    const onPlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("🖱️ SpeciesCard: Play button clicked for", species.scientificName);
        if (species.audios.length === 0) {
            console.warn("⚠️ SpeciesCard: No audios available for this species.");
            return;
        }
        const audio = species.audios[0];
        const allMediaImages = [
            ...(species.galleryImages?.map(img => img.url) || []),
            ...(species.spectrograms?.map(img => img.url) || [])
        ].filter(Boolean);

        const event = new CustomEvent('play-audio', {
            detail: {
                title: audio.title || 'Canto',
                artist: `${commonName} (${species.scientificName})`,
                url: audio.url,
                image: species.mainImage || '/images/logo-mini.webp',
                spectrogram: audio.spectrogramImage,
                images: allMediaImages
            }
        });
        console.log("📡 SpeciesCard: Dispatching 'play-audio' event...");
        window.dispatchEvent(event);
    };

    if (viewMode === 'list') {
        return (
            <motion.div
                layout
                className="bg-white dark:bg-[#121b28] p-3 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-4 hover:border-accent-green/30 hover:shadow-sm transition-all group flex-wrap md:flex-nowrap"
            >
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-900 border border-gray-50 dark:border-gray-800 relative">
                    <MediaViewer
                        src={coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                        isLoaded={isLoaded}
                        onLoaded={() => setIsLoaded(true)}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-accent-green uppercase tracking-widest">{categoryTitles[species.category] || species.category}</span>
                    <p className=" italic truncate">{species.scientificName}</p>
                </div>
                <div className="flex items-center gap-2 pr-2">
                    {species.audios.length > 0 && (
                        <button onClick={onPlay} className="p-2 rounded-xl bg-accent-green/10 text-accent-green hover:bg-accent-green hover:text-white transition-all">
                            <Play className="w-4 h-4 fill-current" />
                        </button>
                    )}
                    <a href={`/${lang}/species/${species.id}`} className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-accent-green transition-all">
                        <Info className="w-4 h-4" />
                    </a>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            className="group bg-white dark:bg-[#121b28] rounded-xl border border-gray-100 dark:border-gray-800 hover:border-accent-green/30 transition-all duration-500 relative flex flex-col overflow-hidden shadow-sm hover:shadow-xl"
        >
            <div className="aspect-[6/5] relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <RefreshCw className="w-6 h-6 text-gray-200 animate-spin" />
                    </div>
                )}
                <MediaViewer
                    src={coverImage}
                    alt={species.scientificName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    isLoaded={isLoaded}
                    onLoaded={() => setIsLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    {species.audios.length > 0 && (
                        <button
                            onClick={onPlay}
                            className="bg-white/20 cursor-pointer backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-2xl hover:bg-accent-green hover:border-accent-green transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 flex items-center gap-2 font-bold text-xs"
                        >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            {lang === 'es' ? 'Escuchar' : lang === 'pt' ? 'Ouvir' : 'Listen'}
                        </button>
                    )}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col relative">
                <div className="mb-4">
                    <span className="text-[10px] font-bold text-accent-green uppercase tracking-[0.2em] mb-2 block">
                        {categoryTitles[species.category] || species.category}
                    </span>
                    <h4 className="text-gray-900 italic font-serif dark:text-white group-hover:text-accent-green transition-colors leading-tight mb-1 text-lg">
                        {species.scientificName}
                    </h4>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                    <div className="flex items-center gap-1.5 text-gray-500 overflow-hidden">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="text-[10px] font-bold tracking-tight truncate uppercase">{species.location}</span>
                    </div>
                    <a href={`/${lang}/species/${species.id}`} className="text-[10px] font-black uppercase tracking-widest text-accent-green hover:text-accent-green/80 flex items-center gap-1.5 transition-colors">
                        {lang === 'es' ? 'Detalles' : lang === 'pt' ? 'Detalhes' : 'Details'}
                        <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </motion.div>
    );

};
