import { PatientCase } from '../types';

export const COMPREHENSIVE_CASES: PatientCase[] = [
  // LEVEL 1: BASIC SYMPTOM RECOGNITION
  {
    id: 'case_l1_pulmonary',
    title: 'Level 1: Presumptive Pulmonary TB Triage',
    type: 'pulmonary',
    levelNumber: 1,
    difficulty: 'Level 1: Basic',
    learningObjectives: [
      'Identify symptoms of presumptive pulmonary TB',
      'Select appropriate first-line investigation (Smear & CBNAAT)',
      'Avoid prescribing inappropriate empiric antibiotics'
    ],
    patient: {
      name: 'Ramesh Kumar',
      age: 34,
      gender: 'Male',
      symptoms: ['Persistent Cough for 3 weeks', 'Low-grade Evening Fever', 'Unexplained Weight Loss (4 kg)', 'Night Sweats'],
      duration: '3 Weeks',
      riskFactors: ['Lives in overcrowded urban settlement', 'Chain smoker'],
      history: 'Presents to OPD complaining of productive cough with yellowish sputum for 21 days. He notices his clothes getting loose and sweating at night.',
      vitalSigns: {
        temp: '37.9 °C',
        weight: '54 kg',
        spO2: '97%'
      }
    },
    steps: [
      {
        id: 'l1_step1',
        title: 'Step 1: Clinical Triage & Initial Investigation Order',
        question: 'Which is the most appropriate next step for Ramesh presenting with cough > 2 weeks and fever?',
        subtitle: 'Select the primary diagnostic investigation aligned with NTEP guidelines.',
        options: [
          {
            id: 'l1_opt1',
            label: 'Order Sputum Smear Microscopy and CBNAAT (Xpert MTB/RIF)',
            isCorrect: true,
            rationale: 'Correct! National guidelines recommend rapid molecular testing (CBNAAT) and smear microscopy for any presumptive pulmonary TB patient with cough ≥ 2 weeks.',
            guidelineReference: 'NTEP Guidelines 2024 - Chapter 3: Pulmonary TB Diagnosis',
            nextStepId: 'l1_step2',
            xpBonus: 100
          },
          {
            id: 'l1_opt2',
            label: 'Prescribe 2 weeks of Amoxicillin and ask him to return if symptoms persist',
            isCorrect: false,
            rationale: 'Incorrect! Presumptive TB with classic constitutional symptoms requires immediate diagnostic testing without delaying for antibiotic trials.',
            guidelineReference: 'NTEP Standard of Care - Rule 1.2',
            nextStepId: 'l1_step1',
            xpBonus: 0,
            penalty: 30
          },
          {
            id: 'l1_opt3',
            label: 'Order CT Scan of Chest immediately as first line test',
            isCorrect: false,
            rationale: 'Incorrect! High-resolution CT scan is unnecessary and expensive for initial screening when molecular testing (CBNAAT) is available.',
            guidelineReference: 'NTEP Diagnostic Optimization Guidelines',
            nextStepId: 'l1_step1',
            xpBonus: 0,
            penalty: 40
          }
        ]
      },
      {
        id: 'l1_step2',
        title: 'Step 2: CBNAAT & Smear Interpretation',
        question: 'CBNAAT Result: MTB DETECTED, Rifampicin Resistance NOT DETECTED. Sputum Smear: 2+ Positive. What is the correct management?',
        subtitle: 'Microbiologically confirmed pulmonary TB with Rifampicin sensitivity.',
        labReport: {
          smearMicroscopy: {
            result: '2+ Positive',
            details: 'Acid-Fast Bacilli (AFB) observed: 1-10 AFB per oil immersion field.'
          },
          cbnaat: {
            mtbStatus: 'MTB Detected',
            rifResistance: 'Rifampicin Sensitive'
          },
          chestXray: {
            findings: 'Apical patchy infiltrates in right upper lobe with early cavitation.',
            impression: 'Findings highly suggestive of active pulmonary tuberculosis.'
          }
        },
        options: [
          {
            id: 'l1_step2_optA',
            label: 'Initiate Standard 1st Line Anti-TB Treatment (2HRZE / 4HRE) & Offer HIV Counseling',
            isCorrect: true,
            rationale: 'Correct! Microbiologically confirmed drug-sensitive TB warrants immediate 1st-line fixed dose combination anti-TB therapy alongside routine HIV screening.',
            guidelineReference: 'NTEP Treatment Guidelines 2024',
            nextStepId: 'result_success',
            xpBonus: 150
          },
          {
            id: 'l1_step2_optB',
            label: 'Wait for 6 weeks for Sputum Culture results before starting treatment',
            isCorrect: false,
            rationale: 'Incorrect! CBNAAT confirmation provides actionable diagnosis in 2 hours. Treatment must be initiated without waiting for culture.',
            guidelineReference: 'NTEP Rapid Diagnostic Protocol',
            nextStepId: 'l1_step2',
            xpBonus: 0,
            penalty: 50
          }
        ]
      }
    ]
  },

  // LEVEL 2: DIAGNOSTIC INVESTIGATION INTERPRETATION
  {
    id: 'case_l2_lab_reader',
    title: 'Level 2: Lab & Radiology Investigation Reader',
    type: 'pulmonary',
    levelNumber: 2,
    difficulty: 'Level 2: Lab Reader',
    learningObjectives: [
      'Interpret complex CBNAAT / Xpert MTB/RIF reports',
      'Analyze chest radiograph abnormalities',
      'Correlate smear microscopy with molecular DST'
    ],
    patient: {
      name: 'Sunita Devi',
      age: 28,
      gender: 'Female',
      symptoms: ['Cough with blood-tinged sputum (Hemoptysis)', 'High fever', 'Loss of appetite', 'Fatigue'],
      duration: '4 Weeks',
      riskFactors: ['Diabetes Mellitus (Uncontrolled)', 'Postpartum 3 months'],
      history: 'Presented to casualty after coughing up small specks of blood in sputum for 2 days. She has lost 6 kg since childbirth.',
      vitalSigns: {
        temp: '38.4 °C',
        weight: '46 kg',
        spO2: '95%'
      }
    },
    initialReport: {
      smearMicroscopy: {
        result: '3+ Positive',
        details: '> 10 AFB per oil immersion field on ZN staining.'
      },
      chestXray: {
        findings: 'Bilateral upper lobe consolidation with thick-walled cavitation on left upper zone.',
        impression: 'Advanced cavitary pulmonary tuberculosis.'
      }
    },
    steps: [
      {
        id: 'l2_step1',
        title: 'Step 1: Radiological & Smear Correlation',
        question: 'Sunita has 3+ Sputum Smear and cavitary CXR. What is the immediate requirement before starting therapy?',
        subtitle: 'Evaluate PMDT guidelines for high smear-burden cases.',
        options: [
          {
            id: 'l2_opt1',
            label: 'Perform mandatory CBNAAT to establish baseline Rifampicin resistance status',
            isCorrect: true,
            rationale: 'Correct! Under NTEP PMDT guidelines, all smear-positive cases must undergo CBNAAT/Xpert testing to rule out baseline Rifampicin resistance before treatment.',
            guidelineReference: 'NTEP Drug Resistance Screening Standard',
            nextStepId: 'l2_step2',
            xpBonus: 120
          },
          {
            id: 'l2_opt2',
            label: 'Start 1st line ATT directly without CBNAAT testing',
            isCorrect: false,
            rationale: 'Incorrect! Starting treatment without baseline DST risks giving ineffective 1st-line drugs if the patient harbors primary Rifampicin resistance.',
            guidelineReference: 'NTEP Standard 3.1',
            nextStepId: 'l2_step1',
            xpBonus: 0,
            penalty: 40
          }
        ]
      },
      {
        id: 'l2_step2',
        title: 'Step 2: CBNAAT Molecular Interpretation',
        question: 'CBNAAT Report shows: MTB DETECTED (High), RIFAMPICIN RESISTANCE DETECTED. What is the correct clinical pathway?',
        subtitle: 'Interpretation of Rifampicin Resistant TB (RR-TB / MDR-TB).',
        labReport: {
          cbnaat: {
            mtbStatus: 'MTB Detected',
            rifResistance: 'Rifampicin Resistant',
            errorDetails: 'rpoB mutation detected at codon 531 (S531L).'
          }
        },
        options: [
          {
            id: 'l2_step2_optA',
            label: 'Refer to PMDT Nodal Center for Second-Line LPA / Culture DST & All-Oral Bedaquiline MDR Regimen',
            isCorrect: true,
            rationale: 'Correct! Confirmed Rifampicin resistance requires immediate referral to PMDT center for second-line Line Probe Assay (LPA) and initiation of MDR-TB therapy.',
            guidelineReference: 'NTEP PMDT Guidelines 2024 - MDR-TB Management',
            nextStepId: 'result_success',
            xpBonus: 180
          },
          {
            id: 'l2_step2_optB',
            label: 'Add Streptomycin injection to 1st line HRZE drugs at home OPD',
            isCorrect: false,
            rationale: 'Incorrect! Adding a single drug to a failing/resistant regimen leads to amplification of drug resistance to XDR-TB.',
            guidelineReference: 'WHO Consolidated DR-TB Guidelines',
            nextStepId: 'l2_step2',
            xpBonus: 0,
            penalty: 60
          }
        ]
      }
    ]
  },

  // LEVEL 3: PEDIATRIC TB ALGORITHM NAVIGATION
  {
    id: 'case_l3_pediatric',
    title: 'Level 3: Pediatric Diagnostic Pathway & TB Score',
    type: 'pediatric',
    levelNumber: 3,
    difficulty: 'Level 3: Algorithm',
    learningObjectives: [
      'Navigate the Pediatric TB flowchart (Page 22)',
      'Calculate composite Pediatric TB Score',
      'Apply contact history & TST induration rules'
    ],
    patient: {
      name: 'Master Aarav',
      age: 5,
      gender: 'Male',
      symptoms: ['Fever for 18 days', 'Failure to gain weight / Weight loss', 'Chronic dry cough', 'Lethargy & reduced playfulness'],
      duration: '3 Weeks',
      riskFactors: ['Father treated for open pulmonary TB 4 months ago'],
      history: 'Brought by mother due to persistent fever not responding to Paracetamol and Amoxicillin. Child looks undernourished with cervical lymph node enlargement.',
      vitalSigns: {
        temp: '38.1 °C',
        weight: '12 kg (Severe Underweight)',
        spO2: '96%'
      }
    },
    steps: [
      {
        id: 'l3_step1',
        title: 'Step 1: Gastric Aspirate / Sputum Molecular Testing',
        question: 'Gastric Aspirate Xpert MTB/RIF returned: MTB NOT DETECTED. What is the next algorithmic branch on the Pediatric Flowchart?',
        subtitle: 'Following Page 22 Pediatric TB diagnostic logic for molecular negative cases.',
        labReport: {
          cbnaat: {
            mtbStatus: 'MTB Not Detected',
            rifResistance: 'N/A'
          }
        },
        options: [
          {
            id: 'l3_opt1',
            label: 'Proceed to Access Chest X-Ray and Mantoux Tuberculin Skin Test (TST)',
            isCorrect: true,
            rationale: 'Correct! On the Pediatric TB algorithm (Page 22), when molecular test is negative, the next step is accessing CXR and TST to evaluate the pediatric composite score.',
            guidelineReference: 'Pediatric TB Diagnostic Pathway - Page 22',
            nextStepId: 'l3_step2',
            xpBonus: 130
          },
          {
            id: 'l3_opt2',
            label: 'Rule out TB completely since Xpert is negative',
            isCorrect: false,
            rationale: 'Incorrect! Pediatric TB is paucibacillary; negative Xpert DOES NOT rule out TB in children with strong clinical features and contact history.',
            guidelineReference: 'IAP & NTEP Pediatric TB Guidelines',
            nextStepId: 'l3_step1',
            xpBonus: 0,
            penalty: 40
          }
        ]
      },
      {
        id: 'l3_step2',
        title: 'Step 2: Pediatric TB Score Evaluation',
        question: 'CXR shows hilar lymphadenopathy. Mantoux TST shows 14mm induration. Child has contact history. What is the Pediatric TB Score?',
        subtitle: 'Score matrix: Fever (>2wks)=2, Weight loss=2, CXR adenopathy=2, TST positive=3, Contact=2.',
        labReport: {
          chestXray: {
            findings: 'Right hilar lymph node enlargement with parenchymal opacity.',
            impression: 'Suggestive of primary complex / pediatric pulmonary TB.'
          },
          tstMantoux: {
            indurationMm: 14,
            interpretation: 'Positive (≥ 10mm)'
          },
          tbScore: {
            score: 9,
            interpretation: 'High Clinical Probability (Score ≥ 6)'
          }
        },
        options: [
          {
            id: 'l3_step2_optA',
            label: 'Initiate Pediatric Anti-TB Treatment (Score ≥ 6 indicates active TB)',
            isCorrect: true,
            rationale: 'Correct! According to the Pediatric algorithm (Page 22), a TB score ≥ 6 warrants immediate initiation of anti-TB treatment.',
            guidelineReference: 'Pediatric TB Algorithm (Page 22) - Score ≥ 6 Branch',
            nextStepId: 'result_success',
            xpBonus: 160
          },
          {
            id: 'l3_step2_optB',
            label: 'Observe child for 2 weeks without treatment',
            isCorrect: false,
            rationale: 'Incorrect! The 2-week observation rule applies ONLY when Score < 6 AND Contact is negative AND TST is negative.',
            guidelineReference: 'Pediatric TB Algorithm Flowchart Decision Node',
            nextStepId: 'l3_step2',
            xpBonus: 0,
            penalty: 50
          }
        ]
      }
    ]
  },

  // LEVEL 4: ADVANCED COMPLICATED CASES (HIV-TB & MDR)
  {
    id: 'case_l4_hiv_tb',
    title: 'Level 4: HIV-Associated Tuberculosis & MDR Risk',
    type: 'hiv',
    levelNumber: 4,
    difficulty: 'Level 4: Complex',
    learningObjectives: [
      'Manage HIV-TB co-infection diagnostic protocol',
      'Initiate CPT (Cotrimoxazole) & ART timing',
      'Differentiate Latent TB Infection (LTBI) from active disease'
    ],
    patient: {
      name: 'Priya Sharma',
      age: 31,
      gender: 'Female',
      symptoms: ['Fever for 3 weeks', 'Night sweats', 'Submandibular lymph node enlargement', 'Weight loss of 5 kg'],
      duration: '1 Month',
      riskFactors: ['Known PLHIV (CD4 count 180 cells/µL)', 'Art Naive'],
      history: 'Known HIV-positive patient referred from ART center with chronic fever and cervical lymphadenopathy. Chest X-ray shows normal lung fields.',
      vitalSigns: {
        temp: '38.6 °C',
        weight: '42 kg',
        spO2: '98%'
      }
    },
    initialReport: {
      hivStatus: 'Positive',
      chestXray: {
        findings: 'Normal lung parenchyma. No focal consolidation.',
        impression: 'Normal CXR (Common in advanced HIV immunosuppression).'
      }
    },
    steps: [
      {
        id: 'l4_step1',
        title: 'Step 1: Rapid Molecular Diagnostic Testing in PLHIV',
        question: 'Priya has normal CXR but CD4 count 180 and persistent fever. What is the priority investigation?',
        subtitle: 'PLHIV diagnostic algorithm (Page 21 & 23).',
        options: [
          {
            id: 'l4_opt1',
            label: 'Perform Sputum CBNAAT & Lymph Node Fine Needle Aspirate (FNAC) for CBNAAT',
            isCorrect: true,
            rationale: 'Correct! PLHIV frequently present with smear-negative or extrapulmonary TB despite normal CXR. Rapid molecular testing (CBNAAT) on sputum and FNAC specimen is mandatory.',
            guidelineReference: 'NTEP HIV-TB Co-infection Guidelines 2024',
            nextStepId: 'l4_step2',
            xpBonus: 150
          },
          {
            id: 'l4_opt2',
            label: 'Diagnose non-TB viral infection and start ART immediately without TB workup',
            isCorrect: false,
            rationale: 'Incorrect! Starting ART without ruling out or treating active TB risks severe immune reconstitution inflammatory syndrome (IRIS).',
            guidelineReference: 'WHO HIV-TB Clinical Management Guidelines',
            nextStepId: 'l4_step1',
            xpBonus: 0,
            penalty: 50
          }
        ]
      },
      {
        id: 'l4_step2',
        title: 'Step 2: FNAC CBNAAT Result & Treatment Integration',
        question: 'Lymph Node FNAC CBNAAT: MTB DETECTED, Rifampicin Sensitive. What is the correct sequence of care?',
        subtitle: 'Managing Anti-TB Treatment, CPT, and ART timing.',
        labReport: {
          cbnaat: {
            mtbStatus: 'MTB Detected',
            rifResistance: 'Rifampicin Sensitive'
          }
        },
        options: [
          {
            id: 'l4_step2_optA',
            label: 'Start 1st Line ATT + CPT immediately; Initiate ART within 2 to 4 weeks of starting ATT',
            isCorrect: true,
            rationale: 'Correct! In PLHIV with active TB and CD4 < 50-200, ATT and CPT (Cotrimoxazole Preventive Therapy) are started immediately, followed by ART within 2-4 weeks.',
            guidelineReference: 'National Guidelines for HIV-TB Collaborative Activities (Page 23 Note 5)',
            nextStepId: 'result_success',
            xpBonus: 200
          },
          {
            id: 'l4_step2_optB',
            label: 'Delay ATT until 6 months of ART is completed',
            isCorrect: false,
            rationale: 'Incorrect! Delaying ATT in active TB with low CD4 count carries very high mortality.',
            guidelineReference: 'NTEP Management Rules',
            nextStepId: 'l4_step2',
            xpBonus: 0,
            penalty: 60
          }
        ]
      }
    ]
  },

  // LEVEL 5: TIME-CRITICAL MISSIONS
  {
    id: 'case_l5_timed_mission',
    title: 'Level 5: Time-Critical Emergency Triage Challenge',
    type: 'time-critical',
    levelNumber: 5,
    difficulty: 'Level 5: Time-Critical',
    timeLimitSeconds: 60,
    learningObjectives: [
      'Rapid clinical decision making under high pressure',
      'Prioritize diagnostic tests efficiently',
      'Minimize unnecessary health system delays'
    ],
    patient: {
      name: 'Emergency Ward Triage (Patient #409)',
      age: 45,
      gender: 'Male',
      symptoms: ['Massive Hemoptysis (Coughing blood > 200ml)', 'Dyspnea', 'Fever'],
      duration: 'Acute Exacerbation',
      riskFactors: ['Prior incomplete anti-TB treatment 2 years ago'],
      history: 'Brought to casualty with active hemoptysis and distress. Past history of default from 1st line ATT.',
      vitalSigns: {
        temp: '38.8 °C',
        weight: '50 kg',
        spO2: '91%'
      }
    },
    steps: [
      {
        id: 'l5_step1',
        title: 'Mission Step 1: Rapid Airway Stabilization & Diagnostic Selection',
        question: 'Patient has active hemoptysis & prior treatment default history. Time remaining is counting down! Choose action:',
        subtitle: 'High risk MDR suspect presenting in emergency setting.',
        options: [
          {
            id: 'l5_opt1',
            label: 'Stabilize airway, isolate patient, and order Urgent STAT Sputum CBNAAT + CXR',
            isCorrect: true,
            rationale: 'Correct! Rapid stabilization, airborne isolation, and urgent STAT CBNAAT are critical for prior treatment default cases with severe symptoms.',
            guidelineReference: 'Emergency TB Triage & Infection Control Protocol',
            nextStepId: 'l5_step2',
            xpBonus: 180
          },
          {
            id: 'l5_opt2',
            label: 'Order outpatient routine sputum smear and discharge to home',
            isCorrect: false,
            rationale: 'Incorrect! Discharging an unstable patient with massive hemoptysis and MDR suspicion is life-threatening.',
            guidelineReference: 'Emergency Protocol Violation',
            nextStepId: 'l5_step1',
            xpBonus: 0,
            penalty: 60
          }
        ]
      },
      {
        id: 'l5_step2',
        title: 'Mission Step 2: STAT CBNAAT Result Action',
        question: 'CBNAAT STAT Result: MTB DETECTED, RIFAMPICIN RESISTANT. Final decision under 15 seconds:',
        subtitle: 'Confirmed MDR-TB case in high-risk default patient.',
        labReport: {
          cbnaat: {
            mtbStatus: 'MTB Detected',
            rifResistance: 'Rifampicin Resistant'
          }
        },
        options: [
          {
            id: 'l5_step2_optA',
            label: 'Transfer to Airborne Isolation Ward & Immediate PMDT Referral for Bedaquiline MDR Regimen',
            isCorrect: true,
            rationale: 'Perfect rapid execution! Emergency PMDT referral and isolation prevent institutional transmission and treat drug resistance.',
            guidelineReference: 'NTEP Emergency PMDT Protocol 2024',
            nextStepId: 'result_success',
            xpBonus: 250
          },
          {
            id: 'l5_step2_optB',
            label: 'Give oral paracetamol and re-test next month',
            isCorrect: false,
            rationale: 'Incorrect! Critical diagnostic delay.',
            guidelineReference: 'Severe Failure',
            nextStepId: 'l5_step2',
            xpBonus: 0,
            penalty: 80
          }
        ]
      }
    ]
  }
];
