import React, { useState } from 'react';
import { 
  FileText, Microscope, Activity, CheckCircle2, AlertTriangle, 
  ChevronRight, ShieldAlert, Info, Download, Award, HeartPulse, RefreshCw, Plus, Edit3
} from 'lucide-react';
import { EMRPatient, EMRInvestigationReports, EMROrderedInvestigations } from '../types';
import { evaluateClinicalRules } from '../utils/clinicalDecisionEngine';
import { soundService } from '../services/soundService';

interface EMRInvestigationOrderCenterProps {
  patient: EMRPatient;
  reports: EMRInvestigationReports;
  orderedInvestigations: EMROrderedInvestigations;
  onOrderTest: (testKey: keyof EMROrderedInvestigations) => void;
  onUpdateReport: (updatedReports: EMRInvestigationReports) => void;
  onCompleteAllInvestigations: () => void;
}

export default function EMRInvestigationOrderCenter({
  patient,
  reports,
  orderedInvestigations,
  onOrderTest,
  onUpdateReport,
  onCompleteAllInvestigations
}: EMRInvestigationOrderCenterProps) {
  const [activeTab, setActiveTab] = useState<'order' | 'cxr' | 'smear' | 'cbnaat' | 'culture' | 'blood'>('order');

  // Editable form state for active report mutations
  const [smearGrade, setSmearGrade] = useState<string>(reports.smear?.grade || '2+ Acid-Fast Bacilli (1-10 bacilli/field)');
  const [cbnaatMtb, setCbnaatMtb] = useState<'MTB Detected' | 'MTB Not Detected'>(reports.cbnaat?.mtbStatus === 'MTB Detected' ? 'MTB Detected' : 'MTB Detected');
  const [cbnaatRif, setCbnaatRif] = useState<'Rif Sensitive' | 'Rif Resistant' | 'Rif Indeterminate'>(reports.cbnaat?.rifResistance === 'Rif Resistant' ? 'Rif Resistant' : 'Rif Sensitive');
  const [cxrImpression, setCxrImpression] = useState<string>(reports.cxr?.impression || 'Radiologically Suggestive of Active Pulmonary Tuberculosis (Cavitary Lesion)');

  // Evaluate current dynamic decision engine output
  const currentDiagnosis = evaluateClinicalRules(patient, reports);

  const handleSaveSmearReport = () => {
    soundService.playCorrect();
    const updatedSmear = {
      result: smearGrade.includes('Negative') ? 'AFB NEGATIVE' : 'AFB POSITIVE',
      grade: smearGrade,
      notes: smearGrade.includes('Negative') ? 'No AFB observed in 100 HPF.' : 'Bright red rod-shaped bacilli observed on ZN stain.',
      date: new Date().toISOString().split('T')[0]
    };
    onUpdateReport({ ...reports, smear: updatedSmear });
    setActiveTab('cbnaat');
  };

  const handleSaveCbnaatReport = () => {
    soundService.playCorrect();
    const rifRes: 'N/A' | 'Rif Sensitive' | 'Rif Resistant' | 'Rif Indeterminate' = cbnaatMtb === 'MTB Detected' ? cbnaatRif : 'N/A';
    const updatedCbnaat = {
      mtbStatus: cbnaatMtb,
      rifResistance: rifRes,
      ctValue: cbnaatMtb === 'MTB Detected' ? 'Ct: 18.2 (Medium load)' : 'Ct > 40',
      date: new Date().toISOString().split('T')[0]
    };
    onUpdateReport({ ...reports, cbnaat: updatedCbnaat });
    onCompleteAllInvestigations();
  };

  const handleSaveCxrReport = () => {
    soundService.playCorrect();
    const updatedCxr = {
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
      findings: cxrImpression.includes('Normal') ? 'Clear lung fields without focal consolidation.' : 'Heterogeneous patchy opacities in right upper zone with apical cavitary lesion.',
      impression: cxrImpression,
      date: new Date().toISOString().split('T')[0]
    };
    onUpdateReport({ ...reports, cxr: updatedCxr });
    setActiveTab('smear');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6 text-white font-sans">
      {/* Sub-Header & Live Diagnostic Decision Support Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Hospital Laboratory & Radiology Studio</span>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Activity className="text-cyan-400 shrink-0" size={24} />
            Diagnostic Investigation Order & Report Center
          </h2>
        </div>

        {/* Live Clinical Decision Engine calculated diagnosis badge */}
        <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-1 text-right max-w-sm">
          <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase block">LIVE CLINICAL DECISION ENGINE</span>
          <span className="text-xs font-bold text-white block truncate">{currentDiagnosis.diagnosisTitle}</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <button
          onClick={() => setActiveTab('order')}
          className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-1.5 shrink-0 ${
            activeTab === 'order'
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-md'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Plus size={15} />
          <span>Order Investigations</span>
        </button>

        {orderedInvestigations.cxrOrdered && (
          <button
            onClick={() => setActiveTab('cxr')}
            className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-1.5 shrink-0 ${
              activeTab === 'cxr'
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText size={15} />
            <span>CXR Radiology</span>
          </button>
        )}

        {orderedInvestigations.smearOrdered && (
          <button
            onClick={() => setActiveTab('smear')}
            className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-1.5 shrink-0 ${
              activeTab === 'smear'
                ? 'bg-amber-950 border-amber-400 text-amber-300 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Microscope size={15} />
            <span>Sputum Smear</span>
          </button>
        )}

        {orderedInvestigations.cbnaatOrdered && (
          <button
            onClick={() => setActiveTab('cbnaat')}
            className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-1.5 shrink-0 ${
              activeTab === 'cbnaat'
                ? 'bg-purple-950 border-purple-400 text-purple-300 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity size={15} />
            <span>GeneXpert CBNAAT</span>
          </button>
        )}
      </div>

      {/* TAB 1: ORDER INVESTIGATIONS PANEL */}
      {activeTab === 'order' && (
        <div className="space-y-5">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Select Clinical Diagnostic Orders:</h3>
            <p className="text-xs text-slate-400">Order recommended diagnostic tests per NTEP Pulmonary TB Algorithm.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Order CXR */}
            <button
              onClick={() => {
                onOrderTest('cxrOrdered');
                setActiveTab('cxr');
                soundService.playClick();
              }}
              className={`p-4 rounded-xl border text-left transition-all space-y-1 ${
                orderedInvestigations.cxrOrdered
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-1 ring-cyan-400/40'
                  : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase">Chest Radiography (CXR)</span>
                {orderedInvestigations.cxrOrdered ? <CheckCircle2 size={16} className="text-cyan-400" /> : <Plus size={16} />}
              </div>
              <p className="text-[11px] text-slate-400">Screen for upper lobe cavitations & opacities.</p>
            </button>

            {/* Order Smear */}
            <button
              onClick={() => {
                onOrderTest('smearOrdered');
                setActiveTab('smear');
                soundService.playClick();
              }}
              className={`p-4 rounded-xl border text-left transition-all space-y-1 ${
                orderedInvestigations.smearOrdered
                  ? 'bg-amber-950/80 border-amber-500 text-amber-200 ring-1 ring-amber-400/40'
                  : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase">Sputum AFB Smear Microscopy</span>
                {orderedInvestigations.smearOrdered ? <CheckCircle2 size={16} className="text-amber-400" /> : <Plus size={16} />}
              </div>
              <p className="text-[11px] text-slate-400">Ziehl-Neelsen / LED-FM bacillary grading.</p>
            </button>

            {/* Order CBNAAT */}
            <button
              onClick={() => {
                onOrderTest('cbnaatOrdered');
                setActiveTab('cbnaat');
                soundService.playClick();
              }}
              className={`p-4 rounded-xl border text-left transition-all space-y-1 ${
                orderedInvestigations.cbnaatOrdered
                  ? 'bg-purple-950/80 border-purple-500 text-purple-200 ring-1 ring-purple-400/40'
                  : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase">GeneXpert CBNAAT Assay</span>
                {orderedInvestigations.cbnaatOrdered ? <CheckCircle2 size={16} className="text-purple-400" /> : <Plus size={16} />}
              </div>
              <p className="text-[11px] text-slate-400">Rapid molecular MTB & Rifampicin resistance DST.</p>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: CXR RADIOLOGY REPORT EDITOR */}
      {activeTab === 'cxr' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Radiology Impression Editor</h3>
            
            <div className="space-y-2 text-xs">
              <label className="text-slate-400 font-bold block">Select Radiological Impression:</label>
              <select
                value={cxrImpression}
                onChange={e => setCxrImpression(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Radiologically Suggestive of Active Pulmonary Tuberculosis (Cavitary Lesion)">
                  Radiologically Suggestive of Active Pulmonary TB (Cavitary Upper Zone Opacity)
                </option>
                <option value="Non-Specific Pulmonary Infiltrates without Cavitations">
                  Non-Specific Pulmonary Infiltrates without Cavitations
                </option>
                <option value="Clear Lung Fields (Normal Chest Radiograph)">
                  Clear Lung Fields (Normal Chest Radiograph)
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveCxrReport}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg flex items-center gap-2"
            >
              <span>Save CXR Report & Update Decision Engine</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: SMEAR MICROSCOPY REPORT EDITOR */}
      {activeTab === 'smear' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">AFB Smear Microscopy Result Editor</h3>
            
            <div className="space-y-2 text-xs">
              <label className="text-slate-400 font-bold block">Select Microscopy Grade:</label>
              <select
                value={smearGrade}
                onChange={e => setSmearGrade(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
              >
                <option value="2+ Acid-Fast Bacilli (1-10 bacilli/field)">2+ Acid-Fast Bacilli (1-10 bacilli per field)</option>
                <option value="3+ Acid-Fast Bacilli (> 10 bacilli/field)">3+ Acid-Fast Bacilli (&gt; 10 bacilli per field)</option>
                <option value="1+ Acid-Fast Bacilli (10-100 bacilli/100 fields)">1+ Acid-Fast Bacilli (10-100 bacilli per 100 fields)</option>
                <option value="Scanty (1-9 bacilli/100 fields)">Scanty (1-9 bacilli per 100 fields)</option>
                <option value="Smear Negative (0 bacilli seen in 100 fields)">Smear Negative (0 bacilli seen in 100 fields)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveSmearReport}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg flex items-center gap-2"
            >
              <span>Save Smear Report & Advance to GeneXpert</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: GENEXPERT CBNAAT ASSAY REPORT EDITOR */}
      {activeTab === 'cbnaat' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider">GeneXpert CBNAAT Assay Result Mutator</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">M. Tuberculosis Complex Status:</label>
                <select
                  value={cbnaatMtb}
                  onChange={e => setCbnaatMtb(e.target.value as any)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none font-mono"
                >
                  <option value="MTB Detected">MTB Detected</option>
                  <option value="MTB Not Detected">MTB Not Detected</option>
                </select>
              </div>

              {cbnaatMtb === 'MTB Detected' && (
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Rifampicin Resistance Status:</label>
                  <select
                    value={cbnaatRif}
                    onChange={e => setCbnaatRif(e.target.value as any)}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none font-mono"
                  >
                    <option value="Rif Sensitive">Rifampicin Sensitive (DS-TB)</option>
                    <option value="Rif Resistant">Rifampicin Resistant (MDR-TB PMDT Pathway)</option>
                    <option value="Rif Indeterminate">Rifampicin Indeterminate (Repeat Assay Required)</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveCbnaatReport}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs shadow-lg flex items-center gap-2"
            >
              <span>Save Molecular Assay Report & Execute Decision Engine</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
