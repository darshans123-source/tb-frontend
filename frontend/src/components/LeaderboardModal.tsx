import { Trophy, Award, X, Medal, Star } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardModalProps {
  onClose: () => void;
  entries: LeaderboardEntry[];
  badges: string[];
  onChallenge: (name: string) => void;
}

export default function LeaderboardModal({ onClose, entries, badges, onChallenge }: LeaderboardModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-amber-500/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.2)] relative">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2.5 sm:p-3 bg-amber-950 border border-amber-500/40 rounded-xl sm:rounded-2xl text-amber-400">
              <Trophy size={24} className="sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">Global Leaderboard & Badges</h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono">Peer rankings & diagnostic expert certifications</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl">
            <X size={18} />
          </button>
        </div>

        {/* Badges Section */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-300 uppercase mb-2.5 flex items-center gap-2">
            <Award className="text-amber-400" size={16} /> Earned Badges ({badges.length})
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {badges.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 sm:gap-2 bg-amber-950/40 border border-amber-500/30 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-amber-300 text-[11px] sm:text-xs font-medium">
                <Star size={12} className="fill-amber-400 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[480px]">
              <div className="grid grid-cols-5 p-3 sm:p-4 text-[10px] sm:text-xs font-mono uppercase text-slate-400 border-b border-slate-800">
                <span>Rank</span>
                <span>Student Name</span>
                <span className="text-right">Score</span>
                <span className="text-right">XP</span>
                <span className="text-right">Action</span>
              </div>
              <div className="divide-y divide-slate-800/60 max-h-60 overflow-y-auto">
                {entries.map((entry) => (
                  <div key={entry.rank} className="grid grid-cols-5 p-3 sm:p-4 items-center text-xs sm:text-sm">
                    <span className="font-mono flex items-center gap-1.5 sm:gap-2">
                      {entry.rank === 1 && <Medal className="text-amber-400 shrink-0" size={16} />}
                      {entry.rank === 2 && <Medal className="text-slate-300 shrink-0" size={16} />}
                      {entry.rank === 3 && <Medal className="text-amber-700 shrink-0" size={16} />}
                      <span className={entry.rank <= 3 ? 'font-bold text-white' : 'text-slate-400'}>#{entry.rank}</span>
                    </span>
                    <span className="font-medium text-slate-200 truncate">{entry.name}</span>
                    <span className="text-right font-mono text-cyan-400 font-semibold">{entry.score}</span>
                    <span className="text-right font-mono text-amber-400">+{entry.xp} XP</span>
                    <div className="text-right">
                      {!entry.name.includes('You') && (
                        <button
                          onClick={() => onChallenge(entry.name)}
                          className="text-[10px] bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-400 px-2.5 py-1 rounded-lg transition-colors font-mono font-bold uppercase"
                        >
                          Challenge
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
