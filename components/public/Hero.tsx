'use client';

import { Profile } from '@/types';
import { Download, ChevronRight, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Hero({ profile }: { profile: Partial<Profile> }) {
  const { lang, t } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-cyber-black">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="grid-bg absolute inset-0 opacity-40 dark:opacity-20"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-primary/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {profile.availability ? t('hero.available') : t('hero.busy')}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="block"
              >
                {profile.full_name || 'Ismaël Koné'}
              </motion.span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-2xl lg:text-3xl font-bold title-gradient mb-8"
            >
              {lang === 'fr' ? profile.title_fr : profile.title_en}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed font-medium mx-auto lg:mx-0"
            >
              {lang === 'fr' ? profile.hero_text_fr : profile.hero_text_en}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
            >
              <Link href="#projects" className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                {t('hero.cta.labs')}
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link href={profile.cv_url || '#'} target="_blank" className="px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t('hero.cta.cv')}
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              <Link href={profile.social_links?.github || 'https://github.com/maels-k'} target="_blank" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-primary transition-all border border-slate-100 dark:border-slate-800">
                <Github className="w-6 h-6" />
              </Link>
              <Link href={profile.social_links?.linkedin || 'www.linkedin.com/in/koneismael'} target="_blank" className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-primary transition-all border border-slate-100 dark:border-slate-800">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href={`mailto:${profile.social_links?.email}?subject=Prise de contact - Portfolio&body=Bonjour Ismaël,%0A%0A`} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-primary transition-all border border-slate-100 dark:border-slate-800">
                <Mail className="w-6 h-6" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 mx-auto">
              {/* Outer Rings */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-[3rem] animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 border-2 border-secondary/20 rounded-[2.5rem] animate-[spin_15s_linear_infinite_reverse]"></div>

              {/* Image Container */}
              <div className="absolute inset-8 rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-cyber-dark shadow-2xl animate-float">
                {profile.profile_image_url ? (
                  <img
                    src={profile.profile_image_url}
                    alt={profile.full_name || 'Profile'}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-32 h-32">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 right-12 px-4 py-2 bg-white dark:bg-cyber-dark rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">Expertise Cyber</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 left-8 z-20 px-4 py-2 bg-white dark:bg-cyber-dark rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">Blue Team Specialist</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
