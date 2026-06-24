'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';
import { Plus, Edit, Trash2, ExternalLink, Github, Loader2, X, Briefcase, Globe } from 'lucide-react';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setProjects(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const projectData = {
      ...currentProject,
      technologies: typeof currentProject.technologies === 'string'
        ? (currentProject.technologies as string).split(',').map(t => t.trim())
        : currentProject.technologies
    };

    if (currentProject.id) {
      await supabase.from('projects').update(projectData).eq('id', currentProject.id);
    } else {
      await supabase.from('projects').insert([projectData]);
    }

    await fetchProjects();
    setIsModalOpen(false);
    setSaving(false);
    setCurrentProject({});
  }

  async function deleteProject(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  }

  const openEditModal = (project: Project) => {
    setCurrentProject({
      ...project,
      technologies: (project.technologies || []).join(', ') as any
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Projets</h1>
          <p className="text-gray-400">Ajoutez vos réalisations (FR / EN).</p>
        </div>
        <button
          onClick={() => { setCurrentProject({}); setIsModalOpen(true); }}
          className="bg-cyber-blue hover:bg-cyber-electric text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <Plus className="w-5 h-5" /> Ajouter un projet
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-cyber-cyan" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="cyber-card p-4 rounded-xl border border-slate-800 flex flex-col">
              <div className="h-40 bg-slate-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title_fr} className="w-full h-full object-cover" />
                ) : (
                  <Briefcase className="w-12 h-12 text-slate-700" />
                )}
              </div>
              <h3 className="text-lg font-bold mb-1">{project.title_fr}</h3>
              <p className="text-xs text-cyber-cyan mb-2 font-mono italic">{project.title_en}</p>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800 mt-auto">
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(project)} className="p-2 hover:bg-slate-800 rounded text-cyber-cyan">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteProject(project.id)} className="p-2 hover:bg-slate-800 rounded text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">{currentProject.id ? 'Modifier' : 'Nouveau'}</h2>
                <div className="flex bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setActiveLang('fr')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeLang === 'fr' ? 'bg-cyber-blue text-white' : 'text-gray-500'}`}
                  >FR</button>
                  <button
                    onClick={() => setActiveLang('en')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeLang === 'en' ? 'bg-cyber-blue text-white' : 'text-gray-500'}`}
                  >EN</button>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {activeLang === 'fr' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Titre (FR)</label>
                      <input type="text" required value={currentProject.title_fr || ''} onChange={e => setCurrentProject({...currentProject, title_fr: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Rôle (FR)</label>
                      <input type="text" value={currentProject.role_fr || ''} onChange={e => setCurrentProject({...currentProject, role_fr: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Description (FR)</label>
                    <textarea required rows={4} value={currentProject.description_fr || ''} onChange={e => setCurrentProject({...currentProject, description_fr: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Title (EN)</label>
                      <input type="text" required value={currentProject.title_en || ''} onChange={e => setCurrentProject({...currentProject, title_en: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Role (EN)</label>
                      <input type="text" value={currentProject.role_en || ''} onChange={e => setCurrentProject({...currentProject, role_en: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Description (EN)</label>
                    <textarea required rows={4} value={currentProject.description_en || ''} onChange={e => setCurrentProject({...currentProject, description_en: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Technologies (CSV)</label>
                  <input type="text" value={currentProject.technologies || ''} onChange={e => setCurrentProject({...currentProject, technologies: e.target.value as any})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium text-gray-400">Image URL</label><input type="text" value={currentProject.image_url || ''} onChange={e => setCurrentProject({...currentProject, image_url: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-gray-400">GitHub URL</label><input type="text" value={currentProject.github_url || ''} onChange={e => setCurrentProject({...currentProject, github_url: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" /></div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors">Annuler</button>
                <button type="submit" disabled={saving} className="bg-cyber-blue hover:bg-cyber-electric px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {currentProject.id ? 'Mettre à jour' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
