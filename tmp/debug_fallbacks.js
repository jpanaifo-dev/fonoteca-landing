import { getAllSpecies } from '../src/data/species';

async function main() {
    const species = await getAllSpecies();
    console.log("=== SPECIES FALLBACKS MATCHES ===");
    species.forEach(s => {
        console.log(`[${s.scientificName}] -> mainImage: ${s.mainImage}`);
        if (s.audios.length > 0) {
            console.log(`    Audios: ${s.audios.map(a => a.url).join(', ')}`);
        }
    });
}

main().catch(console.error);
