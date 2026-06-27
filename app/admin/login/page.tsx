'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message || 'Erreur de connexion : Identifiants invalides.');
        return;
      }

      if (!data?.session) {
        setError('La connexion a échoué. Veuillez vérifier vos identifiants.');
        return;
      }

      // Ensure server-side cookie session is set so middleware can recognize the user.
      try {
        const session = data.session;
        const resp = await fetch('/api/auth/set-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: session.access_token, refresh_token: session.refresh_token }),
        });

        if (!resp.ok) {
          const body = await resp.json().catch(() => ({}));
          setError(body.error || 'Impossible d\'enregistrer la session côté serveur.');
          return;
        }
      } catch (err) {
        setError('Erreur réseau lors de l\'enregistrement de la session.');
        return;
      }

      router.push('/admin/dashboard');
    } catch (err) {
      setError('Erreur de connexion : impossible de contacter le serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-black p-4">
      <div className="w-full max-w-md cyber-card p-8 rounded-xl border border-cyber-blue/30 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-cyber-blue/20 rounded-full mb-4">
            <Lock className="w-8 h-8 text-cyber-cyan" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Accès Sécurisé</h1>
          <p className="text-gray-400 text-sm">Panel d'administration - Ismaël Koné</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-10 text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent transition-all"
                placeholder="admin@exemple.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-10 text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyber-blue hover:bg-cyber-electric text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
