import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title_fr, title_en, issuer, issue_date, credential_url, description_fr, description_en } = body;

    if (!title_fr || !title_en || !issuer || !issue_date) {
      return NextResponse.json({ error: 'Title, issuer and issue date are required.' }, { status: 400 });
    }

    const { error } = await supabase.from('certifications').insert([
      {
        title_fr,
        title_en,
        issuer,
        issue_date,
        credential_url: credential_url || null,
        description_fr: description_fr || '',
        description_en: description_en || ''
      }
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Certifications API error:', err);
    return NextResponse.json({ error: 'Impossible d\'ajouter la certification.' }, { status: 500 });
  }
}
