import { Project, Skill, TimelineItem } from '@/types';
import { Briefcase, Code, GraduationCap, Trophy } from 'lucide-react';

export default function AdminOverview() {
  // Stat cards placeholder
  const stats = [
    { name: 'Projets', value: '3', icon: Briefcase, color: 'text-blue-500' },
    { name: 'Compétences', value: '15', icon: Code, color: 'text-cyan-500' },
    { name: 'Formations', value: '4', icon: GraduationCap, color: 'text-purple-500' },
    { name: 'Certifications', value: '2', icon: Trophy, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Bienvenue, Ismaël</h1>
        <p className="text-gray-400">Voici un aperçu de votre portfolio professionnel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="cyber-card p-6 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{stat.name}</span>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="cyber-card p-6 rounded-xl border border-slate-800">
          <h3 className="text-lg font-bold mb-4">Dernière activité</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-slate-800/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <p className="text-sm">Modification du projet "Surveillance & Détection"</p>
              <span className="text-[10px] text-gray-500 ml-auto">Il y a 2h</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-800/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-cyber-blue shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
              <p className="text-sm">Ajout d'une nouvelle compétence : Wireshark</p>
              <span className="text-[10px] text-gray-500 ml-auto">Il y a 5h</span>
            </div>
          </div>
        </div>

        <div className="cyber-card p-6 rounded-xl border border-slate-800">
          <h3 className="text-lg font-bold mb-4">Statut de visibilité</h3>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-cyber-green/10 rounded-full border border-cyber-green/20">
              <div className="w-12 h-12 rounded-full bg-cyber-green animate-pulse flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-cyber-green">Portfolio Public En Ligne</p>
              <p className="text-sm text-gray-400">Tous les systèmes sont opérationnels. Les données sont synchronisées.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldAlert(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}
