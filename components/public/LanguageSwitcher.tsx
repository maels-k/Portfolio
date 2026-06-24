'use client';

import { useI18n } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyber-cyan transition-all text-xs font-mono group"
    >
      <Globe className="w-3.5 h-3.5 text-cyber-cyan group-hover:rotate-12 transition-transform" />
      <span className={lang === 'fr' ? 'text-white' : 'text-gray-500'}>FR</span>
      <span className="text-gray-700">|</span>
      <span className={lang === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
    </button>
  );
}
