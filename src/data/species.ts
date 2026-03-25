
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
    spectrograms: string[];
    audios: SpeciesAudio[]; // List of audios
    location: string;
    genus?: string;
    family?: string;
    order?: string;
    class_name?: string;
    databaseDetails?: {
        occurrenceID?: string;
        basisOfRecord?: string;
        institutionCode?: string;
        collectionCode?: string;
        catalogNumber?: string;
        eventDate?: string;
        eventTime?: string;
        lifeStage?: string;
        sex?: string;
        identifiedBy?: string;
        continent?: string;
        country?: string;
        stateProvince?: string;
        locality?: string;
        decimalLatitude?: number;
        decimalLongitude?: number;
        elevation?: number;
    };
}

export interface SpeciesFilterOptions {
    searchTerm?: string;
    location?: string;
    className?: string;
    order?: string;
    family?: string;
    genus?: string;
    onlyWithAudio?: boolean;
    page?: number;
    limit?: number;
}

import { supabase } from "../lib/supabase";

export async function getAllSpecies(options: SpeciesFilterOptions = {}): Promise<{ species: Species[], totalCount: number }> {
    const {
        searchTerm,
        location,
        className,
        order,
        family,
        genus,
        onlyWithAudio,
        page = 1,
        limit = 20
    } = options;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Base query for counting AND fetching
    // To filter only with audio from backend, we use !inner join on multimedia when onlyWithAudio is true
    const multimediaSelect = onlyWithAudio ? 'multimedia!inner(*)' : 'multimedia(*)';

    let query = supabase
        .from("occurrences")
        .select(`
            id,
            occurrenceID,
            taxon_id,
            location_id,
            taxa!inner (
                scientificName,
                vernacularName,
                genus:genera!inner (
                    name,
                    family:families!inner (
                        name,
                        order,
                        class
                    )
                )
            ),
            locations!inner (*),
            ${multimediaSelect}
        `, { count: 'exact' });

    // 1. Search filter
    if (searchTerm) {
        query = query.or(`scientificName.ilike.%${searchTerm}%,vernacularName.ilike.%${searchTerm}%`, { foreignTable: 'taxa' });
    }

    // 2. Taxonomic filters (Category was mapped to class, now we use class directly)
    if (className && className !== 'All') {
        query = query.eq('taxa.genus.family.class', className);
    }

    if (order && order !== 'All') {
        query = query.eq('taxa.genus.family.order', order);
    }

    if (family && family !== 'All') {
        query = query.eq('taxa.genus.family.name', family);
    }

    if (genus && genus !== 'All') {
        query = query.eq('taxa.genus.name', genus);
    }

    // 3. Location filter
    if (location && location !== 'All') {
        query = query.eq('locations.locality', location);
    }

    // 4. Audio filter (Backend)
    if (onlyWithAudio) {
        query = query.eq('multimedia.type', 'Sound');
    }

    // 5. Pagination
    query = query.range(from, to);

    const { data: occurrences, error, count } = await query;

    if (error) {
        console.error("Error fetching species from Supabase:", error);
        return { species: [], totalCount: 0 };
    }

    let speciesList = (occurrences as any[] || []).map((occ) => {
        const taxon = occ.taxa;
        const loc = occ.locations;
        const media = occ.multimedia || [];

        const isImage = (m: any) => (m.type === 'Still' || (m.type && m.type.toLowerCase().includes('image')) || m.format?.includes('image'));
        const isAudio = (m: any) => (m.type === 'Sound' || (m.type && m.type.toLowerCase().includes('sound')) || m.format?.includes('audio'));

        const formatMediaUrl = (identifier: string) => {
            if (!identifier) return "";
            // If it's a Drive URL, use the preview viewer
            if (identifier.includes('drive.google.com/file/d/')) {
                const idMatch = identifier.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                if (idMatch && idMatch[1]) {
                    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
                }
            }
            // If it's a local path or a full URL, return it as is
            return identifier;
        };

        // Images are those with tag 'gallery' or no tag
        const photos = media
            .filter((m: any) => isImage(m) && (m.tag === 'gallery' || !m.tag))
            .map((m: any) => formatMediaUrl(m.identifier));

        // Spectrograms are those with tag 'spectrogram'
        const spectrogramsList = media
            .filter((m: any) => m.tag === 'spectrogram' && isImage(m));

        const audios: SpeciesAudio[] = media
            .filter(isAudio)
            .map((m: any) => {
                // Find associated spectrogram: either by parent_multimedia_id OR by title match if same occurrence
                let spectrogram = spectrogramsList.find(
                    (s: any) => s.parent_multimedia_id === m.id || (s.title && m.title && s.title.includes(m.title))
                );
                
                return {
                    title: m.title || "Audio",
                    url: formatMediaUrl(m.identifier),
                    description: m.description || "",
                    spectrogramImage: spectrogram ? formatMediaUrl(spectrogram.identifier) : undefined,
                };
            });

        const classToCategory: Record<string, SpeciesCategory> = {
            'Amphibia': "Amphibians",
            'Aves': "Birds",
            'Mammalia': "Mammals",
            'Insecta': "Crickets",
            'Reptilia': "Reptiles",
        };

        const class_name = taxon?.genus?.family?.class || "";
        const cat = classToCategory[class_name] || "Amphibians";
        const commonName = taxon?.vernacularName || "Sin Nombre";

        return {
            id: occ.id || "unknown",
            scientificName: taxon?.scientificName || "Unknown",
            commonName_es: commonName,
            commonName_en: commonName,
            commonName_pt: commonName,
            category: cat,
            description: {
                es: "Descripción del registro.",
                en: "Record description.",
                pt: "Descrição do registro.",
            },
            mainImage: photos.length > 0 ? photos[0] : "https://upload.wikimedia.org/wikipedia/commons/b/ba/No_image_available_400_x_400.png",
            galleryImages: photos,
            spectrograms: spectrogramsList.map((s: any) => formatMediaUrl(s.identifier)),
            audios: audios,
            location: loc?.locality || "Unknown Location",
            genus: taxon?.genus?.name,
            family: taxon?.genus?.family?.name,
            order: taxon?.genus?.family?.order,
            class_name: taxon?.genus?.family?.class,
            databaseDetails: {
                occurrenceID: occ?.occurrenceID,
                basisOfRecord: occ?.basisOfRecord,
                institutionCode: occ?.institutionCode,
                collectionCode: occ?.collectionCode,
                catalogNumber: occ?.catalogNumber,
                eventDate: occ?.eventDate,
                eventTime: occ?.eventTime,
                lifeStage: occ?.lifeStage,
                sex: occ?.sex,
                identifiedBy: occ?.identifiedBy,
                continent: loc?.continent,
                country: loc?.country,
                stateProvince: loc?.stateProvince,
                locality: loc?.locality,
                decimalLatitude: loc?.decimalLatitude,
                decimalLongitude: loc?.decimalLongitude,
                elevation: loc?.elevation,
            }
        };
    });

    return { 
        species: speciesList, 
        totalCount: count || 0 
    };
}

export async function getSpeciesById(id: string): Promise<Species | undefined> {
    const { species } = await getAllSpecies({ limit: 1000 }); // Heuristic for now
    return species.find((s) => s.id === id);
}

// Helper to fetch unique filter values directly from Supabase
export async function getFilterMetaData() {
    const { data: taxa } = await supabase
        .from('taxa')
        .select(`
            scientificName, 
            vernacularName, 
            genus:genera!inner(
                name, 
                family:families!inner(
                    name, 
                    order, 
                    class
                )
            )
        `) as { data: any[] | null };
        
    const { data: locs } = await supabase.from('locations').select('locality') as { data: any[] | null };

    const classes = Array.from(new Set(taxa?.map(t => t.genus?.family?.class).filter(Boolean))).sort();
    const orders = Array.from(new Set(taxa?.map(t => t.genus?.family?.order).filter(Boolean))).sort();
    const families = Array.from(new Set(taxa?.map(t => t.genus?.family?.name).filter(Boolean))).sort();
    const genera = Array.from(new Set(taxa?.map(t => t.genus?.name).filter(Boolean))).sort();
    const localities = Array.from(new Set(locs?.map(l => l.locality).filter(Boolean))).sort();

    return { classes, orders, families, genera, localities };
}
