export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  level: number;
  xp: number;
  badges: string[];
  streak: number;
  completedCases: number;
  progress: number;
  accuracy: number;
  clinicalReasoningIndex: number;
}

export type CaseType = 'pulmonary' | 'pediatric' | 'mdr' | 'hiv' | 'time-critical' | 'random';
export type CaseDifficulty = 'Level 1: Basic' | 'Level 2: Lab Reader' | 'Level 3: Algorithm' | 'Level 4: Complex' | 'Level 5: Time-Critical';

export interface PatientDemographics {
  name: string;
  age: number;
  gender: string;
  symptoms: string[];
  duration: string;
  riskFactors: string[];
  history: string;
  vitalSigns?: {
    temp: string;
    weight: string;
    spO2: string;
    bmi?: string;
  };
}

export interface LabReport {
  smearMicroscopy?: {
    result: '1+ Positive' | '2+ Positive' | '3+ Positive' | 'Negative' | 'Not Done';
    details: string;
  };
  cbnaat?: {
    mtbStatus: 'MTB Detected' | 'MTB Not Detected' | 'Result Invalid/Error';
    rifResistance: 'Rifampicin Sensitive' | 'Rifampicin Resistant' | 'Rifampicin Indeterminate' | 'N/A';
    errorDetails?: string;
  };
  chestXray?: {
    findings: string;
    impression: string;
    imageUrl?: string;
  };
  tstMantoux?: {
    indurationMm: number;
    interpretation: 'Positive (≥ 10mm)' | 'Positive (≥ 5mm in HIV)' | 'Negative';
  };
  tbScore?: {
    score: number;
    interpretation: string;
  };
  hivStatus?: 'Positive' | 'Negative' | 'Unknown';
}

export interface DecisionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  rationale: string;
  guidelineReference: string;
  nextStepId: string;
  xpBonus: number;
  penalty?: number;
  costEstimate?: string;
}

export interface DecisionStep {
  id: string;
  title: string;
  question: string;
  subtitle: string;
  patientInfo?: PatientDemographics;
  labReport?: LabReport;
  options: DecisionOption[];
  nodeMappingId?: string; // Maps to AlgorithmFlowchart node
}

export interface PatientCase {
  id: string;
  title: string;
  type: CaseType;
  levelNumber: 1 | 2 | 3 | 4 | 5;
  difficulty: CaseDifficulty;
  timeLimitSeconds?: number;
  patient: PatientDemographics;
  initialReport?: LabReport;
  steps: DecisionStep[];
  learningObjectives: string[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  xp: number;
  badges: number;
  accuracy: number;
  institution?: string;
}

export interface AlgorithmDecisionOption {
  id: string;
  label: string;
  targetNodeId: string;
  isRecommended?: boolean;
  rationale?: string;
  guidelineRef?: string;
}

export interface AlgorithmNode {
  id: string;
  label: string;
  category: 'presumptive' | 'investigation' | 'result' | 'treatment' | 'referral' | 'cbnaat' | 'dr-pathway' | 'clinical-pathway' | 'plhiv';
  description: string;
  guidelineNote: string;
  cdcGuideline?: string;
  whoRecommendation?: string;
  ntepGuideline?: string;
  investigationDetails?: string;
  interpretationText?: string;
  learningNotes?: string[];
  imageUrl?: string;
  voiceScript?: string;
  decisionQuestion?: string;
  decisionOptions?: AlgorithmDecisionOption[];
  nextNodes: string[];
  status?: 'active' | 'completed' | 'pending' | 'wrong' | 'current';
  gridPos?: { x: number; y: number };
}

export interface CertificateData {
  studentName: string;
  issueDate: string;
  certificateId: string;
  totalXp: number;
  casesMastered: number;
  accuracy: number;
  institution: string;
}

export interface InvestigationPanelDetails {
  purpose: string;
  procedure: string;
  expectedFindings: string;
  interpretation: string;
  ntepNotes: string;
  clinicalImportance: string;
  referenceImage?: string;
  normalValues: string;
}

export interface DiagnosticCaseOption {
  id: string;
  label: string;
  isCorrect: boolean;
  nextNodeId: string;
  rationale: string;
  guidelineReference: string;
  xpBonus: number;
  penalty?: number;
  costEstimate?: string;
}

export interface DiagnosticCaseNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'start' | 'info' | 'assessment' | 'test' | 'decision' | 'diagnosis' | 'treatment';
  question?: string;
  options?: DiagnosticCaseOption[];
  investigationDetails?: InvestigationPanelDetails;
}

