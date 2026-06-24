'use client';

import { Profile } from '@/types';
import { Download, Terminal, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Hero({ profile }: { profile: Partial<Profile> }) {
  const { lang, t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1e3a8a 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyber-green"></span>
              {profile.availability ? t('hero.available') : t('hero.busy')}
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight">
                {profile.full_name || 'Ismaël Koné'}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-medium text-cyber-cyan bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-cyber-blue">
                {lang === 'fr' ? profile.title_fr : profile.title_en}
              </h2>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                {lang === 'fr' ? profile.hero_text_fr : profile.hero_text_en}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#projects" className="px-8 py-4 bg-cyber-blue hover:bg-cyber-electric text-white font-bold rounded-xl transition-all flex items-center gap-2 group">
                {t('hero.cta.labs')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={profile.cv_url || '#'} target="_blank" className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-cyber-cyan text-white font-bold rounded-xl transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t('hero.cta.cv')}
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="cyber-card p-1 rounded-2xl overflow-hidden border border-cyber-blue/30 shadow-[0_0_50px_rgba(30,58,138,0.2)]">
              <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/50"></div><div className="w-3 h-3 rounded-full bg-yellow-500/50"></div><div className="w-3 h-3 rounded-full bg-green-500/50"></div></div>
                  <div className="text-xs text-gray-500 ml-2">bash — ismael@cyber-lab</div>
                </div>
                <div className="space-y-2">
                  <p className="text-cyber-green flex gap-2"><span className="text-cyber-blue">$</span> whoami</p>
                  <p className="text-gray-300">ismael_kone</p>
                  <p className="text-cyber-green flex gap-2"><span className="text-cyber-blue">$</span> cat skills.json</p>
                  <p className="text-gray-400">
                    {'{'}<br />&nbsp;&nbsp;"focus": "Blue Team",<br />&nbsp;&nbsp;"status": "{lang === 'fr' ? 'Investigation...' : 'Investigating threats...'}"<br />{'}'}
                  </p>
                  <p className="text-cyber-green flex gap-2 animate-pulse"><span className="text-cyber-blue">$</span> <span className="w-2 h-5 bg-cyber-cyan"></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
