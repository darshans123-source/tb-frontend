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
        className={`w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col p-4 fixed left-0 top-0 z-50 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="mb-6 p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">
              TB
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-none">TB Quest</h1>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Navodaya Medical College</p>
            </div>
          </div>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-slate-400 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
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
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-950/50'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-all font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
