import React, { useEffect, useState } from 'react';
import { getSpeciesById, type Species } from '../../data/species';
import { translations, type Language } from '../../i18n/data';
import { PageBanner } from './PageBanner';
import { SpeciesGallery } from './SpeciesGallery';
import { AudioPlayer } from './AudioPlayer';

interface Props {
    id: string;
    lang: string;
}

export const SpeciesDetailClient: React.FC<Props> = ({ id, lang }) => {
    const [species, setSpecies] = useState<Species | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                        // Backup for React hydration race conditions
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
    
    const breadcrumbs = {
        backLink: `/${lang}/species`,
        backText: lang === "es" ? "Volver a la lista" : lang === "pt" ? "Voltar para lista" : "Back to list",
        currentText: lang === "es" ? "Detalles" : lang === "pt" ? "Detalhes" : "Details",
    };

    const taxonomyParts = [
        (species as any).kingdom || "Animalia",
        (species as any).phylum,
        species.class_name,
        species.order,
        species.family,
        species.genus,
    ].filter(Boolean);
    const taxonomy = taxonomyParts.length > 0 ? taxonomyParts.join(" - ") : undefined;

    return (
        <main className="animate-fade-in">
           <PageBanner
                title={commonName}
                subtitle={species.scientificName}
                image={species.mainImage}
                breadcrumbs={breadcrumbs}
                taxonomy={taxonomy}
            />

            <section className="py-24 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Header Section: Titles & Location */}
                        <div className="text-center mb-12">
                            {taxonomy && (
                                <div className="mb-4 text-accent-green font-bold text-xs md:text-sm uppercase tracking-widest">
                                    {taxonomy}
                                </div>
                            )}
                            <h1 className="text-4xl md:text-6xl text-primary-dark dark:text-white font-light mb-4">
                                {commonName}
                            </h1>
                            <h2 className="text-2xl md:text-3xl text-accent-green font-serif italic mb-6">
                                {species.scientificName}
                            </h2>

                            <div className="inline-flex items-center gap-3 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-6 py-3 rounded-full border border-gray-100 dark:border-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-accent-green">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span className="font-medium">{species.location}</span>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        {species.galleryImages && species.galleryImages.length > 0 && (
                            <div className="mb-16">
                                <SpeciesGallery images={species.galleryImages.map(img => img.url)} />
                            </div>
                        )}
                    </div>

                    <div className="mb-16 w-full max-w-5xl mx-auto">
                        <h3 className="text-3xl font-bold text-primary-dark dark:text-white mb-8 text-center">
                            {lang === "es" ? "Análisis Acústico (Audios y Visualización)" : lang === "pt" ? "Análise Acústica" : "Acoustic Analysis"}
                        </h3>
                        <div className="space-y-12">
                            {species.audios.map((audio) => (
                                <div key={audio.id} className="w-full">
                                    <AudioPlayer
                                        audioUrl={audio.url}
                                        title={audio.title ?? undefined}
                                        artist={commonName}
                                        description={audio.description ?? undefined}
                                        spectrogramImage={audio.spectrogramImage ?? undefined}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Spectrograms Gallery Section */}
                    {species.spectrograms && species.spectrograms.length > 0 && (
                        <div className="mb-16 w-full max-w-5xl mx-auto border-t border-gray-100 dark:border-gray-800 pt-16">
                            <h3 className="text-3xl font-bold text-primary-dark dark:text-white mb-8 text-center">
                                {lang === "es" ? "Galería de Espectrogramas / Histogramas" : lang === "pt" ? "Galeria de Espectrogramas" : "Spectrograms Gallery"}
                            </h3>
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl">
                                <SpeciesGallery images={species.spectrograms.map(img => img.url)} />
                            </div>
                        </div>
                    )}

                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 dark:border-gray-800 pt-12">
                            {/* Descriptive Info */}
                            <div className="md:col-span-2 space-y-8">
                                <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
                                    <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-4">
                                        {lang === "es" ? "Descripción" : lang === "pt" ? "Descrição" : "Description"}
                                    </h3>
                                    <p>{description}</p>
                                </div>
                                <hr className="border-gray-100 dark:border-gray-800" />
                                
                                {/* Database Details Card */}
                                {species.databaseDetails && (
                                    <div className="bg-white dark:bg-[#121b28]">
                                        <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-6">
                                            {lang === "es" ? "Detalles del Registro" : lang === "pt" ? "Detalhes do Registro" : "Record Details"}
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {/* Taxonomía */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                                                    {lang === "es" ? "Taxonomía" : "Taxonomy"}
                                                </h4>
                                                <dl className="space-y-2 text-sm">
                                                    {[
                                                        { label: "Clase", value: species.class_name },
                                                        { label: "Orden", value: species.order },
                                                        { label: "Familia", value: species.family },
                                                        { label: "Género", value: species.genus },
                                                    ].map((item, idx) => item.value && (
                                                        <div key={idx} className="flex justify-between border-b border-gray-50 dark:border-gray-800 pb-1">
                                                            <dt className="text-gray-500 dark:text-gray-400">{item.label}</dt>
                                                            <dd className="font-medium text-gray-900 dark:text-white italic">{item.value}</dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            </div>

                                            {/* Evento y Localidad */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                                                    {lang === "es" ? "Evento y Localidad" : "Event & Location"}
                                                </h4>
                                                <dl className="space-y-2 text-sm">
                                                    {[
                                                        { label: lang === "es" ? "Fecha" : "Date", value: species.databaseDetails?.eventDate },
                                                        { label: lang === "es" ? "País" : "Country", value: species.databaseDetails?.country },
                                                        { label: lang === "es" ? "Estado/Provincia" : "State/Province", value: species.databaseDetails?.stateProvince },
                                                        { label: lang === "es" ? "Localidad" : "Locality", value: species.databaseDetails?.locality },
                                                        {
                                                            label: "Elevación",
                                                            value: species.databaseDetails?.elevation ? `${species.databaseDetails.elevation}m` : null,
                                                        },
                                                    ].map((item, idx) => item.value && (
                                                        <div key={idx} className="flex justify-between border-b border-gray-50 dark:border-gray-800 pb-1 gap-2">
                                                            <dt className="text-gray-500 dark:text-gray-400 shrink-0">{item.label}</dt>
                                                            <dd className="font-medium text-gray-900 dark:text-white truncate" title={item.value.toString()}>
                                                                {item.value}
                                                            </dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            </div>

                                            {/* Especimen */}
                                            <div className="space-y-4 sm:col-span-2 mt-2">
                                                <h4 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                                                    {lang === "es" ? "Detalles del Especimen" : "Specimen Details"}
                                                </h4>
                                                <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 dark:bg-[#0c141d] p-4 rounded-xl">
                                                    {[
                                                        { label: "Sex", value: species.databaseDetails?.sex },
                                                        { label: "Life Stage", value: species.databaseDetails?.lifeStage },
                                                        { label: "Institution", value: species.databaseDetails?.institutionCode },
                                                        { label: "Catalog No.", value: species.databaseDetails?.catalogNumber },
                                                        { label: "Identified By", value: species.databaseDetails?.identifiedBy },
                                                    ].map((item, idx) => item.value && (
                                                        <div key={idx}>
                                                            <dt className="text-xs text-gray-500 dark:text-gray-400 uppercase">{item.label}</dt>
                                                            <dd className="font-bold text-gray-900 dark:text-white mt-1">{item.value}</dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar / Actions */}
                            <div className="space-y-8">
                                {characteristics && characteristics.length > 0 && (
                                    <div className="bg-gray-50 dark:bg-[#121b28] p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                        <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-4">
                                            {lang === "es" ? "Notas Adicionales" : lang === "pt" ? "Notas Adicionais" : "Additional Notes"}
                                        </h3>
                                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                            {characteristics.map((char, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-accent-green mt-0.5">•</span>
                                                    {char}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div>
                                    <button className="w-full px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-accent-green hover:text-accent-green transition-all font-bold flex items-center justify-center gap-2 bg-white dark:bg-[#121b28] shadow-sm hover:shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                        </svg>
                                        {lang === "es" ? "Compartir" : lang === "pt" ? "Compartilhar" : "Share"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
