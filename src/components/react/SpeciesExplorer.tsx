import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Species, SpeciesCategory } from '../../data/species';

import { useSpeciesStore } from '../../store/useSpeciesStore';

interface SpeciesExplorerProps {
    allSpecies: Species[];
    lang: 'es' | 'en' | 'pt';
}

export const SpeciesExplorer: React.FC<SpeciesExplorerProps> = ({ allSpecies, lang }) => {
    const {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        selectedLocation, setSelectedLocation,
        selectedFamily, setSelectedFamily,
        selectedGenus, setSelectedGenus,
        onlyWithAudio, setOnlyWithAudio,
        viewMode, setViewMode,
        isSidebarCollapsed, setIsSidebarCollapsed,
        page, setPage
    } = useSpeciesStore();

    const [showFilters, setShowFilters] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    // Smooth hydration check since we are using persist
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const ITEMS_PER_PAGE = 20;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Dynamic Lists for filters
    const categories = useMemo(() => ['All', ...Array.from(new Set(allSpecies.map(s => s.category)))], [allSpecies]);
    const locations = useMemo(() => ['All', ...Array.from(new Set(allSpecies.map(s => s.location)))], [allSpecies]);

    const families = useMemo(() => ['All', ...Array.from(new Set(allSpecies.map(s => s.family || 'Unknown').filter(Boolean)))], [allSpecies]);
    const genera = useMemo(() => {
        const matchingSpecies = selectedFamily === 'All'
            ? allSpecies
            : allSpecies.filter(s => s.family === selectedFamily);
        return ['All', ...Array.from(new Set(matchingSpecies.map(s => s.genus || 'Unknown').filter(Boolean)))];
    }, [allSpecies, selectedFamily]);

    const filteredSpecies = useMemo(() => {
        return allSpecies.filter(s => {
            const matchesSearch = s.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.commonName_es.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
            const matchesLocation = selectedLocation === 'All' || s.location === selectedLocation;
            const matchesFamily = selectedFamily === 'All' || s.family === selectedFamily;
            const matchesGenus = selectedGenus === 'All' || s.genus === selectedGenus;
            const matchesAudio = !onlyWithAudio || s.audios.length > 0;

            return matchesSearch && matchesCategory && matchesLocation && matchesFamily && matchesGenus && matchesAudio;
        });
    }, [allSpecies, searchTerm, selectedCategory, selectedLocation, selectedFamily, selectedGenus, onlyWithAudio]);

    const paginatedSpecies = useMemo(() => {
        return filteredSpecies.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
    }, [filteredSpecies, page]);

    const totalPages = Math.ceil(filteredSpecies.length / ITEMS_PER_PAGE);



    const playAudio = (species: Species) => {
        if (species.audios.length === 0) return;
        const audio = species.audios[0];

        const event = new CustomEvent('play-audio', {
            detail: {
                title: audio.title || 'Canto',
                artist: `${species.commonName_es} (${species.scientificName})`,
                url: audio.url,
                image: species.mainImage,
                spectrogram: audio.spectrogramImage
            }
        });
        window.dispatchEvent(event);
    };

    const categoryTitles: Record<string, string> = {
        Amphibians: lang === 'es' ? 'Anfibios' : lang === 'pt' ? 'Anfíbios' : 'Amphibians',
        Birds: lang === 'es' ? 'Aves' : 'Birds',
        Crickets: lang === 'es' ? 'Grillos' : lang === 'pt' ? 'Grilos' : 'Crickets',
        Mammals: lang === 'es' ? 'Mamíferos' : lang === 'pt' ? 'Mamíferos' : 'Mammals',
        Reptiles: 'Reptiles'
    };

    if (!isHydrated) {
        return (
            <div className="flex flex-col lg:flex-row gap-6 min-h-[700px] text-gray-800 dark:text-gray-200">
                <aside className={`hidden lg:block w-72 lg:w-[260px] p-5 bg-white dark:bg-[#121b28] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-fit ${useSpeciesStore.getState().isSidebarCollapsed ? 'lg:w-0 p-0 overflow-hidden border-0' : ''}`}>
                    <div className="animate-pulse space-y-5">
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                        <div className="h-10 bg-gray-50 dark:bg-gray-900 rounded-xl"></div>
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3"></div>
                        <div className="h-10 bg-gray-50 dark:bg-gray-900 rounded-xl"></div>
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/4"></div>
                        <div className="space-y-2">
                            <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
                            <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-4/5"></div>
                            <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-5/6"></div>
                        </div>
                    </div>
                </aside>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-[#121b28] rounded-2xl border border-gray-100 dark:border-gray-800 animate-pulse">
                        <div className="h-6 w-32 bg-gray-100 dark:bg-gray-800 rounded"></div>
                        <div className="h-6 w-48 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    </div>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${useSpeciesStore.getState().isSidebarCollapsed ? 'xl:grid-cols-5 lg:grid-cols-4' : 'lg:grid-cols-4'} gap-5`}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-white dark:bg-[#121b28] rounded-2xl h-[330px] border border-gray-100 dark:border-gray-800 animate-pulse overflow-hidden flex flex-col">
                                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800"></div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                                    </div>
                                    <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-xl w-full mt-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="flex flex-col lg:flex-row gap-6 min-h-[700px] text-gray-800 dark:text-gray-200">
            {/* Dark Overlay for mobile aside */}
            {showFilters && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setShowFilters(false)}
                />
            )}

            {/* Sidebar Filters */}
            <aside className={`fixed lg:sticky lg:top-24 z-30 bg-white dark:bg-[#121b28] rounded-r-2xl lg:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-screen lg:h-fit overflow-y-auto transform transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-0 lg:w-0 p-0 overflow-hidden opacity-0 border-0' : 'w-72 lg:w-[260px] p-5'} ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Collapse toggle for desktop */}
                <div className="flex items-center justify-between mb-4 lg:hidden">
                    <h2 className="font-bold text-sm">Filtros</h2>
                    <button onClick={() => setShowFilters(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        ✖
                    </button>
                </div>
                {/* Button to open sidebar on mobile when collapsed */}
                {isSidebarCollapsed && (
                    <button
                        onClick={() => setShowFilters(true)}
                        className="lg:hidden mb-4 px-3 py-1 bg-accent-green text-white rounded-md"
                    >
                        Mostrar filtros
                    </button>
                )}

                <div className="space-y-6">
                    {/* Family Filter */}
                    <div>
                        <h3 className="font-semibold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-2 pb-1 border-b border-gray-50 dark:border-gray-800">Familia</h3>
                        <select
                            value={selectedFamily}
                            onChange={(e) => {
                                setSelectedFamily(e.target.value);
                                setSelectedGenus('All');
                            }}
                            className="w-full px-2 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#0c141d] text-gray-800 dark:text-gray-200 text-xs focus:ring-1 focus:ring-accent-green/50 hover:bg-white dark:hover:bg-gray-800 transition-all outline-none"
                        >
                            {families.map(f => (
                                <option key={f} value={f} className="dark:bg-[#121b28]">{f === 'All' ? (lang === 'es' ? 'Todas' : 'All') : f}</option>
                            ))}
                        </select>
                    </div>

                    {/* Genus Filter */}
                    <div>
                        <h3 className="font-semibold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-2 pb-1 border-b border-gray-50 dark:border-gray-800">Género</h3>
                        <select
                            value={selectedGenus}
                            onChange={(e) => setSelectedGenus(e.target.value)}
                            className="w-full px-2 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#0c141d] text-gray-800 dark:text-gray-200 text-xs focus:ring-1 focus:ring-accent-green/50 hover:bg-white dark:hover:bg-gray-800 transition-all outline-none"
                        >
                            {genera.map(g => (
                                <option key={g} value={g} className="dark:bg-[#121b28]">{g === 'All' ? (lang === 'es' ? 'Todos' : 'All') : g}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="font-semibold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-2 pb-1 border-b border-gray-50 dark:border-gray-800">Grupo</h3>
                        <div className="space-y-1 flex flex-col">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-light text-left transition-all ${selectedCategory === cat
                                        ? 'bg-accent-green text-white font-normal shadow-sm shadow-accent-green/10'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                                >
                                    {cat === 'All' ? (lang === 'es' ? 'Todas' : 'All') : (categoryTitles[cat] || cat)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                        <h3 className="font-semibold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-2 pb-1 border-b border-gray-50 dark:border-gray-800">Ubicación</h3>
                        <div className="space-y-1 flex flex-col">
                            {locations.map(loc => (
                                <button
                                    key={loc}
                                    onClick={() => setSelectedLocation(loc)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-light text-left transition-all ${selectedLocation === loc
                                        ? 'bg-accent-green text-white font-normal shadow-sm shadow-accent-green/10'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                                >
                                    {loc === 'All' ? (lang === 'es' ? 'Todas' : 'All') : loc}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Filter */}
                    <div>
                        <h3 className="font-semibold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider mb-2 pb-1 border-b border-gray-50 dark:border-gray-800">Contenido</h3>
                        <button
                            onClick={() => setOnlyWithAudio(!onlyWithAudio)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-light transition-all ${onlyWithAudio ? 'bg-accent-green text-white font-normal shadow-sm' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                        >
                            <span>Solo con Audio</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${onlyWithAudio ? 'bg-white border-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                {onlyWithAudio && <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-accent-green" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </div>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Section */}
            <div className="flex-1">
                {/* Top Control Bar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-6 bg-white dark:bg-[#121b28] p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 flex-1">
                        {/* Mobile Aside Trigger */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                        >
                            Filtros
                        </button>

                        {/* Desktop Aside Collapse Trigger */}
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d={`${isSidebarCollapsed ? 'M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5' : 'M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'}`} /></svg>
                            {isSidebarCollapsed ? 'Mostrar Filtros' : 'Ocultar Filtros'}
                        </button>

                        {/* Search Input */}
                        <div className="relative flex-1 max-w-sm">
                            <input
                                type="text"
                                placeholder={lang === 'es' ? 'Buscar...' : 'Search...'}
                                className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent-green text-sm transition-shadow"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                        </div>
                    </div>

                    {/* View Modes */}
                    <div className="flex items-center gap-2 border-l border-gray-100 dark:border-gray-800 pl-4">
                        <span className="text-xs text-gray-500 mr-2">{filteredSpecies.length} resultados</span>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-accent-green text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-accent-green text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 5.25h16.5m-16.5-10.5h16.5" /></svg>
                        </button>
                    </div>
                </div>

                {/* Grid Lists layout */}
                <AnimatePresence>
                    {viewMode === 'grid' ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${isSidebarCollapsed ? 'xl:grid-cols-5 lg:grid-cols-4' : 'lg:grid-cols-4'} gap-5`}
                        >
                            {paginatedSpecies.map(species => {
                                const coverImage = (onlyWithAudio && species.audios.length > 0 && species.audios[0].spectrogramImage)
                                    ? species.audios[0].spectrogramImage
                                    : (species.mainImage || '/placeholder.jpg');

                                return (
                                    <motion.div
                                        layout
                                        key={species.id}
                                        className="bg-white dark:bg-[#121b28] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-lg hover:border-accent-green/30 transition-all duration-300 flex flex-col"
                                    >
                                        <div className="aspect-[4/3] overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                                            {!loadedImages[species.id] && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-5 h-5 border-2 border-accent-green border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <img
                                                src={coverImage}
                                                alt={species.scientificName}
                                                onLoad={() => setLoadedImages(prev => ({ ...prev, [species.id]: true }))}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://upload.wikimedia.org/wikipedia/commons/b/ba/No_image_available_400_x_400.png';
                                                    setLoadedImages(prev => ({ ...prev, [species.id]: true }));
                                                }}
                                                className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ${loadedImages[species.id] ? 'opacity-100' : 'opacity-0'}`}
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <button
                                                    onClick={() => playAudio(species)}
                                                    className="bg-accent-green text-white p-3 rounded-full hover:scale-110 active:scale-95 transition-transform disabled:opacity-50 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:hover:scale-100"
                                                    disabled={species.audios.length === 0}
                                                >
                                                    {species.audios.length === 0 ? '🚫 Sin Audio' : '▶ Play'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <span className="text-xs text-accent-green font-medium mb-1">{categoryTitles[species.category] || species.category}</span>
                                            <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-accent-green transition-colors text-sm">{species.commonName_es}</h4>
                                            <p className="text-xs text-gray-400 italic mb-2">{species.scientificName}</p>
                                            <div className="mt-auto pt-2 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                                <span className="text-[10px] text-gray-500">{species.location}</span>
                                                <a href={`/${lang}/species/${species.id}`} className="text-xs text-accent-green hover:underline">Ver más &rarr;</a>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-3"
                        >
                            {paginatedSpecies.map(species => {
                                const coverImage = (onlyWithAudio && species.audios.length > 0 && species.audios[0].spectrogramImage)
                                    ? species.audios[0].spectrogramImage
                                    : (species.mainImage || '/placeholder.jpg');

                                return (
                                    <motion.div
                                        layout
                                        key={species.id}
                                        className="flex items-center gap-4 bg-white dark:bg-[#121b28] p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow group flex-wrap md:flex-nowrap"
                                    >
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                            {!loadedImages['list-' + species.id] && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-3 h-3 border border-accent-green border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <img
                                                src={coverImage}
                                                alt=""
                                                onLoad={() => setLoadedImages(prev => ({ ...prev, ['list-' + species.id]: true }))}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://upload.wikimedia.org/wikipedia/commons/b/ba/No_image_available_400_x_400.png';
                                                    setLoadedImages(prev => ({ ...prev, ['list-' + species.id]: true }));
                                                }}
                                                className={`w-full h-full object-cover transition-opacity ${loadedImages['list-' + species.id] ? 'opacity-100' : 'opacity-0'}`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{species.commonName_es}</h4>
                                            <p className="text-xs text-gray-400 italic truncate">{species.scientificName}</p>
                                        </div>
                                        <div className="text-xs text-gray-500">{species.location}</div>
                                        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                                            <button
                                                onClick={() => playAudio(species)}
                                                className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs hover:bg-accent-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-400 dark:disabled:text-gray-500"
                                                disabled={species.audios.length === 0}
                                            >
                                                {species.audios.length === 0 ? 'Sin Audio' : 'Play'}
                                            </button>
                                            <a href={`/${lang}/species/${species.id}`} className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-xs hover:border-accent-green hover:text-accent-green transition-colors">
                                                Detalles
                                            </a>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-1.5 mt-10 mb-4">
                        <button
                            onClick={() => handlePageChange(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-colors"
                        >
                            &larr; Anterior
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => handlePageChange(p)}
                                    className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${page === p
                                        ? 'bg-accent-green text-white shadow-sm shadow-accent-green/20'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-colors"
                        >
                            Siguiente &rarr;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
