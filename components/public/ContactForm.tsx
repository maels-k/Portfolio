'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const { t } = useI18n();

  const validate = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus('error');
        setError(result.error || 'Une erreur est survenue lors de l\'envoi.');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus('error');
      setError('Impossible de contacter le serveur.');
    }
  };

  const inputClasses = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-slate-400";

  return (
    <div className="premium-card p-8 lg:p-12 bg-white dark:bg-slate-900 shadow-xl">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-8 shadow-lg shadow-accent/10">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white">{t('contact.success.title')}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">{t('contact.success.desc')}</p>
            <button
              onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }}
              className="text-primary font-bold hover:underline transition-all"
            >
              {t('contact.success.btn')}
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest px-1">{t('contact.form.name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className={inputClasses}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest px-1">{t('contact.form.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className={inputClasses}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest px-1">{t('contact.form.subject')}</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className={inputClasses}
                placeholder="Collaboration, Opportunité, etc."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest px-1">{t('contact.form.message')}</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className={inputClasses}
                placeholder="Dites-moi tout..."
              ></textarea>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}

            <button
              disabled={status === 'loading'}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              {status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  <span className="relative z-10">{t('contact.form.send')}</span>
                  <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
