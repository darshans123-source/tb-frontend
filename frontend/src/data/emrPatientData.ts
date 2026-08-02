import { EMRPatient, EMRInvestigationReports, EMRTreatmentRegimen } from '../types';

export const INITIAL_EMR_PATIENTS: EMRPatient[] = [
  {
    id: 'pat_001',
    patientCode: 'P-2024-101',
    name: 'Rajesh Kumar',
    age: 34,
    gender: 'Male',
    dob: '1990-04-12',
    phone: '+91 98765 43210',
    address: 'Flat 402, Gandhi Nagar, Raichur, Karnataka',
    occupation: 'Textile Factory Worker',
    weight: '52 kg',
    height: '168 cm',
    bmi: '18.4 (Underweight)',
    bloodGroup: 'B Positive',
    complaint: 'Persistent productive cough with mucopurulent sputum and low-grade fever',
    duration: '3 weeks',
    symptoms: [
      'Cough > 2 weeks',
      'Evening rise of temperature (38.2°C)',
      'Unexplained weight loss (4.5 kg)',
      'Drenching night sweats',
      'Anorexia & Fatigue'
    ],
    medicalHistory: 'No past history of Anti-Tubercular Therapy (ATT). Non-diabetic, HIV Seronegative.',
    familyHistory: 'No history of TB in immediate family.',
    smoking: 'Active smoker (5 pack-years)',
    alcohol: 'Occasional social drinking',
    diabetes: 'Non-Diabetic (HbA1c 5.4%)',
    hivStatus: 'Non-Reactive (HIV 1 & 2 Rapid Test Negative)',
    pregnancyStatus: 'N/A',
    drugHistory: 'Over-the-counter cough syrups without relief',
    previousTb: 'None (First Episode)',
    riskFactors: ['Overcrowded factory workplace', 'Mild malnutrition', 'Active smoking'],
    vaccinationHistory: 'BCG scar present on left upper arm',
    emergencyContact: 'Sunita Kumar (Wife) - +91 98765 43211',
    status: 'In Progress',
    vitals: {
      temp: '38.2 °C',
      pulse: '88 bpm',
      rr: '18 /min',
      bp: '118/76 mmHg',
      spO2: '97% on room air',
      weight: '52 kg',
      bmi: '18.4 kg/m²',
      generalExam: 'Thin built, mild temporal wasting, no cervical or axillary lymphadenopathy.',
      respExam: 'Decreased breath sounds and post-tussive crepitations in the right upper pulmonary field.',
      notes: 'High clinical index of suspicion for Presumptive Pulmonary Tuberculosis. Universal DST ordered.'
    },
    createdDate: '2026-08-01'
  },
  {
    id: 'pat_002',
    patientCode: 'P-2024-102',
    name: 'Sunita Devi',
    age: 42,
    gender: 'Female',
    dob: '1982-09-18',
    phone: '+91 98123 76543',
    address: 'House 14, Ward 8, Hospet Road, Bellary',
    occupation: 'Agricultural Laborer',
    weight: '44 kg',
    height: '161 cm',
    bmi: '16.9 (Severe Underweight)',
    bloodGroup: 'O Positive',
    complaint: 'Recurrent cough, hemoptysis, and weakness after stopping ATT 6 months ago',
    duration: '4 weeks',
    symptoms: [
      'Cough with blood-streaked sputum',
      'High fever with chills (38.8°C)',
      'Severe weight loss (7 kg in 2 months)',
      'Severe anorexia and lassitude',
      'Bilateral dull chest pain'
    ],
    medicalHistory: 'History of Pulmonary TB 2 years ago; took 1st line ATT irregularly for 3 months and defaulted.',
    familyHistory: 'Uncle was treated for Drug-Resistant TB 3 years ago.',
    smoking: 'Non-smoker',
    alcohol: 'None',
    diabetes: 'Non-Diabetic (Fasting Blood Sugar 94 mg/dL)',
    hivStatus: 'Non-Reactive (HIV Rapid Negative)',
    pregnancyStatus: 'Not Pregnant',
    drugHistory: 'Previous Category-I ATT (Discontinued default)',
    previousTb: 'Yes (Relapse / Defaulted ATT Case)',
    riskFactors: ['Prior defaulted ATT', 'Household contact of MDR-TB', 'Severe malnutrition'],
    vaccinationHistory: 'BCG scar present',
    emergencyContact: 'Ramesh Devi (Husband) - +91 98123 76544',
    status: 'Under Investigation',
    vitals: {
      temp: '38.8 °C',
      pulse: '102 bpm',
      rr: '22 /min',
      bp: '106/68 mmHg',
      spO2: '94% on room air',
      weight: '44 kg',
      bmi: '16.9 kg/m²',
      generalExam: 'Emaciated appearance, pale conjunctiva, temporal wasting, non-tender cervical lymph nodes.',
      respExam: 'Bronchial breath sounds and coarse crackles over left apex and right middle zone.',
      notes: 'Treatment defaulter case presenting with hemoptysis. High risk for Drug-Resistant TB (MDR-TB).'
    },
    createdDate: '2026-08-01'
  },
  {
    id: 'pat_003',
    patientCode: 'P-2024-103',
    name: 'Anil Sharma',
    age: 28,
    gender: 'Male',
    dob: '1996-01-25',
    phone: '+91 97456 12389',
    address: 'Sector 3, Housing Board Colony, Gulbarga',
    occupation: 'IT Support Executive',
    weight: '60 kg',
    height: '176 cm',
    bmi: '19.3 (Normal)',
    bloodGroup: 'A Positive',
    complaint: 'Persistent dry cough, low-grade evening fever, and mild weight loss',
    duration: '4 weeks',
    symptoms: [
      'Non-productive dry cough (> 3 weeks)',
      'Low grade evening fever (37.9°C)',
      'Weight loss (3.8 kg)',
      'Fatigue on exertion'
    ],
    medicalHistory: 'No prior TB history. Contact with uncle diagnosed with pulmonary TB 6 months ago.',
    familyHistory: 'Uncle treated for pulmonary TB.',
    smoking: 'Non-smoker',
    alcohol: 'Social drinking',
    diabetes: 'Non-Diabetic',
    hivStatus: 'Non-Reactive',
    pregnancyStatus: 'N/A',
    drugHistory: 'Antihistamines and Azithromycin without improvement',
    previousTb: 'None',
    riskFactors: ['Household contact of active TB', 'Indoor sedentary job'],
    vaccinationHistory: 'BCG scar present',
    emergencyContact: 'Priya Sharma (Sister) - +91 97456 12390',
    status: 'Waiting',
    vitals: {
      temp: '37.9 °C',
      pulse: '82 bpm',
      rr: '16 /min',
      bp: '120/78 mmHg',
      spO2: '98% on room air',
      weight: '60 kg',
      bmi: '19.3 kg/m²',
      generalExam: 'Well built, afebrile at present, no lymphadenopathy.',
      respExam: 'Vesicular breath sounds, mildly reduced intensity in right apex.',
      notes: 'Initial Sputum Smear and CBNAAT negative. Paucibacillary high suspicion case requiring liquid culture.'
    },
    createdDate: '2026-08-02'
  }
];

