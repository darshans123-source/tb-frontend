import React, { useState } from 'react';
import { 
  UserCheck, Layers, FileText, Pill, Printer, ArrowLeft, 
  Award, Stethoscope, Activity, CheckCircle2, ShieldAlert, Info, Plus
} from 'lucide-react';
import { 
  EMRPatient, EMRInvestigationReports, EMROrderedInvestigations, EMRTreatmentRegimen 
} from '../types';
import { INITIAL_EMR_PATIENTS, PRESET_INVESTIGATION_REPORTS } from '../data/emrPatientData';
import { evaluateClinicalRules } from '../utils/clinicalDecisionEngine';
import PatientManagementModule from './PatientManagementModule';
import EMRClinicalWorkflowCanvas, { EMRWorkflowStepId } from './EMRClinicalWorkflowCanvas';
import EMRInvestigationOrderCenter from './EMRInvestigationOrderCenter';
import EMRTreatmentManager from './EMRTreatmentManager';
import EMRFinalReportView from './EMRFinalReportView';
import ToastNotification, { ToastMessage } from './ToastNotification';
import { soundService } from '../services/soundService';
import { supabaseData } from '../services/supabaseData';

interface HospitalEMREngineProps {
  currentUserId?: string | null;
  onFinishCase: (score: number, xp: number, badge?: string) => void;
  onBack: () => void;
}

