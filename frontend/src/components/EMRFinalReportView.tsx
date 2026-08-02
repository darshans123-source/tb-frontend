import React from 'react';
import { 
  FileText, Printer, Download, CheckCircle2, Award, 
  Stethoscope, Clock, ShieldAlert, HeartPulse, User, ChevronRight, Activity
} from 'lucide-react';
import { EMRPatient, EMRInvestigationReports, EMRTreatmentRegimen } from '../types';
import { PRESET_INVESTIGATION_REPORTS, STANDARD_TREATMENT_REGIMENS } from '../data/emrPatientData';
import { soundService } from '../services/soundService';

interface EMRFinalReportViewProps {
  patient: EMRPatient;
  assignedRegimen?: EMRTreatmentRegimen | null;
  onFinishCase: () => void;
}

export default function EMRFinalReportView({
  patient,
  assignedRegimen,
  onFinishCase
}: EMRFinalReportViewProps) {
  const reports = PRESET_INVESTIGATION_REPORTS[patient.id] || PRESET_INVESTIGATION_REPORTS['pat_001'];
  const regimen = assignedRegimen || (patient.id === 'pat_002' ? STANDARD_TREATMENT_REGIMENS.dr_tb : STANDARD_TREATMENT_REGIMENS.ds_tb);

  const handlePrintReport = () => {
    soundService.playClick();
    window.print();
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-white max-w-4xl mx-auto font-sans">
      {/* Report Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Skill Development Center, NIT Raichur • EMR Discharge Summary</span>
          <h2 className="text-2xl font-black text-white">Official Pulmonary TB Clinical Case Report</h2>
          <p className="text-xs text-slate-400">Nikshay Registry Notification Standard • Case #{patient.patientCode}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrintReport}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700"
          >
            <Printer size={15} />
            <span>Print EMR Report</span>
          </button>
        </div>
      </div>

      {/* Printable EMR Document Content */}
      <div className="space-y-6 print:text-black print:bg-white print:p-4">
        {/* Patient Information Grid */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-500 text-[10px] block uppercase font-bold">Patient Name:</span>
            <span className="text-white font-bold text-sm">{patient.name}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase font-bold">Age / Gender:</span>
            <span className="text-slate-200 font-bold">{patient.age} Yrs ({patient.gender})</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase font-bold">Patient ID:</span>
            <span className="text-purple-300 font-bold">{patient.patientCode}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase font-bold">Date of Report:</span>
            <span className="text-slate-300">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Diagnostic Conclusion Banner */}
        <div className="p-5 bg-slate-950 border border-emerald-500/50 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Final Diagnostic Confirmation</span>
          <h3 className="text-xl font-black text-white">
            {patient.id === 'pat_002'
              ? 'Microbiologically Confirmed Rifampicin-Resistant Pulmonary TB (RR-TB / MDR-TB)'
              : 'Microbiologically Confirmed Drug-Sensitive Pulmonary TB (DS-TB)'}
          </h3>
        </div>

        {/* Clinical Reasoning & Complaint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <h4 className="font-bold text-cyan-300 uppercase tracking-wider">Chief Complaint & Vitals</h4>
            <p className="text-slate-300">"{patient.complaint}" ({patient.duration})</p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
              <span className="text-slate-400">Temp: <strong className="text-amber-300">{patient.vitals.temp}</strong></span>
              <span className="text-slate-400">SpO2: <strong className="text-cyan-300">{patient.vitals.spO2}</strong></span>
              <span className="text-slate-400">BMI: <strong className="text-emerald-300">{patient.vitals.bmi}</strong></span>
              <span className="text-slate-400">BP: <strong className="text-slate-200">{patient.vitals.bp}</strong></span>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <h4 className="font-bold text-purple-300 uppercase tracking-wider">Diagnostic Reasoning Summary</h4>
            <p className="text-slate-300 leading-relaxed">
              Patient presented with chronic symptoms. Radiological findings (CXR apical infiltrates/cavitation) combined with Ziehl-Neelsen sputum AFB microscopy and GeneXpert CBNAAT molecular assay established bacteriological confirmation and drug susceptibility status.
            </p>
          </div>
        </div>

        {/* Executed Investigations Summary */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs">
          <h4 className="font-bold text-amber-300 uppercase tracking-wider">Laboratory & Imaging Log</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">CXR RADIOLOGY:</span>
              <span className="text-slate-200 font-bold">{reports.cxr?.impression || 'Suggestive of TB'}</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">SMEAR MICROSCOPY:</span>
              <span className="text-amber-300 font-bold">{reports.smear?.result || 'AFB Positive'}</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">CBNAAT MOLECULAR:</span>
              <span className="text-purple-300 font-bold">{reports.cbnaat?.mtbStatus} ({reports.cbnaat?.rifResistance})</span>
            </div>
          </div>
        </div>

        {/* Treatment Prescription */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-emerald-300 uppercase tracking-wider">Assigned NTEP Treatment Prescription</h4>
            <span className="text-slate-400 font-mono text-[10px]">Duration: {regimen.duration}</span>
          </div>

          <div className="space-y-1.5 font-mono text-[11px]">
            {regimen.drugs.map((d, i) => (
              <div key={i} className="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between">
                <span>{d.name} ({d.frequency})</span>
                <span className="text-cyan-300 font-bold">{d.dosage}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-[11px] pt-1">
            <strong>Notes:</strong> {regimen.doctorNotes}
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={onFinishCase}
          className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all"
        >
          Complete Clinical Case & Return to Registry
        </button>
      </div>
    </div>
  );
}
