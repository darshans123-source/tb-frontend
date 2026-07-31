import { Settings, Users, Shield, Cpu, Database, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            System Administrator Control
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono">TB Quest Enterprise Environment • PostgreSQL & Node.js</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => alert("Database sync completed successfully.")} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 text-xs sm:text-sm font-medium transition-colors">
            <RefreshCw size={16} /> Sync DB
          </button>
        </div>
      </header>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3 text-cyan-400 mb-3 sm:mb-4">
            <Users size={22} className="sm:w-6 sm:h-6" />
            <h3 className="text-base sm:text-lg font-bold text-white">User Management</h3>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mb-4">Manage student cohorts, faculty privileges, and admin accounts.</p>
          <button onClick={() => alert("Managing users...")} className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-cyan-300 text-xs font-semibold uppercase">Manage Users (142)</button>
        </div>

        <div className="p-4 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3 text-purple-400 mb-3 sm:mb-4">
            <Cpu size={22} className="sm:w-6 sm:h-6" />
            <h3 className="text-base sm:text-lg font-bold text-white">Gemini AI Prompts</h3>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mb-4">Configure clinical mentor personality, temperature, and diagnostic rationale rules.</p>
          <button onClick={() => alert("AI Prompt Settings updated.")} className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-purple-300 text-xs font-semibold uppercase">Configure AI</button>
        </div>

        <div className="p-4 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3 text-emerald-400 mb-3 sm:mb-4">
            <Database size={22} className="sm:w-6 sm:h-6" />
            <h3 className="text-base sm:text-lg font-bold text-white">Prisma DB & Logs</h3>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mb-4">PostgreSQL connection pool status, audit logs, and backup schedules.</p>
          <button onClick={() => alert("System logs exported.")} className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-emerald-300 text-xs font-semibold uppercase">View Audit Logs</button>
        </div>
      </div>

      {/* System Settings Form */}
      <div className="p-4 sm:p-8 bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Settings className="text-purple-400" /> Platform Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs uppercase font-mono text-slate-400 mb-2">Platform Name</label>
            <input type="text" defaultValue="TB Quest - AI Powered Diagnostic Learning" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs sm:text-sm" />
          </div>
          <div>
            <label className="block text-xs uppercase font-mono text-slate-400 mb-2">Default XP Multiplier</label>
            <input type="number" defaultValue="1.5" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs sm:text-sm" />
          </div>
        </div>
        <button onClick={() => alert("Settings saved successfully!")} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-semibold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          Save Configuration
        </button>
      </div>
    </div>
  );
}
