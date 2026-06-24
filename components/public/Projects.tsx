'use client';

import { Project } from '@/types';
import { ExternalLink, Github, ArrowUpRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Projects({ projects }: { projects: Project[] }) {
  const { lang, t } = useI18n();

  return (
    <section id="projects" className="py-32 relative bg-cyber-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-cyber-cyan text-sm font-mono tracking-widest uppercase">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>operation_labs.sh</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight title-gradient">{t('projects.title')}</h2>
            <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed">{t('projects.subtitle')}</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono glass px-6 py-3 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping"></span>
            <span className="text-gray-400 tracking-[0.2em]">CONNECTED_TO_SUPABASE_v2.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group flex flex-col glass rounded-[3rem] overflow-hidden border border-white/5 hover:border-cyber-cyan/30 transition-all duration-700"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent z-10"></div>
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={lang === 'fr' ? project.title_fr : project.title_en}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                    <div className="w-20 h-20 border border-white/5 rounded-full flex items-center justify-center group-hover:border-cyber-cyan/30 transition-colors">
                      <ShieldAlert className="w-10 h-10 text-white/10 group-hover:text-cyber-cyan/40 transition-colors" />
                    </div>
                  </div>
                )}

                <div className="absolute top-8 right-8 z-20">
                  <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 z-20">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono px-4 py-1.5 bg-black/60 text-cyber-cyan rounded-full border border-white/10 backdrop-blur-md uppercase tracking-wider">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 flex-1 flex flex-col">
                <div className="mb-6 space-y-2">
                  <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-[0.3em] font-bold">{lang === 'fr' ? project.role_fr : project.role_en}</span>
                  <h3 className="text-3xl font-bold text-white leading-tight">{lang === 'fr' ? project.title_fr : project.title_en}</h3>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed mb-10 flex-1 font-light">
                  {lang === 'fr' ? project.description_fr : project.description_en}
                </p>

                <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                  {project.github_url && (
                    <Link href={project.github_url} target="_blank" className="group/link flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors">
                      <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <span className="uppercase tracking-widest">{t('projects.code')}</span>
                    </Link>
                  )}
                  {project.report_url && (
                    <Link href={project.report_url} target="_blank" className="group/link flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <span className="uppercase tracking-widest">{t('projects.report')}</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
