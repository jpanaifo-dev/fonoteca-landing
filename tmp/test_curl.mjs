async function test() {
    try {
        const res = await fetch('http://localhost:4321/es/species');
        const text = await res.text();
        
        // Find "resultados" count in HTML
        const matchCount = text.match(/(\d+)\s+resultados/);
        console.log("Found match for resultados:", matchCount ? matchCount[0] : "Not found");

        // Count instances of the Grid item card
        const cardMatches = text.match(/div class="bg-white/g);
        console.log("Count of 'bg-white' structures on Page 1:", cardMatches ? cardMatches.length : 0);
    } catch (e) {
        console.error("Error fetching:", e);
    }
}

test();
