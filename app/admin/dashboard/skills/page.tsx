'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Skill } from '@/types';
import { Plus, Trash2, Loader2, Code } from 'lucide-react';

const CATEGORIES = [
  'Expertise Cyber',
  'Réponse aux incidents',
  'Chasse aux menaces',
  'Analyse Forensique',
  'SIEM',
  'IDS/IPS',
  'Analyse de Malware',
  'Sécurité Réseau',
  'Gestion des Vulnérabilités',
  'SOC',
  'Sécurité Cloud',
  'Pentesting',
  'Automatisation Sécurité',
  'Analyse des Logs',
  'Renseignement sur les Menaces',
  'Outils de Détection',
  'Systèmes & Réseaux',
  'Scripting / Code',
  'Soft Skills'
];

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [adding, setAdding] = useState(false);

  const categoriesList = Array.from(new Set([...CATEGORIES, ...skills.map(s => s.category)])).filter(Boolean) as string[];

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const { data } = await supabase.from('skills').select('*').order('category', { ascending: true });
    if (data) setSkills(data);
    setLoading(false);
  }

  async function handleAddSkill(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    setAdding(true);
    await supabase.from('skills').insert([{ name, category }]);
    setName('');
    await fetchSkills();
    setAdding(false);
  }

  async function deleteSkill(id: string) {
    await supabase.from('skills').delete().eq('id', id);
    fetchSkills();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Gestion des Compétences</h1>
        <p className="text-gray-400">Organisez vos forces techniques par catégories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="cyber-card p-6 rounded-xl border border-slate-800 h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyber-cyan" /> Nouvelle Compétence
          </h2>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Nom de la technologie</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="ex: Wireshark"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Catégorie</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {(() => {
              const isDisabled = Boolean(adding) || (name ?? '').toString().trim().length === 0;
              return (
                <button
                  type="submit"
                  aria-disabled={isDisabled}
                  className={`w-full bg-cyber-blue hover:bg-cyber-electric py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ajouter'}
                </button>
              );
            })()}
          </form>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-cyber-cyan" /></div>
          ) : (
            categoriesList.map(cat => {
              const catSkills = skills.filter(s => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat} className="cyber-card p-6 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-mono text-cyber-cyan uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">
                    {cat}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {catSkills.map(skill => (
                      <div key={skill.id} className="group flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 hover:border-cyber-blue/50 transition-colors">
                        <span className="text-sm">{skill.name}</span>
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
