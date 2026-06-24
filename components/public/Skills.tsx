'use client';

import { Skill } from '@/types';
import { useI18n } from '@/lib/i18n';

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
    <section id="skills" className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">{t('skills.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('skills.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const catSkills = skills.filter(s => s.category === cat);
            if (catSkills.length === 0 && cat !== 'Expertise Cyber') return null;

            return (
              <div key={cat} className="cyber-card p-8 rounded-2xl border border-slate-800 flex flex-col group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-mono text-cyber-cyan uppercase tracking-[0.2em]">{cat}</h3>
                  <div className="w-2 h-2 rounded-full bg-cyber-blue shadow-[0_0_10px_rgba(30,58,138,0.8)]"></div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {catSkills.length > 0 ? (
                    catSkills.map(skill => (
                      <div key={skill.id} className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyber-blue transition-all duration-300">
                        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic text-sm">...</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