export interface DiagnosticAlgorithmCase {
  id: string;
  title: string;
  subtitle: string;
  type: CaseType;
  difficulty: string;
  patientInfo: {
    name: string;
    age: number;
    gender: string;
    complaint: string;
    duration: string;
    symptoms: string[];
    history: string;
    vitals: {
      temp: string;
      pulse: string;
      bp: string;
      rr: string;
      spO2: string;
      bmi: string;
    };
    riskFactors: string[];
    physicalExam: string;
  };
  nodes: DiagnosticCaseNode[];
  finalOutputs: {
    [key: string]: {
      diagnosis: string;
      reason: string;
      investigationsUsed: string[];
      treatmentRecommendation: string;
      learningSummary: string[];
      badge: string;
    };
  };
}

export type EMRPatientStatus = 'Waiting' | 'In Progress' | 'Under Investigation' | 'Diagnosis Confirmed' | 'Treatment Started' | 'Treatment Completed' | 'Follow-up';

export interface EMRClinicalVitals {
  temp: string;
  pulse: string;
  rr: string;
  bp: string;
  spO2: string;
  weight: string;
  bmi: string;
  generalExam: string;
  respExam: string;
  notes: string;
}

export interface EMRPatient {
  id: string;
  patientCode: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  phone: string;
  address: string;
  occupation: string;
  weight: string;
  height: string;
  bmi: string;
  bloodGroup: string;
  complaint: string;
  duration: string;
  symptoms: string[];
  medicalHistory: string;
  familyHistory: string;
  smoking: string;
  alcohol: string;
  diabetes: string;
  hivStatus: string;
  pregnancyStatus: string;
  drugHistory: string;
  previousTb: string;
  riskFactors: string[];
  vaccinationHistory: string;
  emergencyContact: string;
  photoUrl?: string;
  status: EMRPatientStatus;
  vitals: EMRClinicalVitals;
  createdDate: string;
  assignedDoctor?: string;
}

export interface EMRInvestigationReports {
  cxr?: {
    imageUrl?: string;
    findings: string;
    impression: string;
    date: string;
  };
  smear?: {
    result: string;
    grade: string;
    notes: string;
    date: string;
  };
  cbnaat?: {
    mtbStatus: 'MTB Detected' | 'MTB Not Detected' | 'Result Invalid';
    rifResistance: 'Rif Sensitive' | 'Rif Resistant' | 'Rif Indeterminate' | 'N/A';
    ctValue?: string;
    date: string;
  };
  culture?: {
    result: string;
    species: string;
    date: string;
  };
  lpa?: {
    rifResistance: string;
    inhResistance: string;
    date: string;
  };
  bloodTests?: {
    cbc: string;
    hba1c: string;
    hiv: string;
    date: string;
  };
}

export interface EMRTreatmentDrug {
  name: string;
  dosage: string;
  frequency: string;
}

export interface EMRTreatmentRegimen {
  name: string;
  category: string;
  phase: string;
  drugs: EMRTreatmentDrug[];
  duration: string;
  followUpSchedule: string;
  doctorNotes: string;
}

export interface DynamicDiagnosisResult {
  diagnosisTitle: string;
  category: 'ds_tb' | 'dr_tb' | 'paucibacillary' | 'alternate';
  clinicalReasoning: string;
  evidenceUsed: string[];
  ntepRecommendation: string;
  treatmentRegimen: EMRTreatmentRegimen;
  badge: string;
}

export interface EMROrderedInvestigations {
  cxrOrdered: boolean;
  smearOrdered: boolean;
  cbnaatOrdered: boolean;
  cultureOrdered: boolean;
  lpaOrdered: boolean;
  bloodOrdered: boolean;
  hivOrdered: boolean;
}



