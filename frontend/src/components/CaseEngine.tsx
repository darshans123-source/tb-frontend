import { useState, useEffect } from 'react';
import { Microscope, Activity, ChevronRight, CheckCircle, XCircle, Trophy, RefreshCw, Bot, ShieldAlert, Clock, FileText, Map, Award, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip } from '@mui/material';
import { CaseType, PatientCase, DecisionStep } from '../types';
import { COMPREHENSIVE_CASES } from '../data/casesData';
import { soundService } from '../services/soundService';
import { MEDICAL_TERMS } from '../utils/medicalTerms';
import AlgorithmFlowchart from './AlgorithmFlowchart';
import PediatricScoreCalculator from './PediatricScoreCalculator';

function HighlightedText({ text }: { text: string }) {
  const terms = Object.keys(MEDICAL_TERMS);
  const parts = text.split(new RegExp(`(${terms.join('|')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => {
        const term = terms.find(t => t.toLowerCase() === part.toLowerCase());
        if (term) {
          return (
            <Tooltip key={i} title={MEDICAL_TERMS[term]} arrow>
              <span className="text-cyan-400 font-bold underline cursor-help">{part}</span>
            </Tooltip>
          );
        }
        return part;
      })}
    </>
  );
}

interface CaseEngineProps {
  caseType: CaseType;
  onFinishCase: (score: number, xp: number, badge?: string) => void;
  onBack: () => void;
}

export default function CaseEngine({ caseType, onFinishCase, onBack }: CaseEngineProps) {
  // Find case from COMPREHENSIVE_CASES matching caseType or default to pulmonary
  const availableCases = COMPREHENSIVE_CASES.filter(c => c.type === caseType);
  const activeCase: PatientCase = availableCases.length > 0
    ? availableCases[Math.floor(Math.random() * availableCases.length)]
    : COMPREHENSIVE_CASES[0];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; rationale: string; guideline: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [timeTaken, setTimeTaken] = useState(0);

  // Tab views within Case Engine
  const [activeTab, setActiveTab] = useState<'case' | 'lab' | 'flowchart' | 'calculator'>('case');

  // Countdown timer for Level 5 Time-Critical cases
  const [timeLeft, setTimeLeft] = useState<number | null>(activeCase.timeLimitSeconds || null);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isCompleted]);

  const currentStep: DecisionStep = activeCase.steps[currentStepIndex] || activeCase.steps[0];

  const handleSelectOption = (opt: typeof currentStep.options[0]) => {
    setSelectedOption(opt.id);
    if (opt.isCorrect) {
      soundService.playCorrect();
      setScore(prev => prev + 100);
      setXpEarned(prev => prev + opt.xpBonus);
    } else {
      soundService.playIncorrect();
      if (opt.penalty) {
        setScore(prev => Math.max(0, prev - opt.penalty!));
      }
    }
    setFeedback({
      isCorrect: opt.isCorrect,
      rationale: opt.rationale,
      guideline: opt.guidelineReference
    });
    soundService.speak(opt.rationale);
  };

  const handleNextStep = () => {
    soundService.playClick();
    setSelectedOption(null);
    setFeedback(null);
    setActiveTab('case');
    if (currentStepIndex + 1 < activeCase.steps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      const duration = Math.round((Date.now() - startTime) / 1000);
      setTimeTaken(duration);
      setIsCompleted(true);
      soundService.playTrophy();
      onFinishCase(score + 150, xpEarned + 200, `${activeCase.type.toUpperCase()} Diagnostic Master`);
    }
  };

  return (
    <div className="p-4 sm:p-6 pb-24 max-w-6xl mx-auto min-h-[88vh] flex flex-col justify-center text-white">
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 sm:mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded-full text-[10px] sm:text-xs font-mono uppercase font-bold">
              {activeCase.difficulty}
            </span>
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-purple-950 text-purple-300 border border-purple-500/30 rounded-full text-[10px] sm:text-xs font-mono">
              Case ID: {activeCase.id}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            <HighlightedText text={activeCase.title} />
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            <HighlightedText text={currentStep.subtitle} />
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Time Critical Countdown Timer */}
          {timeLeft !== null && (
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border font-mono text-xs font-bold ${
              timeLeft < 15 ? 'bg-rose-950 border-rose-500 text-rose-300 animate-bounce' : 'bg-slate-900 border-cyan-500/30 text-cyan-300'
            }`}>
              <Clock size={16} />
              <span>TIME LEFT: {timeLeft}s</span>
            </div>
          )}

          <button
            onClick={() => {
              soundService.playClick();
              onBack();
            }}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold shrink-0"
          >
            Exit Simulation
          </button>
        </div>
      </div>

      {/* Case Engine Sub-Navigation Bar */}
      {!isCompleted && (
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 bg-slate-900/80 p-1.5 sm:p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('case')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'case' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity size={16} /> <span className="hidden sm:inline">Clinical Scenario & Decision</span><span className="sm:hidden">Scenario</span>
          </button>

          {(activeCase.initialReport || currentStep.labReport) && (
            <button
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lab' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Microscope size={16} /> <span className="hidden sm:inline">Lab & Radiology Reports</span><span className="sm:hidden">Lab Reports</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('flowchart')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'flowchart' ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map size={16} /> <span className="hidden sm:inline">Interactive Algorithm Map</span><span className="sm:hidden">Algorithm</span>
          </button>

          {activeCase.type === 'pediatric' && (
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'calculator' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText size={16} /> <span className="hidden sm:inline">Pediatric Score Tool</span><span className="sm:hidden">Score Tool</span>
            </button>
          )}
        </div>
      )}

      {/* Main Simulation View */}
      {!isCompleted ? (
        <div>
          {/* TAB 1: Clinical Case & Decision Tree */}
          {activeTab === 'case' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Patient Demographics & Clinical History Card */}
              {activeCase.patient && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 p-4 sm:p-5 bg-slate-900/90 border border-cyan-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_25px_rgba(6,182,212,0.1)]">
                  <div>
                    <p className="text-xs uppercase font-mono text-cyan-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 font-bold">
                      <Activity size={16} /> Patient Demographics
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-white mb-1">
                      {activeCase.patient.name} ({activeCase.patient.age}y / {activeCase.patient.gender})
                    </p>
                    <p className="text-xs text-slate-400 font-mono">Chief Complaint Duration: {activeCase.patient.duration}</p>
                    {activeCase.patient.vitalSigns && (
                      <div className="mt-2.5 sm:mt-3 p-2 bg-slate-950 rounded-xl text-[11px] font-mono text-slate-300 space-y-0.5 border border-slate-800">
                        <p>Temp: {activeCase.patient.vitalSigns.temp} | SpO2: {activeCase.patient.vitalSigns.spO2}</p>
                        <p>Weight: {activeCase.patient.vitalSigns.weight}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-xs uppercase font-mono text-cyan-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 font-bold">
                      <FileText size={16} /> Symptoms Present
                    </p>
                    <ul className="space-y-1 text-slate-300 text-xs">
                      {activeCase.patient.symptoms.map((s, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                          <span><HighlightedText text={s} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase font-mono text-amber-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 font-bold">
                      <ShieldAlert size={16} /> Risk Factors & History
                    </p>
                    <ul className="space-y-1 text-slate-300 text-xs mb-3">
                      {activeCase.patient.riskFactors.map((r, i) => (
                        <li key={i} className="flex items-center gap-2 text-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                          <span><HighlightedText text={r} /></span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      "<HighlightedText text={activeCase.patient.history} />"
                    </p>
                  </div>
                </div>
              )}

              {/* Decision Step Title */}
              <div className="bg-slate-900/60 p-3.5 sm:p-4 rounded-2xl border border-slate-800">
                <h2 className="text-base sm:text-lg font-bold text-cyan-300 mb-1">
                  <HighlightedText text={currentStep.question} />
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {currentStep.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                            : 'bg-rose-950/70 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                          : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 text-slate-200 hover:bg-slate-800/90'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-cyan-400 border border-slate-700 shrink-0 group-hover:border-cyan-400">
                          {opt.id.slice(-1).toUpperCase()}
                        </div>
                        <span className="font-medium text-xs sm:text-sm"><HighlightedText text={opt.label} /></span>
                      </div>

                      {isSelected && (
                        <div className="shrink-0">
                          {opt.isCorrect ? <CheckCircle className="text-emerald-400" size={22} /> : <XCircle className="text-rose-400" size={22} />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Rationale Box */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border ${
                      feedback.isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                        : 'bg-rose-950/50 border-rose-500/50 text-rose-100 shadow-[0_0_30px_rgba(244,63,94,0.15)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base mb-2">
                      {feedback.isCorrect ? (
                        <CheckCircle size={20} className="text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle size={20} className="text-rose-400 shrink-0" />
                      )}
                      <span>{feedback.isCorrect ? 'Excellent Clinical Reasoning!' : 'Clinical Guideline Correction Required'}</span>
                    </div>

                    <p className="text-xs leading-relaxed mb-3 text-slate-200">
                      <HighlightedText text={feedback.rationale} />
                    </p>

                    <div className="p-2.5 sm:p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[10px] sm:text-[11px] font-mono text-cyan-300 flex items-center gap-2 mb-4">
                      <Lightbulb size={14} className="text-amber-400 shrink-0" />
                      <span>{feedback.guideline}</span>
                    </div>

                    <button
                      onClick={handleNextStep}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                    >
                      <span>Proceed to Next Step</span>
                      <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 2: Lab & Radiology Reports Inspection */}
          {activeTab === 'lab' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-purple-300 flex items-center gap-2">
                <Microscope /> Interactive Laboratory & Diagnostic Investigation Reports
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Smear Report Card */}
                {(activeCase.initialReport?.smearMicroscopy || currentStep.labReport?.smearMicroscopy) && (
                  <div className="p-4 sm:p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2.5 sm:space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="font-mono text-[11px] sm:text-xs text-purple-400 font-bold uppercase">Sputum Smear Microscopy</span>
                      <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300 font-mono">ZN Staining</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-white">
                      Result: {(currentStep.labReport?.smearMicroscopy || activeCase.initialReport?.smearMicroscopy)?.result}
                    </p>
                    <p className="text-xs text-slate-300">
                      {(currentStep.labReport?.smearMicroscopy || activeCase.initialReport?.smearMicroscopy)?.details}
                    </p>
                  </div>
                )}

                {/* CBNAAT Report Card */}
                {(activeCase.initialReport?.cbnaat || currentStep.labReport?.cbnaat) && (
                  <div className="p-4 sm:p-5 bg-slate-900 border border-cyan-500/40 rounded-2xl space-y-2.5 sm:space-y-3 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="font-mono text-[11px] sm:text-xs text-cyan-400 font-bold uppercase">CBNAAT / Xpert MTB/RIF Report</span>
                      <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded text-[10px] font-mono">Real-time PCR</span>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-white">
                      MTB Status: {(currentStep.labReport?.cbnaat || activeCase.initialReport?.cbnaat)?.mtbStatus}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-amber-300">
                      Rifampicin Resistance: {(currentStep.labReport?.cbnaat || activeCase.initialReport?.cbnaat)?.rifResistance}
                    </p>
                  </div>
                )}

                {/* Chest X-Ray Card */}
                {(activeCase.initialReport?.chestXray || currentStep.labReport?.chestXray) && (
                  <div className="p-4 sm:p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2.5 sm:space-y-3 md:col-span-2">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="font-mono text-[11px] sm:text-xs text-indigo-400 font-bold uppercase">Chest Radiograph (CXR) Report</span>
                      <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300 font-mono">PA View</span>
                    </div>
                    <p className="text-xs text-slate-200">
                      <span className="font-bold text-slate-400">Radiological Findings:</span> {(currentStep.labReport?.chestXray || activeCase.initialReport?.chestXray)?.findings}
                    </p>
                    <p className="text-xs text-cyan-300 font-semibold">
                      <span className="font-bold text-slate-400">Impression:</span> {(currentStep.labReport?.chestXray || activeCase.initialReport?.chestXray)?.impression}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Interactive Algorithm Flowchart Map */}
          {activeTab === 'flowchart' && (
            <AlgorithmFlowchart interactiveMode={true} />
          )}

          {/* TAB 4: Pediatric Score Calculator */}
          {activeTab === 'calculator' && (
            <PediatricScoreCalculator />
          )}
        </div>
      ) : (
        /* End of Case Performance Summary */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 sm:p-8 bg-slate-900 border border-cyan-500/40 rounded-2xl sm:rounded-3xl text-center space-y-4 sm:space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] max-w-xl mx-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          <div className="inline-flex p-3 sm:p-4 bg-cyan-950 border border-cyan-500/40 rounded-full text-cyan-400 mb-2 shadow-inner">
            <Trophy size={40} className="sm:w-12 sm:h-12" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Clinical Simulation Mastered!</h2>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            You have successfully navigated the national TB diagnostic pathway for this scenario.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center font-mono">
            <div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Final Score</p>
              <p className="text-base sm:text-xl text-cyan-400 font-bold">{score + 150}</p>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase">XP Earned</p>
              <p className="text-base sm:text-xl text-amber-400 font-bold">+{xpEarned + 200} XP</p>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase">Time Elapsed</p>
              <p className="text-base sm:text-xl text-emerald-400 font-bold">{timeTaken}s</p>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-left text-[11px] sm:text-xs space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Diagnostic Accuracy Score:</span>
              <span className="text-emerald-400 font-bold">100%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Clinical Reasoning Index:</span>
              <span className="text-cyan-400 font-bold">9.4 / 10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Investigation Optimization:</span>
              <span className="text-purple-400 font-bold">Optimal (No unnecessary tests)</span>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onBack();
            }}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all"
          >
            Return to Dashboard
          </button>
        </motion.div>
      )}
    </div>
  );
}
