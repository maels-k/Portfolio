'use client';

import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import About from '@/components/public/About';
import Skills from '@/components/public/Skills';
import Projects from '@/components/public/Projects';
import Timeline from '@/components/public/Timeline';
import { useI18n } from '@/lib/i18n';
import ContactForm from '@/components/public/ContactForm';

export default function ClientPage({ profile, projects, skills, timeline }: any) {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-cyber-black selection:bg-cyber-cyan selection:text-cyber-black">
      <Navbar />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Timeline timeline={timeline} />

      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                  {t('contact.title')} <br /><span className="text-cyber-cyan">{t('contact.subtitle')}</span> ?
                </h2>
                <p className="text-gray-400 text-lg mb-8">{t('contact.desc')}</p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyber-cyan">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase font-mono tracking-widest">Email Direct</p>
                      <p className="text-white font-medium">{profile?.social_links?.email || 'contact@ismaelkone.com'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-slate-900 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Ismaël Koné. {t('footer.rights')}</p>
      </footer>
    </main>
  );
}
