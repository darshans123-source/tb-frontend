import { AlgorithmNode } from '../types';

export interface AlgorithmFlowchartData {
  id: string;
  title: string;
  subtitle: string;
  pdfReference: string;
  nodes: AlgorithmNode[];
}

export class AlgorithmFlowcharts {
  static pulmonaryTB: AlgorithmFlowchartData = {
    id: 'pulmonary',
    title: 'Diagnostic Algorithm for Pulmonary Tuberculosis',
    subtitle: 'NTEP Standard Guideline (Smear, CBNAAT, CXR, HIV Status & Rif Resistance)',
    pdfReference: 'Page 21 & 23 - Concept Note Annexure',
    nodes: [
      {
        id: 'node_presumptive',
        label: 'Presumptive TB Patient',
        category: 'presumptive',
        description: 'Cough ≥ 2 weeks, fever, night sweats, weight loss, hemoptysis, or chest pain.',
        guidelineNote: 'Offer HIV counseling & testing to all presumptive cases. Do not delay TB diagnostic workup.',
        nextNodes: ['node_smear', 'node_cxr', 'node_plhiv']
      },
      {
        id: 'node_plhiv',
        label: 'PLHIV (HIV Positive)',
        category: 'presumptive',
        description: 'People Living with HIV presenting with any TB symptom.',
        guidelineNote: 'Priority access to CBNAAT. High suspicion for extrapulmonary and smear-negative TB.',
        nextNodes: ['node_cbnaat']
      },
      {
        id: 'node_smear',
        label: 'Smear Microscopy',
        category: 'investigation',
        description: 'Ziehl-Neelsen or Fluorescence Microscopy on 2 sputum samples.',
        guidelineNote: 'Smear positive requires rapid molecular testing for drug resistance (CBNAAT/Xpert).',
        nextNodes: ['node_smear_pos_cxr_pos', 'node_smear_pos_cxr_neg', 'node_smear_neg_cxr_pos', 'node_smear_neg_cxr_neg']
      },
      {
        id: 'node_cxr',
        label: 'Chest X-Ray (CXR)',
        category: 'investigation',
        description: 'Radiological imaging for apical infiltrates, cavities, hilar adenopathy.',
        guidelineNote: 'CXR abnormality with smear negative requires CBNAAT confirmation.',
        nextNodes: ['node_cbnaat', 'node_clinical_suspicion']
      },
      {
        id: 'node_smear_pos_cxr_pos',
        label: 'Smear (+) & CXR Suggestive',
        category: 'result',
        description: 'Microscopy positive with chest radiograph suggestive of TB.',
        guidelineNote: 'High PMDT criteria setting -> Mandatory CBNAAT for Rifampicin resistance detection.',
        nextNodes: ['node_cbnaat']
      },
      {
        id: 'node_smear_pos_cxr_neg',
        label: 'Smear (+) & CXR Non-Suggestive',
        category: 'result',
        description: 'Microscopy positive but CXR not suggestive of typical pulmonary TB.',
        guidelineNote: 'CBNAAT required to confirm M. tuberculosis complex vs Nontuberculous Mycobacteria (MOTT).',
        nextNodes: ['node_cbnaat']
      },
      {
        id: 'node_smear_neg_cxr_pos',
        label: 'Smear (-) & CXR Suggestive',
        category: 'result',
        description: 'Microscopy negative but CXR shows characteristic TB lesions.',
        guidelineNote: 'CBNAAT essential to detect low-bacillary load pulmonary TB.',
        nextNodes: ['node_cbnaat']
      },
      {
        id: 'node_smear_neg_cxr_neg',
        label: 'Smear (-) & CXR Normal / Not Available',
        category: 'result',
        description: 'Normal imaging and negative microscopy in symptomatic patient.',
        guidelineNote: 'Assess clinical suspicion level. If high suspicion, proceed to CBNAAT or specialist review.',
        nextNodes: ['node_clinical_suspicion']
      },
      {
        id: 'node_cbnaat',
        label: 'CBNAAT / Xpert MTB/RIF',
        category: 'investigation',
        description: 'Cartridge-based nucleic acid amplification test (real-time PCR).',
        guidelineNote: 'Detects MTB DNA and rpoB gene mutations conferring Rifampicin resistance in 2 hours.',
        nextNodes: ['node_rif_sensitive', 'node_rif_indeterminate', 'node_rif_resistant', 'node_mtb_not_detected']
      },
      {
        id: 'node_rif_sensitive',
        label: 'MTB Detected, Rif Sensitive',
        category: 'result',
        description: 'M. tuberculosis detected without Rifampicin resistance mutation.',
        guidelineNote: 'Microbiologically Confirmed TB. Initiate 1st-line ATT regimen (2HRZE / 4HRE).',
        nextNodes: ['node_first_line_att']
      },
      {
        id: 'node_rif_indeterminate',
        label: 'MTB Detected, Rif Indeterminate',
        category: 'result',
        description: 'MTB detected but Rif resistance result is unclear/indeterminate.',
        guidelineNote: 'Repeat CBNAAT on fresh 2nd sputum sample or send for Liquid Culture / Line Probe Assay.',
        nextNodes: ['node_repeat_cbnaat']
      },
      {
        id: 'node_repeat_cbnaat',
        label: 'Repeat CBNAAT / LPA / Liquid Culture',
        category: 'investigation',
        description: 'Second confirmatory molecular test or liquid culture (MGIT).',
        guidelineNote: 'Clarifies drug sensitivity status before modifying regimen.',
        nextNodes: ['node_rif_sensitive', 'node_rif_resistant']
      },
      {
        id: 'node_rif_resistant',
        label: 'MTB Detected, Rif Resistant (RR-TB)',
        category: 'result',
        description: 'M. tuberculosis detected with Rifampicin resistance mutation.',
        guidelineNote: 'Refer to PMDT nodal center for 2nd-line DST (LPA for Fluoroquinolones & Second-line injectables). Initiate MDR-TB regimen.',
        nextNodes: ['node_mdr_referral']
      },
      {
        id: 'node_mtb_not_detected',
        label: 'MTB Not Detected',
        category: 'result',
        description: 'CBNAAT negative for M. tuberculosis DNA.',
        guidelineNote: 'Evaluate for alternate diagnoses (bacterial pneumonia, fungal infection, malignancy, bronchiectasis).',
        nextNodes: ['node_clinical_suspicion']
      },
      {
        id: 'node_clinical_suspicion',
        label: 'Clinical Suspicion Assessment',
        category: 'presumptive',
        description: 'Multidisciplinary evaluation of clinical symptoms, risk factors, and trial of non-TB antibiotics.',
        guidelineNote: 'If clinical suspicion remains high despite negative tests, consult specialist panel for Clinically Diagnosed TB.',
        nextNodes: ['node_clinically_diagnosed_tb', 'node_alternate_diagnosis']
      },
      {
        id: 'node_first_line_att',
        label: '1st Line Anti-TB Treatment',
        category: 'treatment',
        description: 'Standard 6-month regimen: Isoniazid, Rifampicin, Pyrazinamide, Ethambutol.',
        guidelineNote: 'If HIV positive, start CPT immediately and initiate ART within 2 to 8 weeks of ATT.',
        nextNodes: []
      },
      {
        id: 'node_mdr_referral',
        label: 'Refer to PMDT (MDR-TB Regimen)',
        category: 'referral',
        description: 'Programmatic Management of Drug Resistant TB nodal center.',
        guidelineNote: 'Initiate Shorter or All-Oral Bedaquiline-containing MDR-TB regimen based on 2nd-line DST.',
        nextNodes: []
      },
      {
        id: 'node_clinically_diagnosed_tb',
        label: 'Clinically Diagnosed TB',
        category: 'treatment',
        description: 'Diagnosis based on strong clinical evidence, radiology, and failure to respond to broad-spectrum antibiotics.',
        guidelineNote: 'Initiate 1st line ATT and monitor closely for clinical response.',
        nextNodes: ['node_first_line_att']
      },
      {
        id: 'node_alternate_diagnosis',
        label: 'Alternate Diagnosis & Management',
        category: 'treatment',
        description: 'Treat for non-TB pulmonary condition (pneumonia, asthma, COPD, bronchiectasis).',
        guidelineNote: 'Re-evaluate if symptoms persist or deteriorate.',
        nextNodes: []
      }
    ]
  };

