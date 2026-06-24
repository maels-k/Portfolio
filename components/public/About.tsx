'use client';

import { Profile } from '@/types';
import { Shield, Eye, Network, Lock, Crosshair, Users, Target, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function About({ profile }: { profile: Partial<Profile> }) {
  const { lang, t } = useI18n();

  const cards = [
    {
      title: lang === 'fr' ? 'Investigation SIEM' : 'SIEM Investigation',
      icon: Eye,
      color: 'bg-primary/5 text-primary',
      border: 'border-primary/10'
    },
    {
      title: lang === 'fr' ? 'Sécurité Réseaux' : 'Network Security',
      icon: Network,
      color: 'bg-secondary/5 text-secondary',
      border: 'border-secondary/10'
    },
    {
      title: lang === 'fr' ? 'Hardening' : 'Hardening',
      icon: Lock,
      color: 'bg-accent/5 text-accent',
      border: 'border-accent/10'
    },
    {
      title: lang === 'fr' ? 'Esprit d\'Équipe' : 'Team Spirit',
      icon: Users,
      color: 'bg-indigo-500/5 text-indigo-500',
      border: 'border-indigo-500/10'
    },
  ];

  return (
    <section id="about" className="py-32 relative bg-white dark:bg-cyber-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-6 px-4 py-2 rounded-full bg-primary/5">
              <Crosshair className="w-4 h-4" />
              <span>À propos de moi</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-black mb-8 text-slate-900 dark:text-white leading-tight">
              Investigateur <span className="title-gradient">Numérique</span> <br />
              & Sécurité Défensive
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-10 font-medium">
              {lang === 'fr' ? profile.bio_fr : profile.bio_en}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Objectifs</h4>
                <p className="text-sm text-slate-500 dark:text-slate-500">Devenir un analyste SOC senior et expert en forensic.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <Rocket className="w-8 h-8 text-secondary mb-4" />
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Passion</h4>
                <p className="text-sm text-slate-500 dark:text-slate-500">Veille technologique constante sur les nouvelles menaces.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className={cn(
                  "p-10 rounded-[2.5rem] border bg-white dark:bg-slate-900 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]",
                  card.border
                )}
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8", card.color)}>
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                <div className="mt-4 w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
