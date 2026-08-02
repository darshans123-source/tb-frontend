import { DiagnosticAlgorithmCase } from '../types';

export const DIAGNOSTIC_ALGORITHM_CASES: DiagnosticAlgorithmCase[] = [
  {
    id: 'case_pulm_01',
    title: 'Standard Pulmonary TB Suspect',
    subtitle: '34-year-old male presenting with chronic productive cough and night sweats',
    type: 'pulmonary',
    difficulty: 'NTEP Official Pathway',
    patientInfo: {
      name: 'Rajesh Kumar',
      age: 34,
      gender: 'Male',
      complaint: 'Cough with mucopurulent sputum and low-grade fever',
      duration: '3 weeks',
      symptoms: [
        'Persistent productive cough (> 2 weeks)',
        'Evening rise of temperature (38.2°C)',
        'Unexplained weight loss (4.5 kg in 1 month)',
        'Drenching night sweats',
        'Mild chest tightness'
      ],
      history: 'No previous history of Anti-Tubercular Therapy (ATT). Lives in an urban crowded household.',
      vitals: {
        temp: '38.2 °C',
        pulse: '88 bpm',
        bp: '118/76 mmHg',
        rr: '18 /min',
        spO2: '97% on room air',
        bmi: '18.4 kg/m² (Underweight)'
      },
      riskFactors: [
        'Overcrowded living conditions',
        'Mild malnutrition (BMI 18.4)',
        'Active smoker (5 pack-years)',
        'Non-diabetic',
        'HIV Seronegative'
      ],
      physicalExam: 'Thin built, mild temporal wasting. Chest: Decreased breath sounds and post-tussive crepitations in the right upper pulmonary field. No cervical lymphadenopathy.'
    },
    nodes: [
      {
        id: 'node_presumptive',
        title: 'Presumptive TB Patient',
        subtitle: 'Initial triage & identification of suspected Pulmonary TB',
        type: 'start',
        question: 'A 34-year-old male presents with 3 weeks of productive cough, fever, and weight loss. How do you categorize this patient per NTEP guidelines?',
        options: [
          {
            id: 'opt_p1',
            label: 'Classify as Presumptive Pulmonary TB Patient and initiate diagnostic workup',
            isCorrect: true,
            nextNodeId: 'node_clinical_assessment',
            rationale: 'Correct! Any individual presenting with cough > 2 weeks, fever, night sweats, or unexplained weight loss is classified as a Presumptive TB case and must undergo immediate diagnostic evaluation.',
            guidelineReference: 'NTEP Guidelines 2024 - Chapter 3: Diagnostic Standards',
            xpBonus: 50
          },
          {
            id: 'opt_p2',
            label: 'Prescribe broad-spectrum antibiotics (Amoxicillin) for 14 days and reassess later',
            isCorrect: false,
            nextNodeId: 'node_presumptive',
            rationale: 'Incorrect! Empirical antibiotic trials without testing delay TB diagnosis and increase community transmission. fluoroquinolones/broad-spectrum drugs should not be given blindly.',
            guidelineReference: 'WHO Consolidated Guidelines on Tuberculosis: Module 3',
            xpBonus: 0,
            penalty: 25
          }
        ]
      },
      {
        id: 'node_clinical_assessment',
        title: 'Clinical Assessment',
        subtitle: 'Detailed symptom evaluation, risk stratification, and HIV status verification',
        type: 'assessment',
        question: 'What is the primary objective of clinical assessment before ordering diagnostic investigations in a presumptive TB patient?',
        options: [
          {
            id: 'opt_ca1',
            label: 'Confirm clinical indicators, check HIV & Diabetes status, and order chest imaging & microbiological testing',
            isCorrect: true,
            nextNodeId: 'node_cxr',
            rationale: 'Correct! Clinical assessment establishes severity, identifies co-morbidities (HIV/DM), and directs urgent radiological & microbiological diagnostic investigations.',
            guidelineReference: 'NTEP Technical & Operational Guidelines 2024',
            xpBonus: 75
          },
          {
            id: 'opt_ca2',
            label: 'Skip radiology and start empirical anti-TB treatment based on symptoms alone',
            isCorrect: false,
            nextNodeId: 'node_clinical_assessment',
            rationale: 'Incorrect! Empirical ATT without diagnostic objective evidence is strongly discouraged by WHO and NTEP due to risk of misdiagnosis and emergence of drug resistance.',
            guidelineReference: 'WHO Diagnostic Algorithms for Pulmonary Tuberculosis',
            xpBonus: 0,
            penalty: 30
          }
        ],
        investigationDetails: {
          purpose: 'Systematic evaluation of clinical red flags, differential diagnosis, and screening for immunosuppression.',
          procedure: 'Detailed history taking, physical examination focused on respiratory system, BMI calculation, and screening for HIV/Diabetes mellitus.',
          expectedFindings: 'Signs of pulmonary consolidation, upper lobe rales/crepitations, temporal wasting, low BMI (< 18.5 kg/m²).',
          interpretation: 'High clinical suspicion of active pulmonary tuberculosis needing rapid diagnostic confirmation.',
          ntepNotes: 'NTEP mandates universal HIV and Diabetes screening for all presumptive TB patients.',
          clinicalImportance: 'Establishes baseline clinical state and identifies high-risk co-morbidities that dictate management.',
          normalValues: 'Afebrile, BMI 18.5 - 24.9 kg/m², normal vesicular breath sounds without added sounds.'
        }
      },
      {
        id: 'node_cxr',
        title: 'Chest X-Ray (PA View)',
        subtitle: 'Radiological evaluation for parenchymal lesions and cavitations',
        type: 'test',
        question: 'Chest X-Ray shows heterogeneous patchy opacities in the right upper zone with a small cavitary lesion. What is the next essential step?',
        options: [
          {
            id: 'opt_cxr1',
            label: 'Proceed to Microbiological testing (Sputum Smear & CBNAAT/GeneXpert)',
            isCorrect: true,
            nextNodeId: 'node_smear',
            rationale: 'Correct! Chest X-Ray is highly sensitive but non-specific. All radiologically abnormal findings suggestive of TB MUST be confirmed microbiologically.',
            guidelineReference: 'NTEP Diagnostic Algorithm for Pulmonary TB',
            xpBonus: 100
          },
          {
            id: 'opt_cxr2',
            label: 'Diagnose non-tubercular pneumonia and give azithromycin',
            isCorrect: false,
            nextNodeId: 'node_cxr',
            rationale: 'Incorrect! Upper lobe cavitary infiltrates in a patient with chronic cough are classic for TB. Sputum molecular testing is mandatory.',
            guidelineReference: 'WHO Chest Radiography in TB Detection',
            xpBonus: 0,
            penalty: 35
          }
        ],
        investigationDetails: {
          purpose: 'High-sensitivity triage screening tool to detect parenchymal pulmonary abnormalities and cavities.',
          procedure: 'Posteroanterior (PA) view upright chest radiograph taken at deep inspiration.',
          expectedFindings: 'Heterogeneous opacities in upper zones (apical/posterior segments), cavitary lesions, hilar lymphadenopathy.',
          interpretation: 'Radiologically suggestive of active Pulmonary Tuberculosis.',
          ntepNotes: 'Radiology provides structural confirmation but microbiological bacteriological testing is required for definitive diagnosis & drug sensitivity testing.',
          clinicalImportance: 'Identifies extent of disease, presence of cavitation (high bacterial load), and baseline for monitoring treatment response.',
          referenceImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
          normalValues: 'Clear lung fields, normal bronchovascular markings, sharp costophrenic angles.'
        }
      },
      {
        id: 'node_smear',
        title: 'Smear Examination (AFB Microscopy)',
        subtitle: 'Ziehl-Neelsen (ZN) or LED-Fluorescence Sputum Microscopy',
        type: 'test',
        question: 'Sputum ZN Smear Microscopy reveals 2+ Acid-Fast Bacilli (AFB Positive). What is the mandatory next step per NTEP algorithm?',
        options: [
          {
            id: 'opt_smear1',
            label: 'Perform CBNAAT (GeneXpert MTB/RIF) to confirm MTB and check Rifampicin resistance status',
            isCorrect: true,
            nextNodeId: 'node_cbnaat',
            rationale: 'Correct! NTEP mandates universal drug susceptibility testing (UDST) via CBNAAT for ALL smear-positive and smear-negative presumptive TB patients to rule out drug resistance before starting treatment.',
            guidelineReference: 'NTEP Universal DST Guidelines',
            xpBonus: 100
          },
          {
            id: 'opt_smear2',
            label: 'Start 1st line ATT immediately without doing molecular DST / CBNAAT',
            isCorrect: false,
            nextNodeId: 'node_smear',
            rationale: 'Incorrect! Skipping CBNAAT misses primary Rifampicin resistance, leading to treatment failure in MDR-TB patients.',
            guidelineReference: 'WHO Policy on Molecular Assays for TB',
            xpBonus: 0,
            penalty: 40
          }
        ],
        investigationDetails: {
          purpose: 'Rapid detection of acid-fast bacilli (AFB) in sputum to assess infectiousness and bacterial burden.',
          procedure: 'Collection of 2 sputum specimens (spot and early morning), Ziehl-Neelsen or Auramine-O LED fluorescence staining.',
          expectedFindings: 'Bright red rod-shaped bacilli on blue background (ZN stain) or glowing yellow-green bacilli (LED fluorescence). 2+ grading (1-10 bacilli per field).',
          interpretation: 'Smear-Positive Pulmonary Tuberculosis (Infectious).',
          ntepNotes: 'Smear microscopy detects > 5,000 to 10,000 bacilli/mL. LED-FM is 10% more sensitive than light ZN microscopy.',
          clinicalImportance: 'Determines patient contagiousness, infection control urgency, and baseline bacillary burden.',
          normalValues: 'No acid-fast bacilli seen in 100 high-power oil immersion fields (Smear Negative).'
        }
      },
      {
        id: 'node_cbnaat',
        title: 'CBNAAT / GeneXpert MTB/RIF Assay',
        subtitle: 'Cartridge-Based Nucleic Acid Amplification Test for rapid MTB identification & Rifampicin resistance',
        type: 'test',
        question: 'CBNAAT result is returned: "MTB Detected; Rifampicin Resistance NOT Detected". How do you classify this case?',
        options: [
          {
            id: 'opt_cb1',
            label: 'Microbiologically Confirmed Rifampicin-Sensitive Pulmonary TB → Initiate 1st Line ATT Regimen',
            isCorrect: true,
            nextNodeId: 'node_decision_mtb_detected',
            rationale: 'Correct! MTB Detected with Rifampicin sensitivity establishes Microbiologically Confirmed Drug-Sensitive Pulmonary TB.',
            guidelineReference: 'NTEP Standard Treatment Workflow',
            xpBonus: 150
          },
          {
            id: 'opt_cb2',
            label: 'Classify as Drug-Resistant TB and start Bedaquiline regimen',
            isCorrect: false,
            nextNodeId: 'node_cbnaat',
            rationale: 'Incorrect! Rifampicin resistance was NOT detected. Standard 1st line anti-tubercular therapy (2HRZE / 4HRE) is indicated.',
            guidelineReference: 'NTEP Drug Sensitive TB Guidelines',
            xpBonus: 0,
            penalty: 50
          }
        ],
        investigationDetails: {
          purpose: 'Automated real-time PCR assay for rapid simultaneous detection of M. tuberculosis complex DNA and rpoB gene mutations conferring Rifampicin resistance within 2 hours.',
          procedure: 'Sputum sample liquified with sample reagent (2:1 ratio), incubated for 15 min, transferred into GeneXpert cartridge and processed.',
          expectedFindings: 'MTB DETECTED (High/Medium/Low); Rifampicin Resistance NOT DETECTED.',
          interpretation: 'Microbiologically confirmed Drug-Sensitive Tuberculosis.',
          ntepNotes: 'CBNAAT limit of detection is ~131 CFU/mL, vastly superior to smear microscopy.',
          clinicalImportance: 'Gold-standard rapid molecular diagnostic tool required for all presumptive TB patients under NTEP.',
          normalValues: 'MTB NOT DETECTED; rpoB targets negative.'
        }
      },
      {
        id: 'node_decision_mtb_detected',
        title: 'Decision: MTB Detected',
        subtitle: 'Molecular confirmation of Mycobacterium tuberculosis',
        type: 'decision',
        question: 'MTB has been detected. What is the critical branch decision based on Rifampicin status?',
        options: [
          {
            id: 'opt_dec1',
            label: 'Rifampicin Sensitive → Proceed to Microbiologically Confirmed DS-TB Treatment Pathway',
            isCorrect: true,
            nextNodeId: 'node_rif_sensitive',
            rationale: 'Correct! Rifampicin sensitivity guides initiation of standard 1st line ATT regimen.',
            guidelineReference: 'NTEP Treatment Guidelines',
            xpBonus: 100
          },
          {
            id: 'opt_dec2',
            label: 'Ignore Rifampicin status and prescribe 2nd line fluoroquinolones',
            isCorrect: false,
            nextNodeId: 'node_decision_mtb_detected',
            rationale: 'Incorrect! 2nd line drugs must be reserved strictly for Drug-Resistant TB cases confirmed by DST/LPA.',
            guidelineReference: 'WHO Drug Resistance Management',
            xpBonus: 0,
            penalty: 40
          }
        ]
      },
      {
        id: 'node_rif_sensitive',
        title: 'Rifampicin Sensitive Pathway',
        subtitle: 'Confirmation of Drug-Sensitive Mycobacterium Tuberculosis',
        type: 'diagnosis',
        question: 'Rifampicin resistance is ruled out. What is the confirmed diagnosis for this patient?',
        options: [
          {
            id: 'opt_rs1',
            label: 'Microbiologically Confirmed Drug-Sensitive Pulmonary Tuberculosis',
            isCorrect: true,
            nextNodeId: 'node_treatment_ds',
            rationale: 'Correct! Positive smear/CBNAAT with documented Rifampicin sensitivity confirms DS-Pulmonary TB.',
            guidelineReference: 'NTEP Case Definition Standard 2024',
            xpBonus: 150
          }
        ],
        investigationDetails: {
          purpose: 'Establish final diagnostic categorization for public health notification and standard regimen assignment.',
          procedure: 'Review of microbiological, radiological, and clinical evidence.',
          expectedFindings: 'Sputum AFB positive, CBNAAT MTB positive, Rif resistance negative.',
          interpretation: 'Microbiologically Confirmed DS-TB.',
          ntepNotes: 'All confirmed cases must be notified on Nikshay portal within 24 hours.',
          clinicalImportance: 'Ensures appropriate 1st line multi-drug regimen and contact tracing.',
          normalValues: 'N/A'
        }
      },
      {
        id: 'node_treatment_ds',
        title: 'Treatment Protocol (NTEP Standard FDC)',
        subtitle: 'Fixed-Dose Combination (FDC) Daily Oral Anti-TB Treatment',
        type: 'treatment',
        question: 'What is the recommended NTEP treatment regimen for adult Microbiologically Confirmed Drug-Sensitive Pulmonary TB?',
        options: [
          {
            id: 'opt_tx1',
            label: '2 Months Intensive Phase (HRZE) + 4 Months Continuation Phase (HRE) as daily weight-banded FDCs',
            isCorrect: true,
            nextNodeId: 'node_final_ds_summary',
            rationale: 'Correct! Standard NTEP regimen consists of 2 months 4-drug FDC (Isoniazid, Rifampicin, Pyrazinamide, Ethambutol) followed by 4 months 3-drug FDC (Isoniazid, Rifampicin, Ethambutol).',
            guidelineReference: 'NTEP Technical Guidelines 2024 - Chapter 5',
            xpBonus: 200
          },
          {
            id: 'opt_tx2',
            label: 'Intermittent 3 times a week dosing with Isoniazid and Rifampicin only for 3 months',
            isCorrect: false,
            nextNodeId: 'node_treatment_ds',
            rationale: 'Incorrect! Intermittent therapy has been discontinued by NTEP and WHO in favor of daily FDC regimens to prevent relapse and resistance.',
            guidelineReference: 'WHO Guidelines on Tuberculosis Treatment',
            xpBonus: 0,
            penalty: 50
          }
        ],
        investigationDetails: {
          purpose: 'Eradicate active and dormant bacilli, achieve clinical cure, prevent relapse, and arrest transmission.',
          procedure: 'Daily weight-banded 4-FDC (HRZE) during Intensive Phase (8 weeks) followed by 3-FDC (HRE) during Continuation Phase (16 weeks).',
          expectedFindings: 'Sputum conversion to negative at 2 months, clinical symptom resolution, weight gain.',
          interpretation: 'Successful clinical cure with high adherence.',
          ntepNotes: 'Directly Observed Therapy (DOT) or digital adherence monitoring (MERM/99DOTS) with monthly follow-up sputum microscopy at end of IP and CP.',
          clinicalImportance: 'Prevents development of drug resistance and cures > 95% of compliant patients.',
          normalValues: 'Complete resolution of infiltrates on follow-up radiography.'
        }
      }
    ],
    finalOutputs: {
      node_treatment_ds: {
        diagnosis: 'Microbiologically Confirmed Drug-Sensitive Pulmonary Tuberculosis',
        reason: 'Patient presented with 3 weeks of productive cough, fever, and weight loss. Chest X-Ray revealed upper zone cavitary opacities. Sputum ZN Smear was 2+ positive for AFB. CBNAAT confirmed MTB positive with Rifampicin sensitivity.',
        investigationsUsed: [
          'Clinical Symptom Evaluation & Risk Assessment',
          'Chest Radiography (PA View): Right upper zone cavitary infiltrates',
          'Sputum ZN Smear Microscopy: 2+ Acid-Fast Bacilli Positive',
          'CBNAAT / GeneXpert MTB/RIF Assay: MTB Detected, Rifampicin Resistance NOT Detected'
        ],
        treatmentRecommendation: 'Initiate Daily Fixed-Dose Combination (FDC) ATT Regimen:\n• Intensive Phase (2 Months): Daily 4-FDC (Isoniazid 300mg + Rifampicin 600mg + Pyrazinamide 1500mg + Ethambutol 1000mg)\n• Continuation Phase (4 Months): Daily 3-FDC (Isoniazid 300mg + Rifampicin 600mg + Ethambutol 1000mg)\n• Supplement with Pyridoxine (Vitamin B6) 10-25mg daily.\n• Universal HIV & Diabetes monitoring.\n• Register on Nikshay Portal.',
        learningSummary: [
          'Always classify patients with chronic cough (> 2 weeks) as Presumptive TB.',
          'Chest X-Ray provides radiological suspicion, but microbiological evidence is mandatory.',
          'CBNAAT is essential for all presumptive cases to establish MTB presence and rule out Rifampicin resistance upfront (Universal DST).',
          'Daily FDC therapy (2HRZE / 4HRE) is the standard WHO/NTEP regimen for drug-sensitive pulmonary TB.'
        ],
        badge: 'Pulmonary Diagnostic Master'
      }
    }
  },
  {
    id: 'case_pulm_02_mdr',
    title: 'Drug-Resistant TB Suspect (Rifampicin Resistant)',
    subtitle: '42-year-old female with prior history of incomplete ATT presenting with persistent symptoms',
    type: 'mdr',
    difficulty: 'NTEP PMDT Pathway',
    patientInfo: {
      name: 'Sunita Devi',
      age: 42,
      gender: 'Female',
      complaint: 'Recurrent cough, hemoptysis, and weakness after stopping ATT 6 months ago',
      duration: '4 weeks',
      symptoms: [
        'Cough with blood-streaked sputum (Hemoptysis)',
        'High fever with chills (38.8°C)',
        'Severe weight loss (7 kg in 2 months)',
        'Severe fatigue and anorexia',
        'Bilateral chest pain'
      ],
      history: 'History of Pulmonary TB 2 years ago; took 1st line ATT irregularly for 3 months and default / stopped treatment prematurely.',
      vitals: {
        temp: '38.8 °C',
        pulse: '102 bpm',
        bp: '106/68 mmHg',
        rr: '22 /min',
        spO2: '94% on room air',
        bmi: '16.8 kg/m² (Severe Underweight)'
      },
      riskFactors: [
        'Previous treatment defaulter / Loss to follow-up',
        'Close contact of a known MDR-TB patient in family',
        'Severe malnutrition (BMI 16.8)',
        'Non-diabetic',
        'HIV Seronegative'
      ],
      physicalExam: 'Emaciated appearance, pale conjunctiva. Chest: Bronchial breathing and coarse crackles over left apex and right middle zone.'
    },
    nodes: [
      {
        id: 'node_presumptive_mdr',
        title: 'Presumptive TB Patient (High Risk for DR-TB)',
        subtitle: 'Treatment defaulter presenting with chronic cough and hemoptysis',
        type: 'start',
        question: 'A 42-year-old female with a history of defaulted ATT presents with recurrent cough and hemoptysis. What is the immediate clinical priority?',
        options: [
          {
            id: 'opt_mdr_p1',
            label: 'Classify as High-Risk Presumptive DR-TB and immediately order CBNAAT / GeneXpert for rapid DST',
            isCorrect: true,
            nextNodeId: 'node_cbnaat_mdr',
            rationale: 'Correct! Patients with previous treatment history (defaulters, relapses, treatment failures) are at high risk for Drug-Resistant TB (MDR-TB) and require urgent CBNAAT testing.',
            guidelineReference: 'NTEP PMDT Guidelines 2024',
            xpBonus: 80
          },
          {
            id: 'opt_mdr_p2',
            label: 'Restart standard 1st line Category-I ATT without doing drug sensitivity testing',
            isCorrect: false,
            nextNodeId: 'node_presumptive_mdr',
            rationale: 'Incorrect! Restarting 1st line ATT in a patient with unsuspected MDR-TB amplifies resistance to remaining drugs and worsens clinical outcomes.',
            guidelineReference: 'WHO Guidelines for PMDT',
            xpBonus: 0,
            penalty: 40
          }
        ]
      },
      {
        id: 'node_cbnaat_mdr',
        title: 'CBNAAT Assay Result',
        subtitle: 'Rapid molecular drug susceptibility test',
        type: 'test',
        question: 'CBNAAT result: "MTB DETECTED; RIFAMPICIN RESISTANCE DETECTED". What is the immediate next diagnostic step?',
        options: [
          {
            id: 'opt_mdr_cb1',
            label: 'Classify as Rifampicin Resistant TB (RR-TB / MDR-TB), send sputum for First-Line & Second-Line LPA and Culture DST, and refer to PMDT Nodal Centre',
            isCorrect: true,
            nextNodeId: 'node_decision_rif_resistant',
            rationale: 'Correct! Rifampicin resistance detected on CBNAAT mandates immediate referral for PMDT evaluation and extended molecular DST (First & Second Line LPA) to check for Fluoroquinolone resistance (pre-XDR TB).',
            guidelineReference: 'NTEP Guidelines on Programmatic Management of Drug Resistant TB',
            xpBonus: 150
          },
          {
            id: 'opt_mdr_cb2',
            label: 'Assume a false positive result and repeat 1st line ATT for another 6 months',
            isCorrect: false,
            nextNodeId: 'node_cbnaat_mdr',
            rationale: 'Incorrect! GeneXpert rpoB mutation detection for Rifampicin resistance has high positive predictive value. Delaying DR-TB treatment is life-threatening.',
            guidelineReference: 'WHO Policy Update on Xpert MTB/RIF',
            xpBonus: 0,
            penalty: 50
          }
        ],
        investigationDetails: {
          purpose: 'Determine presence of M. tuberculosis DNA and rpoB gene mutations conferring Rifampicin resistance.',
          procedure: 'Real-time PCR processing of sputum specimen in GeneXpert system.',
          expectedFindings: 'MTB DETECTED (High bacillary load); RIFAMPICIN RESISTANCE DETECTED.',
          interpretation: 'Rifampicin Resistant Tuberculosis (RR-TB / MDR-TB Suspect).',
          ntepNotes: 'Rifampicin resistance is a surrogate marker for MDR-TB (> 85% of RR-TB cases also have Isoniazid resistance).',
          clinicalImportance: 'Triggers immediate switch to Second-Line Drug Resistant TB diagnostic and treatment algorithms.',
          normalValues: 'MTB NOT DETECTED; Rifampicin sensitive.'
        }
      },
      {
        id: 'node_decision_rif_resistant',
        title: 'Decision: Rifampicin Resistant / DR-TB Pathway',
        subtitle: 'Confirmation of Drug-Resistant Tuberculosis',
        type: 'decision',
        question: 'Rifampicin resistance is confirmed. What is the correct clinical referral pathway?',
        options: [
          {
            id: 'opt_dr_dec1',
            label: 'Refer to PMDT Committee / Nodal Centre for All-Oral Bedaquiline-containing DR-TB Regimen',
            isCorrect: true,
            nextNodeId: 'node_pmdt_treatment',
            rationale: 'Correct! RR-TB / MDR-TB requires management under Programmatic Management of Drug-Resistant TB (PMDT) using WHO-recommended injectable-free regimens containing Bedaquiline.',
            guidelineReference: 'NTEP PMDT Guidelines 2024',
            xpBonus: 150
          }
        ]
      },
      {
        id: 'node_pmdt_treatment',
        title: 'PMDT Treatment Protocol (All-Oral DR-TB Regimen)',
        subtitle: 'Bedaquiline-containing shorter or longer MDR-TB regimen',
        type: 'treatment',
        question: 'What is the modern WHO/NTEP recommended treatment regimen for Rifampicin-Resistant / MDR-TB without fluoroquinolone resistance?',
        options: [
          {
            id: 'opt_pmdt_tx1',
            label: 'All-Oral Shorter MDR-TB Regimen (Bedaquiline + Levofloxacin + Clofazimine + Pyrazinamide + Ethambutol + High-dose H + Ethionamide) for 9-11 months',
            isCorrect: true,
            nextNodeId: 'node_final_mdr_summary',
            rationale: 'Correct! NTEP uses the All-Oral Bedaquiline-based shorter MDR-TB regimen, eliminating toxic kanamycin/amikacin injections.',
            guidelineReference: 'NTEP Operational Guidelines for DR-TB 2024',
            xpBonus: 200
          },
          {
            id: 'opt_pmdt_tx2',
            label: 'Daily Kanamycin intramuscular injections for 12 months with high-dose Isoniazid',
            isCorrect: false,
            nextNodeId: 'node_pmdt_treatment',
            rationale: 'Incorrect! Injectable agents (Kanamycin/Capreomycin) have been phased out due to severe ototoxicity and hearing loss.',
            guidelineReference: 'WHO Treatment Guidelines for MDR/RR-TB',
            xpBonus: 0,
            penalty: 50
          }
        ],
        investigationDetails: {
          purpose: 'Cure drug-resistant TB, prevent progression to XDR-TB, and suppress community transmission of resistant strains.',
          procedure: 'Baseline ECG (QTc interval monitoring), LFT, KFT, Thyroid profile, followed by initiation of All-Oral BDQ-containing regimen.',
          expectedFindings: 'Sputum culture conversion at 3-4 months, baseline QTc < 450 ms.',
          interpretation: 'Effective suppression of MDR-TB strain.',
          ntepNotes: 'Bedaquiline requires cardiac ECG monitoring at baseline, week 2, 4, 8, 12, 16, 20, and 24.',
          clinicalImportance: 'Achieves cure rates > 75-80% in previously difficult-to-treat MDR-TB cases.',
          normalValues: 'Baseline QTc < 450ms, normal liver & renal function.'
        }
      }
    ],
    finalOutputs: {
      node_pmdt_treatment: {
        diagnosis: 'Rifampicin Resistant / Drug-Resistant Pulmonary Tuberculosis (RR-TB / MDR-TB)',
        reason: 'Patient with prior defaulted ATT history presented with recurrent hemoptysis and weight loss. CBNAAT confirmed MTB Detected with Rifampicin Resistance Detected.',
        investigationsUsed: [
          'Clinical Evaluation & Relapse/Default Risk Assessment',
          'Chest Radiography: Bilateral upper and middle zone opacities',
          'Sputum ZN Microscopy: 3+ AFB Positive',
          'CBNAAT / GeneXpert MTB/RIF: MTB DETECTED; RIF RESISTANCE DETECTED',
          'First & Second-Line LPA (Line Probe Assay): Sent for Fluoroquinolone resistance screening'
        ],
        treatmentRecommendation: 'Referral to PMDT Nodal Centre:\n• Initiate All-Oral Shorter MDR-TB Regimen (9-11 months):\n  - Initial Phase (4-6 months): Bedaquiline (BDQ) + Levofloxacin (Lfx) + Clofazimine (Cfz) + Pyrazinamide (Z) + Ethambutol (E) + High-dose Isoniazid (Hh) + Ethionamide (Eto)\n  - Continuation Phase (5 months): Levofloxacin + Clofazimine + Pyrazinamide + Ethambutol\n• Baseline ECG for QTc interval monitoring.\n• Baseline Serum Potassium, Magnesium, Thyroid & Liver function tests.\n• Nikshay DR-TB registration.',
        learningSummary: [
          'Never restart 1st line ATT blindly in patients with prior treatment default or relapse without drug sensitivity testing.',
          'Rifampicin resistance on CBNAAT automatically triggers PMDT pathway for Drug-Resistant TB.',
          'Second-line Line Probe Assay (LPA) is mandatory to rule out pre-XDR TB (Fluoroquinolone resistance).',
          'Modern NTEP DR-TB regimens are All-Oral and Bedaquiline-centered, replacing toxic injectable aminoglycosides.'
        ],
        badge: 'DR-TB PMDT Specialist'
      }
    }
  },
  {
    id: 'case_pulm_03_smear_neg',
    title: 'Smear-Negative / Molecular-Negative High Suspicion TB',
    subtitle: '28-year-old male with persistent constitutional symptoms, negative sputum, but high clinical suspicion',
    type: 'pulmonary',
    difficulty: 'Advanced NTEP Pathway',
    patientInfo: {
      name: 'Anil Sharma',
      age: 28,
      gender: 'Male',
      complaint: 'Dry cough, low-grade fever, anorexia, and weight loss',
      duration: '4 weeks',
      symptoms: [
        'Non-productive dry cough (> 3 weeks)',
        'Low grade fever peaking in evenings (37.9°C)',
        'Significant anorexia and 3.8 kg weight loss',
        'Fatigue on mild exertion'
      ],
      history: 'No prior TB history. Contact with uncle diagnosed with pulmonary TB 6 months ago.',
      vitals: {
        temp: '37.9 °C',
        pulse: '82 bpm',
        bp: '120/78 mmHg',
        rr: '16 /min',
        spO2: '98% on room air',
        bmi: '19.2 kg/m²'
      },
      riskFactors: [
        'Close household contact of active TB patient',
        'Non-smoker',
        'Non-diabetic',
        'HIV Seronegative'
      ],
      physicalExam: 'Mild temporal wasting. Chest: Mildly reduced breath sounds in right apex. No overt crepitations.'
    },
    nodes: [
      {
        id: 'node_presumptive_neg',
        title: 'Presumptive TB Patient',
        subtitle: 'Symptomatic patient with close household contact',
        type: 'start',
        question: 'A 28-year-old male presents with 4 weeks of dry cough, fever, and close TB contact. Sputum Smear and initial CBNAAT are BOTH Negative for MTB. What is the correct next step?',
        options: [
          {
            id: 'opt_neg_p1',
            label: 'Assess Clinical Suspicion: If Clinical Suspicion is HIGH, order Chest X-Ray, Liquid Culture (MGIT), and repeat investigation',
            isCorrect: true,
            nextNodeId: 'node_clinical_suspicion_high',
            rationale: 'Correct! A negative CBNAAT does NOT completely rule out TB in paucibacillary cases. High clinical suspicion requires chest radiography, liquid culture (MGIT), and follow-up.',
            guidelineReference: 'NTEP Algorithm for Smear/CBNAAT Negative Presumptive TB',
            xpBonus: 85
          },
          {
            id: 'opt_neg_p2',
            label: 'Discharge patient completely and state TB is 100% ruled out',
            isCorrect: false,
            nextNodeId: 'node_presumptive_neg',
            rationale: 'Incorrect! Molecular tests have a detection limit (~131 CFU/mL). Paucibacillary pulmonary cases may be negative on initial testing but positive on liquid culture or clinical diagnosis.',
            guidelineReference: 'WHO Diagnostic Recommendations for Paucibacillary TB',
            xpBonus: 0,
            penalty: 35
          }
        ]
      },
      {
        id: 'node_clinical_suspicion_high',
        title: 'High Clinical Suspicion & Advanced Investigations',
        subtitle: 'Ordering Chest Radiography, Liquid Culture (MGIT), and Line Probe Assay',
        type: 'test',
        question: 'Chest X-Ray shows right apical fibrocavitary opacity. Liquid Sputum Culture (MGIT) returns POSITIVE for M. tuberculosis complex at 14 days. How is this case classified?',
        options: [
          {
            id: 'opt_neg_cs1',
            label: 'Microbiologically Confirmed TB (via Liquid Culture) → Initiate 1st Line ATT Regimen',
            isCorrect: true,
            nextNodeId: 'node_culture_lpa_confirmed',
            rationale: 'Correct! Positive liquid culture (MGIT) provides microbiological confirmation even when initial smear/CBNAAT were negative.',
            guidelineReference: 'NTEP Laboratory Diagnostic Standards',
            xpBonus: 140
          },
          {
            id: 'opt_neg_cs2',
            label: 'Diagnose Sarcoidosis and prescribe systemic steroids',
            isCorrect: false,
            nextNodeId: 'node_clinical_suspicion_high',
            rationale: 'Incorrect! Isolation of M. tuberculosis complex on liquid culture is 100% specific for Tuberculosis. Steroids alone without ATT would cause fulminant bacterial dissemination.',
            guidelineReference: 'WHO TB Culture Protocols',
            xpBonus: 0,
            penalty: 45
          }
        ],
        investigationDetails: {
          purpose: 'Gold standard diagnostic method for paucibacillary TB cases undetectable by smear or rapid molecular assays.',
          procedure: 'Inoculation of processed sputum into Mycobacteria Growth Indicator Tube (MGIT 960 liquid medium) with fluorometric growth monitoring.',
          expectedFindings: 'Fluorescing growth detected at 10-18 days; MPT64 antigen test confirms M. tuberculosis complex.',
          interpretation: 'Microbiologically Confirmed Paucibacillary Tuberculosis.',
          ntepNotes: 'MGIT liquid culture detects as few as 10-100 bacilli/mL, making it the most sensitive diagnostic assay.',
          clinicalImportance: 'Prevents missed diagnosis in early or low-bacterial load cases.',
          normalValues: 'No mycobacterial growth after 42 days of incubation (Culture Negative).'
        }
      },
      {
        id: 'node_culture_lpa_confirmed',
        title: 'Clinical / Culture Diagnosis Confirmed',
        subtitle: 'Targeted anti-tubercular therapy for paucibacillary pulmonary TB',
        type: 'treatment',
        question: 'With culture confirmation and negative drug resistance on LPA, what is the treatment plan?',
        options: [
          {
            id: 'opt_neg_tx1',
            label: 'Start Standard 6-Month NTEP FDC Regimen (2HRZE / 4HRE) with regular clinical follow-up',
            isCorrect: true,
            nextNodeId: 'node_final_neg_summary',
            rationale: 'Correct! Standard 6-month daily FDC ATT is indicated for culture-confirmed drug-sensitive pulmonary TB.',
            guidelineReference: 'NTEP Treatment Guidelines 2024',
            xpBonus: 180
          }
        ]
      }
    ],
    finalOutputs: {
      node_culture_lpa_confirmed: {
        diagnosis: 'Microbiologically Confirmed (Culture Positive) Drug-Sensitive Pulmonary Tuberculosis',
        reason: 'Patient presented with 4 weeks of constitutional symptoms and positive contact history. Initial Sputum Smear and CBNAAT were negative (paucibacillary). Chest X-Ray showed right apical fibrocavitary opacities. Liquid Culture (MGIT 960) confirmed M. tuberculosis complex growth.',
        investigationsUsed: [
          'Initial Sputum AFB Microscopy: Smear Negative',
          'Initial CBNAAT Assay: MTB Not Detected (Paucibacillary)',
          'Chest Radiography (PA View): Right apical opacity with fibrocavitary changes',
          'Liquid Culture (MGIT 960): POSITIVE for M. tuberculosis complex at 14 days',
          'First-Line Line Probe Assay (LPA): Sensitive to Isoniazid and Rifampicin'
        ],
        treatmentRecommendation: 'Initiate Standard NTEP Daily FDC Regimen:\n• 2 Months Intensive Phase (HRZE)\n• 4 Months Continuation Phase (HRE)\n• Follow-up liquid culture at 2 months.\n• Nikshay registration.',
        learningSummary: [
          'A negative CBNAAT or Sputum Smear does NOT exclude TB when clinical suspicion remains high.',
          'Liquid Culture (MGIT 960) is the gold standard for paucibacillary TB (detects 10-100 CFU/mL).',
          'Radiological lesions combined with positive liquid culture establish definitive diagnosis.',
          'Always complete the diagnostic tree step-by-step per NTEP algorithm.'
        ],
        badge: 'Diagnostic Logic Master'
      }
    }
  }
];
