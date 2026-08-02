import { useState, useEffect } from 'react';
import { AlgorithmNode } from '../types';
import { motion } from 'motion/react';
import { 
  X, Volume2, VolumeX, Play, Square, BookOpen, 
  CheckCircle2, Info, Sparkles, FileText, Image as ImageIcon, ShieldAlert 
} from 'lucide-react';

interface NodeInspectorModalProps {
  node: AlgorithmNode | null;
  onClose: () => void;
  onJumpToSimulation?: (nodeId: string) => void;
}

export default function NodeInspectorModal({ node, onClose, onJumpToSimulation }: NodeInspectorModalProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'guidelines' | 'investigation' | 'notes'>('overview');

  useEffect(() => {
    // Cancel audio playback when node changes or modal closes
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [node]);

  if (!node) return null;

  const speakVoiceScript = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio narration is not supported in your browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = node.voiceScript || `${node.label}. ${node.description}. ${node.guidelineNote}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.cancel(); // Clear any ongoing speech
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const getCategoryBadgeClass = (category: AlgorithmNode['category']) => {
    switch (category) {
      case 'presumptive':
        return 'bg-amber-950/80 border-amber-500/50 text-amber-300';
      case 'plhiv':
        return 'bg-violet-950/80 border-violet-500/50 text-violet-300';
      case 'investigation':
        return 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300';
      case 'cbnaat':
        return 'bg-blue-950/80 border-blue-400 text-blue-300';
      case 'dr-pathway':
        return 'bg-rose-950/80 border-rose-500/50 text-rose-300';
      case 'clinical-pathway':
        return 'bg-orange-950/80 border-orange-500/50 text-orange-300';
      case 'result':
        return 'bg-purple-950/80 border-purple-500/50 text-purple-300';
      case 'treatment':
        return 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';
      case 'referral':
        return 'bg-rose-950/80 border-rose-400 text-rose-200';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/40 rounded-3xl text-white shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase font-bold border ${getCategoryBadgeClass(node.category)}`}>
              {node.category} Node
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {node.id}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Narration Button */}
            <button
              onClick={speakVoiceScript}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isPlayingAudio
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Square size={14} className="fill-rose-400" />
                  <span>Stop Narration</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>Voice Narration</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Node Title & Description */}
        <div className="p-6 pb-4 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800">
          <h2 className="text-2xl font-black text-white mb-2">{node.label}</h2>
          <p className="text-slate-300 text-sm leading-relaxed">{node.description}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'overview'
                ? 'bg-slate-900 border-slate-800 text-cyan-400 border-b-2 border-b-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Overview & Image
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'guidelines'
                ? 'bg-slate-900 border-slate-800 text-cyan-400 border-b-2 border-b-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            CDC / WHO / NTEP Guidelines
          </button>
          <button
            onClick={() => setActiveTab('investigation')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'investigation'
                ? 'bg-slate-900 border-slate-800 text-cyan-400 border-b-2 border-b-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Investigation Details
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'notes'
                ? 'bg-slate-900 border-slate-800 text-cyan-400 border-b-2 border-b-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Learning Notes
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 max-h-[420px] overflow-y-auto custom-scrollbar space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {node.imageUrl && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-52 group">
                  <img
                    src={node.imageUrl}
                    alt={node.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 bg-slate-950/80 px-3 py-1 rounded-lg border border-cyan-500/30">
                      <ImageIcon size={14} /> Diagnostic Clinical Reference Image
                    </span>
                  </div>
                </div>
              )}

              <div className="p-4 bg-cyan-950/30 border border-cyan-500/30 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <Info size={16} /> National NTEP Guideline Rule
                </div>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic">
                  "{node.guidelineNote}"
                </p>
              </div>

              {node.decisionQuestion && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Interactive Decision Question:</h4>
                  <p className="text-sm font-bold text-cyan-300">{node.decisionQuestion}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'guidelines' && (
            <div className="space-y-4">
              {node.cdcGuideline && (
                <div className="p-4 bg-slate-950 border border-blue-500/30 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
                    <BookOpen size={14} /> CDC Recommendation
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{node.cdcGuideline}</p>
                </div>
              )}

              {node.whoRecommendation && (
                <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                    <Sparkles size={14} /> WHO Guidelines Standard
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{node.whoRecommendation}</p>
                </div>
              )}

              {node.ntepGuideline && (
                <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                    <ShieldAlert size={14} /> NTEP Operational Protocol
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{node.ntepGuideline}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'investigation' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">Investigation Details:</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {node.investigationDetails || node.description}
                </p>
              </div>

              {node.interpretationText && (
                <div className="p-4 bg-purple-950/30 border border-purple-500/30 rounded-2xl space-y-2">
                  <h4 className="text-xs font-mono uppercase text-purple-300 font-bold">Clinical Interpretation:</h4>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic">
                    "{node.interpretationText}"
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              {node.learningNotes && node.learningNotes.length > 0 ? (
                node.learningNotes.map((note, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{note}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No extra learning notes recorded for this node.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            Close Inspector
          </button>

          {onJumpToSimulation && (
            <button
              onClick={() => {
                onClose();
                onJumpToSimulation(node.id);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            >
              Simulate from this Node →
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
