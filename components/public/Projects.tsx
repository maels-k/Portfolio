'use client';

import { Project } from '@/types';
import { ExternalLink, Github, Code2, Shield } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Projects({ projects }: { projects: Project[] }) {
  const { lang, t } = useI18n();

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">{t('projects.title')}</h2>
            <p className="text-gray-400 max-w-xl">{t('projects.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono text-cyber-blue">
            <span className="animate-pulse">●</span> LIVE_DATABASE_FEED
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col cyber-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyber-blue/40 transition-all duration-500">
              <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10 opacity-60"></div>
                {project.image_url ? (
                  <img src={project.image_url} alt={lang === 'fr' ? project.title_fr : project.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900">
                    <Shield className="w-16 h-16 text-slate-800 group-hover:text-cyber-blue/30 transition-colors" />
                  </div>
                )}

                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-1 bg-cyber-blue/80 text-white rounded backdrop-blur-sm">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-widest block mb-2">{lang === 'fr' ? project.role_fr : project.role_en}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors">{lang === 'fr' ? project.title_fr : project.title_en}</h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                  {lang === 'fr' ? project.description_fr : project.description_en}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <div className="flex gap-4">
                    {project.github_url && (
                      <Link href={project.github_url} target="_blank" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <Github className="w-4 h-4" /> {t('projects.code')}
                      </Link>
                    )}
                    {project.report_url && (
                      <Link href={project.report_url} target="_blank" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <ExternalLink className="w-4 h-4" /> {t('projects.report')}
                      </Link>
                    )}
                  </div>
                  <div className="text-cyber-blue/40 group-hover:text-cyber-cyan transition-colors"><Code2 className="w-5 h-5" /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
