import { useState } from 'react';
import { Stethoscope, Baby, ShieldAlert, Dices, ArrowRight, Bookmark } from 'lucide-react';
import { CaseType } from '../types';

interface CaseSelectionProps {
  onSelectCase: (type: CaseType, difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => void;
  onBack: () => void;
  bookmarkedCases: string[];
  onToggleBookmark: (id: string) => void;
}

export default function CaseSelection({ onSelectCase, onBack, bookmarkedCases, onToggleBookmark }: CaseSelectionProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Record<CaseType, 'Beginner' | 'Intermediate' | 'Advanced'>>({
    pulmonary: 'Beginner',
    pediatric: 'Beginner',
    mdr: 'Beginner',
    hiv: 'Beginner',
    'time-critical': 'Beginner',
    random: 'Beginner'
  });

  const cases = [
    {
      id: 'pulmonary' as CaseType,
      title: 'Pulmonary TB Case',
      desc: 'Adult TB diagnostic scenario with symptoms, smear, CBNAAT, CXR & diagnosis.',
      icon: Stethoscope,
      color: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/40 text-cyan-400'
    },
    {
      id: 'pediatric' as CaseType,
      title: 'Pediatric TB Case',
      desc: 'Childhood TB case challenges with age-specific diagnostic approach and TB score.',
      icon: Baby,
      color: 'from-purple-500/20 to-pink-600/20 border-purple-500/40 text-purple-400'
    },
    {
      id: 'mdr' as CaseType,
      title: 'MDR-TB Case',
      desc: 'Drug-resistant TB management with advanced clinical decision-making & DST.',
      icon: ShieldAlert,
      color: 'from-amber-500/20 to-red-600/20 border-amber-500/40 text-amber-400'
    },
    {
      id: 'random' as CaseType,
      title: 'Random Case Challenge',
      desc: 'System loads a surprise clinical scenario for adaptive learning & timed mission.',
      icon: Dices,
      color: 'from-emerald-500/20 to-teal-600/20 border-emerald-500/40 text-emerald-400'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          TB Quest – Case Selection
        </h1>
        <p className="text-slate-400 font-mono">Choose a TB Case Module to Begin Your Diagnostic Journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((c) => {
          const Icon = c.icon;
          const diff = selectedDifficulty[c.id];
          const isBookmarked = bookmarkedCases.includes(c.id);
          return (
            <div
              key={c.id}
              className={`p-8 bg-gradient-to-br ${c.color} border rounded-3xl shadow-lg flex flex-col justify-between group relative`}
            >
              <button
                onClick={() => onToggleBookmark(c.id)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isBookmarked ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <div>
                <div className="p-3 w-16 bg-slate-900/60 rounded-2xl mb-6 shadow-inner flex items-center justify-center">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{c.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{c.desc}</p>
                
                {/* Difficulty Toggles */}
                <div className="mt-4 flex gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDifficulty(prev => ({ ...prev, [c.id]: d }))}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono border transition-all ${
                        diff === d ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onSelectCase(c.id, diff)}
                className="mt-6 flex items-center justify-center gap-2 p-3 bg-slate-900/60 rounded-xl text-sm font-semibold text-cyan-300 hover:bg-slate-900 transition-colors"
              >
                <span>Start {diff} Simulation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-sm font-medium transition-colors"
        >
          ← Return to Dashboard
        </button>
      </div>
    </div>
  );
}
