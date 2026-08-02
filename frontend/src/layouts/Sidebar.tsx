import React from 'react';
import { LayoutDashboard, Stethoscope, Map, Brain, BookOpen, Trophy, Award, BarChart3, User, LogOut, X } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
  { name: 'Clinical Cases', icon: Stethoscope, tab: 'cases' },
  { name: 'Algorithm Flowcharts', icon: Map, tab: 'flowcharts' },
  { name: 'AI Clinical Tutor', icon: Brain, tab: 'ai-tutor' },
  { name: 'Learning Modules', icon: BookOpen, tab: 'modules' },
  { name: 'Leaderboards', icon: Trophy, tab: 'leaderboard' },
  { name: 'Analytics', icon: BarChart3, tab: 'analytics' },
  { name: 'Certificate', icon: Award, tab: 'certificate' },
  { name: 'Profile', icon: User, tab: 'profile' },
];

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (t: any) => void;
  onLogout: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ currentTab, setCurrentTab, onLogout, isOpenMobile = false, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`w-72 h-screen bg-slate-950 border-r border-slate-800/80 flex flex-col p-4 fixed left-0 top-0 z-50 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Institutional Branding Header */}
        <div className="mb-6 p-2 pb-4 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            {/* Uploaded NIT Logo */}
            <img
              src="/nit_logo.png"
              alt="Navodaya Institute of Technology Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 drop-shadow-sm"
              style={{ width: '52px', height: '52px' }}
            />
            
            {/* Text Hierarchy */}
            <div className="flex flex-col justify-center min-w-0">
              <h1 className="text-[26px] sm:text-[28px] font-extrabold text-white leading-none tracking-tight">
                TB Quest
              </h1>
              <p className="text-[13px] font-semibold text-cyan-400 leading-tight mt-1 truncate">
                Skill Development Center
              </p>
              <p className="text-[12px] font-medium text-slate-300 leading-tight truncate">
                Navodaya Institute of Technology
              </p>
              <p className="text-[12px] font-medium text-slate-400 leading-tight">
                Raichur
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-slate-400 hover:text-white lg:hidden shrink-0"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar" aria-label="Main Navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => {
                  setCurrentTab(item.tab);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/50'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-900">
          <button
            onClick={() => {
              onLogout();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-all font-semibold outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <LogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
