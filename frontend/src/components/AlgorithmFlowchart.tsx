import { useState } from 'react';
import { AlgorithmFlowcharts } from '../data/algorithmData';
import { AlgorithmNode } from '../types';
import { FileText, ArrowRight, CheckCircle2, AlertCircle, Info, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AlgorithmFlowchartProps {
  activeNodeId?: string;
  onSelectNode?: (node: AlgorithmNode) => void;
  interactiveMode?: boolean;
}

export default function AlgorithmFlowchart({ activeNodeId, onSelectNode, interactiveMode = true }: AlgorithmFlowchartProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'pulmonary' | 'pediatric'>('pulmonary');
  const flowchartData = selectedAlgorithm === 'pulmonary' ? AlgorithmFlowcharts.pulmonaryTB : AlgorithmFlowcharts.pediatricTB;
  const [selectedNode, setSelectedNode] = useState<AlgorithmNode | null>(flowchartData.nodes[0]);

  const handleNodeClick = (node: AlgorithmNode) => {
    setSelectedNode(node);
    if (onSelectNode) {
      onSelectNode(node);
    }
  };

  const getCategoryBadgeClass = (category: AlgorithmNode['category']) => {
    switch (category) {
      case 'presumptive':
        return 'bg-amber-950/80 border-amber-500/50 text-amber-300';
      case 'investigation':
        return 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300';
      case 'result':
        return 'bg-purple-950/80 border-purple-500/50 text-purple-300';
      case 'treatment':
        return 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';
      case 'referral':
        return 'bg-rose-950/80 border-rose-500/50 text-rose-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="p-6 bg-slate-950 border border-cyan-500/30 rounded-3xl text-white shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-6">
      {/* Header & Algorithm Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
            <BookOpen size={16} /> Reference PDF Annexure Flowcharts
          </div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            {flowchartData.title}
          </h2>
          <p className="text-slate-400 text-xs mt-1">{flowchartData.subtitle} ({flowchartData.pdfReference})</p>
        </div>

        {interactiveMode && (
          <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => {
                setSelectedAlgorithm('pulmonary');
                setSelectedNode(AlgorithmFlowcharts.pulmonaryTB.nodes[0]);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAlgorithm === 'pulmonary'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pulmonary TB (Pages 21/23)
            </button>
            <button
              onClick={() => {
                setSelectedAlgorithm('pediatric');
                setSelectedNode(AlgorithmFlowcharts.pediatricTB.nodes[0]);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedAlgorithm === 'pediatric'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pediatric TB (Page 22)
            </button>
          </div>
        )}
      </div>

      {/* Interactive Visual Flowchart Node Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Node Grid */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <Sparkles size={14} className="text-cyan-400" /> Click any flowchart decision node to inspect clinical guidelines & criteria:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {flowchartData.nodes.map((node, idx) => {
              const isSelected = selectedNode?.id === node.id;
              const isActiveNode = activeNodeId === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`p-4 rounded-2xl border text-left transition-all relative group flex flex-col justify-between ${
                    isActiveNode
                      ? 'bg-amber-950/70 border-amber-400 text-amber-100 ring-2 ring-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulse'
                      : isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 text-cyan-100 ring-1 ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${getCategoryBadgeClass(node.category)}`}>
                      {node.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Node #{idx + 1}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {node.label}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2">{node.description}</p>

                  {node.nextNodes.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
                      <span>Branches to {node.nextNodes.length} node(s)</span>
                      <ArrowRight size={12} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Selected Node Inspector Panel */}
        <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 flex flex-col justify-between shadow-inner">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase font-bold border ${getCategoryBadgeClass(selectedNode.category)}`}>
                  {selectedNode.category} Node
                </span>
                <span className="text-xs text-cyan-400 font-mono">{selectedNode.id}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedNode.label}</h3>
                <p className="text-slate-300 text-xs leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {selectedNode.description}
                </p>
              </div>

              <div className="p-4 bg-cyan-950/40 border border-cyan-500/30 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Info size={16} />
                  <span>National NTEP Guideline Rule:</span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed italic">
                  "{selectedNode.guidelineNote}"
                </p>
              </div>

              {selectedNode.nextNodes.length > 0 && (
                <div>
                  <p className="text-xs uppercase font-mono text-slate-400 mb-2">Connected Downstream Pathways:</p>
                  <ul className="space-y-1.5">
                    {selectedNode.nextNodes.map(nextId => {
                      const targetNode = flowchartData.nodes.find(n => n.id === nextId);
                      return (
                        <li key={nextId} className="text-xs text-cyan-300 bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                          <span>{targetNode?.label || nextId}</span>
                          <ArrowRight size={12} className="text-cyan-500" />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a node on the left to inspect detailed clinical decision guidelines.
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>NTEP 2024 Guidelines Standard Flowchart</span>
          </div>
        </div>
      </div>
    </div>
  );
}
