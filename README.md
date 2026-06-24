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
  name TEXT,
  title_fr TEXT,
  title_en TEXT,
  bio_fr TEXT,
  bio_en TEXT,
  cv_url TEXT,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table Compétences (Skills)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  category TEXT,
  icon TEXT,
  level INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table Parcours (Timeline)
CREATE TABLE timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT,
  title_fr TEXT,
  title_en TEXT,
  institution_fr TEXT,
  institution_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```
Accédez à [http://localhost:3000](http://localhost:3000).

## Accès Admin
L'interface d'administration est disponible sur `/admin/login`.
Vous devez créer un utilisateur dans l'onglet **Authentication** de votre console Supabase pour vous connecter.
