
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
import fs from 'fs';
import path from 'path';

const categoryMapSlug: Record<string, string> = {
    Amphibians: "anfibios",
    Birds: "aves",
    Mammals: "mamiferos",
    Crickets: "grillos",
    Reptiles: "reptiles",
};

// Fallback search to read physical files on local public/ folder node builds
function getFallbackPublicMedia(category: string, slug: string) {
    const slugLower = slug.toLowerCase();
    const catSlug = categoryMapSlug[category] || "anfibios";
    const dirPath = path.join(process.cwd(), 'public', 'data', catSlug, slugLower);

    try {
        if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath);
            const image = files.find(f => {
                const fLower = f.toLowerCase();
                return fLower.endsWith('.jpg') || fLower.endsWith('.jpeg') || fLower.endsWith('.png') || fLower.endsWith('.webp');
            });
            const audio = files.find(f => f.toLowerCase().endsWith('.wav') || f.toLowerCase().endsWith('.ogg') || f.toLowerCase().endsWith('.mp3'));
            const spectrogram = files.find(f => f.toLowerCase().includes('fft') && f.toLowerCase().endsWith('.png'));

            return {
                image: image ? `/data/${catSlug}/${slugLower}/${image}` : null,
                audio: audio ? `/data/${catSlug}/${slugLower}/${audio}` : null,
                spectrogram: spectrogram ? `/data/${catSlug}/${slugLower}/${spectrogram}` : null
            };
        }
    } catch (e) {
        // Fallback or permission fail securely
    }
    return { image: null, audio: null, spectrogram: null };
}

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

    // Group occurrences by Taxon (Scientific Name) to avoid duplicates in the list
    const speciesMap = new Map<string, { taxon: any; location: any; media: any[]; occurrenceID: string }>();

    (occurrences as any[] || []).forEach((occ) => {
        const taxon = occ.taxa;
        if (!taxon) return;
        
        const key = taxon.scientificName;
        if (!speciesMap.has(key)) {
            speciesMap.set(key, {
                taxon: taxon,
                location: occ.locations, // Uses the first encountered location
                media: [],
                occurrenceID: occ.occurrenceID
            });
        }

        const group = speciesMap.get(key)!;
        if (occ.multimedia && Array.isArray(occ.multimedia)) {
             group.media.push(...occ.multimedia);
        }
    });

    return Array.from(speciesMap.values()).map(({ taxon, location, media, occurrenceID }) => {
        // Case-insensitive media matching with extension check to avoid garbage paths (like 'Dashboard')
        const isImage = (m: any) => {
            if (!m.identifier) return false;
            const idLower = m.identifier.toLowerCase();
            const hasImageExtension = idLower.endsWith('.jpg') || 
                                     idLower.endsWith('.jpeg') || 
                                     idLower.endsWith('.png') || 
                                     idLower.endsWith('.webp') ||
                                     idLower.startsWith('http');
            
            const typeMatch = m.type && m.type.toLowerCase().includes('image');
            return typeMatch && hasImageExtension;
        };
        
        const isAudio = (m: any) => m.type && (m.type.toLowerCase().includes('sound') || m.type.toLowerCase().includes('audio'));

        const formatMediaUrl = (identifier: string) => {
            if (!identifier) return "/placeholder.jpg";
            if (identifier.startsWith('http://') || identifier.startsWith('https://')) {
                return identifier;
            }
            const supabaseUrl = import.meta.env.SUPABASE_URL || '';
            const publicUrlPath = `${supabaseUrl}/storage/v1/object/public/multimedia/${identifier}`;
            return publicUrlPath;
        };

        // Main Image - Prioritise title "Main Image" or grab the first image found
        const mainImageMedia = media.find((m) => m.title === "Main Image") || media.find(isImage);
        const mainImage = mainImageMedia ? formatMediaUrl(mainImageMedia.identifier) : "/placeholder.jpg";

        // Gallery Images - Exclude main to avoid duplicates
        const galleryImages = media
            .filter(isImage)
            .filter((m) => m.identifier !== mainImageMedia?.identifier)
            .map((m) => formatMediaUrl(m.identifier));

        // Audios
        const audios: SpeciesAudio[] = media
            .filter(isAudio)
            .map((m) => ({
                title: m.title || "Audio",
                url: formatMediaUrl(m.identifier),
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
        const occSlug = occurrenceID.split("_")[0] || "unknown";

        // Physical Local Fallback Loader 
        const publicFallbacks = getFallbackPublicMedia(category, occSlug);

        // Apply physical fallbacks if DB returned nothing
        let resolvedMainImage = mainImage;
        if (mainImage === "/placeholder.jpg" && publicFallbacks.image) {
            resolvedMainImage = publicFallbacks.image;
        }

        let resolvedAudios = audios;
        if (audios.length === 0 && publicFallbacks.audio) {
            resolvedAudios = [{
                title: "Canto Local",
                url: publicFallbacks.audio,
                description: "Registro de respaldo local.",
                spectrogramImage: publicFallbacks.spectrogram || undefined
            }];
        }

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
                pt: "Descrição do registro cargado do Banco de Datos.",
            },
            characteristics: {
                es: ["Disponible en Base de Datos"],
                en: ["Available in Database"],
                pt: ["Disponível no Banco de Datos"],
            },
            mainImage: resolvedMainImage,
            galleryImages: galleryImages,
            audios: resolvedAudios,
            location: location?.locality || "Unknown Location",
        };
    });
}

export async function getSpeciesById(id: string): Promise<Species | undefined> {
    const speciesList = await getAllSpecies();
    return speciesList.find((s) => s.id === id);
}

