'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'hero.available': 'Disponible pour opportunités (SOC / Audit / Junior)',
    'hero.busy': 'En poste',
    'hero.cta.labs': 'Découvrir mes labs',
    'hero.cta.cv': 'Télécharger mon CV',
    'about.title': 'Investigateur Numérique',
    'about.subtitle': '& Sécurité Défensive',
    'about.projects_count': 'Projets Labs',
    'about.orientation': 'Orientation',
    'skills.title': 'Arsenal Technique',
    'skills.subtitle': 'Mes outils et domaines de spécialisation en constante évolution.',
    'projects.title': 'Réalisations & Labs',
    'projects.subtitle': "Une immersion dans mes travaux pratiques de simulation et d'investigation.",
    'projects.code': 'Code',
    'projects.report': 'Rapport',
    'timeline.title': 'Parcours & Timeline',
    'contact.title': 'Prêt à renforcer votre',
    'contact.subtitle': 'Blue Team',
    'contact.desc': "Je suis actuellement à la recherche de nouvelles opportunités en tant qu'Analyste SOC Junior ou Auditeur Sécurité. Discutons de la manière dont je peux contribuer à la protection de vos actifs.",
    'contact.protocol': 'COMMUNICATION_PROTOCOL.SH',
    'contact.form.name': 'Identité',
    'contact.form.email': 'Canal de retour',
    'contact.form.subject': 'Objet de la requête',
    'contact.form.message': 'Message',
    'contact.form.send': 'Initialiser la communication',
    'contact.success.title': 'Message Transmis',
    'contact.success.desc': 'Votre demande a été cryptée et envoyée avec succès. Je vous répondrai sous 24h.',
    'contact.success.btn': 'Envoyer un autre message',
    'footer.subtitle': 'Portfolio Cybersécurité',
    'footer.built': 'Built for the Blue Team',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.available': 'Available for opportunities (SOC / Audit / Junior)',
    'hero.busy': 'In post',
    'hero.cta.labs': 'Discover my labs',
    'hero.cta.cv': 'Download CV',
    'about.title': 'Digital Investigator',
    'about.subtitle': '& Defensive Security',
    'about.projects_count': 'Lab Projects',
    'about.orientation': 'Orientation',
    'skills.title': 'Technical Arsenal',
    'skills.subtitle': 'My ever-evolving tools and areas of specialization.',
    'projects.title': 'Realizations & Labs',
    'projects.subtitle': 'An immersion into my practical simulation and investigation work.',
    'projects.code': 'Code',
    'projects.report': 'Report',
    'timeline.title': 'Background & Timeline',
    'contact.title': 'Ready to strengthen your',
    'contact.subtitle': 'Blue Team',
    'contact.desc': "I am currently looking for new opportunities as a Junior SOC Analyst or Security Auditor. Let's discuss how I can contribute to the protection of your assets.",
    'contact.protocol': 'COMMUNICATION_PROTOCOL.SH',
    'contact.form.name': 'Identity',
    'contact.form.email': 'Return channel',
    'contact.form.subject': 'Subject of the request',
    'contact.form.message': 'Message',
    'contact.form.send': 'Initialize communication',
    'contact.success.title': 'Message Transmitted',
    'contact.success.desc': 'Your request has been encrypted and successfully sent. I will reply within 24 hours.',
    'contact.success.btn': 'Send another message',
    'footer.subtitle': 'Cybersecurity Portfolio',
    'footer.built': 'Built for the Blue Team',
    'footer.rights': 'All rights reserved.',
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
