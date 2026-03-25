import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpeciesGalleryProps {
    images: string[];
}

export const SpeciesGallery: React.FC<SpeciesGalleryProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
                <AnimatePresence mode="wait">
                    {images[currentIndex]?.includes('docs.google.com') ? (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-full w-full bg-black/20"
                        >
                            <iframe 
                                src={`https://drive.google.com/file/d/${images[currentIndex].match(/id=([a-zA-Z0-9_-]+)/)?.[1] || ""}/preview`} 
                                className="w-full h-full border-0" 
                                allow="autoplay"
                            />
                        </motion.div>
                    ) : (
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex] || '/images/logo-mini.webp'}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/logo-mini.webp';
                            }}
                            className="h-full w-full object-cover bg-gray-50 dark:bg-gray-800"
                            alt={`Species gallery ${currentIndex + 1}`}
                        />
                    )}
                </AnimatePresence>
                
                {images[currentIndex]?.includes('docs.google.com') && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full shadow-sm">
                        Drive Preview
                    </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl transition-all ${idx === currentIndex ? 'ring-2 ring-accent-green ring-offset-2' : 'opacity-70 hover:opacity-100'
                                }`}
                        >
                            <img 
                                src={img || '/images/logo-mini.webp'} 
                                alt="" 
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/images/logo-mini.webp';
                                }}
                                className="h-full w-full object-cover" 
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
