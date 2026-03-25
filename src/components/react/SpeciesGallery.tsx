import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpeciesGalleryProps {
    images: string[];
}

export const SpeciesGallery: React.FC<SpeciesGalleryProps> = ({ images }) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Filter out invalid images if needed, but we trust the data layer for now
    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                <div className="text-center">
                    <img src="/images/logo-mini.webp" className="w-16 mx-auto opacity-20 mb-2" alt="No images" />
                    <p className="text-gray-400 text-sm">No hay imágenes disponibles</p>
                </div>
            </div>
        );
    }

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
    };
    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    };

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex]);

    const renderGrid = () => {
        const count = images.length;

        if (count === 1) {
            return (
                <div className="w-full aspect-video rounded-3xl overflow-hidden cursor-pointer shadow-lg group" onClick={() => openLightbox(0)}>
                    <img src={images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery 1" />
                </div>
            );
        }

        if (count === 2) {
            return (
                <div className="grid grid-cols-2 gap-2 h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg">
                    {images.slice(0, 2).map((img, i) => (
                        <div key={i} className="cursor-pointer overflow-hidden group" onClick={() => openLightbox(i)}>
                            <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`Gallery ${i+1}`} />
                        </div>
                    ))}
                </div>
            );
        }

        if (count === 3) {
            return (
                <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg">
                    <div className="row-span-2 cursor-pointer overflow-hidden group" onClick={() => openLightbox(0)}>
                        <img src={images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery 1" />
                    </div>
                    {images.slice(1, 3).map((img, i) => (
                        <div key={i+1} className="cursor-pointer overflow-hidden group" onClick={() => openLightbox(i+1)}>
                            <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`Gallery ${i+2}`} />
                        </div>
                    ))}
                </div>
            );
        }

        if (count === 4) {
            return (
                <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg">
                    <div className="row-span-2 cursor-pointer overflow-hidden group" onClick={() => openLightbox(0)}>
                        <img src={images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery 1" />
                    </div>
                    <div className="grid grid-rows-3 gap-2 h-full">
                         {images.slice(1, 4).map((img, i) => (
                            <div key={i+1} className="cursor-pointer overflow-hidden group" onClick={() => openLightbox(i+1)}>
                                <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`Gallery ${i+2}`} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // 5 or more
        return (
            <div className="grid grid-cols-2 gap-2 h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Left Column (2 images) */}
                <div className="grid grid-rows-2 gap-2 h-full">
                    {images.slice(0, 2).map((img, i) => (
                        <div key={i} className="cursor-pointer overflow-hidden group" onClick={() => openLightbox(i)}>
                            <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`Gallery ${i+1}`} />
                        </div>
                    ))}
                </div>

                {/* Right Column (3 images) */}
                <div className="grid grid-rows-3 gap-2 h-full">
                    {images.slice(2, 4).map((img, i) => (
                        <div key={i+2} className="cursor-pointer overflow-hidden group" onClick={() => openLightbox(i+2)}>
                            <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`Gallery ${i+3}`} />
                        </div>
                    ))}
                    {/* The 5th item with the +X overlay */}
                    <div className="relative cursor-pointer overflow-hidden group" onClick={() => openLightbox(4)}>
                        <img src={images[4]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Gallery 5" />
                        {images.length > 5 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                <span className="text-white text-3xl font-bold">+{images.length - 4}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderGrid()}

            {/* Lightbox / Facebook Style Viewer */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-xl backdrop-blur-md"
                            onClick={closeLightbox}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation */}
                        {images.length > 1 && (
                            <>
                                <button 
                                    className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                                    onClick={prevImage}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <button 
                                    className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                                    onClick={nextImage}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute top-6 left-6 text-white/70 text-sm font-medium">
                            {lightboxIndex + 1} / {images.length}
                        </div>

                        {/* Image Container */}
                        <motion.div 
                            key={lightboxIndex}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl max-h-full flex items-center justify-center overflow-hidden rounded-lg pointer-events-none"
                        >
                            <img 
                                src={images[lightboxIndex]} 
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl pointer-events-auto"
                                alt={`Gallery ${lightboxIndex + 1}`}
                            />
                        </motion.div>

                        {/* Bottom Info (Optional) */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase">
                            Presiona ESC para cerrar
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
