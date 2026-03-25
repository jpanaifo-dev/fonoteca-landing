
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

import { supabase } from "../lib/supabase";

export async function getAllSpecies(): Promise<Species[]> {
    const { data: occurrences, error } = await supabase
        .from("occurrences")
        .select(`
            id,
            occurrenceID,
            taxon_id,
            location_id,
            taxa (
                *,
                genus:genera (
                    *,
                    family:families (*)
                )
            ),
            locations (*),
            multimedia (*)
        `);

    if (error) {
        console.error("Error fetching species from Supabase:", error);
        return [];
    }

    if (error) {
        console.error("Error fetching species from Supabase:", error);
        return [];
    }

    return (occurrences as any[] || []).map((occ) => {
        const taxon = occ.taxa;
        const location = occ.locations;
        const media = occ.multimedia || [];

        const isImage = (m: any) => m.type === 'Still' || (m.type && m.type.toLowerCase().includes('image'));
        const isAudio = (m: any) => m.type === 'Sound' || (m.type && m.type.toLowerCase().includes('sound'));

        const formatMediaUrl = (identifier: string) => {
            if (!identifier) return "";
            if (identifier.includes('drive.google.com/file/d/')) {
                const idMatch = identifier.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                if (idMatch && idMatch[1]) {
                    return `https://docs.google.com/uc?export=download&id=${idMatch[1]}`;
                }
            }
            return identifier;
        };

        const galleryImages = media
            .filter(isImage)
            .map((m: any) => formatMediaUrl(m.identifier));

        const audios: SpeciesAudio[] = media
            .filter(isAudio)
            .map((m: any) => {
                let spectrogram = media.find(
                    (other: any) => (other.parent_multimedia_id === m.id || other.tag === 'spectrogram') && isImage(other)
                );

                // Heuristic fallback: Use the last image if no explicit match
                if (!spectrogram) {
                    const allImages = media.filter(isImage);
                    if (allImages.length > 1) {
                        spectrogram = allImages[allImages.length - 1];
                    }
                }

                return {
                    title: m.title || "Audio",
                    url: formatMediaUrl(m.identifier),
                    description: m.description || "",
                    spectrogramImage: spectrogram ? formatMediaUrl(spectrogram.identifier) : undefined,
                };
            });

        // Backend Filter: skip occurrences that have NO audio recordings
        // if (audios.length === 0) return null;

        const classToCategory: Record<string, SpeciesCategory> = {
            Amphibia: "Amphibians",
            Aves: "Birds",
            Mammalia: "Mammals",
            Insecta: "Crickets",
            Reptilia: "Reptiles",
        };

        const class_name = taxon?.genus?.family?.class || "";
        const category = classToCategory[class_name] || "Amphibians";
        const commonName = taxon?.vernacularName || "Sin Nombre";

        return {
            id: occ.id || "unknown", // Absolute occurrence UUID to keep duplicates discrete
            scientificName: taxon?.scientificName || "Unknown",
            commonName_es: commonName,
            commonName_en: commonName,
            commonName_pt: commonName,
            category: category,
            description: {
                es: "Descripción del registro.",
                en: "Record description.",
                pt: "Descrição do registro.",
            },
            characteristics: {
                es: ["Disponible en Base de Datos"],
                en: ["Available in Database"],
                pt: ["Disponível no Banco de Datos"],
            },
            mainImage: galleryImages.length > 0 ? galleryImages[0] : "https://upload.wikimedia.org/wikipedia/commons/b/ba/No_image_available_400_x_400.png",
            galleryImages: galleryImages,
            audios: audios,
            location: location?.locality || "Unknown Location",
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
                continent: location?.continent,
                country: location?.country,
                stateProvince: location?.stateProvince,
                locality: location?.locality,
                decimalLatitude: location?.decimalLatitude,
                decimalLongitude: location?.decimalLongitude,
                elevation: location?.elevation,
            }
        };
    }).filter(Boolean) as unknown as Species[];
}

export async function getSpeciesById(id: string): Promise<Species | undefined> {
    const speciesList = await getAllSpecies();
    return speciesList.find((s) => s.id === id);
}

