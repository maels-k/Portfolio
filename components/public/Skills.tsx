'use client';

import { Skill } from '@/types';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export default function Skills({ skills }: { skills: Skill[] }) {
  const { t } = useI18n();
  const categories = [
    'Expertise Cyber',
    'Outils de Détection',
    'Systèmes & Réseaux',
    'Scripting / Code',
    'Soft Skills'
  ];

  return (
    <section id="skills" className="py-32 bg-cyber-black relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="px-4 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            arsenal_inventory.log
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight title-gradient">{t('skills.title')}</h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">{t('skills.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const catSkills = skills.filter(s => s.category === cat);
            if (catSkills.length === 0 && cat !== 'Expertise Cyber') return null;

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="cyber-card p-10 rounded-[2.5rem] flex flex-col group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Cpu className="w-20 h-20 text-white" />
                </div>

                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#06b6d4]"></div>
                  </div>
                  <h3 className="text-sm font-mono text-white uppercase tracking-[0.2em]">{cat}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {catSkills.length > 0 ? (
                    catSkills.map(skill => (
                      <div
                        key={skill.id}
                        className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyber-cyan/40 hover:bg-white/10 transition-all duration-300 group/skill"
                      >
                        <span className="text-sm font-light text-gray-400 group-hover/skill:text-white transition-colors">{skill.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-700 italic text-sm">awaiting_data...</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </section>
  );
}
