import React from 'react';
import { Search, Bell, Mail, Brain, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  userData: any;
  onToggleMobileMenu?: () => void;
}

export default function Header({ userData, onToggleMobileMenu }: HeaderProps) {
  const { mode, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 fixed top-0 left-0 lg:left-64 right-0 z-30 transition-all">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={onToggleMobileMenu}
          className="p-2 text-slate-400 hover:text-white rounded-xl lg:hidden focus:outline-none"
          title="Open Menu"
        >
          <Menu size={22} />
        </button>

        {/* Search Bar */}
        <div className="relative w-36 sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search cases..." 
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-full py-1.5 pl-9 pr-3 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-all truncate"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <button className="hidden sm:block text-slate-400 hover:text-white transition-colors" title="Notifications">
          <Bell size={18} />
        </button>
        <button className="hidden sm:block text-slate-400 hover:text-white transition-colors" title="Messages">
          <Mail size={18} />
        </button>
        <button className="text-cyan-400 hover:text-cyan-300 transition-colors" title="AI Clinical Mentor">
          <Brain size={18} />
        </button>
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all flex items-center gap-1 font-mono text-xs"
          title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {mode === 'dark' ? (
            <Sun size={18} className="text-amber-400 animate-pulse" />
          ) : (
            <Moon size={18} className="text-cyan-500" />
          )}
        </button>
        
        <div className="flex items-center gap-2 sm:gap-3 border-l border-slate-800 pl-3 sm:pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[120px] sm:max-w-none">{userData.name}</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Lvl {userData.level} • {userData.xp} XP</p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-900 border border-cyan-700 flex items-center justify-center text-xs sm:text-sm font-bold text-white shadow-md shrink-0">
            {userData.name ? userData.name.charAt(0) : 'S'}
          </div>
        </div>
      </div>
    </header>
  );
}
