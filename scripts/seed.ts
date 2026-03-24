// import { createClient } from '@supabase/supabase-js';
// import { speciesData } from '../src/data/species';
// import * as fs from 'fs';
// import * as path from 'path';

// // Load .env.local manually
// const envPath = path.resolve(process.cwd(), '.env.local');
// const envContent = fs.readFileSync(envPath, 'utf-8');
// const env: Record<string, string> = {};

// envContent.split(/\r?\n/).forEach(line => {
//   const [key, ...values] = line.split('=');
//   if (key && values.length > 0) {
//     env[key.trim()] = values.join('=').trim();
//   }
// });

// const supabaseUrl = env.SUPABASE_URL;
// const supabaseKey = env.SUPABASE_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   console.error("Error: SUPABASE_URL and SUPABASE_KEY must be in .env.local");
//   process.exit(1);
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// async function seed() {
//   console.log(`Starting to seed ${speciesData.length} records...`);

//   for (const species of speciesData) {
//     console.log(`\n--- Processing: ${species.scientificName} ---`);

//     // 1. Insert or Get Location
//     const locationName = species.location || 'Unknown Location';
//     const { data: locationData, error: locError } = await supabase
//       .from('locations')
//       .select('id')
//       .eq('locality', locationName)
//       .maybeSingle();

//     if (locError) {
//       console.error(`Error checking location for ${species.scientificName}:`, locError);
//       continue;
//     }

//     let locationId = locationData?.id;

//     if (!locationId) {
//       const { data: newLoc, error: newLocError } = await supabase
//         .from('locations')
//         .insert({
//           locality: locationName,
//           country: 'Peru',
//           continent: 'South America',
//         })
//         .select('id')
//         .single();

//       if (newLocError) {
//         console.error(`Error inserting location for ${species.scientificName}:`, newLocError);
//         continue;
//       }
//       locationId = newLoc.id;
//       console.log(`Created location: ${locationName} (${locationId})`);
//     } else {
//       console.log(`Found location: ${locationName} (${locationId})`);
//     }

//     // 2. Insert or Get Taxon
//     const { data: taxonData, error: taxError } = await supabase
//       .from('taxa')
//       .select('id')
//       .eq('scientificName', species.scientificName)
//       .maybeSingle();

//     if (taxError) {
//       console.error(`Error checking taxon for ${species.scientificName}:`, taxError);
//       continue;
//     }

//     let taxonId = taxonData?.id;

//     const classMap: Record<string, string> = {
//       Amphibians: 'Amphibia',
//       Birds: 'Aves',
//       Mammals: 'Mammalia',
//       Crickets: 'Insecta',
//       Reptiles: 'Reptilia',
//     };

//     if (!taxonId) {
//       const { data: newTaxon, error: newTaxonError } = await supabase
//         .from('taxa')
//         .insert({
//           scientificName: species.scientificName,
//           vernacularName: species.commonName_es,
//           class: classMap[species.category] || null,
//           taxonRank: 'species',
//           kingdom: 'Animalia',
//         })
//         .select('id')
//         .single();

//       if (newTaxonError) {
//         console.error(`Error inserting taxon for ${species.scientificName}:`, newTaxonError);
//         continue;
//       }
//       taxonId = newTaxon.id;
//       console.log(`Created taxon: ${species.scientificName} (${taxonId})`);
//     } else {
//       console.log(`Found taxon: ${species.scientificName} (${taxonId})`);
//     }

//     // 3. Create Occurrence
//     const dummyProfileId = '00000000-0000-0000-0000-000000000000'; // UUID placeholder
//     const occurrenceID = `${species.id}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

//     const { data: occurrenceData, error: occError } = await supabase
//       .from('occurrences')
//       .insert({
//         occurrenceID: occurrenceID,
//         taxon_id: taxonId,
//         location_id: locationId,
//         profile_id: dummyProfileId,
//         basisOfRecord: 'HumanObservation',
//         recordedBy: 'Fonoteca',
//         eventDate: new Date().toISOString().split('T')[0],
//       })
//       .select('id')
//       .single();

//     if (occError) {
//       console.error(`Error inserting occurrence for ${species.scientificName}:`, occError);
//       continue;
//     }

//     const occurrenceId = occurrenceData.id;
//     console.log(`Created occurrence: ${occurrenceID} (${occurrenceId})`);

//     // 4. Insert Multimedia
//     const mediaToInsert = [];

//     // Main Image
//     if (species.mainImage) {
//       const format = species.mainImage.endsWith('.png') ? 'image/png' : 'image/jpeg';
//       mediaToInsert.push({
//         occurrence_id: occurrenceId,
//         identifier: species.mainImage,
//         type: 'StillImage',
//         format: format,
//         title: 'Main Image',
//         creator: 'Fonoteca',
//       });
//     }

//     // Gallery Images
//     for (const img of species.galleryImages) {
//       if (img === species.mainImage) continue;
//       const format = img.endsWith('.png') ? 'image/png' : 'image/jpeg';
//       mediaToInsert.push({
//         occurrence_id: occurrenceId,
//         identifier: img,
//         type: 'StillImage',
//         format: format,
//         title: 'Gallery Image',
//         creator: 'Fonoteca',
//       });
//     }

//     // Audio Files
//     for (const audio of species.audios) {
//       const format = audio.url.endsWith('.wav') ? 'audio/wav' : audio.url.endsWith('.ogg') ? 'audio/ogg' : 'audio/mpeg';
//       mediaToInsert.push({
//         occurrence_id: occurrenceId,
//         identifier: audio.url,
//         type: 'Sound',
//         format: format,
//         title: audio.title,
//         description: audio.description || null,
//         creator: 'Fonoteca',
//       });
//     }

//     if (mediaToInsert.length > 0) {
//       const { error: mediaError } = await supabase
//         .from('multimedia')
//         .insert(mediaToInsert);

//       if (mediaError) {
//         console.error(`Error inserting multimedia for ${species.scientificName}:`, mediaError);
//       } else {
//         console.log(`Inserted ${mediaToInsert.length} media records.`);
//       }
//     }
//   }

//   console.log('\n✅ Seeding complete!');
// }

// seed().catch(console.error);
