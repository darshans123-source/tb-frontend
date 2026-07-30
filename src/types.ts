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

export interface AlgorithmNode {
  id: string;
  label: string;
  category: 'presumptive' | 'investigation' | 'result' | 'treatment' | 'referral';
  description: string;
  guidelineNote: string;
  nextNodes: string[];
  status?: 'active' | 'completed' | 'pending';
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
