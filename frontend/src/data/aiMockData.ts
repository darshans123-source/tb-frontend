export interface AIChatPair {
  keywords: string[];
  response: string;
}

export interface AIQuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AICaseTemplate {
  id: string;
  title: string;
  type: 'pulmonary' | 'pediatric' | 'mdr' | 'hiv';
  difficulty: 'Level 1: Basic' | 'Level 2: Lab Reader' | 'Level 3: Algorithm' | 'Level 4: Complex' | 'Level 5: Time-Critical';
  patient: {
    name: string;
    age: number;
    gender: string;
    symptoms: string[];
    duration: string;
    riskFactors: string[];
    history: string;
  };
  steps: {
    question: string;
    options: {
      label: string;
      isCorrect: boolean;
      rationale: string;
    }[];
  }[];
}

export const AI_CHAT_DATA: AIChatPair[] = [
  {
    keywords: ['cbnaat', 'xpert', 'gene xpert', 'pcr'],
    response: 'CBNAAT (Cartridge-Based Nucleic Acid Amplification Test) / Xpert MTB/RIF is an automated real-time PCR assay. It simultaneously detects Mycobacterium tuberculosis complex DNA and rpoB gene mutations conferring Rifampicin resistance within 2 hours. NTEP recommends CBNAAT as the primary diagnostic test for all presumptive TB cases.'
  },
  {
    keywords: ['smear', 'microscopy', 'zn', 'acid fast', 'afb'],
    response: 'Sputum smear microscopy uses Ziehl-Neelsen (ZN) or Auramine fluorescence staining to visualize Acid-Fast Bacilli (AFB). Grading ranges from Scanty (1-9 AFB/100 fields) to 1+ (10-99 AFB/100 fields), 2+ (1-10 AFB/field), and 3+ (>10 AFB/field). All smear-positive cases require molecular testing (CBNAAT) for drug resistance screening.'
  },
  {
    keywords: ['chest x-ray', 'cxr', 'radiograph', 'xray', 'x-ray'],
    response: 'Chest X-ray (CXR) in pulmonary TB typically shows apical and subapical patchy infiltrates, cavitary lesions (indicating high bacillary burden), or fibronodular opacities. In pediatric and HIV cases, hilar or mediastinal lymphadenopathy and miliary nodular patterns are predominant.'
  },
  {
    keywords: ['pediatric', 'child', 'score', 'tb score', 'children'],
    response: 'Pediatric TB score evaluates composite clinical criteria: Unexplained fever >2wks (+2), Cough >2wks (+2), Weight loss / Growth failure (+2), Cervical lymphadenopathy (+2), Mantoux TST ≥10mm (+3), Household contact (+2), and Suggestive CXR (+2). A total score ≥ 6 indicates active TB and warrants Anti-TB Treatment as per Page 22 algorithm.'
  },
  {
    keywords: ['mdr', 'rifampicin', 'resistant', 'resistance', 'pmdt', 'bedaquiline'],
    response: 'Rifampicin resistance (RR-TB) detected on CBNAAT is a surrogate for Multidrug-Resistant TB (MDR-TB). RR-TB cases are referred to PMDT nodal centers for second-line Line Probe Assay (LPA) and liquid culture DST. Treatment involves all-oral Bedaquiline-containing regimens for 9 to 18 months.'
  },
  {
    keywords: ['hiv', 'plhiv', 'art', 'cpt', 'cd4'],
    response: 'In PLHIV with TB symptoms, CBNAAT is the mandatory diagnostic test. Initiate 1st-line ATT and Cotrimoxazole Preventive Therapy (CPT) immediately. Antiretroviral Therapy (ART) should be started within 2 to 4 weeks of commencing ATT (within 2 weeks if CD4 < 50 cells/µL).'
  },
  {
    keywords: ['treatment', 'regimen', 'hrze', 'fdc', 'drugs', 'first line'],
    response: 'Standard 1st line Anti-TB Treatment for drug-sensitive pulmonary TB consists of a 2-month Intensive Phase with Isoniazid (H), Rifampicin (R), Pyrazinamide (Z), and Ethambutol (E), followed by a 4-month Continuation Phase with H, R, and E (2HRZE / 4HRE daily FDCs).'
  },
  {
    keywords: ['latent', 'ltbi', 'tpt', 'preventive'],
    response: 'Latent TB Infection (LTBI) is a state of persistent immune response to M. tuberculosis without evidence of clinically active disease. TB Preventive Treatment (TPT) with Isoniazid (IPT) or 3HP (Rifapentine + INH) is provided to household contacts < 5 years and PLHIV after active TB is ruled out.'
  },
  {
    keywords: ['side effect', 'adverse', 'hepatotoxicity', 'neuropathy'],
    response: 'Common adverse reactions: Isoniazid can cause peripheral neuropathy (prevented with Pyridoxine 10-50mg) and hepatotoxicity. Rifampicin causes orange discoloration of fluids and drug interactions. Pyrazinamide can cause hyperuricemia and arthralgia. Ethambutol can cause optic neuritis.'
  },
  {
    keywords: ['symptoms', 'fever', 'cough', 'weight loss', 'night sweats'],
    response: 'Presumptive TB is defined by cough ≥ 2 weeks, low-grade evening fever, unexplained weight loss, night sweats, chest pain, or hemoptysis. Any individual with these symptoms requires immediate diagnostic testing.'
  }
];

