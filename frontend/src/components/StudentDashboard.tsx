import { Stethoscope, BarChart3, BookOpen, LayoutDashboard, User, ShieldCheck, Trophy, LogOut, Sliders, Download, Bot } from 'lucide-react';
import { soundService } from '../services/soundService';

interface StudentDashboardProps {
  onStartCase: () => void;
  onOpenAITutor: () => void;
  onOpenLeaderboard: () => void;
  onOpenProgressReport: () => void;
  onOpenAudioSettings: () => void;
  userName: string;
  userLevel: number;
  userProgress: number;
  xp: number;
  badgesCount: number;
  streak: number;
  completedCases: number;
  accuracy?: number;
  onLogout: () => void;
}

export default function StudentDashboard({
  onStartCase,
  onOpenAITutor,
  onOpenLeaderboard,
  onOpenProgressReport,
  onOpenAudioSettings,
  userName,
  userLevel,
  userProgress,
  xp,
  badgesCount,
  streak,
  completedCases,
  accuracy = 0,
  onLogout
}: StudentDashboardProps) {
  const completedModulesCount = completedCases > 0 ? Math.min(5, Math.ceil(completedCases / 2)) : 0;

  return (
    <div className="p-4 sm:p-6 pb-24 max-w-7xl mx-auto min-h-screen text-white space-y-4 sm:space-y-6">
      {/* Header / Welcome Card */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 sm:pb-6 border-b border-cyan-900/50">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            TB Quest Dashboard
          </h1>
          <p className="text-slate-400 text-[10px] sm:text-xs font-mono mt-0.5 sm:mt-1">Skill Development Center • NIT Raichur</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-cyan-800/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] w-full md:w-auto">
          <div className="flex items-center gap-2 sm:gap-3 pr-2 sm:pr-3 border-r border-slate-800">
            <div className="p-1.5 sm:p-2 bg-cyan-950 rounded-xl text-cyan-400 border border-cyan-500/30"><User size={16} /></div>
            <div>
              <p className="font-semibold text-xs truncate max-w-[100px] sm:max-w-none">{userName || 'Student Doctor'}</p>
              <p className="text-[10px] text-slate-400 font-mono">{xp} XP Earned</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 pr-2 sm:pr-3 border-r border-slate-800">
            <div className="p-1.5 sm:p-2 bg-purple-950 rounded-xl text-purple-400 border border-purple-500/30"><ShieldCheck size={16} /></div>
            <div>
              <p className="font-semibold text-xs">Level {userLevel}</p>
              <p className="text-[10px] text-purple-300 font-mono">Explorer</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onOpenAudioSettings();
            }}
            title="Audio Settings"
            className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl transition-colors"
          >
            <Sliders size={16} />
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onLogout();
            }}
            title="Logout"
            className="p-1.5 sm:p-2 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 rounded-xl transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
        <button
          onClick={() => {
            soundService.playClick();
            onStartCase();
          }}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shrink-0"
        >
          <Stethoscope size={16} /> Start New Case
        </button>

        <button
          onClick={() => {
            soundService.playClick();
            onOpenAITutor();
          }}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-900 border border-cyan-500/30 hover:bg-slate-800 rounded-xl font-semibold text-xs sm:text-sm text-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shrink-0"
        >
          <Bot size={16} className="text-cyan-400" /> AI Clinical Tutor
        </button>

        <button
          onClick={() => {
            soundService.playClick();
            soundService.playTrophy();
            onOpenLeaderboard();
          }}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-900 border border-amber-500/30 hover:bg-slate-800 rounded-xl font-semibold text-xs sm:text-sm text-amber-300 transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0"
        >
          <Trophy size={16} className="text-amber-400" /> Rankings ({badgesCount} Badges)
        </button>

        <button
          onClick={() => {
            soundService.playClick();
            onOpenProgressReport();
          }}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-900 border border-emerald-500/30 hover:bg-slate-800 rounded-xl font-semibold text-xs sm:text-sm text-emerald-300 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shrink-0"
        >
          <Download size={16} className="text-emerald-400" /> Progress Report
        </button>

        <div className="sm:ml-auto flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Streak: {streak} Days 🔥</span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <button
          onClick={() => {
            soundService.playClick();
            onStartCase();
          }}
          className="p-5 sm:p-6 bg-slate-900/70 hover:bg-slate-800/80 rounded-2xl sm:rounded-3xl border border-cyan-500/30 transition-all shadow-[0_0_25px_rgba(6,182,212,0.1)] text-left group"
        >
          <div className="p-2.5 sm:p-3 w-12 sm:w-14 bg-cyan-950 border border-cyan-500/40 rounded-2xl text-cyan-400 mb-3 sm:mb-4 shadow-inner"><Stethoscope size={24} className="sm:w-7 sm:h-7" /></div>
          <h2 className="text-lg sm:text-xl font-bold mb-1.5 group-hover:text-cyan-300 transition-colors">Start New Case</h2>
          <p className="text-slate-400 text-xs">Begin a new TB diagnostic simulation and test your clinical skills.</p>
        </button>

        <div className="p-5 sm:p-6 bg-slate-900/70 rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 sm:p-2.5 bg-purple-950 border border-purple-500/40 rounded-2xl text-purple-400"><BarChart3 size={20} className="sm:w-6 sm:h-6" /></div>
                <h2 className="text-lg sm:text-xl font-bold">My Performance</h2>
              </div>
              <button
                onClick={() => {
                  soundService.playClick();
                  onOpenProgressReport();
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-mono flex items-center gap-1 shrink-0"
              >
                <Download size={14} /> View Report
              </button>
            </div>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl"><span>Quiz Scores:</span> <span className="font-mono text-cyan-400 font-bold">{xp} XP</span></li>
              <li className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl"><span>Accuracy Rate:</span> <span className="font-mono text-emerald-400 font-bold">{accuracy}%</span></li>
              <li className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl"><span>Completed Cases:</span> <span className="font-mono text-purple-400 font-bold">{completedCases} Cases</span></li>
            </ul>
          </div>
        </div>

        <div className="p-5 sm:p-6 bg-slate-900/70 rounded-2xl sm:rounded-3xl border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.1)]">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 bg-emerald-950 border border-emerald-500/40 rounded-2xl text-emerald-400"><BookOpen size={20} className="sm:w-6 sm:h-6" /></div>
            <h2 className="text-lg sm:text-xl font-bold">Learning Progress</h2>
          </div>
          <ul className="space-y-2 text-slate-300 text-xs">
            <li className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl"><span>Modules Completed:</span> <span className="font-mono text-emerald-400 font-bold">{completedModulesCount} / 5</span></li>
            <li className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl"><span>Algorithms Covered:</span> <span className="font-mono text-cyan-400 font-bold truncate max-w-[140px] sm:max-w-none">Pulmonary, Pediatric, MDR</span></li>
            <li className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl"><span>Badges Earned:</span> <span className="font-mono text-amber-400 font-bold">{badgesCount} Badges</span></li>
          </ul>
        </div>

        <button
          onClick={() => {
            soundService.playClick();
            onStartCase();
          }}
          className="p-5 sm:p-6 bg-slate-900/70 hover:bg-slate-800/80 rounded-2xl sm:rounded-3xl border border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.1)] text-left group"
        >
          <div className="p-2.5 sm:p-3 w-12 sm:w-14 bg-amber-950 border border-amber-500/40 rounded-2xl text-amber-400 mb-3 sm:mb-4 shadow-inner"><LayoutDashboard size={24} className="sm:w-7 sm:h-7" /></div>
          <h2 className="text-lg sm:text-xl font-bold mb-1.5 group-hover:text-amber-300 transition-colors">Continue Last Case</h2>
          <p className="text-slate-400 text-xs">Resume your last active TB clinical simulation from where you left off.</p>
        </button>
      </div>
    </div>
  );
}
