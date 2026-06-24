# Portfolio Cyber - Ismaël Koné

Portfolio dynamique et sécurisé spécialisé en Cybersécurité, construit avec Next.js, Tailwind CSS et Supabase.

## Fonctionnalités
- 🌍 **Multilingue** : Support complet Français/Anglais.
- 🔐 **Admin Panel** : Interface sécurisée pour gérer projets, compétences et profil.
- 🎨 **Design Cyber** : Thème Blue Team avec animations fluides.
- 📊 **Dynamique** : Données récupérées en temps réel depuis Supabase.

## Installation Locale

### 1. Cloner le projet et installer les dépendances
```bash
npm install
```

### 2. Configuration des variables d'environnement
Créez un fichier `.env.local` à la racine :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

### 3. Schéma de la Base de Données
Exécutez ce SQL dans votre éditeur Supabase pour créer les tables nécessaires :

```sql
-- Table Profil
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT,
  title_fr TEXT,
  title_en TEXT,
  bio_fr TEXT,
  bio_en TEXT,
  hero_text_fr TEXT,
  hero_text_en TEXT,
  availability BOOLEAN DEFAULT TRUE,
  cv_url TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table Projets
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_fr TEXT,
  title_en TEXT,
  description_fr TEXT,
  description_en TEXT,
  role_fr TEXT,
  role_en TEXT,
  technologies TEXT[],
  image_url TEXT,
  github_url TEXT,
  report_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table Compétences (Skills)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  category TEXT, -- 'Expertise Cyber', 'Outils de Détection', etc.
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table Parcours (Timeline)
CREATE TABLE timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT, -- 'formation' or 'experience'
  title_fr TEXT,
  title_en TEXT,
  institution TEXT,
  period TEXT,
  description_fr TEXT,
  description_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS sur toutes les tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;

-- Créer les politiques de lecture publique
CREATE POLICY "Lecture publique de profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Lecture publique de projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Lecture publique de skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Lecture publique de timeline" ON timeline FOR SELECT USING (true);

-- Créer les politiques de modification pour les utilisateurs authentifiés
CREATE POLICY "Admin modification de profile" ON profile FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin modification de projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin modification de skills" ON skills FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin modification de timeline" ON timeline FOR ALL TO authenticated USING (true);
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```
Accédez à [http://localhost:3000](http://localhost:3000).

## Accès Admin
L'interface d'administration est disponible sur `/admin/login`.
Vous devez créer un utilisateur dans l'onglet **Authentication** de votre console Supabase pour vous connecter.
