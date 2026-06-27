export type SkillCategory =
  | 'Expertise Cyber'
  | 'Outils de Détection'
  | 'Systèmes & Réseaux'
  | 'Scripting / Code'
  | 'Soft Skills';

export type Project = {
  id: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  role_fr: string;
  role_en: string;
  technologies: string[];
  image_url: string | null;
  github_url: string | null;
  report_url: string | null;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string | null;
  created_at: string;
};

export type TimelineItem = {
  id: string;
  type: 'formation' | 'experience';
  title_fr: string;
  title_en: string;
  institution: string;
  period: string;
  description_fr: string;
  description_en: string;
  created_at: string;
};

export type Certification = {
  id: string;
  title_fr: string;
  title_en: string;
  issuer: string;
  issue_date: string;
  credential_url: string | null;
  description_fr: string;
  description_en: string;
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string;
  title_fr: string;
  title_en: string;
  bio_fr: string;
  bio_en: string;
  hero_text_fr: string;
  hero_text_en: string;
  availability: boolean;
  cv_url: string | null;
  profile_image_url: string | null;
  social_links: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
};
