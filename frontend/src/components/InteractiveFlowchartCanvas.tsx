import { useState, useRef } from 'react';
import { AlgorithmNode } from '../types';
import { motion } from 'motion/react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Maximize2, Sparkles, 
  ArrowRight, Info, CheckCircle2, AlertCircle, Eye 
} from 'lucide-react';

interface InteractiveFlowchartCanvasProps {
  nodes: AlgorithmNode[];
  activeNodeId: string;
  visitedNodeIds: string[];
  wrongNodeIds?: string[];
  onNodeClick: (node: AlgorithmNode) => void;
}

export default function InteractiveFlowchartCanvas({
  nodes,
  activeNodeId,
  visitedNodeIds,
  wrongNodeIds = [],
  onNodeClick
}: InteractiveFlowchartCanvasProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.15, 2.0));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.15, 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const getNodeColor = (node: AlgorithmNode) => {
    const isCurrent = node.id === activeNodeId;
    const isVisited = visitedNodeIds.includes(node.id);
    const isWrong = wrongNodeIds.includes(node.id);
    const isDiagnosis = node.category === 'treatment' || node.category === 'referral';

    if (isCurrent) {
      return 'bg-blue-950/90 border-cyan-400 text-cyan-100 ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] animate-pulse';
    }
    if (isWrong) {
      return 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
    }
    if (isVisited && isDiagnosis) {
      return 'bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
    }
    if (isVisited) {
      return 'bg-emerald-950/70 border-emerald-500/70 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
    }
    return 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:bg-slate-900';
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
    <div className="relative w-full bg-slate-950 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] min-h-[550px] flex flex-col">
      {/* Canvas Controls Bar */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 z-10 gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
            Interactive Flowchart Canvas
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
            {nodes.length} Nodes Loaded
          </span>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-cyan-400/50" /> Current Node
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Visited Node
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Differential / Wrong
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <span className="text-[11px] font-mono text-cyan-400 px-2 font-bold min-w-[42px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-all"
            title="Reset Pan & Zoom"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Pannable & Zoomable Node Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative flex-1 overflow-hidden p-6 select-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'top left',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="relative min-w-[1200px] min-h-[1100px]"
        >
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="visitedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {nodes.map(sourceNode => {
              if (!sourceNode.gridPos) return null;
              return sourceNode.nextNodes.map(targetId => {
                const targetNode = nodes.find(n => n.id === targetId);
                if (!targetNode || !targetNode.gridPos) return null;

                const startX = sourceNode.gridPos.x + 130; // card half-width
                const startY = sourceNode.gridPos.y + 110;
                const endX = targetNode.gridPos.x + 130;
                const endY = targetNode.gridPos.y;

                const isPathActive =
                  visitedNodeIds.includes(sourceNode.id) && visitedNodeIds.includes(targetNode.id);

                const controlY1 = startY + (endY - startY) * 0.5;
                const controlY2 = startY + (endY - startY) * 0.5;

                return (
                  <path
                    key={`${sourceNode.id}-${targetNode.id}`}
                    d={`M ${startX} ${startY} C ${startX} ${controlY1}, ${endX} ${controlY2}, ${endX} ${endY}`}
                    fill="none"
                    stroke={isPathActive ? 'url(#visitedGradient)' : '#334155'}
                    strokeWidth={isPathActive ? '3' : '1.5'}
                    strokeDasharray={isPathActive ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />
                );
              });
            })}
          </svg>

          {/* Node Cards */}
          {nodes.map((node, idx) => {
            const isCurrent = node.id === activeNodeId;
            const isVisited = visitedNodeIds.includes(node.id);
            const isWrong = wrongNodeIds.includes(node.id);

            const x = node.gridPos?.x ?? (idx % 3) * 320 + 50;
            const y = node.gridPos?.y ?? Math.floor(idx / 3) * 200 + 50;

            return (
              <motion.div
                key={node.id}
                style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-64 z-10"
              >
                <button
                  onClick={() => onNodeClick(node)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all relative group flex flex-col justify-between backdrop-blur-md cursor-pointer ${getNodeColor(
                    node
                  )}`}
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold border ${getCategoryBadgeClass(node.category)}`}>
                      {node.category}
                    </span>

                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-400">
                        <Eye size={10} /> Active
                      </span>
                    )}
                    {isVisited && !isCurrent && (
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    )}
                    {isWrong && (
                      <AlertCircle size={14} className="text-rose-400 shrink-0" />
                    )}
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-white mb-1.5 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {node.label}
                  </h3>
                  <p className="text-slate-400 text-[11px] line-clamp-2 leading-snug">
                    {node.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                    <span>Inspect Guidelines</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
