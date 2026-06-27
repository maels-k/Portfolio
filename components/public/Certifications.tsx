'use client';

import { Certification } from '@/types';
import { Award, BookOpen, Calendar, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  const { lang } = useI18n();

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-32 relative bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black mb-6 text-white"
          >
            {lang === 'fr' ? 'Certifications' : 'Certifications'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            {lang === 'fr'
              ? 'Mes certifications professionnelles et formations reconnues.'
              : 'My recognized certifications and professional qualifications.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-black/20"
            >
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyber-blue/10 text-cyber-blue flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {lang === 'fr' ? cert.title_fr : cert.title_en}
                    </h3>
                    <p className="text-sm text-slate-400">{cert.issuer}</p>
                  </div>
                </div>
                <div className="text-right text-xs uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {cert.issue_date}
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed mb-6">
                {lang === 'fr' ? cert.description_fr : cert.description_en}
              </p>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <BookOpen className="w-4 h-4" />
                  {lang === 'fr' ? 'Certification obtenue' : 'Certification earned'}
                </div>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-cyber-cyan hover:text-cyber-blue font-semibold text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {lang === 'fr' ? 'Voir le certificat' : 'View certificate'}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
