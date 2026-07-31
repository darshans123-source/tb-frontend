export interface LearningModuleDetail {
  id: string;
  title: string;
  category: string;
  iconName: string;
  overview: string;
  learningObjectives: string[];
  introduction: string;
  epidemiology: string;
  causes: string;
  riskFactors: string[];
  signsAndSymptoms: {
    pulmonary: string[];
    extrapulmonary: string[];
    pediatric: string[];
  };
  transmission: string;
  prevention: string[];
  diagnosticApproach: string;
  laboratoryInvestigations: {
    name: string;
    description: string;
    interpretation: string;
  }[];
  imagingFindings: string[];
  differentialDiagnosis: string[];
  treatment: string;
  drugRegimens: {
    regimen: string;
    drugs: string;
    duration: string;
    notes: string;
  }[];
  followUp: string;
  infectionControl: string[];
  clinicalPearls: string[];
  keyTakeaways: string[];
  flowchartData: {
    title: string;
    steps: string[];
  };
  caseScenario: {
    patient: string;
    presentation: string;
    question: string;
    options: {
      label: string;
      isCorrect: boolean;
      rationale: string;
    }[];
  };
  guidelineSummary: string;
  references: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const DETAILED_MODULES: Record<string, LearningModuleDetail> = {
  'm1': {
    id: 'm1',
    title: 'TB Basics, Epidemiology & Transmission (CDC & NTEP Framework)',
    category: 'New Learning Categories',
    iconName: 'BookOpen',
    overview: 'Comprehensive overview of Tuberculosis epidemiology, infection transmission dynamics, risk factor stratification, and disease prevention strategies based on CDC and WHO guidelines.',
    learningObjectives: [
      'Understand global and national epidemiology of Mycobacterium tuberculosis.',
      'Identify airborne transmission dynamics, droplet nuclei production, and exposure factors.',
      'Recognize key medical and social risk factors for TB infection and progression.',
      'Differentiate Latent TB Infection (LTBI) from active TB disease.',
      'Apply CDC and WHO infection control principles in healthcare settings.'
    ],
    introduction: 'Tuberculosis (TB) is a communicable disease caused by Mycobacterium tuberculosis complex. It spreads through airborne droplets when a person with pulmonary or laryngeal TB coughs, sneezes, or speaks. Although TB predominantly affects the lungs (pulmonary TB), it can involve any organ system (extrapulmonary TB).',
    epidemiology: 'TB remains one of the top infectious killers worldwide. According to the WHO and CDC, approximately one-quarter of the global population is infected with M. tuberculosis. High-burden countries account for over 80% of global cases. In endemic regions, overcrowding, malnutrition, HIV co-infection, and poverty drive transmission.',
    causes: 'M. tuberculosis is an obligate aerobic, non-motile, acid-fast bacillus (AFB) with a high cell wall lipid content (mycolic acids), making it resistant to Gram staining and acid decolorization.',
    riskFactors: [
      'HIV / Immunosuppression (Highest risk for progression from LTBI to active disease)',
      'Close contact with known active pulmonary TB case',
      'Diabetes Mellitus (3x risk of TB development)',
      'Undernutrition / Low BMI (< 18.5 kg/m²)',
      'Silicosis, Chronic Kidney Disease, End-Stage Renal Disease',
      'Treatment with TNF-alpha inhibitors, steroids, or immunosuppressive drugs',
      'Substance abuse, tobacco smoking, and heavy alcohol use',
      'Living or working in high-density congregate settings (prisons, shelters, hostels)'
    ],
    signsAndSymptoms: {
      pulmonary: [
        'Persistent cough lasting ≥ 2 weeks (often productive)',
        'Hemoptysis (coughing up blood or blood-streaked sputum)',
        'Unexplained fever (typically low-grade with evening temperature spikes)',
        'Profuse night sweats',
        'Unintentional weight loss and loss of appetite (anorexia)',
        'Chest pain and generalized fatigue / malaise'
      ],
      extrapulmonary: [
        'Lymphadenopathy (Painless cervical lymph node enlargement - Scrofula)',
        'Pleural effusion (Exudative, lymphocyte-predominant fluid)',
        'TB Meningitis (Headache, neck stiffness, cranial nerve palsies, altered sensorium)',
        'Spinal TB / Pott\'s Disease (Back pain, kyphosis, neurological deficits)',
        'Abdominal TB (Ascites, bowel obstruction, omental caking)'
      ],
      pediatric: [
        'Unexplained persistent fever > 2 weeks not responding to antibiotics',
        'Failure to thrive / Significant weight loss or failure to gain weight',
        'Chronic non-remitting cough > 2 weeks',
        'Lethargy and reduced playfulness'
      ]
    },
    transmission: 'Transmission occurs via airborne droplet nuclei (1 to 5 microns in size). When an infectious individual coughs, droplets evaporate leaving droplet nuclei that remain suspended in the air for hours. Infection depends on exposure duration, proximity, concentration of bacilli, and ventilation.',
    prevention: [
      'BCG (Bacille Calmette-Guérin) Vaccination at birth to protect against severe pediatric TB (TB meningitis & miliary TB).',
      'Tuberculosis Preventive Treatment (TPT) with Isoniazid (IPT) or 3HP (Rapapentin + INH) for household contacts and PLHIV after ruling out active disease.',
      'Airborne Infection Control: Natural cross-ventilation, UV germicidal irradiation, N95 respirators for healthcare personnel.'
    ],
    diagnosticApproach: 'Evaluation begins with identifying presumptive TB symptoms (cough ≥ 2 weeks, fever, weight loss). All presumptive cases undergo immediate rapid molecular diagnostic testing (CBNAAT / Xpert MTB/RIF) and sputum microscopy alongside chest radiograph.',
    laboratoryInvestigations: [
      {
        name: 'CBNAAT / Xpert MTB/RIF',
        description: 'Automated real-time PCR assay detecting M. tuberculosis DNA and rpoB gene mutations for Rifampicin resistance within 2 hours.',
        interpretation: 'Primary diagnostic test. MTB Detected vs Not Detected; Rif Sensitive vs Resistant vs Indeterminate.'
      },
      {
        name: 'Acid-Fast Bacilli (AFB) Smear Microscopy',
        description: 'Ziehl-Neelsen or Auramine Fluorescence staining of 2 sputum specimens (spot and morning).',
        interpretation: 'Graded as 1+, 2+, 3+ or Scanty based on AFB count per oil immersion field.'
      },
      {
        name: 'Liquid Culture (MGIT 960)',
        description: 'Automated Mycobacteria Growth Indicator Tube culture; gold standard for confirmation and second-line DST.',
        interpretation: 'Growth detected in 10-21 days; allows full drug susceptibility testing.'
      }
    ],
    imagingFindings: [
      'Apical and subapical lung field patchy infiltrates',
      'Thick-walled cavitary lesions (indicative of high bacillary load)',
      'Hilar and mediastinal lymphadenopathy (common in pediatric and HIV cases)',
      'Miliary pattern (millet seed-like 1-3mm nodules distributed bilaterally throughout lung fields)'
    ],
    differentialDiagnosis: [
      'Bacterial Pneumonia (Streptococcus pneumoniae, Klebsiella)',
      'Fungal Lung Infection (Histoplasmosis, Aspergilloma, Blastomycosis)',
      'Lung Malignancy (Bronchogenic carcinoma)',
      'Sarcoidosis & Wegener\'s Granulomatosis',
      'Bronchiectasis & Chronic Lung Abscess'
    ],
    treatment: 'Standard treatment for drug-sensitive TB consists of a 6-month regimen divided into an Intensive Phase (2 months of HRZE) and a Continuation Phase (4 months of HRE).',
    drugRegimens: [
      {
        regimen: '2HRZE / 4HRE (Drug-Sensitive Pulmonary TB)',
        drugs: 'Isoniazid (H), Rifampicin (R), Pyrazinamide (Z), Ethambutol (E)',
        duration: '2 Months Intensive + 4 Months Continuation',
        notes: 'Administered daily as weight-banded Fixed Dose Combinations (FDCs).'
      },
      {
        regimen: 'All-Oral Bedaquiline MDR Regimen',
        drugs: 'Bedaquiline, Levofloxacin/Moxifloxacin, Linezolid, Clofazimine, Cycloserine',
        duration: '9 to 18 Months',
        notes: 'For Rifampicin-Resistant / MDR-TB under PMDT guidance.'
      }
    ],
    followUp: 'Patients are monitored monthly for clinical response and weight gain. Sputum smear microscopy is repeated at the end of the 2-month Intensive Phase. Liver function tests (LFT) are monitored if symptomatic for hepatotoxicity.',
    infectionControl: [
      'Isolate infectious patients in airborne infection isolation rooms (AIIR) with negative pressure.',
      'Ensure minimum 12 air changes per hour (ACH).',
      'Instruct patients on cough hygiene (covering mouth with tissue or wearing surgical mask).',
      'Healthcare workers must wear fitted N95 respirators.'
    ],
    clinicalPearls: [
      'Rifampicin resistance is a surrogate marker for Multidrug-Resistant TB (MDR-TB).',
      'Always rule out active TB before initiating TB Preventive Treatment (TPT) to prevent drug resistance.',
      'Pyridoxine (Vitamin B6) 10-50 mg daily should be co-prescribed with Isoniazid to prevent peripheral neuropathy.'
    ],
    keyTakeaways: [
      'Presumptive TB = Cough ≥ 2 weeks, fever, weight loss, night sweats.',
      'CBNAAT is the primary diagnostic choice for rapid identification and drug resistance screening.',
      'Standard 1st line regimen is 2HRZE / 4HRE daily FDCs.'
    ],
    flowchartData: {
      title: 'Presumptive TB Diagnostic Flowchart',
      steps: [
        'Identify Patient with Presumptive TB Symptoms',
        'Order Sputum CBNAAT / Xpert MTB/RIF + Smear Microscopy + CXR',
        'If MTB Detected & Rif Sensitive -> Start 1st Line ATT (2HRZE / 4HRE)',
        'If MTB Detected & Rif Resistant -> Refer to PMDT for MDR Regimen',
        'If MTB Not Detected -> Assess Clinical Suspicion & Rule out Alternate Diagnoses'
      ]
    },
    caseScenario: {
      patient: 'Ramesh, 34M, construction worker presenting with 3-week history of productive cough, fever, and 5kg weight loss.',
      presentation: 'Sputum ZN Smear shows 2+ AFB. CXR reveals right upper zone infiltrate with small cavity.',
      question: 'What is the most essential immediate diagnostic test to order before starting anti-TB treatment?',
      options: [
        {
          label: 'CBNAAT / Xpert MTB/RIF to test for baseline Rifampicin resistance',
          isCorrect: true,
          rationale: 'Correct! Under CDC and NTEP guidelines, all smear-positive cases must undergo CBNAAT to rule out Rifampicin resistance prior to treatment.'
        },
        {
          label: 'Empiric broad spectrum fluoroquinolone antibiotics for 14 days',
          isCorrect: false,
          rationale: 'Incorrect! Fluoroquinolones mask TB and delay proper diagnostic confirmation.'
        }
      ]
    },
    guidelineSummary: 'CDC Core Curriculum on Tuberculosis (2024) & WHO Consolidated Guidelines: Emphasize rapid molecular testing for all presumptive cases, early airborne infection control, daily fixed-dose combination therapy, and universal HIV screening.',
    references: [
      'CDC. Core Curriculum on Tuberculosis: What the Clinician Should Know. 7th Edition.',
      'WHO Consolidated Guidelines on Tuberculosis. Module 3: Diagnosis.',
      'NTEP Training Modules for Medical Officers, Central TB Division, MoHFW, India.'
    ],
    quiz: [
      {
        question: 'Which gene mutation is primarily detected by CBNAAT to identify Rifampicin resistance?',
        options: ['rpoB gene', 'katG gene', 'inhA promoter', 'gyrA gene'],
        correctIndex: 0,
        explanation: 'CBNAAT targets the 81-bp rifampicin resistance-determining region (RRDR) of the bacterial rpoB gene.'
      },
      {
        question: 'What is the duration of the Intensive Phase in standard drug-sensitive pulmonary TB treatment?',
        options: ['1 Month', '2 Months', '4 Months', '6 Months'],
        correctIndex: 1,
        explanation: 'The Intensive Phase consists of 2 months of HRZE (Isoniazid, Rifampicin, Pyrazinamide, Ethambutol).'
      }
    ]
  }
};
