import { useState } from 'react';
import { Calculator, CheckSquare, Square, AlertCircle, Info, Sparkles, RefreshCw } from 'lucide-react';

export default function PediatricScoreCalculator() {
  const [hasCough, setHasCough] = useState(false);
  const [hasFever, setHasFever] = useState(false);
  const [hasWeightLoss, setHasWeightLoss] = useState(false);
  const [hasLymphNode, setHasLymphNode] = useState(false);
  const [tstPositive, setTstPositive] = useState(false);
  const [hasContactHistory, setHasContactHistory] = useState(false);
  const [cxrSuggestive, setCxrSuggestive] = useState(false);

  // Calculate score
  let score = 0;
  if (hasCough) score += 2;
  if (hasFever) score += 2;
  if (hasWeightLoss) score += 2;
  if (hasLymphNode) score += 2;
  if (tstPositive) score += 3;
  if (hasContactHistory) score += 2;
  if (cxrSuggestive) score += 2;

  const isHighRisk = score >= 6;

  const handleReset = () => {
    setHasCough(false);
    setHasFever(false);
    setHasWeightLoss(false);
    setHasLymphNode(false);
    setTstPositive(false);
    setHasContactHistory(false);
    setCxrSuggestive(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-slate-900 border border-purple-500/30 rounded-2xl sm:rounded-3xl text-white shadow-[0_0_30px_rgba(168,85,247,0.15)] space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 bg-purple-950 border border-purple-500/40 rounded-xl sm:rounded-2xl text-purple-400">
            <Calculator size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-xl font-bold text-white">Pediatric TB Composite Score Calculator</h3>
            <p className="text-slate-400 text-[10px] sm:text-xs font-mono">National Pediatric Diagnostic Guideline Tool (Page 22 Reference)</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors shrink-0"
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Criteria checklist */}
        <div className="space-y-2.5 sm:space-y-3">
          <p className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center gap-1">
            <Sparkles size={14} /> Clinical Criteria Selection:
          </p>

          <button
            onClick={() => setHasCough(!hasCough)}
            className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              hasCough ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-medium">Unexplained Cough ≥ 2 weeks (+2 pts)</span>
            {hasCough ? <CheckSquare size={18} className="text-purple-400 shrink-0" /> : <Square size={18} className="shrink-0" />}
          </button>

          <button
            onClick={() => setHasFever(!hasFever)}
            className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              hasFever ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-medium">Unexplained Fever ≥ 2 weeks (+2 pts)</span>
            {hasFever ? <CheckSquare size={18} className="text-purple-400 shrink-0" /> : <Square size={18} className="shrink-0" />}
          </button>

          <button
            onClick={() => setHasWeightLoss(!hasWeightLoss)}
            className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              hasWeightLoss ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-medium">Unintentional Weight Loss / Growth Failure (+2 pts)</span>
            {hasWeightLoss ? <CheckSquare size={18} className="text-purple-400 shrink-0" /> : <Square size={18} className="shrink-0" />}
          </button>

          <button
            onClick={() => setHasLymphNode(!hasLymphNode)}
            className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              hasLymphNode ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-medium">Cervical Lymph Node Swelling (+2 pts)</span>
            {hasLymphNode ? <CheckSquare size={18} className="text-purple-400 shrink-0" /> : <Square size={18} className="shrink-0" />}
          </button>

          <button
            onClick={() => setTstPositive(!tstPositive)}
            className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              tstPositive ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-medium">Mantoux TST Positive (≥ 10mm) (+3 pts)</span>
            {tstPositive ? <CheckSquare size={18} className="text-purple-400 shrink-0" /> : <Square size={18} className="shrink-0" />}
          </button>

          <button
            onClick={() => setHasContactHistory(!hasContactHistory)}
            className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              hasContactHistory ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-medium">Household TB Contact History (+2 pts)</span>
            {hasContactHistory ? <CheckSquare size={18} className="text-purple-400 shrink-0" /> : <Square size={18} className="shrink-0" />}
          </button>

          <button
            onClick={() => setCxrSuggestive(!cxrSuggestive)}
            className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              cxrSuggestive ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="text-xs font-medium">Chest X-Ray Suggestive of TB (+2 pts)</span>
            {cxrSuggestive ? <CheckSquare size={18} className="text-purple-400 shrink-0" /> : <Square size={18} className="shrink-0" />}
          </button>
        </div>

        {/* Calculated Result Panel */}
        <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-4 sm:p-6 flex flex-col justify-between text-center shadow-inner">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-[10px] sm:text-xs font-mono uppercase text-slate-400">Total Pediatric TB Score</p>

            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 bg-purple-950 border-2 border-purple-500 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.3)]">
              <span className="text-4xl sm:text-5xl font-black font-mono text-purple-300">{score}</span>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl border text-xs leading-relaxed font-bold ${
              isHighRisk
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                : 'bg-amber-950/60 border-amber-500 text-amber-200'
            }`}>
              {isHighRisk ? (
                <div>
                  <p className="text-sm sm:text-base font-extrabold mb-1">SCORE ≥ 6: HIGH PROBABILITY OF ACTIVE TB</p>
                  <p className="font-normal text-[10px] sm:text-[11px]">
                    Guideline Action: Initiate Pediatric Anti-TB Treatment immediately as per Page 22 algorithm.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm sm:text-base font-extrabold mb-1">SCORE &lt; 6: LOW / INCONCLUSIVE SCORE</p>
                  <p className="font-normal text-[10px] sm:text-[11px]">
                    Guideline Action: Check contact history & TST. If negative, observe for 2 weeks before re-evaluating.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
            <Info size={14} className="text-purple-400 shrink-0" />
            <span>NTEP National Pediatric TB Scoring Matrix</span>
          </div>
        </div>
      </div>
    </div>
  );
}
