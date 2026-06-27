import { createClient } from '@supabase/supabase-js';
import ClientPage from './ClientPage';

export const dynamic = 'force-dynamic';

const serverSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function Home() {
  const [
    { data: profile },
    { data: projects },
    { data: skills },
    { data: timeline },
    certificationResult
  ] = await Promise.all([
    serverSupabase.from('profile').select('*').single(),
    serverSupabase.from('projects').select('*').order('created_at', { ascending: false }),
    serverSupabase.from('skills').select('*').order('category'),
    serverSupabase.from('timeline').select('*').order('created_at', { ascending: false }),
    serverSupabase.from('certifications').select('*').order('created_at', { ascending: false })
  ]);

  const certifications = certificationResult?.data || [];

  return (
    <ClientPage
      profile={profile || {}}
      projects={projects || []}
      skills={skills || []}
      timeline={timeline || []}
      certifications={certifications}
    />
  );
}
