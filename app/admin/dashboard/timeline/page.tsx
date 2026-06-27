'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TimelineItem } from '@/types';
import { Plus, Edit, Trash2, Loader2, CalendarDays } from 'lucide-react';

const initialState = {
  id: null as string | null,
  type: 'experience' as 'formation' | 'experience',
  title_fr: '',
  title_en: '',
  institution: '',
  period: '',
  description_fr: '',
  description_en: '',
};

export default function TimelineAdmin() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTimeline();
  }, []);

  async function fetchTimeline() {
    setLoading(true);
    const { data, error } = await supabase.from('timeline').select('*').order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      type: form.type,
      title_fr: form.title_fr,
      title_en: form.title_en,
      institution: form.institution,
      period: form.period,
      description_fr: form.description_fr,
      description_en: form.description_en,
    };

    let error = null;

    if (form.id) {
      const result = await supabase.from('timeline').update(payload).eq('id', form.id);
      error = result.error;
    } else {
      const result = await supabase.from('timeline').insert([payload]);
      error = result.error;
    }

    if (error) {
      setError(error.message);
    } else {
      setForm(initialState);
      fetchTimeline();
    }
    setSaving(false);
  }

  async function deleteItem(id: string) {
    if (!window.confirm('Supprimer cet élément de timeline ?')) {
      return;
    }
    const { error } = await supabase.from('timeline').delete().eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      setItems((current) => current.filter((item) => item.id !== id));
    }
  }

  function openEdit(item: TimelineItem) {
    setForm({
      id: item.id,
      type: item.type,
      title_fr: item.title_fr,
      title_en: item.title_en,
      institution: item.institution,
      period: item.period,
      description_fr: item.description_fr,
      description_en: item.description_en,
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion de la Timeline</h1>
          <p className="text-gray-400">Ajoutez et supprimez les expériences ou formations affichées sur le portfolio.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/70 px-4 py-3 border border-slate-800">
          <CalendarDays className="w-5 h-5 text-cyber-cyan" />
          <span className="text-sm text-gray-300">{items.length} éléments</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="cyber-card rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-xl font-semibold mb-4">Éléments de la timeline</h2>
          {loading ? (
            <div className="flex justify-center py-12 text-cyber-cyan"><Loader2 className="w-8 h-8 animate-spin" /></div>
          ) : items.length === 0 ? (
            <p className="text-gray-500">Aucun élément de timeline n’a été trouvé.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyber-cyan mb-2">
                        <span>{item.type === 'formation' ? 'Formation' : 'Expérience'}</span>
                        <span>•</span>
                        <span>{item.period}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{item.title_fr || item.title_en}</h3>
                      <p className="text-sm text-gray-400">{item.institution}</p>
                      <p className="text-sm text-gray-500 mt-3">{item.description_fr || item.description_en}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-full border border-cyber-blue/20 px-4 py-2 text-sm text-cyber-cyan hover:bg-cyber-blue/10 transition"
                      >
                        <Edit className="inline-block mr-2 w-4 h-4" /> Modifier
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="rounded-full border border-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10 transition"
                      >
                        <Trash2 className="inline-block mr-2 w-4 h-4" /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cyber-card rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyber-cyan" /> {form.id ? 'Modifier un élément' : 'Ajouter un élément'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="space-y-2 text-sm text-gray-400">
                Type
                <select
                  value={form.type}
                  onChange={(event) => setForm({ ...form, type: event.target.value as 'formation' | 'experience' })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyber-blue"
                >
                  <option value="experience">Experience</option>
                  <option value="formation">Formation</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-gray-400">
                Période
                <input
                  type="text"
                  value={form.period}
                  onChange={(event) => setForm({ ...form, period: event.target.value })}
                  placeholder="Ex: 2022 - 2024"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyber-blue"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-gray-400">
              Titre FR
              <input
                type="text"
                value={form.title_fr}
                onChange={(event) => setForm({ ...form, title_fr: event.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </label>
            <label className="space-y-2 text-sm text-gray-400">
              Title EN
              <input
                type="text"
                value={form.title_en}
                onChange={(event) => setForm({ ...form, title_en: event.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </label>
            <label className="space-y-2 text-sm text-gray-400">
              Institution
              <input
                type="text"
                value={form.institution}
                onChange={(event) => setForm({ ...form, institution: event.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </label>
            <label className="space-y-2 text-sm text-gray-400">
              Description FR
              <textarea
                value={form.description_fr}
                onChange={(event) => setForm({ ...form, description_fr: event.target.value })}
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </label>
            <label className="space-y-2 text-sm text-gray-400">
              Description EN
              <textarea
                value={form.description_en}
                onChange={(event) => setForm({ ...form, description_en: event.target.value })}
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </label>

            {error && <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-300">{error}</div>}

            <div className="flex flex-col gap-3">
              {form.id ? (
                <button
                  type="button"
                  onClick={() => setForm(initialState)}
                  className="rounded-2xl border border-slate-700 px-5 py-3 text-sm text-gray-300 hover:bg-slate-800 transition"
                >
                  Annuler
                </button>
              ) : null}
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-2xl bg-cyber-blue px-5 py-3 text-white font-semibold transition hover:bg-cyber-electric disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" /> : null}
                {form.id ? 'Mettre à jour' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
