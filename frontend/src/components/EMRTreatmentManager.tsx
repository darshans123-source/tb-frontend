import React, { useState } from 'react';
import { 
  Stethoscope, CheckCircle2, Award, ChevronRight, ShieldAlert, 
  FileText, Clock, AlertTriangle, Pill, HeartPulse
} from 'lucide-react';
import { EMRPatient, EMRTreatmentRegimen } from '../types';
import { STANDARD_TREATMENT_REGIMENS } from '../data/emrPatientData';
import { soundService } from '../services/soundService';

interface EMRTreatmentManagerProps {
  patient: EMRPatient;
  onAssignTreatment: (regimen: EMRTreatmentRegimen) => void;
}

export default function EMRTreatmentManager({
  patient,
  onAssignTreatment
}: EMRTreatmentManagerProps) {
  const defaultRegimenKey = patient.id === 'pat_002' ? 'dr_tb' : 'ds_tb';
  const [selectedRegimenKey, setSelectedRegimenKey] = useState<'ds_tb' | 'dr_tb'>(defaultRegimenKey);
  const activeRegimen = STANDARD_TREATMENT_REGIMENS[selectedRegimenKey];
  const [doctorNotes, setDoctorNotes] = useState(activeRegimen.doctorNotes);

  const handleConfirmRegimen = () => {
    soundService.playCorrect();
    onAssignTreatment({
      ...activeRegimen,
      doctorNotes
    });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6 text-white">
      <div className="flex justify-between items-start border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold shrink-0">
            <Pill size={26} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">NTEP Clinical Treatment Protocols</span>
            <h2 className="text-xl sm:text-2xl font-black text-white">Treatment Assignment & Prescription Generator</h2>
          </div>
        </div>
        <span className="px-3 py-1 bg-purple-950 border border-purple-500/40 text-purple-300 rounded-full text-xs font-mono font-bold">
          PATIENT: {patient.name} ({patient.patientCode})
        </span>
      </div>

      {/* Regimen Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => {
            setSelectedRegimenKey('ds_tb');
            setDoctorNotes(STANDARD_TREATMENT_REGIMENS.ds_tb.doctorNotes);
            soundService.playClick();
          }}
          className={`p-4 rounded-xl border text-left transition-all space-y-1 ${
            selectedRegimenKey === 'ds_tb'
              ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-mono font-bold uppercase block text-emerald-400">Standard 1st Line ATT</span>
          <h4 className="text-sm font-bold text-white">Drug-Sensitive TB Regimen (2HRZE / 4HRE)</h4>
          <p className="text-xs text-slate-400">Daily weight-banded FDCs for 6 months.</p>
        </button>

        <button
          onClick={() => {
            setSelectedRegimenKey('dr_tb');
            setDoctorNotes(STANDARD_TREATMENT_REGIMENS.dr_tb.doctorNotes);
            soundService.playClick();
          }}
          className={`p-4 rounded-xl border text-left transition-all space-y-1 ${
            selectedRegimenKey === 'dr_tb'
              ? 'bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500/40 shadow-lg'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] font-mono font-bold uppercase block text-rose-400">PMDT DR-TB Protocol</span>
          <h4 className="text-sm font-bold text-white">All-Oral Shorter Bedaquiline Regimen</h4>
          <p className="text-xs text-slate-400">BDQ + Lfx + Cfz + Z + E + Hh + Eto for 9-11 months.</p>
        </button>
      </div>

      {/* Regimen Details Table */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4 text-xs">
        <div className="flex justify-between items-center border-b border-slate-900 pb-3">
          <div>
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">{activeRegimen.category}</span>
            <h3 className="text-lg font-black text-white">{activeRegimen.name}</h3>
          </div>
          <span className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 font-mono font-bold rounded-lg">
            Duration: {activeRegimen.duration}
          </span>
        </div>

        {/* Drug Breakdown Table */}
        <div className="space-y-2">
          <h5 className="font-bold text-cyan-300 uppercase tracking-wider">Weight-Banded Drug Breakdown</h5>
          <div className="space-y-1.5 font-mono">
            {activeRegimen.drugs.map((drug, idx) => (
              <div key={idx} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold text-xs">{drug.name}</span>
                  <span className="text-slate-500 text-[10px] block">{drug.frequency}</span>
                </div>
                <span className="px-2.5 py-1 bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold rounded text-xs">
                  {drug.dosage}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Schedule */}
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <h5 className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">Follow-Up & Adherence Monitoring</h5>
          <p className="text-slate-300 leading-relaxed text-[11px]">{activeRegimen.followUpSchedule}</p>
        </div>

        {/* Doctor Clinical Notes */}
        <div>
          <label className="font-bold text-purple-300 uppercase tracking-wider block mb-1">Prescribing Doctor Notes</label>
          <textarea
            rows={3}
            value={doctorNotes}
            onChange={e => setDoctorNotes(e.target.value)}
            className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-purple-500 text-xs font-sans resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={handleConfirmRegimen}
          className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2"
        >
          <span>Assign Treatment Regimen & Advance Workflow</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
