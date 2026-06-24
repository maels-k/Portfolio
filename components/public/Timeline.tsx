'use client';

import { TimelineItem } from '@/types';
import { GraduationCap, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Timeline({ timeline }: { timeline: TimelineItem[] }) {
  const { lang, t } = useI18n();

  return (
    <section id="timeline" className="py-32 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white"
          >
            Mon <span className="title-gradient">Parcours</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Expériences professionnelles et formations académiques.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-950 hidden md:block z-10 shadow-lg shadow-primary/40"></div>

                <div className="w-full md:w-1/2 group">
                  <div className="premium-card p-8 bg-white dark:bg-slate-900 shadow-sm group-hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary">
                          {item.type === 'formation' ? <GraduationCap className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-xl leading-tight">
                            {lang === 'fr' ? item.title_fr : item.title_en}
                          </h3>
                          <p className="text-primary font-bold text-sm tracking-wide">{item.institution}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      {lang === 'fr' ? item.description_fr : item.description_en}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                        <Calendar className="w-4 h-4" /> {item.period}
                      </div>
                      <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
