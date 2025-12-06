export type Language = 'es' | 'en' | 'pt';

export const LANGUAGES: Language[] = ['es', 'en', 'pt'];

export const translations = {
    es: {
        nav: {
            home: "Inicio",
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
            cta: "Escuchar Ahora"
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
                { title: "Anfibios", count: "120+ Especies" },
                { title: "Aves", count: "450+ Especies" },
                { title: "Mamíferos", count: "85+ Especies" },
                { title: "Insectos", count: "200+ Especies" },
            ]
        },
        stats: {
            s1: { count: "54", label: "Especies", desc: "Registradas en el último año" },
            s2: { count: "120", label: "Horas", desc: "De audio de alta fidelidad" },
            s3: { count: "12", label: "Regiones", desc: "Protegidas monitoreadas" }
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
                image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
            },
            list: [
                {
                    id: "rana-dardo",
                    name: "Rana Dardo",
                    scientific: "Ranitomeya ventrimaculata",
                    image: "https://images.unsplash.com/photo-1599488615731-7e5128091dd7?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1599488615731-7e5128091dd7?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1549498263-84b2383c2763?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1582697816664-96894c483af9?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/frogs_croaking.ogg",
                    description: "Esta pequeña rana venenosa es conocida por sus brillantes colores y patrones únicos. Habita en el sotobosque de la selva amazónica y es un indicador clave de la salud del ecosistema.",
                    location: "Reserva Nacional Allpahuayo Mishana"
                },
                {
                    id: "guacamayo",
                    name: "Guacamayo Rojo",
                    scientific: "Ara macao",
                    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1551092892-273644265158?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1522857476332-6bf59a1844b2?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/parrot.ogg",
                    description: "Con su plumaje escarlata, amarillo y azul, el guacamayo rojo es una de las aves más emblemáticas de la Amazonía. Sus fuertes graznidos resuenan a través del dosel de la selva.",
                    location: "Parque Nacional del Manu"
                },
                {
                    id: "mono-ardilla",
                    name: "Mono Ardilla",
                    scientific: "Saimiri sciureus",
                    image: "https://images.unsplash.com/photo-1548685913-fe65780eb1d7?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1548685913-fe65780eb1d7?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1565063073740-4107dc6ad521?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/monkey_screech.ogg",
                    description: "Pequeños, ágiles y altamente sociables, los monos ardilla viajan en grandes tropas. Sus vocalizaciones son complejas y vitales para la cohesión del grupo.",
                    location: "Reserva Nacional Pacaya Samiria"
                },
                {
                    id: "jaguar",
                    name: "Jaguar",
                    scientific: "Panthera onca",
                    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1629813296837-774900cb34b6?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1615963244664-5b845b2025ee?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/tiger_growl.ogg", // Using tiger as proxy for Jaguar
                    description: "El felino más grande de América. El jaguar es un depredador clave y un símbolo de poder en la cosmovisión amazónica. Su rugido es profundo y resonante.",
                    location: "Parque Nacional Bahuaja Sonene"
                },
                {
                    id: "tucan",
                    name: "Tucán",
                    scientific: "Ramphastos toco",
                    image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1628045997232-a544b6f00114?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1623953530869-fa7166164d1f?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/crow_caw.ogg", // Proxy
                    description: "Famoso por su enorme pico colorido. El tucán es un importante dispersor de semillas en la selva. Su canto es un sonido característico del amanecer amazónico.",
                    location: "Reserva Comunal Tamshiyacu Tahuayo"
                },
                {
                    id: "delfin-rosado",
                    name: "Delfín Rosado",
                    scientific: "Inia geoffrensis",
                    image: "https://images.unsplash.com/photo-1568285984638-513d6a2dc907?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1568285984638-513d6a2dc907?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1606735584500-a63e8a39a263?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1544552866-d3ed42536de7?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/dolphin_chatter.ogg",
                    description: "El mítico delfín rosado habita los ríos de la Amazonas. Es una especie inteligente y curiosa, envuelta en leyendas locales.",
                    location: "Río Amazonas, Iquitos"
                },
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
            home: "Home",
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
            cta: "Listen Now"
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
                { title: "Amphibians", count: "120+ Species" },
                { title: "Birds", count: "450+ Species" },
                { title: "Mammals", count: "85+ Species" },
                { title: "Insects", count: "200+ Species" },
            ]
        },
        stats: {
            s1: { count: "54", label: "Species", desc: "Registered last year" },
            s2: { count: "120", label: "Hours", desc: "High fidelity audio" },
            s3: { count: "12", label: "Regions", desc: "Protected monitored" }
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
                image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
            },
            list: [
                {
                    id: "rana-dardo",
                    name: "Poison Dart Frog",
                    scientific: "Ranitomeya ventrimaculata",
                    image: "https://images.unsplash.com/photo-1599488615731-7e5128091dd7?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1599488615731-7e5128091dd7?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1549498263-84b2383c2763?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1582697816664-96894c483af9?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/frogs_croaking.ogg",
                    description: "This small poisonous frog is known for its bright colors and unique patterns. It inhabits the understory of the Amazon rainforest and is a key indicator of ecosystem health.",
                    location: "Allpahuayo Mishana National Reserve"
                },
                {
                    id: "guacamayo",
                    name: "Scarlet Macaw",
                    scientific: "Ara macao",
                    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1551092892-273644265158?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1522857476332-6bf59a1844b2?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/parrot.ogg",
                    description: "With its scarlet, yellow, and blue plumage, the scarlet macaw is one of the most iconic birds of the Amazon. Its loud squawks echo through the forest canopy.",
                    location: "Manu National Park"
                },
                {
                    id: "mono-ardilla",
                    name: "Squirrel Monkey",
                    scientific: "Saimiri sciureus",
                    image: "https://images.unsplash.com/photo-1548685913-fe65780eb1d7?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1548685913-fe65780eb1d7?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1565063073740-4107dc6ad521?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/monkey_screech.ogg",
                    description: "Small, agile, and highly social, squirrel monkeys travel in large troops. Their vocalizations are complex and vital for group cohesion.",
                    location: "Pacaya Samiria National Reserve"
                },
                {
                    id: "jaguar",
                    name: "Jaguar",
                    scientific: "Panthera onca",
                    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1629813296837-774900cb34b6?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1615963244664-5b845b2025ee?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/tiger_growl.ogg",
                    description: "The largest feline in the Americas. The jaguar is a keystone predator and a symbol of power in Amazonian worldview. Its roar is deep and resonant.",
                    location: "Bahuaja Sonene National Park"
                },
                {
                    id: "tucan",
                    name: "Toucan",
                    scientific: "Ramphastos toco",
                    image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1628045997232-a544b6f00114?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1623953530869-fa7166164d1f?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/crow_caw.ogg",
                    description: "Famous for its enormous colorful beak. The toucan is an important seed disperser in the forest. Its song is a characteristic sound of the Amazonian dawn.",
                    location: "Tamshiyacu Tahuayo Communal Reserve"
                },
                {
                    id: "delfin-rosado",
                    name: "Pink River Dolphin",
                    scientific: "Inia geoffrensis",
                    image: "https://images.unsplash.com/photo-1568285984638-513d6a2dc907?q=80&w=1000&auto=format&fit=crop",
                    images: [
                        "https://images.unsplash.com/photo-1568285984638-513d6a2dc907?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1606735584500-a63e8a39a263?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1544552866-d3ed42536de7?q=80&w=1000&auto=format&fit=crop"
                    ],
                    audio: "https://actions.google.com/sounds/v1/animals/dolphin_chatter.ogg",
                    description: "The mythical pink dolphin inhabits the Amazon rivers. It is an intelligent and curious species, shrouded in local legends.",
                    location: "Amazon River, Iquitos"
                },
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
            home: "Início",
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
            cta: "Ouvir Agora"
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
                { title: "Anfíbios", count: "120+ Espécies" },
                { title: "Aves", count: "450+ Espécies" },
                { title: "Mamíferos", count: "85+ Espécies" },
                { title: "Insetos", count: "200+ Espécies" },
            ]
        },
        stats: {
            s1: { count: "54", label: "Espécies", desc: "Registradas no último ano" },
            s2: { count: "120", label: "Horas", desc: "Áudio de alta fidelidade" },
            s3: { count: "12", label: "Regiões", desc: "Protegidas monitoradas" }
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
                image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
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
