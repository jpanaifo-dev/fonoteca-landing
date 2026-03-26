import React, { useEffect, useState } from 'react';
import { getSpeciesById, type Species } from '../../data/species';
import { translations, type Language } from '../../i18n/data';
import { SpeciesGallery } from './SpeciesGallery';
import { AudioPlayer } from './AudioPlayer';
import {
    Bird,
    TrendingDown,
    TrendingUp,
    Minus,
    MapPin,
    Info,
    FileText,
    Share2,
    CheckCircle,
    ChevronRight,
    Lock
} from 'lucide-react';

interface Props {
    id: string;
    lang: string;
}

export const SpeciesDetailClient: React.FC<Props> = ({ id, lang }) => {
    const [species, setSpecies] = useState<Species | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('at-a-glance');

    const content = translations[lang as keyof typeof translations];
    const currentLang = lang as Language;

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const data = await getSpeciesById(id);
                if (data) {
                    setSpecies(data);

                    // Trigger the playlist event for the persistent player
                    if (data.audios && data.audios.length > 0) {
                        const commonName = data[`commonName_${currentLang}` as keyof Species] as string;
                        const playlist = data.audios.map((audio) => ({
                            title: audio.title || "Canto",
                            artist: commonName,
                            url: audio.url,
                            image: data.mainImage || "/images/logo-mini.webp",
                            spectrogram: audio.spectrogramImage ?? undefined,
                        }));

                        const playlistData = {
                            playlist: playlist,
                            startAtIndex: 0,
                            autoplay: false,
                        };

                        (window as any).FONOTECA_PLAYLIST = playlistData;

                        const event = new CustomEvent("set-playlist", {
                            detail: playlistData,
                        });
                        window.dispatchEvent(event);
                    }
                } else {
                    setError(lang === 'pt' ? "Espécie não encontrada" : lang === 'es' ? "Especie no encontrada" : "Species not found");
                }
            } catch (err) {
                console.error("Error loading species:", err);
                setError(lang === 'es' ? "Error al cargar los datos" : "Error loading data");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id, lang]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-green"></div>
                    <p className="text-gray-400 font-medium animate-pulse">
                        {lang === 'es' ? 'Cargando detalles...' : lang === 'pt' ? 'Carregando detalhes...' : 'Loading details...'}
                    </p>
                </div>
            </div>
        );
    }

    if (error || !species) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-xl text-gray-500">{error}</p>
                <a href={`/${lang}/species`} className="text-accent-green font-bold hover:underline">
                    {lang === 'es' ? "Volver a la lista" : lang === 'pt' ? "Voltar para lista" : "Back to list"}
                </a>
            </div>
        );
    }

    // Localized strings and taxonomy
    const commonName = species[`commonName_${currentLang}` as keyof Species] as string;
    const description = species.description[currentLang as keyof typeof species.description];
    const characteristics = species.characteristics ? species.characteristics[currentLang as keyof typeof species.characteristics] : undefined;

    const taxonomyParts = [
        (species as any).kingdom || "Animalia",
        (species as any).phylum,
        species.class_name,
        species.order,
        species.family,
        species.genus,
    ].filter(Boolean);
    const taxonomy = taxonomyParts.length > 0 ? taxonomyParts.join(" - ") : undefined;

    const sections = [
        { id: 'at-a-glance', label: lang === 'es' ? 'En un vistazo' : 'At a glance' },
        { id: 'distribution', label: lang === 'es' ? 'Distribución' : 'Distribution' },
        { id: 'audios', label: lang === 'es' ? 'Audios y Análisis' : 'Audios & Analysis' },
        { id: 'characteristics', label: lang === 'es' ? 'Características' : 'Ecology' },
        { id: 'taxonomy', label: lang === 'es' ? 'Taxonomía' : 'Taxonomy' },
        { id: 'details', label: lang === 'es' ? 'Detalles del Registro' : 'Record Details' },
    ];

    const getDriveIframe = (url: string) => {
        if (!url) return null;
        const match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        const fileId = match ? match[1] : null;
        if (fileId) {
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        return null;
    };

    const isGoogleDriveLink = (url: string) => {
        return url.includes('docs.google.com') || url.includes('drive.google.com');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Top Spacer for Navigation */}
            <div className="bg-primary-dark h-24 w-full"></div>

            {/* Header Section (Mockup Inspired) */}
            <header className="bg-[#f4f1ea] border-b border-gray-200">
                <div className="container mx-auto px-6 py-12 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                        {/* Species Circle Image */}
                        <div className="relative w-48 h-48 lg:w-56 lg:h-56 shrink-0 shadow-xl overflow-hidden rounded-[20%_80%_80%_20%_/_20%_20%_80%_80%] border-4 border-white animate-fade-in bg-primary-dark">
                            <img
                                src={species.mainImage}
                                alt={commonName}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Title & Scientific Information */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
                                {commonName}
                            </h1>
                            <div className="space-y-1">
                                <h2 className="text-2xl lg:text-3xl font-serif italic text-gray-700">
                                    {species.scientificName}
                                </h2>
                                <p className="text-sm font-bold text-accent-green uppercase tracking-widest">
                                    {species.family} ({species.order})
                                </p>
                            </div>
                        </div>

                        {/* Status Indicators Area */}
                        <div className="grid grid-cols-3 gap-8 md:gap-12 xl:gap-16 shrink-0 items-center justify-center">
                            <div className="text-center group">
                                <div className="mx-auto w-10 h-10 flex items-center justify-center text-gray-400 group-hover:text-primary-dark transition-colors mb-2">
                                    <Bird size={32} />
                                </div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter leading-none mb-1">Mature individuals</p>
                                <p className="text-sm font-black text-gray-800">Unknown</p>
                            </div>

                            <div className="text-center group">
                                <div className="mx-auto w-10 h-10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform mb-2">
                                    <TrendingDown size={32} />
                                </div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter leading-none mb-1">Population trend</p>
                                <p className="text-sm font-black text-gray-800 tracking-tight">Decreasing</p>
                            </div>

                            <div className="text-center group">
                                <div className="mx-auto w-12 h-12 rounded-full bg-[#45a45e] flex items-center justify-center text-white text-lg font-black shadow-lg mb-2 overflow-hidden ring-4 ring-white">
                                    LC
                                </div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter leading-none mb-1">Red List category</p>
                                <p className="text-sm font-black text-gray-800 whitespace-nowrap">Least Concern</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Layout Body */}
            <div className="container mx-auto px-6 py-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
                    {/* Sidebar Sticky Navigation */}
                    <aside className="lg:w-64 shrink-0 lg:sticky lg:top-24 mt-2">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-4 px-2">Contents</h4>
                                <nav className="space-y-1">
                                    {sections.map(section => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                                                setActiveSection(section.id);
                                            }}
                                            className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === section.id
                                                ? 'bg-accent-green/10 text-accent-green'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            {section.label}
                                            <ChevronRight size={14} className={`transition-opacity ${activeSection === section.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="space-y-4 px-2">
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-accent-green transition-colors group">
                                    <Share2 size={14} />
                                    <span>SHARE FACTSHEET</span>
                                </button>
                                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-accent-green transition-colors group">
                                    <FileText size={14} />
                                    <span>CITATIONS</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 max-w-4xl flex flex-col gap-4">

                        {/* Section: At a glance */}
                        <section id="at-a-glance" className="scroll-mt-24 space-y-8">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">La especie</h3>
                            {/* Gallery Inside Sections */}
                            {species.galleryImages && species.galleryImages.length > 0 && (
                                <div className="pt-4">
                                    <SpeciesGallery images={species.galleryImages.map(img => img.url)} />
                                </div>
                            )}
                        </section>

                        {/* Section: Distribution */}
                        <section id="distribution" className="scroll-mt-24 space-y-8 border-t border-gray-100 pt-16">
                            <h3 className="text-2xl font-black text-gray-900">Distribución</h3>
                            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 min-h-[400px] flex items-center justify-center relative p-8 group">
                                <div className="text-center space-y-4 relative z-10 max-w-md">
                                    <MapPin size={48} className="text-accent-green mx-auto animate-bounce" />
                                    <h4 className="text-2xl font-black text-gray-900 leading-tight">
                                        {species.location}
                                    </h4>
                                    <p className="text-gray-500 font-medium">
                                        Esta especie habita predominantemente en áreas geográficas identificadas en los registros de observación.
                                    </p>
                                    <div className="pt-4 flex flex-wrap justify-center gap-2">
                                        <span className="px-4 py-1.5 bg-white rounded-full border border-gray-200 text-xs font-bold text-gray-600 shadow-sm">
                                            {species.databaseDetails?.stateProvince || 'Loreto'}
                                        </span>
                                        <span className="px-4 py-1.5 bg-white rounded-full border border-gray-200 text-xs font-bold text-gray-600 shadow-sm">
                                            {species.databaseDetails?.country || 'Perú'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Audios & Analysis */}
                        <section id="audios" className="scroll-mt-24 space-y-12 border-t border-gray-100 pt-16">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black text-gray-900">Audios y Análisis Acústico</h3>
                                <p className="text-gray-500 max-w-2xl">
                                    Explora la fonología y los patrones acústicos a través de grabaciones en alta fidelidad y espectrogramas dinámicos.
                                </p>
                            </div>

                            <div className="space-y-16">
                                {species.audios.map((audio) => (
                                    <div key={audio.id} className="space-y-6">
                                        {isGoogleDriveLink(audio.url) ? (
                                            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center space-y-6">
                                                <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                                    <Lock size={32} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="text-xl font-black text-gray-900">Reproducción Protegida</h4>
                                                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                                                        Este audio está alojado en un sistema seguro. Utiliza el reproductor oficial de Google Drive a continuación para escucharlo.
                                                    </p>
                                                </div>

                                                <div className="relative aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black border border-gray-800">
                                                    <iframe
                                                        src={getDriveIframe(audio.url) || ''}
                                                        className="absolute inset-0 w-full h-full"
                                                        allow="autoplay"
                                                        title="Drive Protected Player"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <AudioPlayer
                                                audioUrl={audio.url}
                                                title={audio.title ?? undefined}
                                                artist={commonName}
                                                description={audio.description ?? undefined}
                                                spectrogramImage={audio.spectrogramImage ?? undefined}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Spectrograms Gallery */}
                            {species.spectrograms && species.spectrograms.length > 0 && (
                                <div className="pt-12 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <hr className="flex-1 border-gray-100" />
                                        <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-400">Visual Analysis Gallery</h4>
                                        <hr className="flex-1 border-gray-100" />
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                        <SpeciesGallery images={species.spectrograms.map(img => img.url)} />
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Section: Ecology / Characteristics */}
                        <section id="characteristics" className="scroll-mt-24 space-y-8 border-t border-gray-100 pt-16">
                            <h3 className="text-2xl font-black text-gray-900">Ecology & Description</h3>
                            <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none">
                                <p className="mb-8 p-8 bg-gray-50 rounded-[2rem] italic border-l-8 border-accent-green font-medium">
                                    {description}
                                </p>
                            </div>

                            {characteristics && characteristics.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {characteristics.map((char, idx) => (
                                        <div key={idx} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm items-start group hover:border-accent-green/20 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-green mt-2 group-hover:scale-150 transition-transform" />
                                            <p className="text-sm font-medium text-gray-600 leading-relaxed">{char}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Section: Taxonomy */}
                        <section id="taxonomy" className="scroll-mt-24 space-y-8 border-t border-gray-100 pt-16">
                            <div className="p-8 bg-primary-dark rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <h3 className="text-2xl font-black text-white mb-8 relative z-10">Scientific Taxonomy</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                                    {[
                                        { label: 'KINGDOM', value: 'Animalia' },
                                        { label: 'CLASS', value: species.class_name },
                                        { label: 'ORDER', value: species.order },
                                        { label: 'FAMILY', value: species.family }
                                    ].map((item, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <p className="text-[10px] font-black text-white/30 tracking-[0.2em]">{item.label}</p>
                                            <p className="text-xl font-black text-white">{item.value || '-'}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-green opacity-5 blur-[100px] rounded-full group-hover:opacity-10 transition-opacity" />
                            </div>
                        </section>

                        {/* Section: Details del Registro */}
                        <section id="details" className="scroll-mt-24 space-y-12 border-t border-gray-100 pt-16">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-gray-900 leading-tight">Record Details</h3>
                                    <p className="text-gray-500 font-medium">Metadatos técnicos y contexto del especimen observado.</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-accent-green text-white text-[10px] font-black tracking-widest uppercase rounded">VERIFIED</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-400 text-[10px] font-black tracking-widest uppercase rounded">CATALOGED</span>
                                </div>
                            </div>

                            {species.databaseDetails && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h4 className="text-sm font-black text-gray-400 tracking-widest uppercase mb-4">Identification</h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Occurrence ID', value: species.databaseDetails.occurrenceID },
                                                { label: 'Identified By', value: species.databaseDetails.identifiedBy },
                                                { label: 'Life Stage', value: species.databaseDetails.lifeStage },
                                                { label: 'Sex', value: species.databaseDetails.sex },
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-end gap-4 border-b border-gray-50 pb-2">
                                                    <p className="text-xs font-bold text-gray-400 uppercase">{item.label}</p>
                                                    <p className="text-sm font-black text-gray-900 truncate max-w-[200px]" title={item.value || '-'}>{item.value || '-'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-sm font-black text-gray-400 tracking-widest uppercase mb-4">Specimen Logic</h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Catalog Number', value: species.databaseDetails.catalogNumber },
                                                { label: 'Institution Code', value: species.databaseDetails.institutionCode },
                                                { label: 'Event Date', value: species.databaseDetails.eventDate },
                                                { label: 'Basis of Record', value: species.databaseDetails.basisOfRecord },
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-end gap-4 border-b border-gray-50 pb-2">
                                                    <p className="text-xs font-bold text-gray-400 uppercase">{item.label}</p>
                                                    <p className="text-sm font-black text-gray-900">{item.value || '-'}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* CTA / Support Section (Image 4 Inspired) */}
                        <div className="pt-24">
                            <div className="bg-[#45a45e] p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group shadow-2xl shadow-accent-green/20 text-white">
                                <div className="relative z-10 space-y-6 text-center md:text-left">
                                    <h3 className="text-4xl font-black leading-tight max-w-md">Support our science</h3>
                                    <p className="text-white/80 font-medium max-w-sm">
                                        We rely on recordings to keep this service running and help biodiversity thrive around the world.
                                    </p>
                                    <button className="px-10 py-4 bg-gray-900 text-white font-black rounded-xl hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl inline-flex items-center gap-2 group">
                                        DONATE NOW <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                                <div className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 grayscale brightness-110 group-hover:grayscale-0 group-hover:brightness-125 transition-all duration-700">
                                    <img src="/images/logo-mini.webp" alt="Support owl" className="w-full h-full object-contain" />
                                </div>
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
                                <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-green-dark/20 rounded-full blur-[100px]" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
