import { supabase } from '../src/lib/supabase.ts';

async function fetchShape() {
    const { data, error } = await supabase
        .from("occurrences")
        .select(`
            *,
            taxa (
                *,
                genus:genera (
                    *,
                    family:families (*)
                )
            ),
            locations (*),
            multimedia (*)
        `).limit(1);
    
    console.log(JSON.stringify(data?.[0], null, 2));
}

fetchShape();
