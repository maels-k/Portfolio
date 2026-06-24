'use client';

import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import About from '@/components/public/About';
import Skills from '@/components/public/Skills';
import Projects from '@/components/public/Projects';
import Timeline from '@/components/public/Timeline';
import { useI18n } from '@/lib/i18n';
import ContactForm from '@/components/public/ContactForm';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Shield } from 'lucide-react';
import Link from 'next/link';
import { Profile, Project, Skill, TimelineItem } from '@/types';

interface ClientPageProps {
  profile: Partial<Profile>;
  projects: Project[];
  skills: Skill[];
  timeline: TimelineItem[];
}

export default function ClientPage({ profile, projects, skills, timeline }: ClientPageProps) {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-cyber-black selection:bg-cyber-cyan selection:text-cyber-black">
      <Navbar />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Timeline timeline={timeline} />

      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-cyber-cyan font-mono text-xs mb-6 px-3 py-1 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5">
                    <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
                    {t('contact.protocol')}
                  </div>
                  <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
                    {t('contact.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-cyan">{t('contact.subtitle')}</span> ?
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    {t('contact.desc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyber-cyan/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-cyber-blue/10 flex items-center justify-center text-cyber-blue group-hover:text-cyber-cyan transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">EMAIL DIRECT</p>
                      <p className="text-white text-sm font-medium">{profile?.social_links?.email || 'contact@ismaelkone.com'}</p>
                    </div>
                  </div>

                  <Link href={profile?.social_links?.linkedin || '#'} target="_blank" className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyber-cyan/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-cyber-blue/10 flex items-center justify-center text-cyber-blue group-hover:text-cyber-cyan transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">LINKEDIN</p>
                      <p className="text-white text-sm font-medium">Ismaël Koné</p>
                    </div>
                  </Link>
                </div>

                <div className="pt-8 border-t border-slate-800/50 flex items-center gap-6">
                  <Link href={profile?.social_links?.github || '#'} target="_blank" className="text-gray-500 hover:text-white transition-colors">
                    <Github className="w-6 h-6" />
                  </Link>
                  <div className="h-4 w-px bg-slate-800"></div>
                  <p className="text-xs font-mono text-gray-600">ENCRYPTED_ENDPOINT_V2.0</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-900/50 bg-slate-950/50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex flex-col items-center gap-8">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
              <Shield className="w-6 h-6 text-cyber-blue" />
            </div>
            <div className="space-y-2">
              <p className="text-white font-bold tracking-tight">IK.SEC <span className="text-gray-500 font-light">| {t('footer.subtitle')}</span></p>
              <p className="text-gray-500 text-xs font-mono uppercase tracking-[0.3em]">{t('footer.built')}</p>
            </div>
            <p className="text-gray-600 text-[10px] font-mono mt-8">© {new Date().getFullYear()} Ismaël Koné. {t('footer.rights')}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent"></div>
      </footer >
    </main>
  );
}
