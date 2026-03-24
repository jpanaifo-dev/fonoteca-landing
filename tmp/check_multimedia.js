import { supabase } from '../src/lib/supabase.js';

async function check() {
  const { data, error } = await supabase
    .from('multimedia')
    .select('type, format, identifier')
    .limit(10);

  if (error) {
    console.error(error);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

check();
