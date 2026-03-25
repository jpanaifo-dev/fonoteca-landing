import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://amvxmowhdotagfsagryv.supabase.co';
const supabaseKey = 'sb_publishable_1zDK_C6WAGqHKU6jN9cgrw_ICXjVa_Z';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const { data: occurrences } = await supabase
        .from('occurrences')
        .select(`
            id,
            multimedia (*)
        `);

    if (occurrences) {
        let audiosCount = 0;
        
        occurrences.forEach(occ => {
            const media = occ.multimedia || [];
            const isAudio = (m) => m.type && (m.type.toLowerCase().includes('sound') || m.type.toLowerCase().includes('audio'));
            const isImage = (m) => m.type && (m.type.toLowerCase().includes('image') || m.type.toLowerCase().includes('still'));

            const auds = media.filter(isAudio);
            const imgs = media.filter(isImage);

            if (auds.length > 0 && imgs.length > 0) {
                console.log(`\n--- Occurrence: ${occ.id} ---`);
                console.log(`Audios: ${auds.length}, Images: ${imgs.length}`);
                
                imgs.forEach(img => {
                    console.log(`Image - id: ${img.id}, title: ${img.title}, tag: ${img.tag}, description: ${img.description}, format: ${img.format}`);
                });
            }
        });
    }
}

test();
