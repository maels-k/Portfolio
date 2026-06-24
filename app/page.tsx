import { supabase } from '@/lib/supabase';
import ClientPage from './ClientPage';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [
    { data: profile },
    { data: projects },
    { data: skills },
    { data: timeline }
  ] = await Promise.all([
    supabase.from('profile').select('*').single(),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('skills').select('*').order('category'),
    supabase.from('timeline').select('*').order('created_at', { ascending: false })
  ]);

  return (
    <ClientPage
      profile={profile || {}}
      projects={projects || []}
      skills={skills || []}
      timeline={timeline || []}
    />
  );
}
