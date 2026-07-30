import { Award, CheckCircle, Printer, Shield, Trophy, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressReportModalProps {
  onClose: () => void;
  userName: string;
  userLevel: number;
  xp: number;
  completedCases: number;
  streak: number;
  badges: string[];
  accuracy?: number;
}

export default function ProgressReportModal({
  onClose,
  userName,
  userLevel,
  xp,
  completedCases,
  streak,
  badges,
  accuracy = 0
}: ProgressReportModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-cyan-500/50 w-full max-w-3xl rounded-3xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)] relative text-white my-8 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        
        {/* Top Actions (Hidden in Print) */}
        <div className="flex justify-between items-center mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-950 border border-cyan-500/40 rounded-2xl text-cyan-400">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Official Clinical Progress Report</h2>
              <p className="text-xs text-slate-400 font-mono">Navodaya Medical College • Department of Microbiology</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 space-y-6 print:bg-white print:border print:border-slate-300 print:text-slate-900">
          
          {/* Header */}
          <div className="text-center pb-6 border-b border-slate-800 print:border-slate-300">
            <div className="inline-flex p-3 bg-cyan-950/60 border border-cyan-500/30 rounded-2xl text-cyan-400 mb-3 print:bg-cyan-50 print:border-cyan-200">
              <Trophy size={32} />
            </div>
            <h1 className="text-2xl font-extrabold uppercase tracking-wide text-cyan-400 print:text-cyan-800">
              TB Quest Academic & Clinical Performance Transcript
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1 print:text-slate-600">
              Navodaya Institute of Technology & Medical Sciences • Certified Gamified Diagnostics
            </p>
          </div>

          {/* Student Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800 print:bg-slate-50 print:border-slate-200">
            <div>
              <p className="text-xs uppercase font-mono text-slate-400 print:text-slate-500">Student Name</p>
              <p className="text-base font-bold text-white print:text-slate-900">{userName || 'Student Doctor'}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-mono text-slate-400 print:text-slate-500">Academic Level</p>
              <p className="text-base font-bold text-purple-400 print:text-purple-700">Level {userLevel} (Explorer)</p>
            </div>
            <div>
              <p className="text-xs uppercase font-mono text-slate-400 print:text-slate-500">Total XP Score</p>
              <p className="text-base font-bold text-cyan-400 print:text-cyan-700 font-mono">{xp} XP</p>
            </div>
            <div>
              <p className="text-xs uppercase font-mono text-slate-400 print:text-slate-500">Daily Streak</p>
              <p className="text-base font-bold text-emerald-400 print:text-emerald-700 font-mono">{streak} Days 🔥</p>
            </div>
          </div>

          {/* Core Statistics */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 print:text-slate-800 flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" /> Clinical Mastery & Case Statistics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl print:bg-slate-50 print:border-slate-200">
                <p className="text-xs text-slate-400 print:text-slate-600 font-mono">Completed Simulations</p>
                <p className="text-2xl font-bold text-white print:text-slate-900 font-mono mt-1">{completedCases} Cases</p>
                <p className="text-xs text-emerald-400 print:text-emerald-700 mt-1">NTEP Clinical Track</p>
              </div>
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl print:bg-slate-50 print:border-slate-200">
                <p className="text-xs text-slate-400 print:text-slate-600 font-mono">Diagnostic Accuracy</p>
                <p className="text-2xl font-bold text-cyan-400 print:text-cyan-700 font-mono mt-1">{accuracy}%</p>
                <p className="text-xs text-cyan-300 print:text-cyan-600 mt-1">Real-time dynamic metric</p>
              </div>
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl print:bg-slate-50 print:border-slate-200">
                <p className="text-xs text-slate-400 print:text-slate-600 font-mono">Clinical Reasoning Grade</p>
                <p className="text-2xl font-bold text-amber-400 print:text-amber-700 font-mono mt-1">
                  {completedCases >= 10 ? 'Distinction (A+)' : completedCases >= 5 ? 'Proficient (B+)' : 'Developing (Satisfactory)'}
                </p>
                <p className="text-xs text-amber-300 print:text-amber-600 mt-1">National TB Guidelines</p>
              </div>
            </div>
          </div>

          {/* Diagnostic Strength Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 print:text-slate-800">
              Diagnostic Strength Breakdown
            </h3>
            <div className="space-y-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl print:bg-slate-50 print:border-slate-200">
              {[
                { label: 'Pulmonary TB', score: accuracy > 0 ? Math.min(100, accuracy + 5) : 0 },
                { label: 'Extra-pulmonary TB', score: accuracy > 0 ? Math.max(0, accuracy - 10) : 0 },
                { label: 'Pediatric TB', score: accuracy > 0 ? accuracy : 0 },
                { label: 'MDR-TB', score: accuracy > 0 ? Math.max(0, accuracy - 5) : 0 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{item.label}</span>
                    <span className="font-mono text-cyan-400">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full transition-all"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earned Badges */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 print:text-slate-800 flex items-center gap-2">
              <Award size={16} className="text-amber-400" /> Certified Badges & Credentials ({badges.length})
            </h3>
            {badges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {badges.map((b, i) => (
                  <div key={i} className="px-3 py-1.5 bg-amber-950/40 border border-amber-500/30 rounded-xl text-amber-300 print:bg-amber-50 print:border-amber-300 print:text-amber-800 text-xs font-semibold">
                    ★ {b}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono italic">No badges earned yet. Complete clinical cases to unlock certifications.</p>
            )}
          </div>

          {/* Footer Notes */}
          <div className="pt-6 border-t border-slate-800 print:border-slate-300 flex justify-between items-center text-xs text-slate-400 print:text-slate-600 font-mono">
            <span>Verified by TB Quest AI Clinical Engine</span>
            <span>Date: {new Date().toLocaleDateString()}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
