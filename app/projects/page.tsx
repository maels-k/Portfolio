'use client';

import { Project } from '@/types';
import { ExternalLink, Github, Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProjectsPage() {
  const { lang } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      setProjects(data || []);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Extract all unique technologies
  const allTechs = Array.from(
    new Set(projects.flatMap(p => p.technologies || []))
  ).sort();

  const filteredProjects = selectedTech
    ? projects.filter(p =>
        p.technologies?.includes(selectedTech)
      )
    : projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-cyber-black pt-24 pb-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8 font-bold">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Tous les <span className="title-gradient">Projets</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
              Découvrez l'ensemble de mes réalisations en cybersécurité et développement
            </p>
          </motion.div>
        </div>

        {/* Filter by Technology */}
        {allTechs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Filtrer par technologie</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedTech(null)}
                className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                  selectedTech === null
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white hover:border-primary/30 border border-slate-200 dark:border-slate-800'
                }`}
              >
                Tous ({filteredProjects.length})
              </button>
              {allTechs.map(tech => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                    selectedTech === tech
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white hover:border-primary/30 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-800 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Aucun projet trouvé pour cette technologie
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group h-full flex flex-col rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Image */}
                {project.image_url && (
                  <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={project.image_url}
                      alt={lang === 'fr' ? project.title_fr : project.title_en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {lang === 'fr' ? project.title_fr : project.title_en}
                  </h3>

                  {/* Role */}
                  {(lang === 'fr' ? project.role_fr : project.role_en) && (
                    <p className="text-sm text-primary font-semibold mb-3">
                      {lang === 'fr' ? project.role_fr : project.role_en}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                    {lang === 'fr' ? project.description_fr : project.description_en}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                        >
                          <Tag className="w-3 h-3" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date */}
                  {project.created_at && (
                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-4 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.created_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-800 text-white hover:bg-slate-700 dark:hover:bg-slate-700 transition-colors text-sm font-semibold"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.report_url && (
                      <a
                        href={project.report_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-white transition-colors text-sm font-semibold"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Rapport
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
