
export interface SpeciesAudio {
    title: string;
    url: string;
    description?: string;
    spectrogramImage?: string; // Optional static spectrogram image
}

export type SpeciesCategory = 'Amphibians' | 'Birds' | 'Mammals' | 'Crickets' | 'Reptiles';

export interface Species {
    id: string; // Slug for URL
    scientificName: string;
    commonName_es: string;
    commonName_en: string;
    commonName_pt: string;
    category: SpeciesCategory;
    description: {
        es: string;
        en: string;
        pt: string;
    };
    characteristics?: {
        es: string[];
        en: string[];
        pt: string[];
    };
    mainImage: string;
    galleryImages: string[];
    audios: SpeciesAudio[]; // List of audios
    location: string;
}

import { supabase } from "../lib/supabase";

export async function getAllSpecies(): Promise<Species[]> {
    const { data: occurrences, error } = await supabase
        .from("occurrences")
        .select(`
            id,
            occurrenceID,
            taxon_id,
            location_id,
            taxa (*),
            locations (*),
            multimedia (*)
        `);

    if (error) {
        console.error("Error fetching species from Supabase:", error);
        return [];
    }

    return (occurrences as any[] || []).map((occ) => {
        const taxon = occ.taxa;
        const location = occ.locations;
        const media = (occ.multimedia as any[]) || [];

        // Case-insensitive media matching
        const isImage = (m: any) => m.type && m.type.toLowerCase().includes('image');
        const isAudio = (m: any) => m.type && (m.type.toLowerCase().includes('sound') || m.type.toLowerCase().includes('audio'));

        // Main Image
        const mainImageMedia = media.find(
            (m) => m.title === "Main Image" || isImage(m)
        );
        const mainImage = mainImageMedia ? mainImageMedia.identifier : "/placeholder.jpg";

        // Gallery Images
        const galleryImages = media
            .filter(isImage)
            .map((m) => m.identifier);

        // Audios
        const audios: SpeciesAudio[] = media
            .filter(isAudio)
            .map((m) => ({
                title: m.title || "Audio",
                url: m.identifier,
                description: m.description || "",
                spectrogramImage: undefined,
            }));

        // Category Map
        const classToCategory: Record<string, SpeciesCategory> = {
            Amphibia: "Amphibians",
            Aves: "Birds",
            Mammalia: "Mammals",
            Insecta: "Crickets",
            Reptilia: "Reptiles",
        };

        const category = classToCategory[taxon?.class || ""] || "Amphibians";
        const commonName = taxon?.vernacularName || "Sin Nombre";
        
        // Extract slug
        const occSlug = occ.occurrenceID.split("_")[0] || "unknown";

        return {
            id: occSlug,
            scientificName: taxon?.scientificName || "Unknown",
            commonName_es: commonName,
            commonName_en: commonName,
            commonName_pt: commonName,
            category: category,
            description: {
                es: "Descripción del registro cargado desde Base de Datos.",
                en: "Record description loaded from Database.",
                pt: "Descrição do registro carregado do Banco de Datos.",
            },
            characteristics: {
                es: ["Disponible en Base de Datos"],
                en: ["Available in Database"],
                pt: ["Disponível no Banco de Datos"],
            },
            mainImage: mainImage,
            galleryImages: galleryImages,
            audios: audios,
            location: location?.locality || "Unknown Location",
        };
    });
}

export async function getSpeciesById(id: string): Promise<Species | undefined> {
    const speciesList = await getAllSpecies();
    return speciesList.find((s) => s.id === id);
}