export const PRESET_INVESTIGATION_REPORTS: Record<string, EMRInvestigationReports> = {
  pat_001: {
    cxr: {
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
      findings: 'Heterogeneous patchy consolidation opacities in the right upper lobe with a 2.1 cm thick-walled apical cavitary lesion.',
      impression: 'Radiologically Suggestive of Active Pulmonary Tuberculosis (Cavitary Lesion).',
      date: '2026-08-02'
    },
    smear: {
      result: 'AFB POSITIVE',
      grade: '2+ Acid-Fast Bacilli (1-10 bacilli/field)',
      notes: 'Bright red, slender, rod-shaped bacilli observed on Ziehl-Neelsen staining.',
      date: '2026-08-02'
    },
    cbnaat: {
      mtbStatus: 'MTB Detected',
      rifResistance: 'Rif Sensitive',
      ctValue: 'Ct value: 18.4 (Medium bacillary load)',
      date: '2026-08-02'
    },
    bloodTests: {
      cbc: 'Hb: 11.2 g/dL, Total WBC: 11,400 /mm³, ESR: 68 mm/1st hr',
      hba1c: '5.4% (Normal)',
      hiv: 'Non-Reactive (HIV Rapid 1 & 2 Negative)',
      date: '2026-08-02'
    }
  },
  pat_002: {
    cxr: {
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
      findings: 'Bilateral extensive fibrocavitary disease in left apex and right middle zone with bronchogenic spread.',
      impression: 'Bilateral Active Pulmonary TB with Cavitations (High Risk for Drug Resistance).',
      date: '2026-08-02'
    },
    smear: {
      result: 'AFB POSITIVE',
      grade: '3+ Acid-Fast Bacilli (> 10 bacilli/field)',
      notes: 'Heavy bacillary load on Auramine-O LED fluorescence microscopy.',
      date: '2026-08-02'
    },
    cbnaat: {
      mtbStatus: 'MTB Detected',
      rifResistance: 'Rif Resistant',
      ctValue: 'Ct value: 14.1 (High bacillary load, rpoB gene mutation detected)',
      date: '2026-08-02'
    },
    culture: {
      result: 'POSITIVE for M. tuberculosis complex',
      species: 'M. tuberculosis (Growth at 10 days in MGIT liquid medium)',
      date: '2026-08-02'
    },
    lpa: {
      rifResistance: 'Rifampicin Resistant (rpoB S531L mutation)',
      inhResistance: 'Isoniazid Resistant (katG S315T mutation)',
      date: '2026-08-02'
    },
    bloodTests: {
      cbc: 'Hb: 9.6 g/dL (Moderate Anemia), WBC: 13,800 /mm³, ESR: 92 mm/1st hr',
      hba1c: '5.6% (Normal)',
      hiv: 'Non-Reactive',
      date: '2026-08-02'
    }
  },
  pat_003: {
    cxr: {
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
      findings: 'Right apical subtle infiltrate opacity without overt cavitation.',
      impression: 'Subtle apical opacity requiring microbiological confirmation.',
      date: '2026-08-02'
    },
    smear: {
      result: 'AFB NEGATIVE',
      grade: 'Smear Negative (0 bacilli seen in 100 fields)',
      notes: 'Paucibacillary sample.',
      date: '2026-08-02'
    },
    cbnaat: {
      mtbStatus: 'MTB Not Detected',
      rifResistance: 'N/A',
      ctValue: 'Ct > 40 (Below molecular detection limit)',
      date: '2026-08-02'
    },
    culture: {
      result: 'POSITIVE for M. tuberculosis complex',
      species: 'M. tuberculosis (Isolated at 14 days on MGIT Liquid Medium)',
      date: '2026-08-02'
    },
    lpa: {
      rifResistance: 'Sensitive',
      inhResistance: 'Sensitive',
      date: '2026-08-02'
    },
    bloodTests: {
      cbc: 'Hb: 13.5 g/dL, WBC: 8,900 /mm³, ESR: 42 mm/1st hr',
      hba1c: '5.2%',
      hiv: 'Non-Reactive',
      date: '2026-08-02'
    }
  }
};

