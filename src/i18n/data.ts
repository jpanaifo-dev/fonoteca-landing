export type Language = 'es' | 'en' | 'pt';
import { landingImages } from '../config/landingImages';

export const LANGUAGES: Language[] = ['es', 'en', 'pt'];

export const translations = {
    es: {
        nav: {
            library: "La Fonoteca",
            species: "Especies",
            stats: "Estadísticas",
            contact: "Contacto",
        },
        hero: {
            title: "Conoce la belleza de la naturaleza",
            titles_animate: [
                "Sonidos del Bosque",
                "Susurros de la Vida"
            ],
            description: "Una colección sonora que conecta con la biodiversidad del mundo. Descubre la belleza de la naturaleza a través de nuestras grabaciones.",
            cta: "Explorar Ahora"
        },
        intro: {
            label: "Quiénes Somos",
            title_start: "Preservando los",
            title_strong: "Ecosistemas Sonoros",
            p1: "Nuestra fonoteca es un archivo vivo de la biodiversidad. Capturamos, catalogamos y preservamos los sonidos de especies en peligro y ecosistemas únicos para la posteridad y la investigación científica.",
            p2: "Desde el canto de las aves en el Amazonas hasta los infrasonidos de las ballenas, cada grabación cuenta una historia de supervivencia y belleza.",
            link: "Conoce nuestra misión"
        },
        species: {
            label: "Nuestra Colección",
            title: "Explora por",
            title_strong: "Especies",
            items: [
                { title: "Anfibios", count: "117 Especies" },
                { title: "Aves", count: "120 Especies" },
                { title: "Murciélagos", count: "24 Especies" },
                { title: "Grillos", count: "20 Especies" },
            ]
        },
        stats: {
            s1: { count: "773", label: "Grabaciones", desc: "Total de registros de audio" },
            s2: { count: "281", label: "Especies", desc: "Catalogadas en la colección" },
            s3: { count: "48", label: "Familias", desc: "Grupos taxonómicos representados" }
        },
        cta: {
            title_start: "Suscríbete para",
            title_strong: "Novedades Sonoras",
            desc: "Recibe actualizaciones mensuales sobre nuevas especies catalogadas y reportes de salud de los ecosistemas.",
            placeholder: "Tu correo electrónico",
            button: "Suscribirse"
        },
        species_page: {
            banner: {
                title: "Explora la Fonoteca",
                subtitle: "Una inmersión sonora en la biodiversidad amazónica",
                image: landingImages.pageBanner.species_es
            },
            list: [
                {
                    id: "rana-mono",
                    name: "Rana Mono Gigante",
                    scientific: "Phyllomedusa bicolor",
                    image: "/data/anfibios/adenomera_hylaedactyla/IMG_0081.JPG",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Phyllomedusa_bicolor.jpg/1200px-Phyllomedusa_bicolor.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/56230495/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/103254922/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/frogs_croaking.ogg",
                    description: "Conocida como 'Kambó' o 'Sapo', esta rana arbórea gigante secreta una sustancia cerosa utilizada en la medicina tradicional. Sus ojos plateados y vientre crema la hacen inconfundible.",
                    location: "Cuenca del Amazonas"
                },
                {
                    id: "caiman-anteojos",
                    name: "Caimán de Anteojos",
                    scientific: "Caiman crocodilus",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Spectacled_Caiman_%28Caiman_crocodilus%29.jpg/1200px-Spectacled_Caiman_%28Caiman_crocodilus%29.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Spectacled_Caiman_%28Caiman_crocodilus%29.jpg/1200px-Spectacled_Caiman_%28Caiman_crocodilus%29.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/357604/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/1826702/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/tiger_growl.ogg",
                    description: "Pequeño cocodrilo caracterizado por una cresta ósea entre los ojos que parece un par de anteojos. Es común en caños y lagunas amazónicas.",
                    location: "Reserva Nacional Pacaya Samiria"
                },
                {
                    id: "boa-esmeralda",
                    name: "Boa Esmeralda",
                    scientific: "Corallus caninus",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Corallus_caninus_w_K%C3%B6ln.jpg/1200px-Corallus_caninus_w_K%C3%B6ln.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Corallus_caninus_w_K%C3%B6ln.jpg/1200px-Corallus_caninus_w_K%C3%B6ln.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/6321473/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/11559850/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/snake_hiss.ogg",
                    description: "Serpiente arborícola no venenosa de un verde brillante con manchas blancas. Pasa sus días enrollada en ramas sobre el agua.",
                    location: "Parque Nacional del Manu"
                },
                {
                    id: "rana-dardo-fantasma",
                    name: "Rana Venenosa Fantasma",
                    scientific: "Epipedobates tricolor",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Epipedobates_tricolor.jpg/1200px-Epipedobates_tricolor.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Epipedobates_tricolor.jpg/1200px-Epipedobates_tricolor.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/2592500/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/8912384/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/frogs_croaking.ogg",
                    description: "Pequeña rana venenosa endémica de los Andes y Amazonía. Su canto es similar al de un canario.",
                    location: "Bosques Premontanos"
                },
                {
                    id: "tortuga-taricaya",
                    name: "Taricaya",
                    scientific: "Podocnemis unifilis",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Podocnemis_unifilis_%28Yellow-spotted_River_Turtle%29.jpg/1200px-Podocnemis_unifilis_%28Yellow-spotted_River_Turtle%29.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Podocnemis_unifilis_%28Yellow-spotted_River_Turtle%29.jpg/1200px-Podocnemis_unifilis_%28Yellow-spotted_River_Turtle%29.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/1576757/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/5482390/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/water/stream_water.ogg",
                    description: "Tortuga de río de manchas amarillas. Es fundamental para el ecosistema acuático y sujeto de importantes programas de conservación.",
                    location: "Ríos de la Amazonía"
                },
                {
                    id: "shushupe",
                    name: "Shushupe",
                    scientific: "Lachesis muta",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lachesis_muta.jpg/1200px-Lachesis_muta.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lachesis_muta.jpg/1200px-Lachesis_muta.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/33284090/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/10385732/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/snake_hiss.ogg",
                    description: "La víbora más grande del hemisferio occidental. Conocida por sus escamas en forma de piña y su veneno potente.",
                    location: "Bosque Húmedo Tropical"
                },
            ]
        },
        features: {
            title: "Soluciones Confiables, Resultados Reales",
            items: [
                { title: "Servicios de Grabación", description: "Como tus asesores de audio, proporcionamos equipos y técnicas de planificación proactiva para capturar los sonidos de la naturaleza." },
                { title: "Archivo y Preservación", description: "La experiencia y eficiencia proporcionan a tu organización un archivo de audio único y disfrutable." },
                { title: "Servicios de Taxonomía", description: "Obtén liderazgo científico experto sin el costo total. Nuestros servicios incluyen identificación taxonómica y guía estratégica." },
                { title: "Análisis de Bioacústica", description: "Mantén tus datos limpios y actualizados con nuestra ayuda confiable. Manejamos las tareas de análisis para que tú te enfoques en la investigación." },
                { title: "Servicios de Educación", description: "Desde informes mensuales hasta preparación anual, nuestro equipo mantiene tu conocimiento organizado. Hacemos que los números tengan sentido." },
                { title: "Monitoreo Ambiental", description: "" }
            ]
        },
        footer: {
            description: "Investigación científica para el desarrollo sostenible de la Amazonía Peruana y la puesta en valor de su diversidad biológica y sociocultural.",
            links_title: "Enlaces",
            contact_title: "Contacto",
            address_label: "Dirección Principal",
            address: "Av. José A. Quiñones km 2.5\nIquitos, Loreto - Perú",
            email_label: "Email",
            phone_label: "Teléfono",
            copyright: "© 2025 Instituto de Investigaciones de la Amazonía Peruana. Todos los derechos reservados."
        }
    },
    en: {
        nav: {
            library: "The Phonotheque",
            species: "Species",
            stats: "Statistics",
            contact: "Contact",
        },
        hero: {
            title: "Experience nature's beauty",
            titles_animate: [
                "Sounds of the Forest",
                "Whispers of Life"
            ],
            description: "A sound collection connecting you with the world's biodiversity. Discover the beauty of nature through our recordings.",
            cta: "Explore Now"
        },
        intro: {
            label: "Who We Are",
            title_start: "Preserving",
            title_strong: "Sound Ecosystems",
            p1: "Our phonotheque is a living archive of biodiversity. We capture, catalog, and preserve sounds of endangered species and unique ecosystems for posterity and scientific research.",
            p2: "From bird songs in the Amazon to whale infrasounds, every recording tells a story of survival and beauty.",
            link: "Know our mission"
        },
        species: {
            label: "Our Collection",
            title: "Explore by",
            title_strong: "Species",
            items: [
                { title: "Amphibians", count: "117 Species" },
                { title: "Birds", count: "120 Species" },
                { title: "Bats", count: "24 Species" },
                { title: "Crickets", count: "20 Species" },
            ]
        },
        stats: {
            s1: { count: "773", label: "Recordings", desc: "Total audio records" },
            s2: { count: "281", label: "Species", desc: "Cataloged in the collection" },
            s3: { count: "48", label: "Families", desc: "Taxonomic groups represented" }
        },
        cta: {
            title_start: "Subscribe for",
            title_strong: "Sound News",
            desc: "Receive monthly updates on newly cataloged species and ecosystem health reports.",
            placeholder: "Your email address",
            button: "Subscribe"
        },
        species_page: {
            banner: {
                title: "Explore the Phonotheque",
                subtitle: "A sonic immersion in the Amazonian biodiversity",
                image: landingImages.pageBanner.species_en
            },
            list: [
                {
                    id: "rana-mono",
                    name: "Giant Monkey Frog",
                    scientific: "Phyllomedusa bicolor",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Phyllomedusa_bicolor.jpg/1200px-Phyllomedusa_bicolor.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Phyllomedusa_bicolor.jpg/1200px-Phyllomedusa_bicolor.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/56230495/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/103254922/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/frogs_croaking.ogg",
                    description: "Known as 'Kambó', this giant tree frog uses a waxy secretion used in traditional medicine. Its silver eyes and cream belly make it unmistakable.",
                    location: "Amazon Basin"
                },
                {
                    id: "caiman-anteojos",
                    name: "Spectacled Caiman",
                    scientific: "Caiman crocodilus",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Spectacled_Caiman_%28Caiman_crocodilus%29.jpg/1200px-Spectacled_Caiman_%28Caiman_crocodilus%29.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Spectacled_Caiman_%28Caiman_crocodilus%29.jpg/1200px-Spectacled_Caiman_%28Caiman_crocodilus%29.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/357604/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/1826702/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/tiger_growl.ogg",
                    description: "Small crocodilian characterized by a bony ridge between the eyes that resembles spectacles. Common in Amazonian creeks.",
                    location: "Pacaya Samiria National Reserve"
                },
                {
                    id: "boa-esmeralda",
                    name: "Emerald Tree Boa",
                    scientific: "Corallus caninus",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Corallus_caninus_w_K%C3%B6ln.jpg/1200px-Corallus_caninus_w_K%C3%B6ln.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Corallus_caninus_w_K%C3%B6ln.jpg/1200px-Corallus_caninus_w_K%C3%B6ln.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/6321473/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/11559850/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/snake_hiss.ogg",
                    description: "Non-venomous arboreal snake of bright green with white markings. Spends its days coiled on branches over water.",
                    location: "Manu National Park"
                },
                {
                    id: "rana-dardo-fantasma",
                    name: "Phantasmal Poison Frog",
                    scientific: "Epipedobates tricolor",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Epipedobates_tricolor.jpg/1200px-Epipedobates_tricolor.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Epipedobates_tricolor.jpg/1200px-Epipedobates_tricolor.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/2592500/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/8912384/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/frogs_croaking.ogg",
                    description: "Small poison frog endemic to the Andes and Amazon. Its call is similar to a canary.",
                    location: "Premontane Forests"
                },
                {
                    id: "tortuga-taricaya",
                    name: "Yellow-spotted River Turtle",
                    scientific: "Podocnemis unifilis",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Podocnemis_unifilis_%28Yellow-spotted_River_Turtle%29.jpg/1200px-Podocnemis_unifilis_%28Yellow-spotted_River_Turtle%29.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Podocnemis_unifilis_%28Yellow-spotted_River_Turtle%29.jpg/1200px-Podocnemis_unifilis_%28Yellow-spotted_River_Turtle%29.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/1576757/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/5482390/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/water/stream_water.ogg",
                    description: "River turtle with yellow spots. Essential for the aquatic ecosystem and subject of important conservation programs.",
                    location: "Amazon Rivers"
                },
                {
                    id: "shushupe",
                    name: "Bushmaster",
                    scientific: "Lachesis muta",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lachesis_muta.jpg/1200px-Lachesis_muta.jpg",
                    images: [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lachesis_muta.jpg/1200px-Lachesis_muta.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/33284090/large.jpg",
                        "https://inaturalist-open-data.s3.amazonaws.com/photos/10385732/large.jpg"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/snake_hiss.ogg",
                    description: "The largest viper in the Western Hemisphere. Known for its pineapple-like scales and potent venom.",
                    location: "Tropical Rainforest"
                },
            ]
        },
        features: {
            title: "Reliable Solutions, Real Results",
            items: [
                { title: "Recording Services", description: "As your audio advisors we provide proactive planning and equipment to capture nature sounds." },
                { title: "Audit & Assurance", description: "Experience and efficiency provides your organization with a uniquely enjoyable audio archive." },
                { title: "Taxonomy Services", description: "Get expert scientific leadership without the full-time cost. Our services include taxonomic identification and strategic guidance." },
                { title: "Bioacoustics Analysis", description: "Keep your data clean and up-to-date with our reliable help. We handle the analysis tasks so you can focus on research." },
                { title: "Education Services", description: "From monthly reports to year-end prep, our team keeps your knowledge organized. We make your numbers make sense." },
                { title: "Environmental Monitoring", description: "" }
            ]
        },
        footer: {
            description: "Scientific research for the sustainable development of the Peruvian Amazon and the enhancement of its biological and cultural diversity.",
            links_title: "Links",
            contact_title: "Contact",
            address_label: "Main Address",
            address: "Av. José A. Quiñones km 2.5\nIquitos, Loreto - Peru",
            email_label: "Email",
            phone_label: "Phone",
            copyright: "© 2025 Research Institute of the Peruvian Amazon. All rights reserved."
        }
    },
    pt: {
        nav: {
            library: "A Fonoteca",
            species: "Espécies",
            stats: "Estatísticas",
            contact: "Contato",
        },
        hero: {
            title: "Conheça a beleza da natureza",
            titles_animate: [
                "Sons da Floresta",
                "Sussurros da Vida"
            ],
            description: "Uma coleção sonora que conecta com a biodiversidade do mundo. Descubra a beleza da natureza através de nossas gravações.",
            cta: "Explorar Agora"
        },
        intro: {
            label: "Quem Somos",
            title_start: "Preservando os",
            title_strong: "Ecossistemas Sonoros",
            p1: "Nossa fonoteca é um arquivo vivo da biodiversidade. Capturamos, catalogamos e preservamos os sons de espécies ameaçadas e ecossistemas únicos para a posteridade e a pesquisa científica.",
            p2: "Do canto dos pássaros na Amazônia aos infrassons das baleias, cada gravação conta uma história de sobrevivência e beleza.",
            link: "Conheça nossa missão"
        },
        species: {
            label: "Nossa Coleção",
            title: "Explore por",
            title_strong: "Espécies",
            items: [
                { title: "Anfíbios", count: "117 Espécies" },
                { title: "Aves", count: "120 Espécies" },
                { title: "Morcegos", count: "24 Espécies" },
                { title: "Grilos", count: "20 Espécies" },
            ]
        },
        stats: {
            s1: { count: "773", label: "Gravações", desc: "Total de registros de áudio" },
            s2: { count: "281", label: "Espécies", desc: "Catalogadas na coleção" },
            s3: { count: "48", label: "Famílias", desc: "Grupos taxonômicos representados" }
        },
        cta: {
            title_start: "Inscreva-se para",
            title_strong: "Novidades Sonoras",
            desc: "Receba atualizações mensais sobre novas espécies catalogadas e relatórios de saúde dos ecossistemas.",
            placeholder: "Seu endereço de e-mail",
            button: "Inscrever-se"
        },
        species_page: {
            banner: {
                title: "Explore a Fonoteca",
                subtitle: "Uma imersão sonora na biodiversidade amazônica",
                image: landingImages.pageBanner.species_en
            },
            list: [
                {
                    id: "rana-dardo",
                    name: "Sapo Ponta-de-Flecha",
                    scientific: "Ranitomeya ventrimaculata",
                    image: "https://images.unsplash.com/photo-1599488615731-7e5128091dd7?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1599488615731-7e5128091dd7?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1549498263-84b2383c2763?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1582697816664-96894c483af9?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/frogs_croaking.ogg",
                    description: "Este pequeno sapo venenoso é conhecido por suas cores brilhantes e padrões únicos. Habita o sub-bosque da floresta amazônica e é um indicador chave da saúde do ecossistema.",
                    location: "Reserva Nacional Allpahuayo Mishana"
                },
                {
                    id: "guacamayo",
                    name: "Arara Vermelha",
                    scientific: "Ara macao",
                    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1551092892-273644265158?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1522857476332-6bf59a1844b2?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/parrot.ogg",
                    description: "Com sua plumagem escarlate, amarela e azul, a arara vermelha é uma das aves mais emblemáticas da Amazônia. Seus grasnidos fortes ecoam pelo dossel da floresta.",
                    location: "Parque Nacional do Manu"
                },
                {
                    id: "mono-ardilla",
                    name: "Macaco-de-Cheiro",
                    scientific: "Saimiri sciureus",
                    image: "https://images.unsplash.com/photo-1548685913-fe65780eb1d7?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1548685913-fe65780eb1d7?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1565063073740-4107dc6ad521?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/monkey_screech.ogg",
                    description: "Pequenos, ágeis e altamente sociais, os macacos-de-cheiro viajam em grandes bandos. Suas vocalizações são complexas e vitais para a coesão do grupo.",
                    location: "Reserva Nacional Pacaya Samiria"
                },
                {
                    id: "jaguar",
                    name: "Onça-Pintada",
                    scientific: "Panthera onca",
                    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1629813296837-774900cb34b6?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1615963244664-5b845b2025ee?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/tiger_growl.ogg",
                    description: "O maior felino das Américas. A onça-pintada é um predador chave e um símbolo de poder na cosmovisão amazônica. Seu rugido é profundo e ressonante.",
                    location: "Parque Nacional Bahuaja Sonene"
                },
                {
                    id: "tucan",
                    name: "Tucano",
                    scientific: "Ramphastos toco",
                    image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1628045997232-a544b6f00114?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1623953530869-fa7166164d1f?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/crow_caw.ogg",
                    description: "Famoso por seu enorme bico colorido. O tucano é um importante dispersor de sementes na floresta. Seu canto é um som característico do amanhecer amazônico.",
                    location: "Reserva Comunal Tamshiyacu Tahuayo"
                },
                {
                    id: "delfin-rosado",
                    name: "Boto Cor-de-Rosa",
                    scientific: "Inia geoffrensis",
                    image: "https://images.unsplash.com/photo-1568285984638-513d6a2dc907?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1568285984638-513d6a2dc907?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1606735584500-a63e8a39a263?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1544552866-d3ed42536de7?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/dolphin_chatter.ogg",
                    description: "O mítico boto cor-de-rosa habita os rios da Amazônia. É uma espécie inteligente e curiosa, envolta em lendas locais.",
                    location: "Rio Amazonas, Iquitos"
                },
            ]
        },
        features: {
            title: "Soluções Confiáveis, Resultados Reais",
            items: [
                { title: "Serviços de Gravação", description: "Como seus consultores de áudio, fornecemos planejamento proativo e equipamentos para capturar sons da natureza." },
                { title: "Arquivo e Preservação", description: "Experiência e eficiência proporcionam à sua organização um arquivo de áudio único e agradável." },
                { title: "Serviços de Taxonomia", description: "Obtenha liderança científica especializada sem o custo integral. Nossos serviços incluem identificação taxonômica e orientação estratégica." },
                { title: "Análise Bioacústica", description: "Mantenha seus dados limpos e atualizados com nossa ajuda confiável. Cuidamos das tarefas de análise para que você possa focar na pesquisa." },
                { title: "Serviços de Educação", description: "De relatórios mensais a preparação anual, nossa equipe mantém seu conhecimento organizado." },
                { title: "Monitoramento Ambiental", description: "" }
            ]
        },
        footer: {
            description: "Pesquisa científica para o desenvolvimento sustentável da Amazônia Peruana e a valorização de sua diversidade biológica e sociocultural.",
            links_title: "Links",
            contact_title: "Contato",
            address_label: "Endereço Principal",
            address: "Av. José A. Quiñones km 2.5\nIquitos, Loreto - Peru",
            email_label: "Email",
            phone_label: "Telefone",
            copyright: "© 2025 Instituto de Pesquisa da Amazônia Peruana. Todos os direitos reservados."
        }
    }
};
