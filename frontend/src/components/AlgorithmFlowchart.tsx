import { useState } from 'react';
import { AlgorithmFlowcharts } from '../data/algorithmData';
import { AlgorithmNode } from '../types';
import InteractiveFlowchartCanvas from './InteractiveFlowchartCanvas';
import NodeInspectorModal from './NodeInspectorModal';
import ClinicalSimulationEngine from './ClinicalSimulationEngine';
import AlgorithmAssessmentMode from './AlgorithmAssessmentMode';
import { 
  BookOpen, Sparkles, Stethoscope, Trophy, Users, 
  RotateCcw, CheckCircle2, Info, ArrowRight, Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AlgorithmFlowchartProps {
  interactiveMode?: boolean;
  onFinishCase?: (score: number, xpGained: number) => void;
}

export default function AlgorithmFlowchart({ interactiveMode = true, onFinishCase }: AlgorithmFlowchartProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'pulmonary' | 'pediatric'>('pulmonary');
  const [activeMode, setActiveMode] = useState<'learning' | 'simulation' | 'assessment' | 'faculty'>('learning');
  
  const flowchartData = selectedAlgorithm === 'pulmonary' 
    ? AlgorithmFlowcharts.pulmonaryTB 
    : AlgorithmFlowcharts.pediatricTB;

  const [activeNodeId, setActiveNodeId] = useState<string>(flowchartData.nodes[0]?.id || 'node_start');
  const [visitedNodeIds, setVisitedNodeIds] = useState<string[]>([flowchartData.nodes[0]?.id || 'node_start']);
  const [inspectedNode, setInspectedNode] = useState<AlgorithmNode | null>(null);

  const handleNodeClick = (node: AlgorithmNode) => {
    setInspectedNode(node);
    setActiveNodeId(node.id);
    if (!visitedNodeIds.includes(node.id)) {
      setVisitedNodeIds(prev => [...prev, node.id]);
    }
  };

  const handleSelectAlgorithm = (algo: 'pulmonary' | 'pediatric') => {
    setSelectedAlgorithm(algo);
    const newFlowchart = algo === 'pulmonary' ? AlgorithmFlowcharts.pulmonaryTB : AlgorithmFlowcharts.pediatricTB;
    const startId = newFlowchart.nodes[0]?.id || 'node_start';
    setActiveNodeId(startId);
    setVisitedNodeIds([startId]);
  };

  return (
    <div className="space-y-6 text-white">
      {/* Top Banner & Flowchart / Mode Selector Controls */}
      <div className="p-6 bg-slate-950 border border-cyan-500/30 rounded-3xl shadow-[0_0_35px_rgba(6,182,212,0.15)] space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
              <BookOpen size={16} /> NTEP / WHO Official Diagnostic Standard
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              {flowchartData.title}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {flowchartData.subtitle} ({flowchartData.pdfReference})
            </p>
          </div>

          {/* Algorithm Switcher (Pulmonary vs Pediatric) */}
          <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0 gap-1">
            <button
              onClick={() => handleSelectAlgorithm('pulmonary')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAlgorithm === 'pulmonary'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pulmonary TB Pathway
            </button>
            <button
              onClick={() => handleSelectAlgorithm('pediatric')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAlgorithm === 'pediatric'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pediatric TB Pathway
            </button>
          </div>
        </div>

        {/* 4 Primary Interactive Modes Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveMode('learning')}
            className={`p-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 border ${
              activeMode === 'learning'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <BookOpen size={16} /> Learning Mode
          </button>

          <button
            onClick={() => setActiveMode('simulation')}
            className={`p-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 border ${
              activeMode === 'simulation'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Stethoscope size={16} /> Clinical Simulation
          </button>

          <button
            onClick={() => setActiveMode('assessment')}
            className={`p-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 border ${
              activeMode === 'assessment'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Trophy size={16} /> Assessment Mode
          </button>

          <button
            onClick={() => setActiveMode('faculty')}
            className={`p-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 border ${
              activeMode === 'faculty'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Users size={16} /> Faculty View
          </button>
        </div>
      </div>

      {/* Render Selected Mode View */}
      <AnimatePresence mode="wait">
        {activeMode === 'learning' && (
          <motion.div
            key="learning-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <InteractiveFlowchartCanvas
              nodes={flowchartData.nodes}
              activeNodeId={activeNodeId}
              visitedNodeIds={visitedNodeIds}
              onNodeClick={handleNodeClick}
            />
          </motion.div>
        )}

        {activeMode === 'simulation' && (
          <motion.div
            key="simulation-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ClinicalSimulationEngine
              nodes={flowchartData.nodes}
              onInspectNode={(node) => setInspectedNode(node)}
            />
          </motion.div>
        )}

        {activeMode === 'assessment' && (
          <motion.div
            key="assessment-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlgorithmAssessmentMode
              nodes={flowchartData.nodes}
              onFinishAssessment={(score, gainedXp) => {
                if (onFinishCase) {
                  onFinishCase(score, gainedXp);
                }
              }}
            />
          </motion.div>
        )}

        {activeMode === 'faculty' && (
          <motion.div
            key="faculty-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-slate-900 border border-cyan-500/30 rounded-3xl space-y-6 shadow-xl"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <Users className="text-cyan-400" size={24} />
              <div>
                <h3 className="text-lg font-bold text-white">Faculty Algorithm Tracking Dashboard</h3>
                <p className="text-xs text-slate-400">Monitor student decision pathways, accuracy, velocity, and common diagnostic errors.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Total Algorithm Runs</span>
                <p className="text-2xl font-black text-cyan-400">142 Cases</p>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 size={12} /> 88.4% Completion Rate
                </span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Avg Decision Velocity</span>
                <p className="text-2xl font-black text-purple-400">18.4s / step</p>
                <span className="text-[11px] text-slate-400 font-mono">Standard NTEP Target: &lt; 30s</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Most Common Deviation</span>
                <p className="text-sm font-bold text-rose-400">Skipping CBNAAT in Smear (+)</p>
                <span className="text-[11px] text-slate-400 font-mono">24% students affected</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase font-bold text-cyan-400">Pathway Distribution Analytics:</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>1st Line Anti-TB Treatment Pathway (DS-TB)</span>
                    <span className="font-mono text-cyan-400 font-bold">58%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '58%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>PMDT Drug-Resistant Referral (RR-TB)</span>
                    <span className="font-mono text-rose-400 font-bold">22%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '22%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Clinically Diagnosed & Alternative Pathway</span>
                    <span className="font-mono text-amber-400 font-bold">20%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Inspector Modal */}
      <AnimatePresence>
        {inspectedNode && (
          <NodeInspectorModal
            node={inspectedNode}
            onClose={() => setInspectedNode(null)}
            onJumpToSimulation={(nodeId) => {
              setActiveMode('simulation');
              setActiveNodeId(nodeId);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
