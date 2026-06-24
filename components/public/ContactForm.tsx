'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="cyber-card p-12 rounded-2xl border border-cyber-green/30 text-center space-y-4 animate-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-green/20 text-cyber-green mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold">{t('contact.success.title')}</h3>
        <p className="text-gray-400">{t('contact.success.desc')}</p>
        <button onClick={() => setStatus('idle')} className="text-cyber-cyan hover:underline mt-4 text-sm font-mono">
          {t('contact.success.btn')}
        </button>
      </div>
    );
  }

  return (
    <div className="cyber-card p-8 lg:p-12 rounded-2xl border border-slate-800">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t('contact.form.name')}</label>
            <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-cyber-blue transition-all outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t('contact.form.email')}</label>
            <input required type="email" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-cyber-blue transition-all outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t('contact.form.subject')}</label>
          <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-cyber-blue transition-all outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t('contact.form.message')}</label>
          <textarea required rows={5} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-cyber-blue transition-all outline-none"></textarea>
        </div>

        <button disabled={status === 'loading'} type="submit" className="w-full bg-cyber-blue hover:bg-cyber-electric text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyber-blue/20 flex items-center justify-center gap-3 group">
          {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <>{t('contact.form.send')}<Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
          )}
        </button>
      </form>
    </div>
  );
}
