'use client';

import { useState, useEffect } from 'react';
import { Certification } from '@/types';
import { Plus, Trash2, Loader2, Award, Link as LinkIcon } from 'lucide-react';

const initialState: Partial<Certification> = {
  title_fr: '',
  title_en: '',
  issuer: '',
  issue_date: '',
  credential_url: '',
  description_fr: '',
  description_en: ''
};

export default function CertificationsAdmin() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Certification>>(initialState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCertifications();
  }, []);

  async function fetchCertifications() {
    try {
      const response = await fetch('/api/certifications');
      const payload = await response.json();

      if (!response.ok) {
        console.error('Fetch certifications error:', payload.error);
        setCertifications([]);
      } else {
        setCertifications(payload.data || []);
      }
    } catch (fetchError) {
      console.error('Fetch certifications error:', fetchError);
      setCertifications([]);
    }

    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.title_fr || !form.title_en || !form.issuer || !form.issue_date) {
      setError('Veuillez renseigner le titre, l\'organisme et la date.');
      return;
    }

    setSaving(true);
    const payload = {
      title_fr: form.title_fr,
      title_en: form.title_en,
      issuer: form.issuer,
      issue_date: form.issue_date,
      credential_url: form.credential_url || null,
      description_fr: form.description_fr || '',
      description_en: form.description_en || ''
    };

    try {
      const response = await fetch('/api/certifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('Insert certification error:', result.error);
        setError('Impossible d\'ajouter la certification.');
        setSaving(false);
        return;
      }

      setForm(initialState);
      await fetchCertifications();
    } catch (insertError) {
      console.error('Insert certification error:', insertError);
      setError('Impossible d\'ajouter la certification.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteCertification(id: string) {
    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (!response.ok) {
        console.error('Delete certification error:', result.error);
      }
    } catch (deleteError) {
      console.error('Delete certification error:', deleteError);
    }

    await fetchCertifications();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Gestion des Certifications</h1>
        <p className="text-gray-400">Ajoutez, modifiez ou supprimez vos certifications professionnelles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="cyber-card p-6 rounded-xl border border-slate-800 h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyber-cyan" /> Nouvelle Certification
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Titre (FR)</label>
              <input
                type="text"
                value={form.title_fr || ''}
                onChange={e => setForm({ ...form, title_fr: e.target.value })}
                placeholder="Certification Offensive / Détection"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Title (EN)</label>
              <input
                type="text"
                value={form.title_en || ''}
                onChange={e => setForm({ ...form, title_en: e.target.value })}
                placeholder="Offensive / Detection Certification"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Organisme</label>
              <input
                type="text"
                value={form.issuer || ''}
                onChange={e => setForm({ ...form, issuer: e.target.value })}
                placeholder="Offensive Security / Cisco"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Date d&apos;émission</label>
              <input
                type="text"
                value={form.issue_date || ''}
                onChange={e => setForm({ ...form, issue_date: e.target.value })}
                placeholder="Juillet 2024"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">URL du certificat</label>
              <input
                type="text"
                value={form.credential_url || ''}
                onChange={e => setForm({ ...form, credential_url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Description (FR)</label>
              <textarea
                rows={3}
                value={form.description_fr || ''}
                onChange={e => setForm({ ...form, description_fr: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Description (EN)</label>
              <textarea
                rows={3}
                value={form.description_en || ''}
                onChange={e => setForm({ ...form, description_en: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-cyber-blue hover:bg-cyber-electric py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyber-blue/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ajouter la certification'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-cyber-cyan" /></div>
          ) : certifications.length === 0 ? (
            <div className="cyber-card p-6 rounded-xl border border-slate-800 text-slate-400">
              Aucun certificat enregistré.
            </div>
          ) : (
            certifications.map(cert => (
              <div key={cert.id} className="cyber-card p-6 rounded-xl border border-slate-800 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-2xl bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{cert.title_fr}</h3>
                        <p className="text-sm text-slate-400">{cert.issuer} • {cert.issue_date}</p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{cert.description_fr}</p>
                  </div>
                  <button
                    onClick={() => deleteCertification(cert.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-cyber-cyan font-semibold"
                  >
                    <LinkIcon className="w-4 h-4" /> Voir le certificat
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
