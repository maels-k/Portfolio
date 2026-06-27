'use client';

import { Skill } from '@/types';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Shield, Layout, Server, Database, Hammer } from 'lucide-react';

export default function Skills({ skills }: { skills: Skill[] }) {
  const { t } = useI18n();

  // Build categories dynamically from the skills data to avoid mismatches
  const iconMap: Record<string, any> = {
    'Expertise Cyber': Shield,
    'Réponse aux incidents': Shield,
    'Chasse aux menaces': Shield,
    'Analyse Forensique': Shield,
    'SIEM': Database,
    'IDS/IPS': Server,
    'Analyse de Malware': Shield,
    'Sécurité Réseau': Server,
    'Gestion des Vulnérabilités': Shield,
    'SOC': Shield,
    'Sécurité Cloud': Shield,
    'Pentesting': Hammer,
    'Automatisation Sécurité': Layout,
    'Analyse des Logs': Database,
    'Renseignement sur les Menaces': Shield,
    'Frontend': Layout,
    'Backend': Server,
    'Base de données': Database,
    'Outils': Hammer,
    'Outils de Détection': Hammer,
    'Systèmes & Réseaux': Server,
    'Scripting / Code': Layout,
    'Soft Skills': Shield,
  };

  const defaultOrder = [
    'Expertise Cyber',
    'Réponse aux incidents',
    'Chasse aux menaces',
    'Analyse Forensique',
    'SIEM',
    'IDS/IPS',
    'Analyse de Malware',
    'Sécurité Réseau',
    'Gestion des Vulnérabilités',
    'SOC',
    'Sécurité Cloud',
    'Pentesting',
    'Automatisation Sécurité',
    'Analyse des Logs',
    'Renseignement sur les Menaces',
    'Outils de Détection',
    'Systèmes & Réseaux',
    'Scripting / Code',
    'Soft Skills',
    'Frontend',
    'Backend',
    'Base de données',
    'Outils'
  ];

  const uniqueCategories = Array.from(new Set(skills.map(s => s.category))).filter(Boolean);
  const categoriesList = uniqueCategories.length > 0
    ? // sort categories to prefer defaultOrder when possible
      [...uniqueCategories].sort((a, b) => {
        const ia = defaultOrder.indexOf(a);
        const ib = defaultOrder.indexOf(b);
        if (ia === -1 && ib === -1) return a.localeCompare(b);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
      })
    : defaultOrder;

  const colorMap: Record<string, string> = {
    'Expertise Cyber': 'text-primary',
    'Réponse aux incidents': 'text-red-400',
    'Chasse aux menaces': 'text-amber-500',
    'Analyse Forensique': 'text-yellow-400',
    'SIEM': 'text-indigo-500',
    'IDS/IPS': 'text-cyan-400',
    'Analyse de Malware': 'text-rose-400',
    'Sécurité Réseau': 'text-indigo-500',
    'Gestion des Vulnérabilités': 'text-amber-600',
    'SOC': 'text-cyber-green',
    'Sécurité Cloud': 'text-sky-400',
    'Pentesting': 'text-fuchsia-500',
    'Automatisation Sécurité': 'text-secondary',
    'Analyse des Logs': 'text-accent',
    'Renseignement sur les Menaces': 'text-rose-300',
    'Outils de Détection': 'text-amber-500',
    'Systèmes & Réseaux': 'text-indigo-500',
    'Scripting / Code': 'text-secondary',
    'Soft Skills': 'text-cyber-green',
    'Frontend': 'text-secondary',
    'Backend': 'text-indigo-500',
    'Base de données': 'text-accent',
    'Outils': 'text-amber-500'
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-32 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white"
          >
            Arsenal <span className="title-gradient">Technique</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
          >
            {t('skills.subtitle')}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categoriesList.map((catName) => {
            const catSkills = skills.filter(s => s.category === catName);
            const Icon = iconMap[catName] || Shield;
            const colorClass = colorMap[catName] || 'text-primary';

            return (
              <motion.div
                key={catName}
                variants={cardVariants}
                className="premium-card p-8 bg-white dark:bg-slate-900 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{catName}</h3>
                </div>

                <div className="space-y-6">
                  {catSkills.length > 0 ? (
                    catSkills.map(skill => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-700 dark:text-slate-300">{skill.name}</span>
                          <span className="text-slate-400 font-mono">90%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "90%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r from-primary to-secondary`}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs italic">
                        No skills listed yet...
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
