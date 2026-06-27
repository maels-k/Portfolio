'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types';
import { Save, Loader2, User, Globe, FileText, CheckCircle, Upload } from 'lucide-react';

export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [message, setMessage] = useState('');
  const [activeLang, setActiveLang] = useState<'fr' | 'en'>('fr');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data } = await supabase.from('profile').select('*').single();
    if (data) setProfile(data);
    setLoading(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/profile-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Upload failed');
      }

      const { url } = await response.json();
      setProfile({ ...profile, profile_image_url: url });
      setMessage('Image uploadée avec succès !');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erreur upload:', error);
      setMessage('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleCvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCv(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Upload failed');
      }

      const { url } = await response.json();
      setProfile({ ...profile, cv_url: url });
      setMessage('CV uploadé avec succès !');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erreur upload CV:', error);
      setMessage('Erreur lors de l\'upload du CV');
    } finally {
      setUploadingCv(false);
      if (cvInputRef.current) cvInputRef.current.value = '';
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const { error } = await supabase.from('profile').upsert({
      ...profile,
      id: profile.id || undefined,
      updated_at: new Date().toISOString()
    });

    if (!error) {
      setMessage('Profil mis à jour avec succès !');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-cyber-cyan" /></div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold">Mon Profil</h1>
            <p className="text-gray-400">Gérez vos informations (FR / EN).</p>
          </div>
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button onClick={() => setActiveLang('fr')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeLang === 'fr' ? 'bg-cyber-blue text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>FR</button>
            <button onClick={() => setActiveLang('en')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeLang === 'en' ? 'bg-cyber-blue text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>EN</button>
          </div>
        </div>
        {message && (
          <div className="flex items-center gap-2 text-cyber-green bg-cyber-green/10 px-4 py-2 rounded-lg border border-cyber-green/20">
            <CheckCircle className="w-4 h-4" /> {message}
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-2"><User className="w-5 h-5 text-cyber-cyan" /> Identité</h2>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Nom Complet</label>
              <input type="text" value={profile.full_name || ''} onChange={e => setProfile({...profile, full_name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue" />
            </div>
            {activeLang === 'fr' ? (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Titre (FR)</label>
                <input type="text" value={profile.title_fr || ''} onChange={e => setProfile({...profile, title_fr: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue" />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Title (EN)</label>
                <input type="text" value={profile.title_en || ''} onChange={e => setProfile({...profile, title_en: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-cyber-blue" />
              </div>
            )}
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="availability" checked={profile.availability || false} onChange={e => setProfile({...profile, availability: e.target.checked})} className="w-4 h-4 accent-cyber-green" />
              <label htmlFor="availability" className="text-sm text-gray-300">Disponible pour opportunités</label>
            </div>
          </div>

          <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-2"><Globe className="w-5 h-5 text-cyber-cyan" /> Réseaux & CV</h2>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">LinkedIn</label>
              <input type="text" value={profile.social_links?.linkedin || ''} onChange={e => setProfile({...profile, social_links: {...(profile.social_links || {}), linkedin: e.target.value}})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">GitHub</label>
              <input type="text" value={profile.social_links?.github || ''} onChange={e => setProfile({...profile, social_links: {...(profile.social_links || {}), github: e.target.value}})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">CV PDF</label>
              <div className="flex gap-3">
                <input
                  ref={cvInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleCvUpload}
                  disabled={uploadingCv}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => cvInputRef.current?.click()}
                  disabled={uploadingCv}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2.5 hover:border-cyber-cyan transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  {uploadingCv ? 'Upload...' : 'Choisir un fichier PDF'}
                </button>
              </div>
              {profile.cv_url && (
                <div className="mt-2 p-2 bg-slate-800/50 rounded-lg text-xs text-gray-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  CV uploadé ✓
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Photo de profil</label>
              <div className="flex gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2.5 hover:border-cyber-cyan transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Upload...' : 'Choisir une image'}
                </button>
              </div>
              {profile.profile_image_url && (
                <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                  <img src={profile.profile_image_url} alt="Profile preview" className="max-h-40 rounded-lg object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-2"><FileText className="w-5 h-5 text-cyber-cyan" /> Contenus Textuels ({activeLang.toUpperCase()})</h2>
          {activeLang === 'fr' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Accroche Hero (FR)</label>
                <textarea rows={2} value={profile.hero_text_fr || ''} onChange={e => setProfile({...profile, hero_text_fr: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Biographie (FR)</label>
                <textarea rows={5} value={profile.bio_fr || ''} onChange={e => setProfile({...profile, bio_fr: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Hero Hook (EN)</label>
                <textarea rows={2} value={profile.hero_text_en || ''} onChange={e => setProfile({...profile, hero_text_en: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Biography (EN)</label>
                <textarea rows={5} value={profile.bio_en || ''} onChange={e => setProfile({...profile, bio_en: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 outline-none" />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="bg-cyber-blue hover:bg-cyber-electric px-10 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyber-blue/20">
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