  static pediatricTB: AlgorithmFlowchartData = {
    id: 'pediatric',
    title: 'Pediatric Tuberculosis Diagnostic Pathway',
    subtitle: 'NTEP Pediatric Diagnostic Algorithm (Molecular Testing, CXR, TST, TB Score & Contact History)',
    pdfReference: 'Page 22 - Concept Note Annexure',
    nodes: [
      {
        id: 'pnode_start',
        label: 'Child with ≥ 1 TB Symptom',
        category: 'presumptive',
        description: 'Unexplained fever/cough > 2 weeks, weight loss/failure to thrive, lethargy, or contact with active TB.',
        guidelineNote: 'Collect sputum, induced sputum, or gastric aspirate for rapid molecular testing (Xpert MTB/RIF).',
        nextNodes: ['pnode_sputum_collect']
      },
      {
        id: 'pnode_sputum_collect',
        label: 'Rapid Molecular Test (Xpert MTB/RIF)',
        category: 'investigation',
        description: 'Xpert testing on sputum, gastric aspirate, or nasopharyngeal aspirate.',
        guidelineNote: 'Determines whether microbiological confirmation is achieved.',
        nextNodes: ['pnode_mtb_pos', 'pnode_mtb_neg', 'pnode_sputum_unavailable']
      },
      {
        id: 'pnode_mtb_pos',
        label: 'MTB Detected',
        category: 'result',
        description: 'Molecular confirmation of M. tuberculosis complex.',
        guidelineNote: 'Confirmed Pediatric TB. Initiate pediatric anti-TB treatment immediately.',
        nextNodes: ['pnode_anti_tb']
      },
      {
        id: 'pnode_mtb_neg',
        label: 'MTB Not Detected',
        category: 'result',
        description: 'Molecular test negative or low bacillary load.',
        guidelineNote: 'Assess access to Chest X-ray and Tuberculin Skin Test (TST/Mantoux).',
        nextNodes: ['pnode_access_cxr_tst', 'pnode_no_access']
      },
      {
        id: 'pnode_sputum_unavailable',
        label: 'Sputum / Sample Not Available',
        category: 'result',
        description: 'Young child unable to produce sputum and aspirate unavailable.',
        guidelineNote: 'Proceed with radiological, immunological, and contact assessment.',
        nextNodes: ['pnode_access_cxr_tst', 'pnode_no_access']
      },
      {
        id: 'pnode_access_cxr_tst',
        label: 'Access to CXR and/or TST Available',
        category: 'investigation',
        description: 'Perform Chest X-Ray and Mantoux TST (5 TU PPD). Calculate Pediatric TB Score.',
        guidelineNote: 'Evaluate clinical TB score matrix: symptoms, malnutrition, radiological lesions, TST induration.',
        nextNodes: ['pnode_score_high', 'pnode_score_low']
      },
      {
        id: 'pnode_score_high',
        label: 'TB Score ≥ 6',
        category: 'result',
        description: 'High composite score indicative of active pediatric tuberculosis.',
        guidelineNote: 'Initiate Pediatric Anti-TB Treatment.',
        nextNodes: ['pnode_anti_tb']
      },
      {
        id: 'pnode_score_low',
        label: 'TB Score < 6',
        category: 'result',
        description: 'Low composite score needing contact and TST status correlation.',
        guidelineNote: 'Check household TB contact history and TST result.',
        nextNodes: ['pnode_contact_pos', 'pnode_contact_neg']
      },
      {
        id: 'pnode_contact_pos',
        label: 'Contact (+) OR TST (+)',
        category: 'result',
        description: 'Documented exposure to active TB index case OR positive Mantoux induration (≥ 10mm).',
        guidelineNote: 'High clinical suspicion in vulnerable child. Initiate Pediatric Anti-TB treatment.',
        nextNodes: ['pnode_anti_tb']
      },
      {
        id: 'pnode_contact_neg',
        label: 'Contact (-) AND TST (-)',
        category: 'result',
        description: 'No known TB contact and negative Mantoux test.',
        guidelineNote: 'Observe for 2 weeks with broad-spectrum antibiotics (avoid quinolones/rifampicin). Re-evaluate.',
        nextNodes: ['pnode_observe']
      },
      {
        id: 'pnode_no_access',
        label: 'NO Access to CXR and/or TST',
        category: 'investigation',
        description: 'Peripheral/resource-limited health facility without imaging or TST reagents.',
        guidelineNote: 'Assess for history of household TB contact.',
        nextNodes: ['pnode_no_access_contact_yes', 'pnode_no_access_contact_no']
      },
      {
        id: 'pnode_no_access_contact_yes',
        label: 'TB Contact = YES',
        category: 'result',
        description: 'Child lives with diagnosed pulmonary TB patient.',
        guidelineNote: 'Initiate Pediatric Anti-TB treatment.',
        nextNodes: ['pnode_anti_tb']
      },
      {
        id: 'pnode_no_access_contact_no',
        label: 'TB Contact = NO',
        category: 'result',
        description: 'No exposure history documented.',
        guidelineNote: 'Observe for 2 weeks, and treat for TB if symptoms persist.',
        nextNodes: ['pnode_observe']
      },
      {
        id: 'pnode_observe',
        label: 'Observe 2 Weeks & Re-evaluate',
        category: 'treatment',
        description: 'Trial of supportive care and non-TB antibiotic. Monitor weight and symptoms.',
        guidelineNote: 'If symptoms persist after 2 weeks, initiate Anti-TB Treatment or refer to higher center.',
        nextNodes: ['pnode_anti_tb']
      },
      {
        id: 'pnode_anti_tb',
        label: 'Pediatric Anti-TB Treatment',
        category: 'treatment',
        description: 'Weight-band based pediatric FDC (Fixed Dose Combination) regimen (HRZE/HRE).',
        guidelineNote: 'Monitor weight gain, liver function, and compliance monthly.',
        nextNodes: []
      }
    ]
  };
}