export const STANDARD_TREATMENT_REGIMENS: Record<string, EMRTreatmentRegimen> = {
  ds_tb: {
    name: 'NTEP Daily Fixed-Dose Combination (FDC) DS-TB Regimen',
    category: 'Drug-Sensitive Pulmonary TB (2HRZE / 4HRE)',
    phase: 'Intensive Phase (2 Months) + Continuation Phase (4 Months)',
    drugs: [
      { name: 'Isoniazid (H)', dosage: '300 mg daily', frequency: 'Once daily oral' },
      { name: 'Rifampicin (R)', dosage: '600 mg daily', frequency: 'Once daily oral (empty stomach)' },
      { name: 'Pyrazinamide (Z)', dosage: '1500 mg daily', frequency: 'Once daily oral' },
      { name: 'Ethambutol (E)', dosage: '1000 mg daily', frequency: 'Once daily oral' },
      { name: 'Pyridoxine (Vitamin B6)', dosage: '25 mg daily', frequency: 'Once daily oral' }
    ],
    duration: '6 Months (8 Weeks IP + 16 Weeks CP)',
    followUpSchedule: 'Monthly clinical assessment, Weight check, Sputum AFB microscopy at end of 2 months and end of 6 months.',
    doctorNotes: 'Register patient on Nikshay portal. Monitor LFT if jaundice develops. Counsel patient on red-orange urine discoloration from Rifampicin.'
  },
  dr_tb: {
    name: 'NTEP All-Oral Shorter Bedaquiline-based MDR-TB Regimen',
    category: 'Drug-Resistant TB (RR-TB / MDR-TB)',
    phase: 'Initial Phase (4-6 Months) + Continuation Phase (5 Months)',
    drugs: [
      { name: 'Bedaquiline (BDQ)', dosage: '400mg daily (2 wks) then 200mg TIW (22 wks)', frequency: 'Oral with food' },
      { name: 'Levofloxacin (Lfx)', dosage: '750 mg daily', frequency: 'Once daily oral' },
      { name: 'Clofazimine (Cfz)', dosage: '100 mg daily', frequency: 'Once daily oral' },
      { name: 'Pyrazinamide (Z)', dosage: '1500 mg daily', frequency: 'Once daily oral' },
      { name: 'Ethambutol (E)', dosage: '1000 mg daily', frequency: 'Once daily oral' },
      { name: 'High-dose Isoniazid (Hh)', dosage: '600 mg daily', frequency: 'Once daily oral' },
      { name: 'Ethionamide (Eto)', dosage: '500 mg daily', frequency: 'Once daily oral' }
    ],
    duration: '9-11 Months (All-Oral, Injectable-Free)',
    followUpSchedule: 'Baseline & Monthly ECG for QTc monitoring, Monthly Serum K+/Mg++, Monthly Sputum Liquid Culture & Smear microscopy.',
    doctorNotes: 'PMDT Nodal Centre referral. Mandatory baseline QTc < 450 ms before Bedaquiline initiation.'
  }
};
