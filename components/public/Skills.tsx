'use client';

import { Skill } from '@/types';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Shield, Layout, Server, Database, Hammer } from 'lucide-react';

export default function Skills({ skills }: { skills: Skill[] }) {
  const { t } = useI18n();

  const categories = [
    { name: 'Expertise Cyber', icon: Shield, color: 'text-primary' },
    { name: 'Frontend', icon: Layout, color: 'text-secondary' },
    { name: 'Backend', icon: Server, color: 'text-indigo-500' },
    { name: 'Base de données', icon: Database, color: 'text-accent' },
    { name: 'Outils', icon: Hammer, color: 'text-amber-500' }
  ];

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
          {categories.map((cat) => {
            const catSkills = skills.filter(s => s.category === cat.name);

            return (
              <motion.div
                key={cat.name}
                variants={cardVariants}
                className="premium-card p-8 bg-white dark:bg-slate-900 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${cat.color}`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{cat.name}</h3>
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
