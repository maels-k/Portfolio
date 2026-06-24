'use client';

import { Project } from '@/types';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Projects({ projects }: { projects: Project[] }) {
  const { lang, t } = useI18n();

  return (
    <section id="projects" className="py-32 relative bg-white dark:bg-cyber-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight"
            >
              Projets & <span className="title-gradient">Réalisations</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl font-medium"
            >
              {t('projects.subtitle')}
            </motion.p>
          </div>
          <Link href="/projects" className="group flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors">
            Voir tous les projets
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={lang === 'fr' ? project.title_fr : project.title_en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-20 h-20 text-slate-400 dark:text-slate-700">
                      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                )}

                {/* Overlay with links */}
                <div className="absolute inset-0 bg-primary/80 dark:bg-cyber-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                  {project.github_url && (
                    <Link href={project.github_url} target="_blank" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-cyber-black hover:scale-110 transition-transform">
                      <Github className="w-6 h-6" />
                    </Link>
                  )}
                  {project.report_url && (
                    <Link href={project.report_url} target="_blank" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-cyber-black hover:scale-110 transition-transform">
                      <ExternalLink className="w-6 h-6" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-4 py-1.5 bg-white dark:bg-white/5 text-primary dark:text-secondary rounded-full border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider">{tech}</span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {lang === 'fr' ? project.title_fr : project.title_en}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 line-clamp-2">
                  {lang === 'fr' ? project.description_fr : project.description_en}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{lang === 'fr' ? project.role_fr : project.role_en}</span>
                  <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:border-primary group-hover:text-primary transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
