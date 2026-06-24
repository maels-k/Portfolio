'use client';

import { TimelineItem } from '@/types';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function Timeline({ timeline }: { timeline: TimelineItem[] }) {
  const { lang, t } = useI18n();

  return (
    <section className="py-24 bg-slate-950/40">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-16 text-center">{t('timeline.title')}</h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyber-blue border-4 border-slate-900 hidden md:block z-10 shadow-[0_0_10px_rgba(30,58,138,1)]"></div>

                <div className="w-full md:w-1/2 group">
                  <div className="cyber-card p-6 rounded-2xl border border-slate-800 group-hover:border-cyber-cyan/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                          {item.type === 'formation' ? <GraduationCap className="w-5 h-5 text-purple-400" /> : <Briefcase className="w-5 h-5 text-blue-400" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg leading-tight">{lang === 'fr' ? item.title_fr : item.title_en}</h3>
                          <p className="text-sm text-cyber-cyan/80">{item.institution}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{lang === 'fr' ? item.description_fr : item.description_en}</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      <Calendar className="w-3 h-3" /> {item.period}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
