import React from 'react';
import { Search, Bell, Mail, Brain, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header({ userData }: { userData: any }) {
  const { mode, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 fixed top-0 left-64 right-0 z-40 transition-colors">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input 
          type="text" 
          placeholder="Search cases, modules, or students..." 
          className="w-full bg-slate-900 border border-slate-700 text-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-white transition-colors" title="Notifications">
          <Bell size={20} />
        </button>
        <button className="text-slate-400 hover:text-white transition-colors" title="Messages">
          <Mail size={20} />
        </button>
        <button className="text-cyan-400 hover:text-cyan-300 transition-colors" title="AI Clinical Mentor">
          <Brain size={20} />
        </button>
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all flex items-center gap-1.5 font-mono text-xs"
          title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {mode === 'dark' ? (
            <Sun size={20} className="text-amber-400 animate-pulse" />
          ) : (
            <Moon size={20} className="text-cyan-500" />
          )}
        </button>
        
        <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{userData.name}</p>
            <p className="text-xs text-slate-500">Level {userData.level} • {userData.xp} XP</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-900 border border-cyan-700 flex items-center justify-center text-sm font-bold text-white shadow-md">
            {userData.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