export default function HospitalEMREngine({
  currentUserId,
  onFinishCase,
  onBack
}: HospitalEMREngineProps) {
  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Patient Registry State
  const [patients, setPatients] = useState<EMRPatient[]>(INITIAL_EMR_PATIENTS);
  const [activePatient, setActivePatient] = useState<EMRPatient | null>(null);

  // Active Main Tab: 'patients' | 'vitals' | 'investigations' | 'decision' | 'treatment' | 'report'
  const [activeTab, setActiveTab] = useState<'patients' | 'vitals' | 'investigations' | 'decision' | 'treatment' | 'report'>('patients');

  // Ordered Investigations State
  const [orderedInvestigations, setOrderedInvestigations] = useState<EMROrderedInvestigations>({
    cxrOrdered: true,
    smearOrdered: true,
    cbnaatOrdered: true,
    cultureOrdered: false,
    lpaOrdered: false,
    bloodOrdered: true,
    hivOrdered: fontTrue()
  });

  function fontTrue() { return true; }

  // Lab Investigation Reports State (Live Mutatable)
  const [reports, setReports] = useState<EMRInvestigationReports>(PRESET_INVESTIGATION_REPORTS['pat_001']);

  // Workflow steps tracking: GREEN (completed), BLUE (active), GRAY (locked)
  const [activeWorkflowStepId, setActiveWorkflowStepId] = useState<EMRWorkflowStepId>('presumptive');
  const [completedWorkflowStepIds, setCompletedWorkflowStepIds] = useState<EMRWorkflowStepId[]>(['presumptive']);

  // Assigned Treatment
  const [assignedRegimen, setAssignedRegimen] = useState<EMRTreatmentRegimen | null>(null);

  // Score & XP
  const [score, setScore] = useState(150);
  const [xpEarned, setXpEarned] = useState(200);

  // Live Deterministic Decision Support Evaluation
  const evaluatedDiagnosis = activePatient 
    ? evaluateClinicalRules(activePatient, reports)
    : evaluateClinicalRules(INITIAL_EMR_PATIENTS[0], reports);

  const handleSelectPatient = (patient: EMRPatient) => {
    setActivePatient(patient);
    const patReports = PRESET_INVESTIGATION_REPORTS[patient.id] || PRESET_INVESTIGATION_REPORTS['pat_001'];
    setReports(patReports);
    setActiveWorkflowStepId('assessment');
    setCompletedWorkflowStepIds(['presumptive', 'assessment']);
    setActiveTab('vitals');
    addToast('info', 'Patient Selected', `Opened dossier for ${patient.name} (${patient.patientCode})`);
  };

  const handleAddNewPatient = (newPatient: EMRPatient) => {
    setPatients(prev => [newPatient, ...prev]);
    addToast('success', 'Patient Registered', `Successfully added ${newPatient.name} to Nikshay Registry.`);
  };

  const handleOrderTest = (testKey: keyof EMROrderedInvestigations) => {
    setOrderedInvestigations(prev => ({ ...prev, [testKey]: true }));
    soundService.playClick();
    addToast('info', 'Investigation Ordered', 'Lab order sent to hospital diagnostic studio.');
  };

  const handleUpdateReports = (updatedReports: EMRInvestigationReports) => {
    setReports(updatedReports);
    soundService.playCorrect();
    addToast('success', 'Lab Report Updated', 'Clinical Decision Engine recalculated diagnostic pathway.');
  };

  const handleCompleteAllInvestigations = () => {
    setCompletedWorkflowStepIds(prev => Array.from(new Set([
      ...prev, 'cxr', 'smear', 'cbnaat', 'mtb_status', 'diagnosis'
    ])));
    setActiveWorkflowStepId('diagnosis');
    setActiveTab('decision');
    addToast('success', 'Workup Complete', 'Evaluated diagnostic rules against all lab evidence.');
  };

  const handleAssignTreatment = (regimen: EMRTreatmentRegimen) => {
    setAssignedRegimen(regimen);
    setCompletedWorkflowStepIds(prev => Array.from(new Set([...prev, 'treatment', 'final_report'])));
    setActiveWorkflowStepId('final_report');
    setActiveTab('report');
    addToast('success', 'Regimen Prescribed', `Assigned ${regimen.name}. Duration: ${regimen.duration}`);
  };

  const handleFinalCaseComplete = async () => {
    soundService.playTrophy();
    const finalScore = score + 250;
    const finalXp = xpEarned + 350;
    const badge = evaluatedDiagnosis.badge || 'Hospital EMR Clinical Specialist';

    onFinishCase(finalScore, finalXp, badge);

    if (currentUserId && activePatient) {
      await supabaseData.saveQuizResult(
        currentUserId,
        'pulmonary',
        finalScore,
        finalXp,
        180
      );
      await supabaseData.saveAchievement(currentUserId, badge);
    }

    onBack();
  };

  return (
    <div className="p-3 sm:p-6 pb-24 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-between text-white font-sans space-y-5">
      {/* Top Hospital EMR Navigation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded-full text-[10px] sm:text-xs font-mono uppercase font-bold">
              Hospital EMR System
            </span>
            {activePatient && (
              <span className="px-2.5 py-0.5 bg-purple-950 text-purple-300 border border-purple-500/30 rounded-full text-[10px] sm:text-xs font-mono font-bold">
                Active: {activePatient.name} ({activePatient.patientCode})
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Stethoscope className="text-cyan-400 shrink-0" size={24} />
            TB Quest Hospital Clinical EMR Engine
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-300 font-bold">
            <Award size={16} />
            <span>SCORE: {score}</span>
          </div>
          <button
            onClick={() => {
              soundService.playClick();
              onBack();
            }}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>Exit EMR</span>
          </button>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
        <button
          onClick={() => {
            setActiveTab('patients');
            soundService.playClick();
          }}
          className={`px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'patients'
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-lg'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck size={16} />
          <span>1. Patient Registry</span>
        </button>

        {activePatient && (
          <>
            <button
              onClick={() => {
                setActiveTab('vitals');
                soundService.playClick();
              }}
              className={`px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'vitals'
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity size={16} />
              <span>2. Vitals & Clinical Exam</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('investigations');
                soundService.playClick();
              }}
              className={`px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'investigations'
                  ? 'bg-purple-950 border-purple-400 text-purple-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText size={16} />
              <span>3. Order & Lab Reports</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('decision');
                soundService.playClick();
              }}
              className={`px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'decision'
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers size={16} />
              <span>4. Clinical Decision Support</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('treatment');
                soundService.playClick();
              }}
              className={`px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'treatment'
                  ? 'bg-blue-950 border-blue-400 text-blue-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Pill size={16} />
              <span>5. Treatment Manager</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('report');
                soundService.playClick();
              }}
              className={`px-4 py-2.5 rounded-xl border font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'report'
                  ? 'bg-amber-950 border-amber-400 text-amber-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Printer size={16} />
              <span>6. Final EMR Report</span>
            </button>
          </>
        )}
      </div>

      {/* TAB 1: PATIENT REGISTRY */}
      {activeTab === 'patients' && (
        <PatientManagementModule
          patients={patients}
          onSelectPatient={handleSelectPatient}
          onAddNewPatient={handleAddNewPatient}
        />
      )}

      {/* TAB 2: CLINICAL EXAMINATION & VITALS ENTRY */}
      {activeTab === 'vitals' && activePatient && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex justify-between items-start border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Clinical Examination</span>
              <h2 className="text-xl font-black text-white">{activePatient.name} Dossier & Vitals</h2>
            </div>
            <span className="px-3 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 rounded-full text-xs font-mono font-bold">
              PATIENT CODE: {activePatient.patientCode}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <h4 className="font-bold text-cyan-300 uppercase tracking-wider">Recorded Vitals</h4>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Temperature:</span>
                  <span className="text-amber-300 font-bold">{activePatient.vitals.temp}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Pulse Rate:</span>
                  <span className="text-cyan-300 font-bold">{activePatient.vitals.pulse}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Blood Pressure:</span>
                  <span className="text-slate-200 font-bold">{activePatient.vitals.bp}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">SpO2 / BMI:</span>
                  <span className="text-emerald-300 font-bold">{activePatient.vitals.spO2} / {activePatient.vitals.bmi}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <h4 className="font-bold text-emerald-300 uppercase tracking-wider">Physical Auscultation & Examination</h4>
              <p className="text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                {activePatient.vitals.respExam}
              </p>
              <p className="text-slate-400 text-[11px]">{activePatient.vitals.notes}</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                soundService.playCorrect();
                setCompletedWorkflowStepIds(prev => Array.from(new Set([...prev, 'assessment', 'cxr'])));
                setActiveWorkflowStepId('cxr');
                setActiveTab('investigations');
              }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs shadow-lg"
            >
              Save Vitals & Proceed to Lab Investigation Orders
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER & LAB REPORTS */}
      {activeTab === 'investigations' && activePatient && (
        <EMRInvestigationOrderCenter
          patient={activePatient}
          reports={reports}
          orderedInvestigations={orderedInvestigations}
          onOrderTest={handleOrderTest}
          onUpdateReport={handleUpdateReports}
          onCompleteAllInvestigations={handleCompleteAllInvestigations}
        />
      )}

      {/* TAB 4: CLINICAL DECISION SUPPORT PANEL */}
      {activeTab === 'decision' && activePatient && (
        <div className="space-y-6">
          <EMRClinicalWorkflowCanvas
            patient={activePatient}
            activeStepId={activeWorkflowStepId}
            completedStepIds={completedWorkflowStepIds}
            onSelectStep={stepId => {
              if (stepId === 'treatment') setActiveTab('treatment');
              if (stepId === 'final_report') setActiveTab('report');
            }}
          />

          {/* Evaluated Clinical Rule Result Card */}
          <div className="bg-slate-900/90 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Dynamic Rule Engine Output</span>
                <h3 className="text-xl font-black text-white">{evaluatedDiagnosis.diagnosisTitle}</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-mono font-bold">
                CONFIRMED VIA LAB EVIDENCE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-cyan-300 uppercase tracking-wider">Clinical Reasoning</h4>
                <p className="text-slate-300 leading-relaxed">{evaluatedDiagnosis.clinicalReasoning}</p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-300 uppercase tracking-wider">Evaluated Evidence</h4>
                <ul className="space-y-1">
                  {evaluatedDiagnosis.evidenceUsed.map((ev, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
              <h4 className="font-bold text-purple-300 uppercase tracking-wider">WHO & NTEP Protocol Recommendation</h4>
              <p className="text-slate-200 leading-relaxed">{evaluatedDiagnosis.ntepRecommendation}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  soundService.playCorrect();
                  setActiveTab('treatment');
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs shadow-lg"
              >
                Proceed to Treatment Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TREATMENT MANAGER */}
      {activeTab === 'treatment' && activePatient && (
        <EMRTreatmentManager
          patient={activePatient}
          onAssignTreatment={handleAssignTreatment}
        />
      )}

      {/* TAB 6: FINAL EMR REPORT */}
      {activeTab === 'report' && activePatient && (
        <EMRFinalReportView
          patient={activePatient}
          assignedRegimen={assignedRegimen}
          onFinishCase={handleFinalCaseComplete}
        />
      )}

      {/* Enterprise Toast Feedback Banner */}
      <ToastNotification toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
