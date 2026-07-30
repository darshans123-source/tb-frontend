import React from 'react';
import { Trophy, Award, CheckCircle2, Download, Printer, X, ShieldCheck } from 'lucide-react';
import { CertificateData } from '../types';

interface CertificateModalProps {
  certificateData: CertificateData;
  onClose: () => void;
}

export default function CertificateModal({ certificateData, onClose }: CertificateModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950 border border-amber-500/40 w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col my-8">
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center print:hidden">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
            <Award size={18} /> Official Institutional Certificate
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all"
            >
              <Printer size={16} /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Certificate Render Body (Printable area) */}
        <div className="p-10 bg-slate-900 text-white relative border-8 border-double border-amber-500/30 m-4 rounded-2xl flex flex-col justify-between min-h-[580px] print:m-0 print:border-amber-600">
          {/* Subtle Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <ShieldCheck size={400} className="text-amber-400" />
          </div>

          {/* Institutional Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="flex justify-center items-center gap-3 mb-2">
              <div className="p-3 bg-amber-950/80 border border-amber-500/40 rounded-2xl text-amber-400 shadow-inner">
                <Trophy size={36} />
              </div>
            </div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-mono text-amber-400 font-bold">
              Centre of Excellence • Navodaya Institute of Technology
            </h2>
            <h3 className="text-sm font-semibold text-slate-300">
              Navodaya Medical College, Raichur • Department of Microbiology
            </h3>
            <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-3"></div>
          </div>

          {/* Certificate Title & Presentation */}
          <div className="text-center space-y-4 relative z-10 my-6">
            <p className="text-xs uppercase font-mono text-slate-400 tracking-wider">This is to certify that</p>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wide font-serif">
              {certificateData.studentName}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              has successfully completed all levels and clinical decision-making simulations in <br />
              <span className="font-bold text-cyan-400">"TB Quest: Gamified Learning Platform for Tuberculosis Diagnostic Algorithms"</span> <br />
              demonstrating mastery over national pulmonary and pediatric diagnostic pathways.
            </p>
          </div>

          {/* Performance Summary Metrics */}
          <div className="grid grid-cols-3 gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-xl max-w-xl mx-auto text-center font-mono relative z-10">
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Cases Completed</p>
              <p className="text-lg font-bold text-amber-400">{certificateData.casesMastered}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Total XP Score</p>
              <p className="text-lg font-bold text-cyan-400">{certificateData.totalXp} XP</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Diagnostic Accuracy</p>
              <p className="text-lg font-bold text-emerald-400">{certificateData.accuracy}%</p>
            </div>
          </div>

          {/* Signatures & Verification Footnote */}
          <div className="flex justify-between items-end pt-8 relative z-10 border-t border-slate-800/80 mt-6">
            <div className="text-left space-y-1">
              <p className="text-xs font-bold text-slate-200">Dr. Anandkumar Harwalkar</p>
              <p className="text-[11px] text-slate-400 font-mono">Professor, Dept. of Microbiology</p>
              <p className="text-[10px] text-slate-500 font-mono">Navodaya Medical College, Raichur</p>
            </div>

            <div className="text-center space-y-1">
              <div className="w-20 h-20 bg-slate-950 border border-amber-500/30 rounded-xl p-2 mx-auto flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>
              <p className="text-[9px] font-mono text-slate-400">VERIFIED OFFICIAL</p>
            </div>

            <div className="text-right space-y-1 font-mono">
              <p className="text-[11px] text-slate-300">Issue Date: {certificateData.issueDate}</p>
              <p className="text-[10px] text-slate-500">ID: {certificateData.certificateId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