export const AI_QUIZ_POOL: AIQuizQuestion[] = [
  {
    id: 'q1',
    category: 'Diagnostic Testing',
    question: 'What is the primary rapid molecular test recommended by NTEP & WHO for diagnosing pulmonary TB and Rifampicin resistance?',
    options: ['CBNAAT / Xpert MTB/RIF', 'Mantoux Tuberculin Skin Test', 'Sputum Smear ZN Microscopy', 'Serum QuantiFERON IGRA'],
    correctIndex: 0,
    explanation: 'CBNAAT (Xpert MTB/RIF) is the primary diagnostic choice because it detects both MTB DNA and Rifampicin resistance within 2 hours.'
  },
  {
    id: 'q2',
    category: 'Pediatric TB',
    question: 'According to the Pediatric TB diagnostic algorithm, what total TB Score threshold indicates active pediatric TB requiring Anti-TB Treatment?',
    options: ['Score ≥ 3', 'Score ≥ 6', 'Score ≥ 10', 'Score ≥ 12'],
    correctIndex: 1,
    explanation: 'A Pediatric composite TB score of 6 or higher confirms high clinical probability of active pediatric TB and warrants initiating anti-TB treatment.'
  },
  {
    id: 'q3',
    category: 'Treatment Regimens',
    question: 'Which four drugs constitute the standard 2-month Intensive Phase regimen for drug-sensitive pulmonary TB?',
    options: [
      'Isoniazid, Rifampicin, Pyrazinamide, Ethambutol (HRZE)',
      'Levofloxacin, Bedaquiline, Linezolid, Clofazimine',
      'Isoniazid, Streptomycin, Kanamycin, Ethionamide',
      'Rifampicin, Ethambutol, Cycloserine, Amikacin'
    ],
    correctIndex: 0,
    explanation: 'The Intensive Phase consists of 2HRZE: Isoniazid (H), Rifampicin (R), Pyrazinamide (Z), and Ethambutol (E).'
  },
  {
    id: 'q4',
    category: 'HIV-TB Co-infection',
    question: 'In a PLHIV diagnosed with pulmonary TB and CD4 count of 120 cells/µL, when should Antiretroviral Therapy (ART) be initiated?',
    options: [
      'Within 2 to 4 weeks of starting Anti-TB Treatment',
      'After 6 months of completing Anti-TB Treatment',
      'Immediately on Day 1 alongside ATT',
      'Only after CD4 count rises above 350 cells/µL'
    ],
    correctIndex: 0,
    explanation: 'ART should be initiated within 2 to 4 weeks of starting ATT to reduce mortality while minimizing IRIS complications.'
  },
  {
    id: 'q5',
    category: 'MDR-TB Management',
    question: 'Detection of Rifampicin resistance on CBNAAT mandates which immediate referral step?',
    options: [
      'Referral to PMDT Nodal Center for Second-Line LPA and Culture DST',
      'Empiric addition of Amikacin injection at local OPD',
      'Switching to 1st-line ATT for 12 months',
      'Observation for 3 months without therapy'
    ],
    correctIndex: 0,
    explanation: 'Rifampicin resistance mandates referral to PMDT for second-line Line Probe Assay (LPA) and liquid culture DST to guide MDR therapy.'
  }
];

export const AI_GENERATED_CASES: AICaseTemplate[] = [
  {
    id: 'ai_case_01',
    title: 'AI Generated: Presumptive Smear-Positive Case',
    type: 'pulmonary',
    difficulty: 'Level 1: Basic',
    patient: {
      name: 'Vikas Gowda',
      age: 42,
      gender: 'Male',
      symptoms: ['Cough with sputum for 4 weeks', 'Evening Fever', 'Weight loss 6 kg'],
      duration: '4 Weeks',
      riskFactors: ['Heavy smoker', 'Daily wage laborer'],
      history: 'Presents with chronic productive cough. Sputum ZN smear shows 2+ AFB. CXR reveals upper lobe infiltrate.'
    },
    steps: [
      {
        question: 'What is the mandatory next step before starting 1st line ATT for Vikas?',
        options: [
          { label: 'Order CBNAAT to test baseline Rifampicin resistance', isCorrect: true, rationale: 'Correct! Baseline CBNAAT is mandatory for all smear-positive cases to rule out primary Rifampicin resistance.' },
          { label: 'Start 1st line ATT directly without CBNAAT', isCorrect: false, rationale: 'Incorrect. PMDT guidelines require molecular testing for all presumptive cases.' }
        ]
      }
    ]
  },
  {
    id: 'ai_case_02',
    title: 'AI Generated: Pediatric Contact Tracing Case',
    type: 'pediatric',
    difficulty: 'Level 3: Algorithm',
    patient: {
      name: 'Baby Ananya',
      age: 4,
      gender: 'Female',
      symptoms: ['Unexplained fever 3 weeks', 'Failure to thrive', 'Cough'],
      duration: '3 Weeks',
      riskFactors: ['Mother treated for smear-positive pulmonary TB'],
      history: 'Child not gaining weight. Gastric aspirate Xpert is negative. CXR shows hilar lymph node enlargement. TST is 12mm.'
    },
    steps: [
      {
        question: 'Calculate TB Score: Fever(+2) + Weight loss(+2) + CXR adenopathy(+2) + TST(+3) + Contact(+2) = Score 11. What is the action?',
        options: [
          { label: 'Initiate Pediatric Anti-TB Treatment immediately (Score ≥ 6)', isCorrect: true, rationale: 'Correct! Score ≥ 6 confirms active pediatric TB and warrants anti-TB therapy.' },
          { label: 'Observe for 6 months without treatment', isCorrect: false, rationale: 'Incorrect. High score requires active treatment.' }
        ]
      }
    ]
  }
];
