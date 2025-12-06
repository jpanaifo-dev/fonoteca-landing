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
                "Instituto de Investigaciones de la Amazonía Peruana",
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
                "Research Institute of the Peruvian Amazon",
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
                "Instituto de Pesquisa da Amazônia Peruana",
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
