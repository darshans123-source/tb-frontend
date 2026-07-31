import { User, ShieldCheck, Award, Bell, LogOut, Settings, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProfileProps {
  userName: string;
  userEmail: string;
  userLevel: number;
  xp: number;
  badgesCount: number;
  streak: number;
  onLogout: () => void;
  onOpenProgressReport: () => void;
}

export default function Profile({
  userName,
  userEmail,
  userLevel,
  xp,
  badgesCount,
  streak,
  onLogout,
  onOpenProgressReport
}: ProfileProps) {
  const { mode, toggleTheme } = useTheme();

  return (
    <div className="p-6 pb-24 space-y-6 text-white">
      <div className="text-center pt-4 pb-2">
        <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl mx-auto flex items-center justify-center text-3xl font-black shadow-[0_0_25px_rgba(6,182,212,0.4)] mb-4">
          {userName.charAt(0)}
        </div>
        <h2 className="text-2xl font-bold">{userName}</h2>
        <p className="text-xs text-slate-400 font-mono mt-1">{userEmail}</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-full text-cyan-300 text-xs mt-3">
          <Sparkles size={12} /> Level {userLevel} • TB Clinical Resident
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
          <p className="text-xs text-slate-400 uppercase font-mono">Total XP</p>
          <p className="text-2xl font-bold text-cyan-400 font-mono mt-1">{xp}</p>
        </div>
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-center">
          <p className="text-xs text-slate-400 uppercase font-mono">Daily Streak</p>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">{streak} Days 🔥</p>
        </div>
      </div>

      {/* Activity Calendar */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Activity Calendar</h3>
        <div className="grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
            <div key={d} className="text-[10px] text-slate-500 text-center font-mono">
              {d}
            </div>
          ))}
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const isActive = day <= streak;
            return (
              <div
                key={day}
                className={`h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-mono ${
                  isActive ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-950 text-slate-600'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Menu Options & Settings */}
      <div className="space-y-3">
        {/* Dark / Light Theme Toggle Option */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-950 text-amber-400 rounded-xl">
              {mode === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div>
              <p className="font-semibold">App Theme Mode</p>
              <p className="text-xs text-slate-400">Current mode: {mode === 'dark' ? 'Dark Navy (#0B1120)' : 'Clean Light (#FFFFFF)'}</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl text-xs font-mono border border-slate-700 transition-all"
          >
            Switch to {mode === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <button
          onClick={onOpenProgressReport}
          className="w-full p-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-2xl flex items-center justify-between text-sm transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl"><Award size={18} /></div>
            <span className="font-semibold">Download Clinical Progress Report</span>
          </div>
          <span className="text-slate-500">→</span>
        </button>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-950 text-cyan-400 rounded-xl"><ShieldCheck size={18} /></div>
            <div>
              <p className="font-semibold">Badges Earned</p>
              <p className="text-xs text-slate-400">{badgesCount} Expert Certifications</p>
            </div>
          </div>
          <span className="text-cyan-400 font-mono font-bold">{badgesCount}</span>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-950 text-purple-400 rounded-xl"><Bell size={18} /></div>
            <span className="font-semibold">Clinical Push Notifications</span>
          </div>
          <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0" />
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full py-4 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-500/30 text-rose-400 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all mt-6 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
      >
        <LogOut size={18} />
        <span>Logout Session</span>
      </button>
    </div>
  );
}
