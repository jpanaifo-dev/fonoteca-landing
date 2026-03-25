import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://amvxmowhdotagfsagryv.supabase.co';
const supabaseKey = 'sb_publishable_1zDK_C6WAGqHKU6jN9cgrw_ICXjVa_Z';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const { data: occurrences, error, count } = await supabase
        .from('occurrences')
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
        `, { count: 'exact' });

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log("Total Count from Supabase (count):", count);
    console.log("Returned Rows (data.length):", occurrences?.length);

    if (occurrences && occurrences.length > 0) {
        let mappedCount = 0;
        let nullTaxonCount = 0;
        let withAudioCount = 0;

        occurrences.forEach((occ, index) => {
            const taxon = occ.taxa;
            if (!taxon) nullTaxonCount++;

            const media = occ.multimedia || [];
            const isAudio = media.some(m => m.type && (m.type.toLowerCase().includes('sound') || m.type.toLowerCase().includes('audio')));
            if (isAudio) withAudioCount++;

            mappedCount++;
        });

        console.log("Items with NULL taxon:", nullTaxonCount);
        console.log("Items with audio:", withAudioCount);
        console.log("Mapped Count:", mappedCount);
    }
}

test();
