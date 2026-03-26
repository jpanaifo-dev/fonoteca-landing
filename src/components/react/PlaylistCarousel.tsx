"use client"

import React, { useMemo, useState, useEffect } from 'react'
import { type Species } from '../../data/species'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from './ui/carousel'
import { Button } from './ui/button'

interface PlaylistCarouselProps {
    allSpecies: Species[];
    lang: 'es' | 'en' | 'pt';
    title?: string;
}

export const PlaylistCarousel: React.FC<PlaylistCarouselProps> = ({ allSpecies, lang, title: propTitle }) => {
    const [api, setApi] = useState<CarouselApi>()
    const [autoplayEnabled, setAutoplayEnabled] = useState(true)

    // Data Prep: Multiplicamos para asegurar que el loop de Embla funcione suave
    const carouselItems = useMemo(() => {
        if (!Array.isArray(allSpecies) || allSpecies.length === 0) return []
        let items = [...allSpecies]
        // Embla requiere que el total de slides exceda el viewport para el loop continuo
        while (items.length < 12) {
            items = [...items, ...allSpecies]
        }
        return items
    }, [allSpecies])

    // Intervalo de Autoplay
    useEffect(() => {
        if (!api || !autoplayEnabled) return

        const intervalId = setInterval(() => {
            api.scrollNext()
        }, 5000)

        return () => clearInterval(intervalId)
    }, [api, autoplayEnabled])

    const playAudio = (species: Species) => {
        if (species.audios.length === 0) return
        const mainAudio = species.audios[0]
        const event = new CustomEvent('play-audio', {
            detail: {
                title: mainAudio.title,
                artist: `${species[`commonName_${lang}`]} (${species.scientificName})`,
                url: mainAudio.url,
                image: species.mainImage || '/images/logo-mini.webp',
                spectrogram: mainAudio.spectrogramImage
            }
        })
        window.dispatchEvent(event)
    }

    const t = {
        title: propTitle || (lang === 'es' ? 'Colecciones Recientes' : lang === 'pt' ? 'Coleções Recentes' : 'Latest Collections'),
        viewAll: lang === 'es' ? 'Ver todas' : lang === 'pt' ? 'Ver tudo' : 'View all',
        details: lang === 'es' ? 'Detalles' : lang === 'pt' ? 'Detalhes' : 'Details',
        audios: lang === 'es' ? 'audios' : 'audios',
    }

    if (!Array.isArray(allSpecies) || allSpecies.length === 0) return null

    return (
        <section id="latest-recordings" className="w-full">
            <div
                className="w-full mx-auto"
                onMouseEnter={() => setAutoplayEnabled(false)}
                onMouseLeave={() => setAutoplayEnabled(true)}
            >
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    {/* Header with Title and Custom Navigation */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                        <div className="flex items-center gap-6">
                            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white">
                                {t.title}
                            </h2>
                            <div className="hidden md:flex gap-2">
                                <CarouselPrevious className="static translate-y-0 h-12 w-12 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-transparent hover:text-accent-green hover:border-accent-green transition-colors" />
                                <CarouselNext className="static translate-y-0 h-12 w-12 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-transparent hover:text-accent-green hover:border-accent-green transition-colors" />
                            </div>
                        </div>

                        <Button
                            className="rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-accent-green/90 dark:hover:bg-accent-green text-white px-8 py-6 text-sm font-medium flex items-center gap-2"
                        >
                            <a href={`/${lang}/species`} className="flex items-center gap-2">
                                {t.viewAll}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            </a>
                        </Button>
                    </div>

                    <CarouselContent className="-ml-6 pb-4">
                        {carouselItems.map((species, idx) => (
                            <CarouselItem
                                key={`${species.id}-${idx}`}
                                className="pl-6 md:basis-1/2 lg:basis-1/4"
                            >
                                <div className="group/card bg-white dark:bg-[#121b28] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                                    {/* Image Aspect Box */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        <img
                                            src={species.mainImage || '/images/logo-mini.webp'}
                                            alt={species[`commonName_${lang}`] as string}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/images/logo-mini.webp';
                                            }}
                                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 pointer-events-none"
                                            loading="lazy"
                                        />
                                        {/* Dynamic Play Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button
                                                onClick={() => playAudio(species)}
                                                className="w-14 h-14 rounded-full bg-accent-green text-white flex items-center justify-center transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-300 shadow-xl hover:bg-accent-green/90 active:scale-90"
                                                disabled={species.audios.length === 0}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-current"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>
                                            </button>
                                        </div>
                                        {/* Category Badge on Image */}
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-black/50 backdrop-blur-md text-white text-[9px] uppercase font-bold px-2.5 py-1 rounded-full border border-white/20">
                                                {species.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="p-5 flex-grow flex flex-col">
                                        <h4 className="font-bold text-gray-900 dark:text-white group-hover/card:text-accent-green transition-colors text-lg line-clamp-1 mb-0.5">
                                            {species[`commonName_${lang}`]}
                                        </h4>
                                        <p className="text-sm text-gray-500 italic line-clamp-1 mb-4">
                                            {species.scientificName}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{species.location}</span>
                                                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                                    {species.audios.length} {t.audios}
                                                </span>
                                            </div>
                                            <a
                                                href={`/${lang}/species/${species.id}`}
                                                className="text-xs font-bold text-accent-green hover:underline flex items-center gap-1 group/link"
                                            >
                                                {t.details}
                                                <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}
