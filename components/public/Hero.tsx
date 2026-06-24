'use client';

import { Profile } from '@/types';
import { Download, ChevronRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Hero({ profile }: { profile: Partial<Profile> }) {
  const { lang, t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-cyber-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyber-green/90">
                {profile.availability ? t('hero.available') : t('hero.busy')}
              </span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl lg:text-8xl font-bold tracking-tight title-gradient leading-[0.9]"
              >
                {profile.full_name || 'Ismaël Koné'}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="h-px w-12 bg-cyber-cyan"></div>
                <h2 className="text-xl lg:text-2xl font-mono text-cyber-cyan tracking-wider">
                  {lang === 'fr' ? profile.title_fr : profile.title_en}
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed font-light"
              >
                {lang === 'fr' ? profile.hero_text_fr : profile.hero_text_en}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Link href="#projects" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta.labs')}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-cyber-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>

              <Link href={profile.cv_url || '#'} target="_blank" className="group px-8 py-4 glass border border-white/10 hover:border-white/30 text-white font-bold rounded-full transition-all flex items-center gap-2">
                <Download className="w-4 h-4 text-cyber-cyan group-hover:scale-110 transition-transform" />
                {t('hero.cta.cv')}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative z-10 glass rounded-3xl p-6 border border-white/10 shadow-2xl scanline overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                  <Activity className="w-3 h-3 text-cyber-green animate-pulse" />
                  SYSTEM_STATUS: SECURE
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs leading-relaxed">
                <div className="flex gap-3">
                  <span className="text-cyber-cyan">root@cyber-lab:</span>
                  <span className="text-white">~# whoami</span>
                </div>
                <div className="text-gray-400 pl-4">ismael_kone</div>

                <div className="flex gap-3 mt-4">
                  <span className="text-cyber-cyan">root@cyber-lab:</span>
                  <span className="text-white">~# fetch --profile</span>
                </div>
                <div className="grid grid-cols-1 gap-2 pl-4">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-500 italic">ROLE</span>
                    <span className="text-cyber-electric">Blue Team Analyst</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-500 italic">FOCUS</span>
                    <span className="text-cyber-electric">Threat Hunting</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-500 italic">Uptime</span>
                    <span className="text-cyber-green">99.9%</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <span className="text-cyber-cyan animate-pulse">_</span>
                  <div className="w-24 h-4 bg-white/5 rounded"></div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 border border-cyber-cyan/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white"></div>
      </div>
    </section>
  );
}
