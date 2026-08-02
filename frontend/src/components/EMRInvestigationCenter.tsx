import React, { useState } from 'react';
import { 
  FileText, Microscope, Activity, CheckCircle2, AlertTriangle, 
  ChevronRight, ShieldAlert, Info, Download, Award, HeartPulse, RefreshCw
} from 'lucide-react';
import { EMRPatient, EMRInvestigationReports } from '../types';
import { PRESET_INVESTIGATION_REPORTS } from '../data/emrPatientData';
import { soundService } from '../services/soundService';

interface EMRInvestigationCenterProps {
  patient: EMRPatient;
  activeTestType: 'cxr' | 'smear' | 'cbnaat' | 'culture' | 'blood';
  onCompleteTest: (testType: 'cxr' | 'smear' | 'cbnaat' | 'culture' | 'blood') => void;
}

export default function EMRInvestigationCenter({
  patient,
  activeTestType,
  onCompleteTest
}: EMRInvestigationCenterProps) {
  const reports: EMRInvestigationReports = PRESET_INVESTIGATION_REPORTS[patient.id] || PRESET_INVESTIGATION_REPORTS['pat_001'];

  const handleFinishInvestigation = () => {
    soundService.playCorrect();
    onCompleteTest(activeTestType);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6 text-white">
      {/* 1. CHEST RADIOGRAPHY (CXR) STUDIO */}
      {activeTestType === 'cxr' && (
        <div className="space-y-6">
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                <FileText size={26} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Radiology Digital Imaging Department</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Chest Radiograph (PA View) Studio</h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 rounded-full text-xs font-mono font-bold">
              DATE: {reports.cxr?.date || '2026-08-02'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Radiograph Graphic */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative min-h-[260px] flex items-center justify-center">
              <img 
                src={reports.cxr?.imageUrl || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'} 
                alt="Chest X-Ray Radiograph" 
                className="w-full h-60 object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] font-mono text-cyan-300 bg-slate-950/90 px-2.5 py-1 rounded border border-cyan-500/30">
                  DIGITAL PA RADIOGRAPH • APICAL VIEW
                </span>
              </div>
            </div>

            {/* Radiologist Report */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4 text-xs">
              <h4 className="font-bold text-cyan-300 uppercase tracking-wider">Radiological Anatomical Findings</h4>
              <p className="text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                {reports.cxr?.findings}
              </p>
              
              <div className="p-3 bg-slate-900 border border-cyan-500/40 rounded-lg space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Radiologist Impression</span>
                <span className="text-cyan-300 font-bold block text-sm">
                  {reports.cxr?.impression}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                <strong className="text-amber-300">NTEP Clinical Standard Note:</strong>
                <p>Chest X-Ray provides anatomical localization (cavitations, upper zone infiltrates) but requires microbiological validation via Sputum Microscopy and CBNAAT.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleFinishInvestigation}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2"
            >
              <span>Confirm CXR Review & Advance Workflow</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 2. SPUTUM SMEAR MICROSCOPY LAB */}
      {activeTestType === 'smear' && (
        <div className="space-y-6">
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                <Microscope size={26} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Designated Microscopy Centre (DMC)</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Sputum AFB Smear Microscopy Report</h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-950 border border-amber-500/40 text-amber-300 rounded-full text-xs font-mono font-bold">
              LAB ID: ZN-2024-884
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono border-b border-slate-900 pb-3">
              <div>
                <span className="text-slate-500 block text-[10px]">Stain Method:</span>
                <span className="text-amber-300 font-bold">Ziehl-Neelsen (ZN) & LED-FM</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Specimen Quality:</span>
                <span className="text-emerald-400 font-bold">Adequate (Purulent Sputum)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Grading Scale:</span>
                <span className="text-slate-200 font-bold">RNTCP/NTEP Standard</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Microscopist:</span>
                <span className="text-slate-300">Sr. Tech L. Sharma</span>
              </div>
            </div>

            {/* Main Microscopy Result */}
            <div className="p-4 bg-slate-900 rounded-xl border border-amber-500/40 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">AFB Microscopy Result</span>
                <h3 className="text-2xl font-black text-white mt-0.5">{reports.smear?.result} ({reports.smear?.grade})</h3>
                <p className="text-xs text-slate-400 mt-1">{reports.smear?.notes}</p>
              </div>
              <div className="px-4 py-2.5 bg-amber-950 border border-amber-500/40 text-amber-300 font-mono font-bold rounded-xl text-xs shrink-0">
                {reports.smear?.result}
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
              <h5 className="font-bold text-cyan-300 uppercase tracking-wider">Clinical Guidance</h5>
              <p className="text-slate-300 leading-relaxed">
                Microscopy assesses infectivity and bacillary burden. Under NTEP guidelines, ALL presumptive TB cases (smear positive or negative) MUST undergo CBNAAT molecular testing to establish MTB complex presence and check Rifampicin resistance upfront.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleFinishInvestigation}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black rounded-xl text-xs shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2"
            >
              <span>Confirm Microscopy Report & Proceed to CBNAAT</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 3. GENEXPERT CBNAAT MOLECULAR ASSAY */}
      {activeTestType === 'cbnaat' && (
        <div className="space-y-6">
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold shrink-0">
                <Activity size={26} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">National Reference Molecular Laboratory</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">CBNAAT / GeneXpert Molecular Assay Report</h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-purple-950 border border-purple-500/40 text-purple-300 rounded-full text-xs font-mono font-bold">
              RUN ID: #GX-9021
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono border-b border-slate-900 pb-3">
              <div>
                <span className="text-slate-500 block text-[10px]">Assay Cartridge:</span>
                <span className="text-purple-300 font-bold">Xpert MTB/RIF Ultra</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Target Genes:</span>
                <span className="text-slate-200 font-bold">IS6110 / IS1081 & rpoB</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Detection Limit:</span>
                <span className="text-emerald-400 font-bold">16 CFU / mL</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Probe Ct Values:</span>
                <span className="text-slate-300 font-mono">{reports.cbnaat?.ctValue || 'Ct: 18.2'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* MTB Status */}
              <div className="p-4 bg-slate-900 rounded-xl border border-purple-500/40 space-y-2">
                <span className="text-[10px] font-mono text-purple-300 font-bold uppercase">M. Tuberculosis Complex Status</span>
                <h3 className="text-xl font-black text-white">{reports.cbnaat?.mtbStatus}</h3>
                <span className="inline-block px-2.5 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded text-[11px] font-mono font-bold">
                  MOLECULAR TEST POSITIVE
                </span>
              </div>

              {/* Rif Resistance Status */}
              <div className="p-4 bg-slate-900 rounded-xl border border-cyan-500/40 space-y-2">
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">Rifampicin Resistance Status</span>
                <h3 className="text-xl font-black text-white">{reports.cbnaat?.rifResistance}</h3>
                <span className={`inline-block px-2.5 py-1 border rounded text-[11px] font-mono font-bold ${
                  reports.cbnaat?.rifResistance === 'Rif Resistant' 
                    ? 'bg-rose-950 border-rose-500/40 text-rose-300'
                    : 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
                }`}>
                  {reports.cbnaat?.rifResistance === 'Rif Resistant' ? 'SWITCH TO PMDT DR-TB PATHWAY' : '1ST LINE DS-TB REGIMEN INDICATED'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-purple-950/60 border border-purple-500/30 rounded-xl text-xs text-purple-100 space-y-1">
              <h5 className="font-bold text-purple-300 uppercase tracking-wider text-[10px]">NTEP Mandatory Protocol</h5>
              <p className="leading-relaxed text-[11px]">
                Register case on Nikshay portal. If Rifampicin resistance is detected, refer immediately to PMDT Nodal Centre for All-Oral Bedaquiline-containing DR-TB regimen and Line Probe Assay (LPA) testing.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleFinishInvestigation}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2"
            >
              <span>Confirm CBNAAT Result & Advance Workflow</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 4. LIQUID CULTURE (MGIT) & LPA LAB */}
      {activeTestType === 'culture' && (
        <div className="space-y-6">
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                <Microscope size={26} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Advanced Mycobacteriology Reference Lab</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Liquid Culture (MGIT 960) & Line Probe Assay (LPA)</h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-mono font-bold">
              CULTURE ID: #MGIT-8812
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4 text-xs">
            <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/40 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">MGIT 960 Liquid Culture Status</span>
              <h3 className="text-xl font-black text-white">{reports.culture?.result || 'POSITIVE for M. tuberculosis complex (Isolated at 10 days)'}</h3>
              <p className="text-slate-300">{reports.culture?.species}</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">Line Probe Assay (LPA) Genotypic DST</span>
              <p className="text-slate-200"><strong>Rifampicin Resistance:</strong> {reports.lpa?.rifResistance || 'Sensitive'}</p>
              <p className="text-slate-200"><strong>Isoniazid Resistance:</strong> {reports.lpa?.inhResistance || 'Sensitive'}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleFinishInvestigation}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs shadow-lg flex items-center gap-2"
            >
              <span>Confirm Culture Result & Return to Workflow</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 5. BLOOD TESTS & HIV PANEL */}
      {activeTestType === 'blood' && (
        <div className="space-y-6">
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-950 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold shrink-0">
                <HeartPulse size={26} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">Central Pathology Laboratory</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">Hematology & HIV Screening Panel</h2>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Complete Blood Count (CBC):</span>
                <span className="text-slate-200 font-bold">{reports.bloodTests?.cbc || 'Hb: 11.4 g/dL, WBC: 11,200'}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">HbA1c Blood Sugar:</span>
                <span className="text-cyan-300 font-bold">{reports.bloodTests?.hba1c || '5.4% (Non-Diabetic)'}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">HIV Rapid Test 1 & 2:</span>
                <span className="text-emerald-400 font-bold">{reports.bloodTests?.hiv || 'Non-Reactive'}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleFinishInvestigation}
              className="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-extrabold rounded-xl text-xs shadow-lg flex items-center gap-2"
            >
              <span>Confirm Blood Panel & Return to Workflow</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
