const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
const vars = Object.fromEntries(content.split(/\r?\n/).filter(Boolean).map(line => line.split('=')).map(([k, ...v]) => [k, v.join('=')]));
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(vars.NEXT_PUBLIC_SUPABASE_URL, vars.SUPABASE_SERVICE_ROLE_KEY);

(async function () {
  try {
    const { data, error } = await supabase.from('certifications').select('*').limit(1);
    console.log('error', error);
    console.log('data length', data?.length);
  } catch (e) {
    console.error('exception', e);
  }
})();
