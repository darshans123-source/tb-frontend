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
    title: 'Pulmonary Tuberculosis Diagnostic Algorithm',
    subtitle: 'NTEP Standard Guideline (Smear, CBNAAT/Xpert, CXR, HIV Status & Rifampicin Resistance)',
    pdfReference: 'NTEP Guidelines 2024 / WHO Consolidated Guidelines Module 3',
    nodes: [
      {
        id: 'node_start',
        label: 'Presumptive TB Patient',
        category: 'presumptive',
        description: 'Patient presenting with cough ≥ 2 weeks, fever, night sweats, unexplained weight loss, hemoptysis, or chest pain.',
        guidelineNote: 'Promptly triage every presumptive case. Offer HIV testing & screening to all patients.',
        cdcGuideline: 'CDC Core Curriculum: Evaluate all individuals with persistent cough > 2-3 weeks for active pulmonary TB, especially in high-burden or high-risk settings.',
        whoRecommendation: 'WHO 2024 Module 3: Rapid molecular diagnostics (CBNAAT/Xpert) are recommended as the initial diagnostic test in all individuals with signs and symptoms of TB.',
        ntepGuideline: 'NTEP Standard (India): All presumptive TB patients must undergo clinical assessment, HIV testing, and rapid molecular diagnostics / microscopy.',
        investigationDetails: 'Primary screening involves thorough clinical history, duration of symptoms, contact history, and physical examination.',
        interpretationText: 'High clinical suspicion if 2 or more cardinal symptoms (cough, fever, weight loss, night sweats) are present.',
        learningNotes: [
          'Cough > 2 weeks is the classical symptom, but immunocompromised or elderly patients may present with atypical symptoms.',
          'Always inquire about household or occupational exposure to known TB cases.',
          'Assess for diabetes mellitus, malnutrition, smoking, and immunosuppressive therapies.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Welcome to the Pulmonary TB Diagnostic Algorithm. Start by selecting whether the patient is a Person Living with HIV or a General Patient.',
        decisionQuestion: 'Step 1: Patient Stratification - Select Patient Category',
        decisionOptions: [
          {
            id: 'opt_plhiv',
            label: 'PLHIV (HIV Positive Patient)',
            targetNodeId: 'node_plhiv',
            isRecommended: true,
            rationale: 'PLHIV require direct priority access to rapid molecular testing (CBNAAT) regardless of smear result due to high rate of smear-negative TB.',
            guidelineRef: 'NTEP PLHIV Priority Protocol'
          },
          {
            id: 'opt_general',
            label: 'General Patient (HIV Negative / Unknown)',
            targetNodeId: 'node_clinical_assess',
            isRecommended: true,
            rationale: 'General patients proceed to initial clinical assessment, sputum microscopy, and Chest X-ray.',
            guidelineRef: 'NTEP General Diagnostic Pathway'
          }
        ],
        nextNodes: ['node_plhiv', 'node_clinical_assess'],
        gridPos: { x: 500, y: 50 }
      },
      {
        id: 'node_plhiv',
        label: 'PLHIV Diagnostic Pathway',
        category: 'plhiv',
        description: 'Person Living with HIV presenting with any TB symptom (cough, fever, weight loss, night sweats).',
        guidelineNote: 'Priority access to CBNAAT / Ultra. High suspicion for extrapulmonary and smear-negative pulmonary TB.',
        cdcGuideline: 'CDC HIV/TB Guidelines: Perform rapid nucleic acid amplification testing on all HIV-positive individuals with presumptive TB. Start CPT immediately.',
        whoRecommendation: 'WHO 2024: Xpert MTB/RIF Ultra is strongly recommended as the initial diagnostic test for PLHIV due to superior sensitivity in paucibacillary samples.',
        ntepGuideline: 'NTEP Direct Access: All PLHIV presumptive cases are offered CBNAAT directly as the first-line test. Sputum smear should not delay CBNAAT.',
        investigationDetails: 'Collect 1 fresh sputum sample for immediate CBNAAT. Also perform Chest X-Ray and CD4 count evaluation.',
        interpretationText: 'Immunosuppression masks classical cavity formation on CXR; atypical lower lobe or interstitial infiltrates are common.',
        learningNotes: [
          'Smear microscopy sensitivity drops below 40% in severe HIV immunosuppression.',
          'Start Co-trimoxazole Prophylaxis Therapy (CPT) immediately upon identification.',
          'Antiretroviral Therapy (ART) should be initiated within 2-8 weeks of Anti-TB Treatment.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'In PLHIV patients, rapid molecular testing via CBNAAT is the mandatory first-line test. Sputum microscopy alone is insufficient.',
        decisionQuestion: 'Perform Upfront CBNAAT for PLHIV',
        decisionOptions: [
          {
            id: 'opt_plhiv_cbnaat',
            label: 'Perform Priority CBNAAT / Xpert Test',
            targetNodeId: 'node_cbnaat',
            isRecommended: true,
            rationale: 'Upfront CBNAAT delivers rapid confirmation of M. tuberculosis and Rifampicin resistance status.',
            guidelineRef: 'NTEP Module 4 - PLHIV Standard'
          }
        ],
        nextNodes: ['node_cbnaat'],
        gridPos: { x: 200, y: 180 }
      },
      {
        id: 'node_clinical_assess',
        label: 'Clinical Assessment & Workup',
        category: 'presumptive',
        description: 'Comprehensive clinical history, physical examination, symptom score, and baseline investigations.',
        guidelineNote: 'Evaluate vital signs, respiratory distress, cervical lymphadenopathy, and body mass index (BMI).',
        cdcGuideline: 'CDC Guidelines: Physical exam findings may include fever, rales, bronchial breath sounds, or signs of pleural effusion.',
        whoRecommendation: 'WHO Recommendation: Standardized clinical evaluation combined with radiology and laboratory testing accelerates diagnosis.',
        ntepGuideline: 'NTEP Protocol: Order mandatory parallel initial investigations: Sputum Smear Microscopy and Chest X-Ray (CXR).',
        investigationDetails: 'Physical examination focusing on chest auscultation, lymph node palpation, and nutritional status assessment.',
        interpretationText: 'Clinical score helps differentiate acute bacterial pneumonia from chronic mycobacterial pulmonary disease.',
        learningNotes: [
          'Duration of symptoms > 14 days strongly points towards TB over typical community-acquired pneumonia.',
          'Chest auscultation may be normal early in disease despite active pulmonary lesions.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Proceeding to Step 2: Clinical Assessment. Sputum microscopy and Chest X-Ray will be performed simultaneously.',
        decisionQuestion: 'Step 2: Proceed to Screening Investigations (Smear Microscopy & CXR)',
        decisionOptions: [
          {
            id: 'opt_perform_tests',
            label: 'Perform Sputum Smear Microscopy & Chest X-Ray',
            targetNodeId: 'node_screening_tests',
            isRecommended: true,
            rationale: 'Combined microscopy and digital chest radiography provide fast diagnostic triage.',
            guidelineRef: 'NTEP Primary Diagnostic Workflow'
          }
        ],
        nextNodes: ['node_screening_tests'],
        gridPos: { x: 800, y: 180 }
      },
      {
        id: 'node_screening_tests',
        label: 'Smear Microscopy & CXR Screening',
        category: 'investigation',
        description: 'Ziehl-Neelsen (ZN) or LED-Fluorescence Microscopy (2 sputum samples) and Digital Chest Radiograph.',
        guidelineNote: 'Smear microscopy detects Acid-Fast Bacilli (AFB). CXR assesses structural pulmonary parenchyma.',
        cdcGuideline: 'CDC Guidance: AFB smear provides quick visualization of infectious status (1+, 2+, 3+ grade), though molecular testing remains gold standard.',
        whoRecommendation: 'WHO 2024: Chest X-ray increases diagnostic sensitivity when combined with bacteriological confirmation.',
        ntepGuideline: 'NTEP Standard: Both smear positive and smear negative patients with suggestive radiographs require CBNAAT testing.',
        investigationDetails: 'Spot and morning sputum samples examined for AFB. CXR evaluated for upper lobe infiltrates, cavities, or consolidation.',
        interpretationText: 'Correlate smear positivity grade with radiologic extensive vs non-extensive disease.',
        learningNotes: [
          'LED Fluorescence Microscopy is 10% more sensitive than classical ZN staining and faster to read.',
          'Upper lobe apical and posterior segment infiltrates with cavitation are classic post-primary TB signs.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Review the combined findings of the Sputum Smear Microscopy and Chest X-Ray to determine the branch outcome.',
        decisionQuestion: 'Step 3: Select Combined Smear & CXR Results',
        decisionOptions: [
          {
            id: 'opt_smear_pos_cxr_pos',
            label: 'Smear (+) Positive & CXR Suggestive of TB',
            targetNodeId: 'node_smear_pos_cxr_pos',
            isRecommended: true,
            rationale: 'Microbiologically suspicious AFB smear with characteristic radiological cavitary/infiltrative disease.',
            guidelineRef: 'NTEP Branch 1'
          },
          {
            id: 'opt_smear_pos_cxr_neg',
            label: 'Smear (+) Positive & CXR Non-Suggestive / Normal',
            targetNodeId: 'node_smear_pos_cxr_neg',
            isRecommended: false,
            rationale: 'Positive AFB smear with atypical radiology requires CBNAAT to confirm M. tuberculosis vs NTM (Non-tuberculous Mycobacteria).',
            guidelineRef: 'NTEP Branch 2'
          },
          {
            id: 'opt_smear_neg_cxr_pos',
            label: 'Smear (-) Negative & CXR Suggestive of TB',
            targetNodeId: 'node_smear_neg_cxr_pos',
            isRecommended: true,
            rationale: 'Smear-negative pulmonary TB suspected. Rapid molecular test (CBNAAT) is mandatory.',
            guidelineRef: 'NTEP Branch 3'
          },
          {
            id: 'opt_smear_neg_cxr_neg',
            label: 'Smear (-) Negative & CXR Normal / Non-Suggestive',
            targetNodeId: 'node_smear_neg_cxr_neg',
            isRecommended: false,
            rationale: 'Negative screening tests. Requires clinical evaluation for high suspicion vs alternate respiratory conditions.',
            guidelineRef: 'NTEP Branch 4'
          }
        ],
        nextNodes: ['node_smear_pos_cxr_pos', 'node_smear_pos_cxr_neg', 'node_smear_neg_cxr_pos', 'node_smear_neg_cxr_neg'],
        gridPos: { x: 800, y: 320 }
      },
      {
        id: 'node_smear_pos_cxr_pos',
        label: 'Smear (+) & CXR Suggestive',
        category: 'result',
        description: 'Microscopy positive for Acid-Fast Bacilli with chest radiograph showing TB lesions.',
        guidelineNote: 'Mandatory CBNAAT testing required for drug-resistance (Rifampicin resistance) screening.',
        cdcGuideline: 'CDC Core Curriculum: Confirmed acid-fast bacilli on smear with classic CXR requires immediate rapid drug-susceptibility testing.',
        whoRecommendation: 'WHO Policy: Perform upfront molecular testing (Xpert MTB/RIF) to exclude Rifampicin resistance prior to standard regimen.',
        ntepGuideline: 'NTEP Mandate: Universal Drug Susceptibility Testing (UDST) for all smear-positive cases via CBNAAT.',
        investigationDetails: 'Sputum sample routed directly to CBNAAT cartridge testing.',
        interpretationText: 'High bacterial load present. Patient is highly infectious; initiate respiratory isolation precautions.',
        learningNotes: [
          'Even in smear-positive cases, initial CBNAAT is essential to catch primary Rifampicin resistance early.',
          'Prompt isolation reduces community transmission.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Smear positive and CXR suggestive branch. Route sample to CBNAAT for rapid species and Rifampicin resistance detection.',
        decisionQuestion: 'Proceed to CBNAAT / Xpert Molecular Testing',
        decisionOptions: [
          {
            id: 'opt_cbnaat_from_pos_pos',
            label: 'Perform CBNAAT / Xpert MTB/RIF Assay',
            targetNodeId: 'node_cbnaat',
            isRecommended: true,
            rationale: 'CBNAAT confirms M. tuberculosis complex DNA and detects rpoB mutation causing Rifampicin resistance within 2 hours.',
            guidelineRef: 'NTEP UDST Standard'
          }
        ],
        nextNodes: ['node_cbnaat'],
        gridPos: { x: 550, y: 460 }
      },
      {
        id: 'node_smear_pos_cxr_neg',
        label: 'Smear (+) & CXR Non-Suggestive',
        category: 'result',
        description: 'Microscopy positive but CXR does not show characteristic pulmonary TB features.',
        guidelineNote: 'Must rule out Nontuberculous Mycobacteria (NTM/MOTT) or early endobronchial disease.',
        cdcGuideline: 'CDC Guidelines: AFB smear positivity with normal chest radiograph necessitates molecular identification (NAAT) to differentiate M. tuberculosis from environmental NTM.',
        whoRecommendation: 'WHO Recommendation: Use Xpert MTB/RIF to confirm M. tuberculosis complex identity.',
        ntepGuideline: 'NTEP Protocol: Submit sample to CBNAAT. If MTB not detected, consider NTM species identification and culture.',
        investigationDetails: 'CBNAAT testing to verify M. tuberculosis complex target sequence (IS6110 / rpoB).',
        interpretationText: 'If CBNAAT detects MTB, diagnose Pulmonary TB. If CBNAAT negative, suspect NTM species (e.g. M. avium complex).',
        learningNotes: [
          'NTM organisms stain positive on Ziehl-Neelsen smear but do not contain M. tuberculosis DNA.',
          'Endobronchial TB can present with normal parenchymal CXR but positive sputum.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Smear positive with non-suggestive CXR. Perform CBNAAT to differentiate M. tuberculosis from Non-tuberculous Mycobacteria.',
        decisionQuestion: 'Perform CBNAAT for Molecular Differential',
        decisionOptions: [
          {
            id: 'opt_cbnaat_from_pos_neg',
            label: 'Perform CBNAAT / Xpert Assay',
            targetNodeId: 'node_cbnaat',
            isRecommended: true,
            rationale: 'Differentiates M. tuberculosis complex from NTM.',
            guidelineRef: 'NTEP Diagnostic Differential'
          }
        ],
        nextNodes: ['node_cbnaat'],
        gridPos: { x: 750, y: 460 }
      },
      {
        id: 'node_smear_neg_cxr_pos',
        label: 'Smear (-) & CXR Suggestive',
        category: 'result',
        description: 'Microscopy negative for AFB, but CXR shows characteristic pulmonary lesions.',
        guidelineNote: 'Smear-negative pulmonary TB suspected. CBNAAT is required for diagnosis.',
        cdcGuideline: 'CDC Core Curriculum: Up to 30-40% of culture-confirmed pulmonary TB cases are smear-negative. NAAT testing is vital.',
        whoRecommendation: 'WHO Guideline: Rapid molecular test (Xpert Ultra) has high diagnostic yield in smear-negative culture-positive cases.',
        ntepGuideline: 'NTEP Standard: Smear (-) with CXR (+) must undergo CBNAAT. Do not start empirical ATT without CBNAAT.',
        investigationDetails: 'Cartridge-based PCR testing (CBNAAT) on fresh morning sputum sample.',
        interpretationText: 'Smear negative indicates paucibacillary load (bacterial concentration < 5,000 bacilli/mL).',
        learningNotes: [
          'Xpert MTB/RIF Ultra has a limit of detection of ~16 CFU/mL compared to ~5,000 CFU/mL for AFB smear.',
          'Early intervention prevents extensive lung parenchymal destruction.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Smear negative with CXR suggestive of TB. CBNAAT is essential to detect paucibacillary pulmonary tuberculosis.',
        decisionQuestion: 'Perform CBNAAT for Smear-Negative Case',
        decisionOptions: [
          {
            id: 'opt_cbnaat_from_neg_pos',
            label: 'Perform CBNAAT / Xpert Assay',
            targetNodeId: 'node_cbnaat',
            isRecommended: true,
            rationale: 'Molecular amplification detects low bacterial loads missed by microscopy.',
            guidelineRef: 'NTEP Smear-Negative Protocol'
          }
        ],
        nextNodes: ['node_cbnaat'],
        gridPos: { x: 950, y: 460 }
      },
      {
        id: 'node_smear_neg_cxr_neg',
        label: 'Smear (-) & CXR Normal',
        category: 'result',
        description: 'Both microscopy and initial chest radiography are negative / non-suggestive.',
        guidelineNote: 'Assess clinical suspicion level. Evaluate for non-TB infections vs mild/early TB.',
        cdcGuideline: 'CDC Guidance: If clinical suspicion is high, repeat diagnostic workup, consider CT scan, or send sample for liquid culture.',
        whoRecommendation: 'WHO Guideline: Evaluate symptom duration, risk factors, immunosuppression, and response to broad-spectrum non-TB antibiotics.',
        ntepGuideline: 'NTEP Protocol: Re-evaluate clinical suspicion. If suspicion remains high, proceed to CBNAAT or specialist review.',
        investigationDetails: 'Assess trial of broad-spectrum non-quinolone antibiotics (e.g. Amoxicillin-Clavulanate) for 7-14 days.',
        interpretationText: 'Resolution of symptoms with broad-spectrum antibiotics points to non-TB bacterial pneumonia.',
        learningNotes: [
          'Never use fluoroquinolones (levofloxacin/moxifloxacin) or rifampicin during an antibiotic trial, as they partially treat TB and obscure diagnosis.',
          'If symptoms persist despite non-TB antibiotics, reassess clinical suspicion for TB.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Smear negative and CXR normal. Evaluate clinical suspicion level to decide between CBNAAT or non-TB antibiotic trial.',
        decisionQuestion: 'Clinical Suspicion Assessment for Smear (-) CXR (-) Patient',
        decisionOptions: [
          {
            id: 'opt_high_suspicion_cbnaat',
            label: 'High Suspicion / High-Risk Case -> Perform CBNAAT',
            targetNodeId: 'node_cbnaat',
            isRecommended: true,
            rationale: 'High-risk case (contact history, immunocompromised, severe weight loss) warrants rapid molecular testing.',
            guidelineRef: 'NTEP High Suspicion Route'
          },
          {
            id: 'opt_low_suspicion_clinical',
            label: 'Moderate/Low Suspicion -> Clinical Suspicion Assessment',
            targetNodeId: 'node_clinical_suspicion',
            isRecommended: false,
            rationale: 'Evaluate for alternate non-TB pulmonary conditions with trial of broad-spectrum antibiotics.',
            guidelineRef: 'NTEP Differential Assessment'
          }
        ],
        nextNodes: ['node_cbnaat', 'node_clinical_suspicion'],
        gridPos: { x: 1150, y: 460 }
      },
      {
        id: 'node_cbnaat',
        label: 'CBNAAT / Xpert MTB/RIF Module',
        category: 'cbnaat',
        description: 'Cartridge-Based Nucleic Acid Amplification Test (Real-time automated PCR).',
        guidelineNote: 'Simultaneously detects M. tuberculosis complex DNA and rpoB gene mutations conferring Rifampicin resistance in ~2 hours.',
        cdcGuideline: 'CDC Core Curriculum: NAAT is the gold standard diagnostic for rapid MTB detection and initial Rifampicin resistance profiling.',
        whoRecommendation: 'WHO Consolidated Module 3: Automated real-time PCR (Xpert MTB/RIF or Ultra) provides rapid confirmation with high specificity (>98%).',
        ntepGuideline: 'NTEP National Guideline: CBNAAT is deployed across all district centers in India as the cornerstone of TB diagnosis.',
        investigationDetails: 'Sputum mixed with sample reagent, incubated 15 mins, loaded into single-use cartridge, and processed automatically.',
        interpretationText: 'Results generated: MTB Detected (High/Medium/Low/Very Low) or MTB Not Detected; Rif Resistance Sensitive / Resistant / Indeterminate.',
        learningNotes: [
          'Ultra cartridge includes IS1081 and IS6110 insertion sequences for ultra-sensitive detection (16 CFU/mL).',
          'Rifampicin resistance serves as a surrogate marker for Multidrug-Resistant TB (MDR-TB) in >90% of cases.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'CBNAAT test completed. Review the automated molecular result for M. tuberculosis detection and Rifampicin resistance status.',
        decisionQuestion: 'CBNAAT Assay Result Selection',
        decisionOptions: [
          {
            id: 'opt_mtb_det_rif_sens',
            label: 'MTB Detected, Rifampicin Sensitive',
            targetNodeId: 'node_rif_sensitive',
            isRecommended: true,
            rationale: 'Microbiologically confirmed Drug-Sensitive Pulmonary TB.',
            guidelineRef: 'NTEP Outcome 1'
          },
          {
            id: 'opt_mtb_det_rif_indet',
            label: 'MTB Detected, Rifampicin Indeterminate',
            targetNodeId: 'node_rif_indeterminate',
            isRecommended: false,
            rationale: 'MTB detected but rpoB mutation result is unclear (usually low bacillary load). Repeat testing required.',
            guidelineRef: 'NTEP Outcome 2'
          },
          {
            id: 'opt_mtb_det_rif_res',
            label: 'MTB Detected, Rifampicin Resistant (RR-TB)',
            targetNodeId: 'node_rif_resistant',
            isRecommended: false,
            rationale: 'Rifampicin resistance mutation detected. Patient has Drug-Resistant TB (RR-TB / MDR-TB).',
            guidelineRef: 'NTEP Outcome 3'
          },
          {
            id: 'opt_mtb_not_det',
            label: 'MTB Not Detected',
            targetNodeId: 'node_mtb_not_detected',
            isRecommended: false,
            rationale: 'Negative molecular test for M. tuberculosis DNA.',
            guidelineRef: 'NTEP Outcome 4'
          }
        ],
        nextNodes: ['node_rif_sensitive', 'node_rif_indeterminate', 'node_rif_resistant', 'node_mtb_not_detected'],
        gridPos: { x: 500, y: 600 }
      },
      {
        id: 'node_rif_sensitive',
        label: 'MTB Detected, Rif Sensitive',
        category: 'result',
        description: 'M. tuberculosis complex DNA detected WITHOUT Rifampicin resistance mutation.',
        guidelineNote: 'Microbiologically Confirmed Drug-Sensitive Pulmonary Tuberculosis. Initiate 1st Line ATT immediately.',
        cdcGuideline: 'CDC Guidelines: Standard 6-month regimen consisting of 2 months HRZE intensive phase followed by 4 months HRE continuation phase.',
        whoRecommendation: 'WHO 2024: Fixed-Dose Combination (FDC) daily regimen is strongly recommended to enhance compliance and prevent acquired resistance.',
        ntepGuideline: 'NTEP Protocol: Initiate daily FDCs according to weight bands (2HRZE / 4HRE). Register patient on Ni-kshay portal.',
        investigationDetails: 'Perform baseline liver function tests (LFT), renal function, blood glucose, and HIV screening if not done.',
        interpretationText: 'Excellent prognosis with standard 6-month daily oral regimen and strict adherence.',
        learningNotes: [
          'Daily FDCs reduce pill burden and prevent monotherapy.',
          'Monitor patient monthly for weight gain, clinical recovery, and sputum conversion at end of Month 2.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Diagnosis: Microbiologically Confirmed Drug-Sensitive Pulmonary TB. Initiate standard 1st line Anti-TB Treatment.',
        decisionQuestion: 'Initiate Standard Treatment Regimen',
        decisionOptions: [
          {
            id: 'opt_start_first_line',
            label: 'Initiate 1st Line Anti-TB Treatment (ATT)',
            targetNodeId: 'node_first_line_att',
            isRecommended: true,
            rationale: 'Start 6-month daily FDC regimen (2HRZE / 4HRE) with nutritional support (Nikshay Poshak Yojana).',
            guidelineRef: 'NTEP 1st Line Treatment'
          }
        ],
        nextNodes: ['node_first_line_att'],
        gridPos: { x: 150, y: 740 }
      },
      {
        id: 'node_rif_indeterminate',
        label: 'MTB Detected, Rif Indeterminate',
        category: 'result',
        description: 'M. tuberculosis detected, but Rifampicin resistance result is indeterminate / inconclusive.',
        guidelineNote: 'Do not delay treatment. Collect a fresh 2nd sputum sample immediately for confirmatory molecular/culture DST.',
        cdcGuideline: 'CDC Guidance: Indeterminate Rifampicin result occurs when bacterial DNA concentration is near limit of detection. Repeat test or LPA.',
        whoRecommendation: 'WHO Guidelines: Perform repeat CBNAAT on fresh sample or send for Line Probe Assay (LPA) / MGIT Liquid Culture.',
        ntepGuideline: 'NTEP Standard: Collect 2nd sputum sample for repeat CBNAAT / First-Line LPA. Meanwhile, start 1st-line ATT pending result.',
        investigationDetails: 'Immediate fresh sample collection for repeat CBNAAT cartridge or liquid culture (MGIT 960).',
        interpretationText: 'Resolves indeterminate status to confirm whether patient is sensitive or resistant.',
        learningNotes: [
          'Starting 1st-line ATT while awaiting repeat DST prevents disease progression.',
          'If repeat CBNAAT confirms Rif Sensitivity, continue 1st-line ATT. If Rif Resistance is confirmed, modify to MDR-TB regimen.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Rifampicin status indeterminate. Collect a fresh second sputum sample for Repeat CBNAAT, LPA, or Liquid Culture.',
        decisionQuestion: 'Execute Repeat Testing Protocol',
        decisionOptions: [
          {
            id: 'opt_repeat_cbnaat_lpa',
            label: 'Repeat CBNAAT / LPA / Liquid Culture',
            targetNodeId: 'node_repeat_cbnaat',
            isRecommended: true,
            rationale: 'Confirms drug sensitivity status on fresh 2nd specimen.',
            guidelineRef: 'NTEP Indeterminate Protocol'
          }
        ],
        nextNodes: ['node_repeat_cbnaat'],
        gridPos: { x: 380, y: 740 }
      },
      {
        id: 'node_repeat_cbnaat',
        label: 'Repeat CBNAAT / LPA / Liquid Culture',
        category: 'dr-pathway',
        description: 'Confirmatory drug susceptibility testing using repeat CBNAAT, Line Probe Assay (LPA), or MGIT 960 liquid culture.',
        guidelineNote: 'Differentiates true Rifampicin sensitivity from resistance.',
        cdcGuideline: 'CDC Standard: Culture-based DST serves as reference standard for ambiguous molecular results.',
        whoRecommendation: 'WHO 2024: Use Line Probe Assay (FL-LPA) for rapid isoniazid and rifampicin resistance confirmation.',
        ntepGuideline: 'NTEP Protocol: Send specimen to Intermediate Reference Laboratory (IRL) for LPA and liquid culture.',
        investigationDetails: 'High-throughput PCR amplification and hybridization (LPA) or fluorescent liquid culture (MGIT).',
        interpretationText: 'Definitive confirmation of drug resistance profile achieved.',
        learningNotes: [
          'LPA detects both rpoB (Rifampicin) and katG / inhA promoter (Isoniazid) mutations.',
          'Liquid culture provides isolate for full phenotypic panel testing.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Confirmatory testing results received. Route patient according to confirmed drug sensitivity status.',
        decisionQuestion: 'Select Confirmed Sensitivity Outcome',
        decisionOptions: [
          {
            id: 'opt_conf_sens',
            label: 'Confirmed Rifampicin Sensitive',
            targetNodeId: 'node_rif_sensitive',
            isRecommended: true,
            rationale: 'Continue standard 1st line Anti-TB Treatment.',
            guidelineRef: 'NTEP Confirmed Sensitive'
          },
          {
            id: 'opt_conf_res',
            label: 'Confirmed Rifampicin Resistant',
            targetNodeId: 'node_rif_resistant',
            isRecommended: false,
            rationale: 'Route directly to PMDT Drug-Resistant TB pathway.',
            guidelineRef: 'NTEP Confirmed Resistant'
          }
        ],
        nextNodes: ['node_rif_sensitive', 'node_rif_resistant'],
        gridPos: { x: 380, y: 880 }
      },
      {
        id: 'node_rif_resistant',
        label: 'MTB Detected, Rif Resistant (RR-TB)',
        category: 'dr-pathway',
        description: 'M. tuberculosis detected WITH Rifampicin resistance mutation (rpoB mutation).',
        guidelineNote: 'Rifampicin Resistant TB (RR-TB) / Multidrug-Resistant TB (MDR-TB). Trigger Drug-Resistant Pathway.',
        cdcGuideline: 'CDC Core Curriculum: RR-TB requires urgent consultation with TB drug-resistance specialist and second-line DST.',
        whoRecommendation: 'WHO 2024 Policy: Initiate all-oral Bedaquiline-containing regimen (BPaLM / BPaL or Shorter Oral MDR-TB regimen).',
        ntepGuideline: 'NTEP PMDT Guidelines: Immediate referral to PMDT Nodal Center. Perform Second-Line LPA (SL-LPA) for Fluoroquinolones.',
        investigationDetails: 'Send specimen to C-DST Lab for Second-Line LPA (gyrA/gyrB for FQs) and Liquid DST (Bedaquiline, Linezolid).',
        interpretationText: 'Patient has high-risk drug-resistant strain; standard 1st line drugs will fail.',
        learningNotes: [
          'Fluoroquinolone resistance must be ruled out immediately to distinguish RR/MDR-TB from Pre-XDR-TB.',
          'All-oral Bedaquiline-based regimens have replaced toxic injectable regimens.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Drug-Resistant TB detected: Rifampicin Resistant. Initiate the PMDT referral pathway and order Second-Line LPA.',
        decisionQuestion: 'Execute Drug-Resistant TB Pathway (PMDT Referral)',
        decisionOptions: [
          {
            id: 'opt_pmdt_referral',
            label: 'Refer to PMDT Nodal Center & Initiate DR-TB Regimen',
            targetNodeId: 'node_mdr_referral',
            isRecommended: true,
            rationale: 'Refer to specialized Programmatic Management of Drug-Resistant TB center for 2nd line DST and Bedaquiline regimen.',
            guidelineRef: 'NTEP PMDT Nodal Standard'
          }
        ],
        nextNodes: ['node_mdr_referral'],
        gridPos: { x: 620, y: 740 }
      },
      {
        id: 'node_mtb_not_detected',
        label: 'MTB Not Detected',
        category: 'result',
        description: 'CBNAAT assay negative for M. tuberculosis complex DNA.',
        guidelineNote: 'TB NOT microbiologically confirmed. Re-evaluate clinical suspicion and investigate differential diagnoses.',
        cdcGuideline: 'CDC Guidance: A negative NAAT test substantially reduces probability of TB but does not completely rule out paucibacillary TB.',
        whoRecommendation: 'WHO Recommendation: Re-evaluate patients with negative molecular test. Consider repeat testing, CT scan, or specialist panel.',
        ntepGuideline: 'NTEP Standard: Perform clinical evaluation. If high clinical suspicion remains, consult specialist panel for Clinically Diagnosed TB.',
        investigationDetails: 'Evaluate for non-TB bacterial pneumonia, bronchiectasis, COPD exacerbation, lung abscess, or malignancy.',
        interpretationText: 'If symptoms improve with broad-spectrum non-TB antibiotics, patient has non-TB pulmonary disease.',
        learningNotes: [
          'Smear-negative, CBNAAT-negative cases with persistent shadows may still represent active TB if clinical suspicion is overwhelming.',
          'Always exclude active fungal infection or bronchoalveolar carcinoma in non-responding lesions.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'CBNAAT result: MTB Not Detected. Proceed to Clinical Suspicion Assessment and differential diagnosis pathway.',
        decisionQuestion: 'Proceed to Clinical Suspicion Assessment',
        decisionOptions: [
          {
            id: 'opt_to_clinical_assess',
            label: 'Clinical Suspicion Assessment Panel',
            targetNodeId: 'node_clinical_suspicion',
            isRecommended: true,
            rationale: 'Multidisciplinary review of negative test results against persistent clinical symptoms and radiological shadows.',
            guidelineRef: 'NTEP Differential Pathway'
          }
        ],
        nextNodes: ['node_clinical_suspicion'],
        gridPos: { x: 850, y: 740 }
      },
      {
        id: 'node_clinical_suspicion',
        label: 'Clinical Suspicion & Differential Pathway',
        category: 'clinical-pathway',
        description: 'Multidisciplinary clinical review panel evaluating non-responding pulmonary symptoms despite negative tests.',
        guidelineNote: 'Trial of non-TB broad-spectrum antibiotics (Amoxicillin-Clavulanate) for 7-14 days with repeat CXR.',
        cdcGuideline: 'CDC Guidelines: Clinical diagnosis of TB requires documentation of clinical criteria, radiological progression, and response to ATT.',
        whoRecommendation: 'WHO Standard: Clinically Diagnosed TB category applies when microbiological evidence is negative but clinical evidence is overwhelming.',
        ntepGuideline: 'NTEP Guideline: If no clinical improvement after trial of non-TB antibiotic and CXR remains suggestive, diagnose Clinically Diagnosed TB.',
        investigationDetails: 'Trial of broad-spectrum antibiotic (avoid fluoroquinolones/rifampicin). Re-evaluate symptoms and repeat CXR after 14 days.',
        interpretationText: 'No response to broad-spectrum antibiotics + persistent apical infiltrates = High suspicion for Clinically Diagnosed TB.',
        learningNotes: [
          'Do NOT prescribe fluoroquinolones during trial of antibiotics as they mask TB symptoms and delay diagnosis.',
          'Specialist consultation helps prevent inappropriate anti-TB treatment in non-TB pulmonary conditions.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Clinical Suspicion Assessment. Decide whether symptoms and radiological progression justify Clinically Diagnosed TB vs Alternate Diagnosis.',
        decisionQuestion: 'Final Clinical Decision Following Antibiotic Trial & Specialist Review',
        decisionOptions: [
          {
            id: 'opt_clinically_diagnosed',
            label: 'High Suspicion -> Clinically Diagnosed TB',
            targetNodeId: 'node_clinically_diagnosed_tb',
            isRecommended: true,
            rationale: 'Persistent radiological lesions and lack of response to non-TB antibiotics warrant 1st line ATT.',
            guidelineRef: 'NTEP Clinically Diagnosed Standard'
          },
          {
            id: 'opt_alternate_diag',
            label: 'Low Suspicion / Improved -> Alternate Diagnosis & Treatment',
            targetNodeId: 'node_alternate_diagnosis',
            isRecommended: false,
            rationale: 'Symptoms resolved or alternate etiology (pneumonia, asthma, COPD) identified.',
            guidelineRef: 'NTEP Non-TB Management'
          }
        ],
        nextNodes: ['node_clinically_diagnosed_tb', 'node_alternate_diagnosis'],
        gridPos: { x: 850, y: 880 }
      },
      {
        id: 'node_first_line_att',
        label: '1st Line Anti-TB Treatment (ATT)',
        category: 'treatment',
        description: 'Standard 6-month daily regimen using Fixed-Dose Combinations (FDCs): 2HRZE + 4HRE.',
        guidelineNote: 'Intensive Phase (2 months): Isoniazid, Rifampicin, Pyrazinamide, Ethambutol. Continuation Phase (4 months): HRE.',
        cdcGuideline: 'CDC Core Curriculum: Directly Observed Therapy (DOT) or digital adherence monitoring (99DOTS / MERM) strongly advised.',
        whoRecommendation: 'WHO 2024: Weight-banded daily FDCs reduce medication errors. Ensure counseling on drug side effects (hepatotoxicity, neuropathy).',
        ntepGuideline: 'NTEP National Treatment Protocol: Register patient on Ni-kshay, issue free FDC blistpack, and initiate Nikshay Poshak Yojana (₹500/month).',
        investigationDetails: 'Monthly follow-up: Sputum smear at end of Month 2 (Intensive Phase completion), weight check, LFT monitoring.',
        interpretationText: 'Successful treatment outcome defined by clinical resolution and negative sputum smear at Month 6.',
        learningNotes: [
          'Co-prescribe Pyridoxine (Vitamin B6) 10-25 mg daily to prevent Isoniazid-induced peripheral neuropathy.',
          'Educate patient that Rifampicin causes orange-red discoloration of urine and tears (harmless).'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Outcome Achieved: 1st Line Anti-TB Treatment Initiated. Patient registered on Ni-kshay with daily FDCs and adherence monitoring.',
        decisionQuestion: 'Treatment Started - Diagnostic Pathway Complete',
        decisionOptions: [],
        nextNodes: [],
        gridPos: { x: 150, y: 1020 }
      },
      {
        id: 'node_mdr_referral',
        label: 'PMDT Referral (MDR-TB / RR-TB Regimen)',
        category: 'referral',
        description: 'Referral to Programmatic Management of Drug-Resistant TB (PMDT) Nodal Committee.',
        guidelineNote: 'Initiate All-Oral Bedaquiline-containing regimen (BPaLM / BPaL or Shorter Oral MDR-TB Regimen).',
        cdcGuideline: 'CDC Guidelines: Multidisciplinary expert team management with baseline ECG (QTc interval), electrolytes, and vision screening.',
        whoRecommendation: 'WHO 2024 Recommendation: 6-month BPaLM regimen (Bedaquiline, Pretomanid, Linezolid, Moxifloxacin) for RR/MDR-TB.',
        ntepGuideline: 'NTEP PMDT Standard: Baseline baseline pre-treatment evaluation at DR-TB Center. Pre-treatment evaluation includes ECG, LFT, KFT, TSH, audiometry.',
        investigationDetails: 'Second-line DST for Fluoroquinolones (LPA SL), Bedaquiline, and Linezolid.',
        interpretationText: 'High-level specialized care prevents further drug resistance amplification.',
        learningNotes: [
          'Bedaquiline inhibits mycobacterial ATP synthase.',
          'Linezolid dose should be monitored (600 mg daily) to prevent peripheral neuropathy and myelosuppression.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Outcome Achieved: Patient referred to PMDT Nodal Center for All-Oral Bedaquiline-containing Drug-Resistant TB regimen.',
        decisionQuestion: 'DR-TB Referral Complete - Diagnostic Pathway Complete',
        decisionOptions: [],
        nextNodes: [],
        gridPos: { x: 620, y: 1020 }
      },
      {
        id: 'node_clinically_diagnosed_tb',
        label: 'Clinically Diagnosed TB',
        category: 'treatment',
        description: 'Microbiologically negative TB diagnosed by clinician based on clinical, radiological, and histopathological evidence.',
        guidelineNote: 'Initiate 1st line Anti-TB Treatment. Register on Ni-kshay as "Clinically Diagnosed TB".',
        cdcGuideline: 'CDC Core Curriculum: Document clinical criteria and maintain close monitoring for clinical response within 2-4 weeks.',
        whoRecommendation: 'WHO Policy: Ensure thorough follow-up to confirm clinical improvement under ATT.',
        ntepGuideline: 'NTEP Standard: Start standard 1st line ATT regimen. Sputum smear at Month 2 and Month 6.',
        investigationDetails: 'Baseline LFT and weight recording. Close symptom tracking.',
        interpretationText: 'Weight gain and symptom regression within 4 weeks validate clinical diagnosis.',
        learningNotes: [
          'Re-assess if patient fails to improve after 4 weeks of compliant 1st-line ATT.',
          'Consider bronchoscopy / BAL culture if non-responsive.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Outcome Achieved: Clinically Diagnosed TB initiated on 1st Line ATT with close clinical monitoring.',
        decisionQuestion: 'Treatment Started - Diagnostic Pathway Complete',
        decisionOptions: [],
        nextNodes: ['node_first_line_att'],
        gridPos: { x: 750, y: 1020 }
      },
      {
        id: 'node_alternate_diagnosis',
        label: 'Alternate Diagnosis & Management',
        category: 'treatment',
        description: 'Management of non-TB pulmonary conditions (bacterial pneumonia, COPD, asthma, bronchiectasis, interstitial lung disease).',
        guidelineNote: 'Treat for specific non-TB disease. Advise patient to return if symptoms worsen or recur.',
        cdcGuideline: 'CDC Guidance: Follow standard clinical management guidelines for community-acquired pneumonia or non-infectious lung disease.',
        whoRecommendation: 'WHO Policy: Provide appropriate antibiotic/bronchodilator treatment and reassess if persistent.',
        ntepGuideline: 'NTEP Guidance: Provide specific treatment for alternative condition. Provide clear safety-netting instructions.',
        investigationDetails: 'Sputum culture for pyogenic organisms, spirometry, or high-resolution CT (HRCT) as indicated.',
        interpretationText: 'Patient successfully triaged away from unnecessary anti-TB therapy.',
        learningNotes: [
          'Always provide safety-netting advice: return immediately if hemoptysis or significant weight loss occurs.',
          'Consider atypical pathogens (Mycoplasma, Legionella, fungal).'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Outcome Achieved: Non-TB Alternate Diagnosis established. Specific non-TB therapy initiated.',
        decisionQuestion: 'Alternative Management Complete',
        decisionOptions: [],
        nextNodes: [],
        gridPos: { x: 950, y: 1020 }
      }
    ]
  };

  static pediatricTB: AlgorithmFlowchartData = {
    id: 'pediatric',
    title: 'Pediatric Tuberculosis Diagnostic Pathway',
    subtitle: 'NTEP Pediatric Diagnostic Algorithm (Molecular Testing, CXR, TST/Mantoux, TB Score & Contact History)',
    pdfReference: 'NTEP Pediatric Guidelines / WHO Operational Handbook on Children & Adolescents',
    nodes: [
      {
        id: 'pnode_start',
        label: 'Child with Presumptive TB',
        category: 'presumptive',
        description: 'Child (< 15 yrs) with persistent unexplained cough/fever > 2 weeks, weight loss / failure to thrive, lethargy, or household contact with active TB.',
        guidelineNote: 'Pediatric TB is paucibacillary. Collect sputum, induced sputum, gastric aspirate, or stool for rapid molecular testing.',
        cdcGuideline: 'CDC Pediatric TB: Evaluate any child with failure to thrive and persistent respiratory symptoms or household exposure.',
        whoRecommendation: 'WHO 2024 Pediatric Guideline: Rapid molecular testing (Xpert MTB/RIF Ultra or Truenat) is recommended on respiratory or stool specimens.',
        ntepGuideline: 'NTEP Pediatric Protocol: Upfront rapid molecular testing on gastric aspirate / induced sputum.',
        investigationDetails: 'Thorough clinical score evaluation: weight trajectory on WHO growth chart, contact history, TST/Mantoux induration.',
        interpretationText: 'High index of suspicion in young children (< 5 yrs) who have close exposure to infectious adult index case.',
        learningNotes: [
          'Children under 5 are at high risk of rapid dissemination (TB meningitis and miliary TB).',
          'Gastric aspirate collected early morning before child gets out of bed swallows nocturnal bronchial secretions.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Pediatric TB Diagnostic Pathway. Evaluate clinical presentation and obtain specimen for rapid molecular testing.',
        decisionQuestion: 'Step 1: Rapid Molecular Test Specimen Collection',
        decisionOptions: [
          {
            id: 'popt_sputum_collect',
            label: 'Collect Specimen (Gastric Aspirate / Sputum / Stool) -> Perform CBNAAT',
            targetNodeId: 'pnode_sputum_collect',
            isRecommended: true,
            rationale: 'Rapid molecular test on pediatric gastric aspirate or induced sputum delivers rapid confirmation.',
            guidelineRef: 'NTEP Pediatric Standard'
          }
        ],
        nextNodes: ['pnode_sputum_collect'],
        gridPos: { x: 500, y: 50 }
      },
      {
        id: 'pnode_sputum_collect',
        label: 'Rapid Molecular Test (Xpert MTB/RIF Ultra)',
        category: 'cbnaat',
        description: 'Xpert testing on gastric aspirate, induced sputum, stool, or nasopharyngeal aspirate.',
        guidelineNote: 'Confirms M. tuberculosis complex and Rifampicin susceptibility in children.',
        cdcGuideline: 'CDC Guidance: Ultra cartridge provides enhanced sensitivity for low-bacillary pediatric specimens.',
        whoRecommendation: 'WHO 2024: Stool Xpert Ultra is endorsed as a non-invasive specimen for pediatric pulmonary TB diagnosis.',
        ntepGuideline: 'NTEP Standard: Free CBNAAT testing provided across all district health facilities.',
        investigationDetails: 'Cartridge molecular testing of pediatric specimen.',
        interpretationText: 'MTB Detected vs MTB Not Detected.',
        learningNotes: [
          'Stool testing is non-invasive and highly acceptable for young infants who cannot produce sputum.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Review molecular test result for the pediatric patient.',
        decisionQuestion: 'Pediatric CBNAAT Result Outcome',
        decisionOptions: [
          {
            id: 'popt_mtb_pos',
            label: 'MTB Detected (Confirmed Pediatric TB)',
            targetNodeId: 'pnode_mtb_pos',
            isRecommended: true,
            rationale: 'Microbiologically confirmed pediatric TB.',
            guidelineRef: 'NTEP Pediatric Confirmed'
          },
          {
            id: 'popt_mtb_neg',
            label: 'MTB Not Detected / Sample Unavailable',
            targetNodeId: 'pnode_mtb_neg',
            isRecommended: false,
            rationale: 'Molecular test negative or child unable to produce sample. Proceed to clinical algorithm & score matrix.',
            guidelineRef: 'NTEP Pediatric Clinical Matrix'
          }
        ],
        nextNodes: ['pnode_mtb_pos', 'pnode_mtb_neg'],
        gridPos: { x: 500, y: 200 }
      },
      {
        id: 'pnode_mtb_pos',
        label: 'Confirmed Pediatric TB',
        category: 'result',
        description: 'Molecular confirmation of M. tuberculosis complex in child.',
        guidelineNote: 'Initiate Pediatric Anti-TB Treatment immediately using weight-banded pediatric FDC dispersible tablets.',
        cdcGuideline: 'CDC Guidelines: Pediatric FDC dispersible formulations (HRZ / HR) improve adherence and dosing accuracy.',
        whoRecommendation: 'WHO Recommendation: 4-month or 6-month regimen based on disease severity.',
        ntepGuideline: 'NTEP Protocol: Register on Ni-kshay, issue pediatric dispersible FDCs, and offer nutritional support.',
        investigationDetails: 'Weight band determination and monthly follow-up.',
        interpretationText: 'Excellent treatment response when child receives appropriate weight-adjusted FDC dosages.',
        learningNotes: [
          'Flavor-coated dispersible FDC tablets dissolve easily in water or breast milk.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Confirmed Pediatric TB. Initiate weight-banded pediatric anti-TB treatment.',
        decisionQuestion: 'Start Pediatric ATT Regimen',
        decisionOptions: [
          {
            id: 'popt_start_att',
            label: 'Initiate Pediatric FDC ATT',
            targetNodeId: 'pnode_anti_tb',
            isRecommended: true,
            rationale: 'Start pediatric weight-banded regimen.',
            guidelineRef: 'NTEP Pediatric Regimen'
          }
        ],
        nextNodes: ['pnode_anti_tb'],
        gridPos: { x: 250, y: 360 }
      },
      {
        id: 'pnode_mtb_neg',
        label: 'MTB Not Detected / Clinical Evaluation',
        category: 'result',
        description: 'Negative molecular test or unable to obtain specimen in symptomatic child.',
        guidelineNote: 'Perform Chest X-Ray, Mantoux TST (5 TU PPD), and evaluate Pediatric TB Diagnostic Score.',
        cdcGuideline: 'CDC Core Curriculum: Evaluate TST induration (≥ 10mm positive, ≥ 5mm if HIV or severely malnourished).',
        whoRecommendation: 'WHO Operational Handbook: Clinical diagnostic algorithms (symptoms + contact + CXR + TST) have high specificity in children.',
        ntepGuideline: 'NTEP Pediatric Matrix: Calculate Pediatric TB Score (Score ≥ 6 indicates probable TB).',
        investigationDetails: 'Chest radiograph reading + Mantoux intradermal skin test read at 48-72 hours.',
        interpretationText: 'TST induration ≥ 10mm indicates TB infection / exposure.',
        learningNotes: [
          'Mantoux test requires reading transverse diameter of induration (not erythema) at 48-72 hours.'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Evaluate radiological, TST, and clinical score matrix for the child.',
        decisionQuestion: 'Pediatric TB Diagnostic Score Matrix',
        decisionOptions: [
          {
            id: 'popt_score_high',
            label: 'TB Score ≥ 6 OR CXR Suggestive + TST (+)',
            targetNodeId: 'pnode_score_high',
            isRecommended: true,
            rationale: 'High composite score indicative of active pediatric TB.',
            guidelineRef: 'NTEP Pediatric High Score'
          },
          {
            id: 'popt_score_low',
            label: 'TB Score < 6 AND Inconclusive Imaging',
            targetNodeId: 'pnode_score_low',
            isRecommended: false,
            rationale: 'Low composite score needing trial of non-TB antibiotic and observation.',
            guidelineRef: 'NTEP Pediatric Low Score'
          }
        ],
        nextNodes: ['pnode_score_high', 'pnode_score_low'],
        gridPos: { x: 750, y: 360 }
      },
      {
        id: 'pnode_score_high',
        label: 'Probable Pediatric TB (Score ≥ 6)',
        category: 'result',
        description: 'High composite clinical, radiological, and immunological TB score in child.',
        guidelineNote: 'Initiate Pediatric Anti-TB Treatment.',
        cdcGuideline: 'CDC Guidance: Treat as clinically diagnosed pediatric tuberculosis.',
        whoRecommendation: 'WHO Policy: Start pediatric treatment without delay.',
        ntepGuideline: 'NTEP Standard: Register child and initiate pediatric FDCs.',
        investigationDetails: 'Baseline monitoring and nutritional counseling.',
        interpretationText: 'High probability of active primary pulmonary disease.',
        learningNotes: ['Monitor monthly weight gain.'],
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Probable Pediatric TB. Initiate Pediatric ATT.',
        decisionQuestion: 'Start Pediatric Anti-TB Regimen',
        decisionOptions: [
          {
            id: 'popt_start_att_high',
            label: 'Initiate Pediatric FDC ATT',
            targetNodeId: 'pnode_anti_tb',
            isRecommended: true,
            rationale: 'Start pediatric treatment.',
            guidelineRef: 'NTEP Pediatric Treatment'
          }
        ],
        nextNodes: ['pnode_anti_tb'],
        gridPos: { x: 600, y: 520 }
      },
      {
        id: 'pnode_score_low',
        label: 'Observe 2 Weeks & Antibiotic Trial',
        category: 'treatment',
        description: 'Trial of supportive care and broad-spectrum non-TB antibiotic (Amoxicillin-Clavulanate) for 14 days.',
        guidelineNote: 'Re-evaluate child after 2 weeks. If symptoms persist or weight loss continues, initiate Anti-TB Treatment.',
        cdcGuideline: 'CDC Guidance: Re-examine child after 10-14 days of broad-spectrum antibiotic therapy.',
        whoRecommendation: 'WHO Policy: Follow up child closely.',
        ntepGuideline: 'NTEP Guidance: Observe 2 weeks and re-evaluate.',
        investigationDetails: 'Weight check and symptom score re-assessment.',
        interpretationText: 'Symptom persistence after 2 weeks = High suspicion for Clinically Diagnosed Pediatric TB.',
        learningNotes: ['Avoid fluoroquinolones.'],
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Observe for 2 weeks with non-TB antibiotics and re-evaluate pediatric symptoms.',
        decisionQuestion: '2-Week Re-evaluation Outcome',
        decisionOptions: [
          {
            id: 'popt_persist',
            label: 'Symptoms Persist / Weight Loss -> Start Pediatric ATT',
            targetNodeId: 'pnode_anti_tb',
            isRecommended: true,
            rationale: 'Non-response to broad-spectrum antibiotics indicates TB.',
            guidelineRef: 'NTEP Pediatric Persistent Route'
          }
        ],
        nextNodes: ['pnode_anti_tb'],
        gridPos: { x: 900, y: 520 }
      },
      {
        id: 'pnode_anti_tb',
        label: 'Pediatric Anti-TB Treatment (ATT)',
        category: 'treatment',
        description: 'Weight-banded pediatric dispersible FDC regimen (HRZE / HRE).',
        guidelineNote: 'Monitor child monthly for weight gain, clinical recovery, and compliance.',
        cdcGuideline: 'CDC Core Curriculum: Regular dosage adjustments as child gains weight during treatment.',
        whoRecommendation: 'WHO Guidelines: Provide nutritional supplement and family adherence support.',
        ntepGuideline: 'NTEP Standard: Free pediatric FDCs supplied under Nikshay Poshak Yojana.',
        investigationDetails: 'Monthly growth tracking.',
        interpretationText: 'Complete cure and normal development expected.',
        learningNotes: ['Adjust FDC dosage when child moves into higher weight band.'],
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        voiceScript: 'Pediatric Anti-TB Treatment initiated successfully.',
        decisionQuestion: 'Pediatric Pathway Complete',
        decisionOptions: [],
        nextNodes: [],
        gridPos: { x: 500, y: 680 }
      }
    ]
  };
}
