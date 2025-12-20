
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

export const speciesData: Species[] = [
    // Amphibians
    // Amphibians
    {
        id: "adenomera_hylaedactyla",
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
            "/data/anfibios/adenomera_hylaedactyla/IMG_0081_2.JPG"
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
        id: "allobates_femoralis",
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
        mainImage: "/data/anfibios/allobates_femoralis/Allobates_femoralis.jpg",
        galleryImages: [
            "/data/anfibios/allobates_femoralis/Allobates_femoralis.jpg"
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
        id: "allobates_trilineatus",
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
        mainImage: "https://multimedia20stg.blob.core.windows.net/especies/CORBIDI%2001747%20Munichis-Yurimaguas.JPG",
        galleryImages: ["https://multimedia20stg.blob.core.windows.net/especies/CORBIDI%2001747%20Munichis-Yurimaguas.JPG"],
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
        id: "boana_boans",
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
        id: "ammodramus-aurifrons",
        scientificName: "Ammodramus aurifrons",
        commonName_es: "Gorrión de Cejas Amarillas",
        commonName_en: "Yellow-browed Sparrow",
        commonName_pt: "Tico-tico-de-sobrancelha-amarela",
        category: "Birds",
        description: {
            es: "Un pequeño gorrión común en la cuenca del Amazonas, caracterizado por el amarillo brillante en su cara. Habita en pastizales y áreas abiertas cerca de ríos.",
            en: "A small sparrow common in the Amazon basin, characterized by bright yellow on its face. Inhabits grasslands and open areas near rivers.",
            pt: "Um pequeno pardal comum na bacia amazônica, caracterizado pelo amarelo brilhante em sua face. Habita pastagens e áreas abertas perto de rios."
        },
        mainImage: "/data/aves/ammodramus_aurifrons/Ammodramus aurifrons_image.jpg",
        galleryImages: ["/data/aves/ammodramus_aurifrons/Ammodramus aurifrons_image.jpg"],
        audios: [
            {
                title: "Canto Principal",
                url: "/data/aves/ammodramus_aurifrons/Ammodramus aurifrons_CIN_SNMA0202_filt.wav",
                description: "Canto característico registrado en su hábitat.",
                spectrogramImage: "/data/aves/ammodramus_aurifrons/Ammodramus aurifrons_muestra.wav.256FFT.png"
            }
        ],
        location: "Amazon Basin"
    },
    {
        id: "attila-spadiceus",
        scientificName: "Attila spadiceus",
        commonName_es: "Atila de Rabadilla Brillante",
        commonName_en: "Bright-rumped Attila",
        commonName_pt: "Capitão-de-saíra",
        category: "Birds",
        description: {
            es: "Un atrapamoscas grande y de cabeza grande con un pico fuerte y ganchudo. Es conocido por sus vocalizaciones fuertes y variadas.",
            en: "A large, big-headed flycatcher with a strong, hooked bill. Known for its loud and varied vocalizations.",
            pt: "Um papa-moscas grande e de cabeça grande com um bico forte e ganchudo. Conhecido por suas vocalizações altas e variadas."
        },
        mainImage: "/data/aves/attila_spadiceus/Attila spadiceus_CIA_VC_specie.jpg",
        galleryImages: [
            "/data/aves/attila_spadiceus/Attila spadiceus_CIA_VC_specie.jpg",
            "/data/aves/attila_spadiceus/attila-spadiceus-3.webp"
        ],
        audios: [
            {
                title: "Canto Variado (VCL0308)",
                url: "/data/aves/attila_spadiceus/audios/Attila spadiceus_CIA_VCL0308_filt.wav",
                description: "Vocalización fuerte y clara.",
                spectrogramImage: "/data/aves/attila_spadiceus/audios/Attila spadiceus_CIA_VCL0308_filt.wav.256FFT.png"
            },
            {
                title: "Llamada (JMN020)",
                url: "/data/aves/attila_spadiceus/audios/Attila spadiceus_CIA_JMN020_filt.wav",
                description: "Otro tipo de llamada registrada."
            }
        ],
        location: "Central and South America"
    },

    // Insects (Crickets)
    {
        id: "conocephalinae-sp-2",
        scientificName: "Conocephalinae sp.",
        commonName_es: "Grillo de Matorral",
        commonName_en: "Conehead Katydid",
        commonName_pt: "Esperança-cone",
        category: "Crickets",
        description: {
            es: "Grylloidea es una superfamilia de insectos del orden Orthoptera. Se les conoce comúnmente como grillos; están estrechamente relacionados con los grillos de matorral (Tettigoniidae). Tienen el cuerpo principalmente cilíndrico, la cabeza redonda y antenas largas y delgadas en forma de látigo.",
            en: "Grylloidea is a superfamily of insects in the order Orthoptera. They are commonly known as crickets; closely related to bush crickets (Tettigoniidae). They have mainly cylindrical bodies, round heads, and long, thin whip-like antennae.",
            pt: "Grylloidea é uma superfamília de insetos da ordem Orthoptera. Eles são comumente conhecidos como grilos; intimamente relacionados com as esperanças (Tettigoniidae). Têm corpos principalmente cilíndricos, cabeças redondas e antenas longas e finas em forma de chicote."
        },
        mainImage: "/data/grillos/IMG_9766.JPG",
        galleryImages: ["/data/grillos/IMG_9766.JPG"],
        audios: [
            {
                title: "Canto (CIA JMN 0052)",
                url: "/data/grillos/Conocephalinae_sp2_CIA_JMN_0052.wav",
                description: "Vocalización registrada.",
                spectrogramImage: "/data/grillos/Conocephalinae_sp2_CIA_JMN_0052.png"
            }
        ],
        location: "Amazon Basin"
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
