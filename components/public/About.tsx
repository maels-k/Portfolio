'use client';

import { Profile } from '@/types';
import { ShieldCheck, Eye, Network, Lock, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function About({ profile }: { profile: Partial<Profile> }) {
  const { lang, t } = useI18n();

  const focusAreas = [
    {
      title: lang === 'fr' ? 'Surveillance SIEM' : 'SIEM Monitoring',
      desc: lang === 'fr' ? 'Analyse temps-réel des événements de sécurité.' : 'Real-time analysis of security events.',
      icon: Eye,
      color: 'from-blue-500/20 to-transparent',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400'
    },
    {
      title: lang === 'fr' ? 'Investigation' : 'Investigation',
      desc: lang === 'fr' ? 'Forensic de niveau 1 et recherche d\'IOCs.' : 'Level 1 Forensics and IOC discovery.',
      icon: ShieldCheck,
      color: 'from-cyan-500/20 to-transparent',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      title: lang === 'fr' ? 'Sécurité Réseaux' : 'Network Security',
      desc: lang === 'fr' ? 'Architectures sécurisées et segmentation.' : 'Secure architectures and segmentation.',
      icon: Network,
      color: 'from-indigo-500/20 to-transparent',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-400'
    },
    {
      title: lang === 'fr' ? 'Hardening' : 'Hardening',
      desc: lang === 'fr' ? 'Optimisation du niveau de sécurité système.' : 'Optimizing system security posture.',
      icon: Lock,
      color: 'from-emerald-500/20 to-transparent',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-cyber-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="lg:w-1/2 space-y-12 sticky top-32">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyber-cyan text-sm font-mono tracking-tighter uppercase">
                <Crosshair className="w-4 h-4 animate-spin-slow" />
                <span>mission_briefing.exe</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
                {t('about.title')} <br />
                <span className="text-white opacity-40">{t('about.subtitle')}</span>
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-gray-400 text-xl leading-relaxed font-light">
                {lang === 'fr' ? profile.bio_fr : profile.bio_en}
              </p>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-white tracking-tighter">03+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-[0.3em] font-mono">{t('about.projects_count')}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-white tracking-tighter">SOC</div>
                  <div className="text-xs text-gray-500 uppercase tracking-[0.3em] font-mono">{t('about.orientation')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-8 rounded-[2rem] border bg-gradient-to-br transition-all duration-500 group relative overflow-hidden",
                  area.borderColor,
                  area.color
                )}
              >
                <div className={cn("mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", area.iconColor)}>
                  <area.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{area.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{area.desc}</p>

                {/* Decorative corner */}
                <div className={cn("absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 rounded-tr-[2rem] opacity-0 group-hover:opacity-100 transition-opacity", area.borderColor)}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
