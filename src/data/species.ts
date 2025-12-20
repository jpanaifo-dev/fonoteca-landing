
export interface SpeciesAudio {
    title: string;
    url: string;
    description?: string;
    spectrogramImage?: string; // Optional static spectrogram image
}

export type SpeciesCategory = 'Amphibians' | 'Birds' | 'Mammals' | 'Insects' | 'Reptiles';

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

export const speciesData: Species[] = [
    // Amphibians
    {
        id: "adenomera-hylaedactyla",
        scientificName: "Adenomera hylaedactyla",
        commonName_es: "Rana de dedos delgados de manchas oscuras",
        commonName_en: "Dark-spotted Thin-toed Frog",
        commonName_pt: "Rã-de-dedos-finos-de-manchas-escuras",
        category: "Amphibians",
        description: {
            es: "Una rana pequeña, terrestre y activa tanto de día como de noche. Habita comúnmente en áreas abiertas y bordes de bosques.",
            en: "A small, terrestrial frog active both day and night. Commonly inhabits open areas and forest edges.",
            pt: "Uma pequena rã terrestre ativa tanto de dia quanto de noite. Habita comumente áreas abertas e bordas de florestas."
        },
        characteristics: {
            es: ["Coloración dorsal de gris a marrón", "Pliegues dorsolaterales glandulares bien definidos", "Vientre blanco"],
            en: ["Dorsal coloration gray to brown", "Well-defined glandular dorsolateral folds", "White belly"],
            pt: ["Coloração dorsal de cinza a marrom", "Dobras dorsolaterais glandulares bem definidas", "Ventre branco"]
        },
        mainImage: "/data/anfibios/adenomera_hylaedactyla/IMG_0081.JPG",
        galleryImages: [
            "/data/anfibios/adenomera_hylaedactyla/IMG_0081.JPG",
            "https://inaturalist-open-data.s3.amazonaws.com/photos/103254922/large.jpg"
        ],
        audios: [
            {
                title: "Canto Principal",
                url: "/data/anfibios/adenomera_hylaedactyla/Adenomera_hylaedactyla_CIA_NRT_0023.wav",
                description: "Llamada registrada.",
                spectrogramImage: "/data/anfibios/adenomera_hylaedactyla/Adenomera_hylaedactyla_CIA_NRT_0023_.wav.256FFT.png"
            }
        ],
        location: "Amazon Basin"
    },
    {
        id: "allobates-femoralis",
        scientificName: "Allobates femoralis",
        commonName_es: "Rana Venenosa de Muslos Brillantes",
        commonName_en: "Brilliant-thighed Poison Frog",
        commonName_pt: "Rã-venenosa-de-coxas-brilhantes",
        category: "Amphibians",
        description: {
            es: "Conocida por el parche de color naranja brillante o amarillo en sus muslos. Es diurna y terrestre.",
            en: "Known for the bright orange or yellow patch on its thighs. It is diurnal and terrestrial.",
            pt: "Conhecida pela mancha laranja brilhante ou amarela em suas coxas. É diurna e terrestre."
        },
        characteristics: {
            es: ["Raya dorsolateral pálida", "Garganta negra en machos", "Piel ligeramente granular"],
            en: ["Pale dorsolateral stripe", "Black throat in males", "Slightly granular skin"],
            pt: ["Listra dorsolateral pálida", "Garganta preta nos machos", "Pele levemente granular"]
        },
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Allobates_femoralis.jpg/1200px-Allobates_femoralis.jpg",
        galleryImages: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Allobates_femoralis.jpg/1200px-Allobates_femoralis.jpg"
        ],
        audios: [
            {
                title: "Llamada Territorial",
                url: "/data/anfibios/allobates_femoralis/Allobates_femoralis-Yurimaguas_GGU_A_0284.wav",
                description: "Canto territorial de Yurimaguas.",
                spectrogramImage: "/data/anfibios/allobates_femoralis/Allobates_femoralis-Yurimaguas_GGU_A_0284_MUESTRA.wav.256FFT.png"
            }
        ],
        location: "Amazon Basin"
    },
    {
        id: "allobates-trilineatus",
        scientificName: "Allobates trilineatus",
        commonName_es: "Rana Cohete de Tres Rayas",
        commonName_en: "Three-striped Rocket Frog",
        commonName_pt: "Rã-foguete-de-três-listras",
        category: "Amphibians",
        description: {
            es: "Una rana muy pequeña con rayas dorsolaterales y dorsoventrales distintivas.",
            en: "A very small frog with distinctive dorsolateral and dorsoventral stripes.",
            pt: "Uma rã muito pequena com listras dorsolaterais e dorsoventrais distintas."
        },
        mainImage: "https://inaturalist-open-data.s3.amazonaws.com/photos/22646274/large.jpg",
        galleryImages: ["https://inaturalist-open-data.s3.amazonaws.com/photos/22646274/large.jpg"],
        audios: [
            {
                title: "Canto Muniches",
                url: "/data/anfibios/allobates_trilineatus/Allobates_trilineatus_Muniches_Yurimaguas_GGU_A_0305.wav",
                description: "Vocalización registrada en Muniches.",
                spectrogramImage: "/data/anfibios/allobates_trilineatus/Allobates_trilineatus_Muniches_Yurimaguas_GGU_A_0305_MUESTRA.wav.256FFT.png"
            }
        ],
        location: "Peru, Bolivia, Brazil"
    },
    {
        id: "boana-boans",
        scientificName: "Boana boans",
        commonName_es: "Rana Gladiadora",
        commonName_en: "Gladiator Tree Frog",
        commonName_pt: "Perereca-gladiadora",
        category: "Amphibians",
        description: {
            es: "Una rana arbórea grande, con machos que construyen nidos de barro.",
            en: "A large tree frog, with males that build mud nests.",
            pt: "Uma grande perereca, com machos que constroem ninhos de lama."
        },
        mainImage: "/data/anfibios/boana_boans/Boana_boans.JPG",
        galleryImages: ["/data/anfibios/boana_boans/Boana_boans.JPG"],
        audios: [
            {
                title: "Canto",
                url: "/data/anfibios/boana_boans/Boana_boans_CIA_EBJAA _0116.wav",
                description: "Canto característico.",
                spectrogramImage: "/data/anfibios/boana_boans/Boana_boans_CIA_NRT_0011.wav.256FFT.png"
            }
        ],
        location: "Amazon Basin"
    },

    // Birds
    {
        id: "amazona-farinosa",
        scientificName: "Amazona farinosa",
        commonName_es: "Loro Real Amazónico",
        commonName_en: "Mealy Amazon",
        commonName_pt: "Papagaio-moleiro",
        category: "Birds",
        description: {
            es: "Uno de los loros más grandes del género Amazona, llamado así por el tono harinoso en su espalda y nuca.",
            en: "One of the largest parrots in the Amazona genus, named for the mealy prominence on its back and nape.",
            pt: "Um dos maiores papagaios do gênero Amazona, nomeado pelo tom enfarinhado em suas costas e nuca."
        },
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Amazona_farinosa_-upper_Amazon_basin-8-4c.jpg/1200px-Amazona_farinosa_-upper_Amazon_basin-8-4c.jpg",
        galleryImages: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Amazona_farinosa_-upper_Amazon_basin-8-4c.jpg/1200px-Amazona_farinosa_-upper_Amazon_basin-8-4c.jpg"],
        audios: [
            {
                title: "Llamada de vuelo",
                url: "https://actions.google.com/sounds/v1/animals/parrot.ogg",
                description: "Llamadas ruidosas durante el vuelo."
            }
        ],
        location: "Central and South America"
    },
    {
        id: "ammodramus-aurifrons",
        scientificName: "Ammodramus aurifrons",
        commonName_es: "Gorrión de Cejas Amarillas",
        commonName_en: "Yellow-browed Sparrow",
        commonName_pt: "Tico-tico-de-sobrancelha-amarela",
        category: "Birds",
        description: {
            es: "Un pequeño gorrión común en la cuenca del Amazonas, caracterizado por el amarillo brillante en su cara.",
            en: "A small sparrow common in the Amazon basin, characterized by bright yellow on its face.",
            pt: "Um pequeno pardal comum na bacia amazônica, caracterizado pelo amarelo brilhante em sua face."
        },
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yellow-browed_Sparrow_%28Ammodramus_aurifrons%29.jpg/1200px-Yellow-browed_Sparrow_%28Ammodramus_aurifrons%29.jpg",
        galleryImages: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Yellow-browed_Sparrow_%28Ammodramus_aurifrons%29.jpg/1200px-Yellow-browed_Sparrow_%28Ammodramus_aurifrons%29.jpg"],
        audios: [
            {
                title: "Canto",
                url: "https://actions.google.com/sounds/v1/animals/sparrow_chirp.ogg",
                description: "Canto agudo y zumbante."
            }
        ],
        location: "Amazon Basin"
    },

    // Insects (Crickets)
    {
        id: "conocephalinae-sp1",
        scientificName: "Conocephalinae sp. 1",
        commonName_es: "Grillo de Matorral (sp. 1)",
        commonName_en: "Conehead Katydid (sp. 1)",
        commonName_pt: "Esperança-cone (sp. 1)",
        category: "Insects",
        description: {
            es: "Una especie de grillo de la subfamilia Conocephalinae, conocidos por sus cabezas cónicas.",
            en: "A species of katydid from the subfamily Conocephalinae, known for their cone-shaped heads.",
            pt: "Uma espécie de esperança da subfamília Conocephalinae, conhecidos por suas cabeças cônicas."
        },
        mainImage: "https://inaturalist-open-data.s3.amazonaws.com/photos/168482470/large.jpg", // Placeholder generic katydid
        galleryImages: ["https://inaturalist-open-data.s3.amazonaws.com/photos/168482470/large.jpg"],
        audios: [
            {
                title: "Estridulación",
                url: "https://actions.google.com/sounds/v1/animals/crickets.ogg",
                description: "Sonido de estridulación nocturna."
            }
        ],
        location: "Amazon Rainforest"
    },
    {
        id: "conocephalinae-sp2",
        scientificName: "Conocephalinae sp. 2",
        commonName_es: "Grillo de Matorral (sp. 2)",
        commonName_en: "Conehead Katydid (sp. 2)",
        commonName_pt: "Esperança-cone (sp. 2)",
        category: "Insects",
        description: {
            es: "Otra variante de grillo Conocephalinae, con distintivos patrones de canto.",
            en: "Another variant of Conocephalinae katydid, with distinctive calling patterns.",
            pt: "Outra variante de esperança Conocephalinae, com padrões de canto distintos."
        },
        mainImage: "https://inaturalist-open-data.s3.amazonaws.com/photos/82071490/large.jpg", // Placeholder
        galleryImages: ["https://inaturalist-open-data.s3.amazonaws.com/photos/82071490/large.jpg"],
        audios: [
            {
                title: "Canto Nocturno",
                url: "https://actions.google.com/sounds/v1/animals/crickets.ogg",
                description: "Canto rítmico nocturno."
            }
        ],
        location: "Amazon Rainforest"
    },

    // Bats
    {
        id: "artibeus-obscurus",
        scientificName: "Artibeus obscurus",
        commonName_es: "Murciélago Frutero Oscuro",
        commonName_en: "Dark Fruit-eating Bat",
        commonName_pt: "Morcego-frutífero-escuro",
        category: "Mammals",
        description: {
            es: "Un murciélago frutero encontrado en la cuenca del Amazonas, de pelaje oscuro y rayas faciales tenues.",
            en: "A fruit-eating bat found in the Amazon basin, with dark fur and faint facial stripes.",
            pt: "Um morcego frutífero encontrado na bacia amazônica, de pelagem escura e listras faciais fracas."
        },
        mainImage: "https://inaturalist-open-data.s3.amazonaws.com/photos/74744477/large.jpg",
        galleryImages: ["https://inaturalist-open-data.s3.amazonaws.com/photos/74744477/large.jpg"],
        audios: [
            {
                title: "Ecolocalización",
                url: "https://actions.google.com/sounds/v1/horror/monster_alien_growl.ogg", // Placeholder, bats are ultrasonic usually but maybe audible clicks
                description: "Pulsos de ecolocalización (ralentizados)."
            }
        ],
        location: "Amazon Basin"
    },
    {
        id: "carollia-perspicillata",
        scientificName: "Carollia perspicillata",
        commonName_es: "Murciélago de Cola Corta de Seba",
        commonName_en: "Seba's Short-tailed Bat",
        commonName_pt: "Morcego-de-cauda-curta-de-Seba",
        category: "Mammals",
        description: {
            es: "Común y extendido, este murciélago se alimenta de frutos, néctar e insectos. Tiene una hoja nasal triangular.",
            en: "Common and widespread, this bat feeds on fruits, nectar, and insects. It has a triangular nose-leaf.",
            pt: "Comum e difundido, este morcego se alimenta de frutas, néctar e insetos. Tem uma folha nasal triangular."
        },
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Carollia_perspicillata.jpg/1200px-Carollia_perspicillata.jpg",
        galleryImages: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Carollia_perspicillata.jpg/1200px-Carollia_perspicillata.jpg"],
        audios: [
            {
                title: "Sonidos Sociales",
                url: "https://actions.google.com/sounds/v1/animals/bat_chirp.ogg", // Placeholder
                description: "Comunicación social en el nido."
            }
        ],
        location: "Central and South America"
    },

    // Primates
    {
        id: "saguinus-sp",
        scientificName: "Saguinus sp.",
        commonName_es: "Tití (Especie)",
        commonName_en: "Tamarin (Species)",
        commonName_pt: "Sagui (Espécie)",
        category: "Mammals",
        description: {
            es: "Pequeños primates ágiles y sociales del género Saguinus. Viven en grupos y se alimentan de frutas e insectos.",
            en: "Small, agile, and social primates of the genus Saguinus. They live in groups and feed on fruits and insects.",
            pt: "Pequenos primatas ágeis e sociais do gênero Saguinus. Vivem em grupos e se alimentam de frutas e insetos."
        },
        mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Saguinus_imperator_subgrisescens.jpg/1200px-Saguinus_imperator_subgrisescens.jpg", // Emperor Tamarin as placeholder/example
        galleryImages: ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Saguinus_imperator_subgrisescens.jpg/1200px-Saguinus_imperator_subgrisescens.jpg"],
        audios: [
            {
                title: "Llamada de Alarma",
                url: "https://actions.google.com/sounds/v1/animals/monkey_screech.ogg",
                description: "Vocalización aguda de alarma."
            }
        ],
        location: "Amazon Basin"
    }
];

export function getSpeciesById(id: string): Species | undefined {
    return speciesData.find(s => s.id === id);
}

export function getAllSpecies(): Species[] {
    return speciesData;
}
