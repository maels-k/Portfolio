'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  LayoutDashboard,
  Briefcase,
  Award,
  Code,
  User,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  CalendarDays
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    try {
      // Clear server-side session cookie first so middleware will stop protecting routes
      await fetch('/api/auth/clear-session', { method: 'POST' });
    } catch (err) {
      // ignore network errors, proceed to client signOut
    }

    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }

    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Vue d\'ensemble', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Projets', icon: Briefcase, href: '/admin/dashboard/projects' },
    { name: 'Certifications', icon: Award, href: '/admin/dashboard/certifications' },
    { name: 'Compétences', icon: Code, href: '/admin/dashboard/skills' },
    { name: 'Timeline', icon: CalendarDays, href: '/admin/dashboard/timeline' },
    { name: 'Profil', icon: User, href: '/admin/dashboard/profile' },
  ];

  return (
    <div className="min-h-screen bg-cyber-black text-white flex">
      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'}
        bg-slate-900/50 border-r border-slate-800 transition-all duration-300 flex flex-col
      `}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2 font-bold text-cyber-cyan">
              <ShieldAlert className="w-6 h-6" />
              <span>ADMIN PANEL</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-cyber-blue/20 hover:text-cyber-cyan transition-colors group"
            >
              <item.icon className="w-6 h-6 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-4 p-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-6 h-6 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-cyber-black/50 backdrop-blur-md">
          <h2 className="text-lg font-medium text-gray-300">Tableau de bord</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 italic">Connecté en tant qu'admin</span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
