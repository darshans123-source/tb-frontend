import { EMRPatient, EMRInvestigationReports, DynamicDiagnosisResult } from '../types';
import { STANDARD_TREATMENT_REGIMENS } from '../data/emrPatientData';

export function evaluateClinicalRules(
  patient: EMRPatient,
  reports: EMRInvestigationReports
): DynamicDiagnosisResult {
  const evidenceList: string[] = [];

  // Gather available evidence
  const hasCxrSuggestive = reports.cxr?.impression.toLowerCase().includes('suggestive') || reports.cxr?.findings.toLowerCase().includes('cavitary');
  const hasSmearPositive = reports.smear?.result.toUpperCase().includes('POSITIVE') || (reports.smear?.grade && !reports.smear.grade.includes('Negative'));
  const cbnaatMtbDetected = reports.cbnaat?.mtbStatus === 'MTB Detected';
  const cbnaatRifResistant = reports.cbnaat?.rifResistance === 'Rif Resistant';
  const cbnaatRifSensitive = reports.cbnaat?.rifResistance === 'Rif Sensitive';
  const culturePositive = reports.culture?.result.toUpperCase().includes('POSITIVE');

  if (patient.symptoms && patient.symptoms.length > 0) {
    evidenceList.push(`Clinical Symptoms: ${patient.symptoms.slice(0, 3).join(', ')} (${patient.duration})`);
  }

  if (reports.cxr) {
    evidenceList.push(`Chest X-Ray: ${reports.cxr.impression}`);
  }

  if (reports.smear) {
    evidenceList.push(`Sputum Smear Microscopy: ${reports.smear.result} (${reports.smear.grade})`);
  }

  if (reports.cbnaat) {
    evidenceList.push(`CBNAAT / GeneXpert Assay: ${reports.cbnaat.mtbStatus} (${reports.cbnaat.rifResistance})`);
  }

  if (reports.culture) {
    evidenceList.push(`MGIT Liquid Culture: ${reports.culture.result}`);
  }

  // RULE 1: DRUG RESISTANT TB (CBNAAT MTB Detected + Rif Resistant)
  if (cbnaatMtbDetected && cbnaatRifResistant) {
    return {
      diagnosisTitle: 'Microbiologically Confirmed Rifampicin-Resistant / Drug-Resistant Pulmonary TB (RR-TB / MDR-TB)',
      category: 'dr_tb',
      clinicalReasoning: `Patient presented with chronic respiratory symptoms. GeneXpert CBNAAT confirmed presence of M. tuberculosis DNA with rpoB gene mutation conferring Rifampicin resistance.`,
      evidenceUsed: evidenceList,
      ntepRecommendation: `Immediate referral to PMDT Nodal Centre. Mandatory baseline QTc ECG, LFT, KFT, and 1st & 2nd line Line Probe Assay (LPA) to rule out Fluoroquinolone resistance (pre-XDR TB).`,
      treatmentRegimen: STANDARD_TREATMENT_REGIMENS.dr_tb,
      badge: 'DR-TB PMDT Specialist'
    };
  }

  // RULE 2: DRUG SENSITIVE TB (CBNAAT MTB Detected + Rif Sensitive OR Smear Pos + CXR Suggestive)
  if (cbnaatMtbDetected && cbnaatRifSensitive) {
    return {
      diagnosisTitle: 'Microbiologically Confirmed Drug-Sensitive Pulmonary Tuberculosis (DS-TB)',
      category: 'ds_tb',
      clinicalReasoning: `Patient presented with chronic productive cough and systemic symptoms. Sputum microscopy and GeneXpert CBNAAT confirmed MTB complex with documented Rifampicin sensitivity.`,
      evidenceUsed: evidenceList,
      ntepRecommendation: `Initiate daily weight-banded 4-FDC (HRZE) Intensive Phase for 2 months, followed by 3-FDC (HRE) Continuation Phase for 4 months. Universal Nikshay registration.`,
      treatmentRegimen: STANDARD_TREATMENT_REGIMENS.ds_tb,
      badge: 'Pulmonary Diagnostic Master'
    };
  }

  // RULE 3: PAUCIBACILLARY TB (CBNAAT Negative or Culture Positive or High Clinical Suspicion with CXR Suggestive)
  if (culturePositive || (hasCxrSuggestive && !cbnaatMtbDetected)) {
    return {
      diagnosisTitle: 'Microbiologically Confirmed (Liquid Culture) / Clinically Diagnosed Pulmonary Tuberculosis',
      category: 'paucibacillary',
      clinicalReasoning: `Initial rapid molecular test was negative/paucibacillary, but Chest X-Ray revealed upper lobe fibrocavitary infiltrates and MGIT Liquid Culture isolated M. tuberculosis complex.`,
      evidenceUsed: evidenceList,
      ntepRecommendation: `Initiate standard 6-month daily FDC ATT regimen (2HRZE / 4HRE). Schedule follow-up liquid culture at 2 months.`,
      treatmentRegimen: STANDARD_TREATMENT_REGIMENS.ds_tb,
      badge: 'Diagnostic Logic Specialist'
    };
  }

  // RULE 4: ALTERNATIVE DIAGNOSIS (All Reports Normal / Negative)
  return {
    diagnosisTitle: 'Alternative Non-Tubercular Respiratory Infection (Community-Acquired Pneumonia)',
    category: 'alternate',
    clinicalReasoning: `Diagnostic workup for Tuberculosis (Smear Microscopy & CBNAAT) returned negative. Chest X-Ray does not demonstrate characteristic apical cavitary lesions.`,
    evidenceUsed: evidenceList,
    ntepRecommendation: `Treat for Non-TB bacterial respiratory infection with broad-spectrum oral antibiotics (Amoxicillin-Clavulanate 625mg BD for 7-10 days). Reassess in 2 weeks if symptoms persist.`,
    treatmentRegimen: {
      name: 'Empirical Antibiotic & Bronchodilator Regimen for Non-TB Pneumonia',
      category: 'Non-Tubercular Pulmonary Infection',
      phase: '7-10 Days Outpatient Therapy',
      drugs: [
        { name: 'Tab Amoxicillin + Clavulanic Acid', dosage: '625 mg twice daily', frequency: 'Oral after food' },
        { name: 'Tab Azithromycin', dosage: '500 mg once daily', frequency: 'Oral for 5 days' },
        { name: 'Syr Levosalbutamol + Ambroxol', dosage: '10 ml thrice daily', frequency: 'Oral after food' }
      ],
      duration: '7 to 10 Days',
      followUpSchedule: 'Clinical review after 14 days. Repeat Sputum CBNAAT if cough persists > 4 weeks.',
      doctorNotes: 'Advise steam inhalation, hydration, and tobacco cessation.'
    },
    badge: 'Clinical Differential Expert'
  };
}
