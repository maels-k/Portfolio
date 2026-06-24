'use client';

import { Profile } from '@/types';
import { ShieldCheck, Eye, Network, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

export default function About({ profile }: { profile: Partial<Profile> }) {
  const { lang, t } = useI18n();

  const focusAreas = [
    {
      title: lang === 'fr' ? 'Surveillance SIEM' : 'SIEM Monitoring',
      desc: lang === 'fr' ? 'Triage d\'alertes et analyse de logs.' : 'Alert triage and log analysis.',
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      title: lang === 'fr' ? 'Investigation' : 'Investigation',
      desc: lang === 'fr' ? 'Forensic et recherche d\'indices (IOCs).' : 'Forensics and IOC discovery.',
      icon: ShieldCheck,
      color: 'text-cyan-400'
    },
    {
      title: lang === 'fr' ? 'Sécurité Réseaux' : 'Network Security',
      desc: lang === 'fr' ? 'Segmentation VLAN et DMZ.' : 'VLAN and DMZ segmentation.',
      icon: Network,
      color: 'text-indigo-400'
    },
    {
      title: lang === 'fr' ? 'Hardening' : 'Hardening',
      desc: lang === 'fr' ? 'Durcissement des configurations.' : 'System hardening configurations.',
      icon: Lock,
      color: 'text-blue-500'
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              {t('about.title')} <br />
              <span className="text-cyber-cyan italic">{t('about.subtitle')}</span>
            </h2>
            <div className="w-20 h-1.5 bg-cyber-blue rounded-full"></div>
            <p className="text-gray-400 text-lg leading-relaxed">
              {lang === 'fr' ? profile.bio_fr : profile.bio_en}
            </p>

            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-white">03+</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">{t('about.projects_count')}</div>
              </div>
              <div className="w-px h-12 bg-slate-800"></div>
              <div>
                <div className="text-3xl font-bold text-white">SOC</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">{t('about.orientation')}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {focusAreas.map((area, i) => (
              <div key={area.title} className="cyber-card p-6 rounded-2xl border border-slate-800 hover:translate-y-[-4px] transition-all duration-300 group">
                <div className={cn("w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center mb-4 border border-slate-800 group-hover:border-cyber-blue/50 transition-colors", area.color)}>
                  <area.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{area.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
