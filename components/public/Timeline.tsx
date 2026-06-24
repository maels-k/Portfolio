'use client';

import { TimelineItem } from '@/types';
import { GraduationCap, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Timeline({ timeline }: { timeline: TimelineItem[] }) {
  const { lang, t } = useI18n();

  return (
    <section id="timeline" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-cyber-cyan font-mono text-sm mb-4"
          >
            <span className="w-8 h-px bg-cyber-cyan/30"></span>
            CAREER_PATH.EXE
            <span className="w-8 h-px bg-cyber-cyan/30"></span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white text-center"
          >
            Parcours & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-cyan">Timeline</span>
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-blue/50 via-slate-800 to-transparent -translate-x-1/2"></div>

          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Connector Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border-2 border-cyber-cyan z-10 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  <div className="absolute inset-0 rounded-full animate-ping bg-cyber-cyan/30"></div>
                </div>

                <div className="w-full md:w-[45%] pl-12 md:pl-0">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="cyber-card p-8 rounded-2xl border border-slate-800/50 bg-slate-950/40 relative">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyber-cyan tracking-tighter uppercase">
                            {item.type}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                            <Calendar className="w-3 h-3" /> {item.period}
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center border border-slate-700/50 shadow-inner">
                            {item.type === 'formation' ?
                              <GraduationCap className="w-6 h-6 text-purple-400" /> :
                              <Briefcase className="w-6 h-6 text-cyber-blue" />
                            }
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyber-cyan transition-colors">
                              {lang === 'fr' ? item.title_fr : item.title_en}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/50"></span>
                              {item.institution}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-4 py-1 italic">
                          {lang === 'fr' ? item.description_fr : item.description_en}
                        </p>

                        <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyber-cyan/40 group-hover:text-cyber-cyan/70 transition-colors">
                          VIEW_DETAILS <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block md:w-[45%]">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'} opacity-20 group-hover:opacity-40 transition-opacity`}>
                    <div className="text-6xl font-black text-slate-800 select-none">
                      0{index + 1}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyber-blue/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 blur-[150px] rounded-full translate-x-1/3"></div>
    </section>
  );
}
