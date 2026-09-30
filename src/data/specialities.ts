import { Speciality, SpecialityContent } from '../types/speciality';
import { doctors } from './doctors';

const specialityDefinitions: Speciality[] = [
  // Primary Care
  { id: 'family-medicine', name: 'Family Medicine', category: 'Primary Care', shortDescription: 'Comprehensive care for patients of all ages, managing a wide range of health conditions.', icon: 'stethoscope', active: true, featured: false },
  { id: 'internal-medicine', name: 'Internal Medicine', category: 'Primary Care', shortDescription: 'Diagnosis and non-surgical treatment of diseases in adults.', icon: 'activity', active: true, featured: false },
  { id: 'paediatrics', name: 'Paediatrics', category: 'Primary Care', shortDescription: 'Medical care for infants, children and adolescents.', icon: 'baby', active: true, featured: true },
  { id: 'geriatrics', name: 'Geriatrics', category: 'Primary Care', shortDescription: 'Specialised care for older adults, focusing on age-related health challenges.', icon: 'user', active: true, featured: false },

  // Women's & Men's Health
  { id: 'obstetrics-gynaecology', name: 'Obstetrics & Gynaecology', category: "Women's & Men's Health", shortDescription: 'Care for female reproductive health, pregnancy and childbirth.', icon: 'heart', active: true, featured: true },
  { id: 'urology', name: 'Urology', category: "Women's & Men's Health", shortDescription: 'Conditions of the urinary tract and male reproductive system.', icon: 'droplets', active: true, featured: false },

  // Heart & Blood
  { id: 'cardiology', name: 'Cardiology', category: 'Heart & Blood', shortDescription: 'Diagnosis and treatment of disorders of the heart and blood vessels.', icon: 'heart-pulse', active: true, featured: true },
  { id: 'hematology', name: 'Hematology', category: 'Heart & Blood', shortDescription: 'Disorders of the blood, bone marrow and lymphatic system.', icon: 'droplet', active: true, featured: false },

  // Brain & Nervous System
  { id: 'neurology', name: 'Neurology', category: 'Brain & Nervous System', shortDescription: 'Conditions affecting the brain, spinal cord and nervous system.', icon: 'brain', active: true, featured: true },
  { id: 'neurosurgery', name: 'Neurosurgery', category: 'Brain & Nervous System', shortDescription: 'Surgical treatment of conditions of the nervous system.', icon: 'scissors', active: true, featured: false },
  { id: 'psychiatry', name: 'Psychiatry', category: 'Brain & Nervous System', shortDescription: 'Diagnosis and treatment of mental health conditions.', icon: 'cloud', active: true, featured: false },

  // Bones & Musculoskeletal
  { id: 'orthopaedics', name: 'Orthopaedics', category: 'Bones & Musculoskeletal', shortDescription: 'Conditions affecting bones, joints, muscles and the musculoskeletal system.', icon: 'bone', active: true, featured: true },
  { id: 'rheumatology', name: 'Rheumatology', category: 'Bones & Musculoskeletal', shortDescription: 'Autoimmune and inflammatory conditions affecting joints and connective tissue.', icon: 'zap', active: true, featured: false },
  { id: 'sports-medicine', name: 'Sports Medicine', category: 'Bones & Musculoskeletal', shortDescription: 'Prevention, diagnosis and treatment of sports and exercise-related injuries.', icon: 'dumbbell', active: true, featured: false },
  { id: 'physical-medicine', name: 'Physical Medicine & Rehabilitation', category: 'Bones & Musculoskeletal', shortDescription: 'Restoring function and quality of life for patients with disabling conditions.', icon: 'accessibility', active: true, featured: false },

  // Skin
  { id: 'dermatology', name: 'Dermatology', category: 'Skin', shortDescription: 'Conditions affecting the skin, hair and nails.', icon: 'layers', active: true, featured: true },

  // ENT & Eyes
  { id: 'ophthalmology', name: 'Ophthalmology', category: 'ENT & Eyes', shortDescription: 'Medical and surgical care for the eyes and visual system.', icon: 'eye', active: true, featured: false },
  { id: 'ent', name: 'ENT', category: 'ENT & Eyes', shortDescription: 'Ear, nose and throat conditions and head and neck disorders.', icon: 'ear', active: true, featured: true },

  // Respiratory
  { id: 'pulmonology', name: 'Pulmonology', category: 'Respiratory', shortDescription: 'Diseases of the respiratory tract and lungs.', icon: 'wind', active: true, featured: false },
  { id: 'allergy-immunology', name: 'Allergy & Immunology', category: 'Respiratory', shortDescription: 'Allergic diseases and disorders of the immune system.', icon: 'shield', active: true, featured: false },

  // Digestive
  { id: 'gastroenterology', name: 'Gastroenterology', category: 'Digestive', shortDescription: 'Conditions of the digestive system, including stomach, intestines and liver.', icon: 'circle', active: true, featured: true },
  { id: 'hepatology', name: 'Hepatology', category: 'Digestive', shortDescription: 'Diseases of the liver, gallbladder, biliary tree and pancreas.', icon: 'circle-dot', active: true, featured: false },
  { id: 'colorectal-surgery', name: 'Colorectal Surgery', category: 'Digestive', shortDescription: 'Surgical treatment of conditions affecting the colon, rectum and anus.', icon: 'scissors', active: true, featured: false },

  // Hormones
  { id: 'endocrinology', name: 'Endocrinology', category: 'Hormones', shortDescription: 'Hormone-related conditions including diabetes and thyroid disorders.', icon: 'thermometer', active: true, featured: false },

  // Kidney
  { id: 'nephrology', name: 'Nephrology', category: 'Kidney', shortDescription: 'Diseases of the kidneys and kidney function management.', icon: 'droplets', active: true, featured: false },

  // Cancer
  { id: 'oncology', name: 'Oncology', category: 'Cancer', shortDescription: 'Diagnosis and treatment of cancer.', icon: 'target', active: true, featured: false },
  { id: 'radiation-oncology', name: 'Radiation Oncology', category: 'Cancer', shortDescription: 'Use of radiation in the treatment of cancer.', icon: 'radio', active: true, featured: false },
  { id: 'surgical-oncology', name: 'Surgical Oncology', category: 'Cancer', shortDescription: 'Surgical management of cancer and tumours.', icon: 'scissors', active: true, featured: false },

  // Surgery
  { id: 'general-surgery', name: 'General Surgery', category: 'Surgery', shortDescription: 'Surgical treatment of a broad range of abdominal and other conditions.', icon: 'scissors', active: true, featured: false },
  { id: 'plastic-surgery', name: 'Plastic Surgery', category: 'Surgery', shortDescription: 'Reconstructive and cosmetic surgical procedures.', icon: 'pen-tool', active: true, featured: false },
  { id: 'cardiothoracic-surgery', name: 'Cardiothoracic Surgery', category: 'Surgery', shortDescription: 'Surgical treatment of conditions of the heart, lungs and chest.', icon: 'scissors', active: true, featured: false },
  { id: 'vascular-surgery', name: 'Vascular Surgery', category: 'Surgery', shortDescription: 'Surgical management of blood vessel diseases outside the heart and brain.', icon: 'git-branch', active: true, featured: false },
  { id: 'transplant-surgery', name: 'Transplant Surgery', category: 'Surgery', shortDescription: 'Surgical procedures involved in organ transplantation.', icon: 'shuffle', active: true, featured: false },

  // Emergency & Critical Care
  { id: 'emergency-medicine', name: 'Emergency Medicine', category: 'Emergency & Critical Care', shortDescription: 'Immediate assessment and treatment of acute illness and injury.', icon: 'alert-triangle', active: true, featured: false },
  { id: 'critical-care', name: 'Critical Care', category: 'Emergency & Critical Care', shortDescription: 'Intensive management of life-threatening conditions.', icon: 'monitor-heart', active: true, featured: false },

  // Diagnostics
  { id: 'radiology', name: 'Radiology', category: 'Diagnostics', shortDescription: 'Medical imaging for diagnosis and guided interventions.', icon: 'scan', active: true, featured: false },
  { id: 'interventional-radiology', name: 'Interventional Radiology', category: 'Diagnostics', shortDescription: 'Minimally invasive image-guided procedures for diagnosis and treatment.', icon: 'crosshair', active: true, featured: false },
  { id: 'pathology', name: 'Pathology', category: 'Diagnostics', shortDescription: 'Laboratory analysis of tissue, blood and other specimens for diagnosis.', icon: 'microscope', active: true, featured: false },

  // Anaesthesia & Pain
  { id: 'anaesthesiology', name: 'Anaesthesiology', category: 'Anaesthesia & Pain', shortDescription: 'Administration of anaesthesia for surgical and other procedures.', icon: 'syringe', active: true, featured: false },
  { id: 'pain-medicine', name: 'Pain Medicine', category: 'Anaesthesia & Pain', shortDescription: 'Evaluation and management of acute and chronic pain conditions.', icon: 'activity', active: true, featured: false },

  // Sleep & Preventive Care
  { id: 'sleep-medicine', name: 'Sleep Medicine', category: 'Sleep & Preventive Care', shortDescription: 'Diagnosis and treatment of sleep disorders.', icon: 'moon', active: true, featured: false },
  { id: 'preventive-medicine', name: 'Preventive Medicine', category: 'Sleep & Preventive Care', shortDescription: 'Health promotion and disease prevention strategies.', icon: 'shield-check', active: true, featured: false },
  { id: 'occupational-medicine', name: 'Occupational Medicine', category: 'Sleep & Preventive Care', shortDescription: 'Health and wellbeing in the workplace context.', icon: 'hard-hat', active: true, featured: false },

  // Palliative Care
  { id: 'palliative-care', name: 'Palliative Care', category: 'Palliative Care', shortDescription: 'Comfort-focused care to improve quality of life for serious illness.', icon: 'hand-heart', active: true, featured: false },
  { id: 'hospice-care', name: 'Hospice Care', category: 'Palliative Care', shortDescription: 'End-of-life care focused on comfort and dignity.', icon: 'heart-handshake', active: true, featured: false },

  // Dental
  { id: 'dentistry', name: 'Dentistry', category: 'Dental', shortDescription: 'Oral health including teeth, gums and related structures.', icon: 'smile', active: true, featured: false },
];

// Specialty visibility is derived from the single doctor directory.
export const specialities: Speciality[] = specialityDefinitions.map(speciality => ({
  ...speciality,
  active: speciality.active && doctors.some(doctor => doctor.active && doctor.specialityId === speciality.id),
}));
export const FEATURED_SPECIALITY_IDS = [
  'cardiology',
  'dermatology',
  'orthopaedics',
  'internal-medicine',
  'paediatrics',
  'neurology',
  'gastroenterology',
  'obstetrics-gynaecology',
  'ent',
  'urology',
];

export const specialityContent: SpecialityContent[] = [
  {
    specialityId: 'cardiology',
    overview: 'Cardiologists diagnose and treat conditions affecting the heart and blood vessels. They manage a range of conditions, from high blood pressure and cholesterol to heart failure, arrhythmias and coronary artery disease. Some cardiologists specialise further in areas such as interventional cardiology or electrophysiology.',
    commonConditions: [
      'Coronary artery disease',
      'High blood pressure (hypertension)',
      'Heart failure',
      'Arrhythmias (irregular heartbeat)',
      'Heart valve disorders',
      'Angina',
      'Peripheral arterial disease',
    ],
    commonInvestigations: [
      'ECG (Electrocardiogram)',
      'Echocardiogram',
      'Holter monitoring (24–48 hour ECG)',
      'Treadmill test (TMT / Stress test)',
      'Chest X-ray',
      'Blood tests (lipid profile, cardiac enzymes)',
      'CT coronary angiography',
    ],
    whenToConsult: [
      'Chest pain or discomfort, especially with exertion',
      'Unexplained shortness of breath',
      'Palpitations or irregular heartbeat',
      'Dizziness, fainting or near-fainting episodes',
      'Swelling in the legs or ankles',
      'High blood pressure not controlled with medication',
      'Family history of early heart disease',
    ],
    commonTreatmentApproaches: 'Treatment depends on the specific condition and its severity. Depending on clinical assessment, a cardiologist may recommend lifestyle modifications, medications (such as blood pressure medications, statins or anticoagulants), or procedural interventions. Your doctor will discuss the most appropriate options for your situation.',
    relatedSpecialities: ['cardiothoracic-surgery', 'vascular-surgery', 'internal-medicine', 'pulmonology'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'dermatology',
    overview: 'Dermatologists specialise in conditions affecting the skin, hair and nails. They manage both medical skin conditions and provide guidance on skin health. Some dermatologists also perform skin procedures including biopsies and minor surgical interventions.',
    commonConditions: [
      'Acne',
      'Eczema (atopic dermatitis)',
      'Psoriasis',
      'Fungal skin infections',
      'Urticaria (hives)',
      'Alopecia (hair loss)',
      'Skin pigmentation disorders',
      'Seborrhoeic dermatitis',
      'Warts and molluscum',
    ],
    commonInvestigations: [
      'Skin examination under dermoscopy',
      'Skin biopsy (when clinically indicated)',
      'Patch testing (for allergic contact dermatitis)',
      'Wood\'s lamp examination',
      'Blood tests (when systemic cause suspected)',
      'Fungal culture or KOH preparation',
    ],
    whenToConsult: [
      'Persistent skin rash or itching not improving with over-the-counter treatment',
      'New or changing moles or skin lesions',
      'Significant hair loss or scalp conditions',
      'Nail changes or persistent nail infections',
      'Acne not responding to basic treatment',
      'Pigmentation changes or discolouration',
    ],
    commonTreatmentApproaches: 'Depending on the condition, treatment may include topical medications, oral medications, phototherapy or minor procedural interventions. Your dermatologist will recommend the most appropriate approach based on your clinical assessment.',
    relatedSpecialities: ['allergy-immunology', 'rheumatology'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'orthopaedics',
    overview: 'Orthopaedic surgeons and specialists diagnose and treat conditions affecting bones, joints, muscles, tendons and ligaments. They manage both non-surgical and surgical conditions ranging from fractures and sports injuries to joint replacement and spine conditions.',
    commonConditions: [
      'Osteoarthritis',
      'Fractures',
      'Ligament and tendon injuries',
      'Back and neck pain',
      'Scoliosis',
      'Rotator cuff disorders',
      'Knee and hip joint conditions',
      'Bone infections',
      'Congenital bone and limb conditions',
    ],
    commonInvestigations: [
      'X-ray',
      'MRI (for soft tissue assessment)',
      'CT scan (when clinically indicated)',
      'Bone density test (DEXA scan, for appropriate patients)',
      'Blood tests',
    ],
    whenToConsult: [
      'Persistent joint pain limiting daily activities',
      'Fracture or suspected fracture',
      'Sports-related injury not improving',
      'Back or neck pain with neurological symptoms',
      'Joint swelling, stiffness or deformity',
      'Recurring sprains or instability',
    ],
    commonTreatmentApproaches: 'Treatment may include physiotherapy, pain management, bracing, or surgical intervention depending on the condition and severity. Common investigations vary according to symptoms and clinical assessment.',
    relatedSpecialities: ['sports-medicine', 'physical-medicine', 'rheumatology', 'neurosurgery'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'gastroenterology',
    overview: 'Gastroenterologists diagnose and treat conditions affecting the digestive system, including the oesophagus, stomach, small and large intestines, liver, gallbladder and pancreas. They perform diagnostic and therapeutic endoscopic procedures.',
    commonConditions: [
      'Gastro-oesophageal reflux disease (GERD)',
      'Peptic ulcers',
      'Inflammatory bowel disease (Crohn\'s, ulcerative colitis)',
      'Irritable bowel syndrome (IBS)',
      'Liver disease and fatty liver',
      'Gallstones',
      'Pancreatitis',
      'Coeliac disease',
      'Colorectal polyps',
    ],
    commonInvestigations: [
      'Upper GI endoscopy (gastroscopy)',
      'Colonoscopy',
      'Abdominal ultrasound',
      'Liver function tests',
      'H. pylori testing',
      'CT abdomen (when clinically indicated)',
      'Stool examination',
    ],
    whenToConsult: [
      'Persistent abdominal pain or discomfort',
      'Rectal bleeding or dark stools',
      'Unexplained weight loss',
      'Persistent nausea, vomiting or difficulty swallowing',
      'Changes in bowel habits lasting more than a few weeks',
      'Jaundice (yellowing of skin or eyes)',
      'Chronic heartburn not responding to basic treatment',
    ],
    commonTreatmentApproaches: 'Depending on clinical assessment, treatment may include dietary modification, medication or endoscopic or surgical intervention. Your doctor will advise based on your specific condition.',
    relatedSpecialities: ['hepatology', 'colorectal-surgery', 'general-surgery'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'neurology',
    overview: 'Neurologists specialise in conditions affecting the brain, spinal cord, peripheral nerves and muscles. They diagnose and manage a wide range of conditions from migraine to stroke, epilepsy and movement disorders.',
    commonConditions: [
      'Migraine and headache disorders',
      'Epilepsy',
      'Stroke and transient ischaemic attack (TIA)',
      'Parkinson\'s disease',
      'Multiple sclerosis',
      'Peripheral neuropathy',
      'Dementia',
      'Vertigo and balance disorders',
      'Movement disorders',
    ],
    commonInvestigations: [
      'MRI brain and spine',
      'CT head',
      'EEG (electroencephalogram)',
      'Nerve conduction study (NCS)',
      'EMG (electromyography)',
      'Lumbar puncture (when clinically indicated)',
      'Blood tests',
    ],
    whenToConsult: [
      'Severe or unusual headaches',
      'Sudden weakness or numbness in the face, arm or leg',
      'Difficulty speaking, understanding or swallowing',
      'Seizures or episodes of loss of consciousness',
      'Memory problems or confusion',
      'Vision changes associated with headache or other neurological symptoms',
      'Tremor, rigidity or involuntary movements',
    ],
    commonTreatmentApproaches: 'Treatment depends on the condition and may include medications, physiotherapy, lifestyle modification or, in some cases, referral for surgical assessment. Your neurologist will discuss the appropriate management plan for your situation.',
    relatedSpecialities: ['neurosurgery', 'psychiatry', 'physical-medicine', 'ophthalmology'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'obstetrics-gynaecology',
    overview: 'Obstetricians and gynaecologists manage female reproductive health, including pregnancy, childbirth and conditions of the female reproductive organs. Some specialists focus primarily on gynaecological conditions, others on obstetrics and pregnancy care.',
    commonConditions: [
      'Pregnancy and antenatal care',
      'Polycystic ovary syndrome (PCOS)',
      'Endometriosis',
      'Uterine fibroids',
      'Menstrual irregularities',
      'Pelvic inflammatory disease',
      'Ovarian cysts',
      'Cervical and uterine conditions',
    ],
    commonInvestigations: [
      'Pelvic ultrasound',
      'Blood hormone tests',
      'Pap smear (cervical screening)',
      'Hysteroscopy (when clinically indicated)',
      'Laparoscopy (when clinically indicated)',
      'Antenatal blood panel',
      'Amniocentesis or chorionic villus sampling (when indicated)',
    ],
    whenToConsult: [
      'Irregular or painful periods',
      'Suspected pregnancy or antenatal care',
      'Pelvic pain or pressure',
      'Unusual vaginal discharge or bleeding',
      'Fertility concerns',
      'Peri- or post-menopausal symptoms',
      'Cervical screening (Pap smear)',
    ],
    commonTreatmentApproaches: 'Management depends on the specific condition and may include medications, hormonal therapy, minimally invasive procedures or surgery. Pregnancy care is managed across the antenatal, labour and postnatal stages.',
    relatedSpecialities: ['urology', 'endocrinology', 'general-surgery'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'paediatrics',
    overview: 'Paediatricians provide medical care for infants, children and adolescents. They manage routine well-child care, vaccinations, common illnesses and refer to paediatric subspecialists when needed.',
    commonConditions: [
      'Respiratory infections and asthma',
      'Gastroenteritis',
      'Fever management',
      'Growth and developmental concerns',
      'Nutritional deficiencies',
      'Allergies and atopic conditions',
      'Ear infections',
      'Neonatal conditions',
    ],
    commonInvestigations: [
      'Blood count and basic blood tests',
      'Chest X-ray (when clinically indicated)',
      'Urine examination',
      'Developmental assessments',
      'Vaccination records review',
    ],
    whenToConsult: [
      'Routine child health and vaccination visits',
      'Fever, cough, cold or infection in a child',
      'Concerns about growth, weight or development',
      'Skin rashes in children',
      'Abdominal pain or digestive concerns in children',
      'Newborn care and neonatal concerns',
    ],
    commonTreatmentApproaches: 'Treatment is tailored to the child\'s age and condition. Management may include medications, nutritional advice, vaccinations, physiotherapy, or referral to a paediatric subspecialist as appropriate.',
    relatedSpecialities: ['allergy-immunology', 'neurology', 'orthopaedics', 'dermatology'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'ent',
    overview: 'ENT specialists (otorhinolaryngologists) diagnose and treat conditions of the ear, nose, throat and related structures of the head and neck. They manage both medical and surgical conditions.',
    commonConditions: [
      'Sinusitis',
      'Tonsillitis and adenoid problems',
      'Hearing loss',
      'Ear infections',
      'Nasal polyps',
      'Vertigo and balance disorders',
      'Voice and swallowing problems',
      'Snoring and sleep apnoea',
      'Head and neck lumps',
    ],
    commonInvestigations: [
      'Audiometry (hearing test)',
      'Nasal endoscopy',
      'CT sinuses or temporal bones',
      'Tympanometry',
      'Laryngoscopy',
      'Sleep study (for sleep-disordered breathing)',
    ],
    whenToConsult: [
      'Persistent blocked or runny nose',
      'Hearing loss or ear pain',
      'Recurrent tonsillitis or sore throat',
      'Hoarseness or voice changes lasting more than two weeks',
      'Difficulty swallowing',
      'Vertigo or persistent dizziness',
      'Unexplained lump in the neck',
    ],
    commonTreatmentApproaches: 'Treatment may include medications, nasal sprays, hearing aids, minor procedures or surgical intervention depending on the diagnosis. Your ENT specialist will recommend the appropriate approach after assessment.',
    relatedSpecialities: ['ophthalmology', 'neurology', 'sleep-medicine', 'allergy-immunology'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'urology',
    overview: 'Urologists diagnose and treat conditions of the urinary tract in both men and women, as well as the male reproductive system. They manage both medical and surgical conditions.',
    commonConditions: [
      'Kidney stones',
      'Urinary tract infections (UTIs)',
      'Benign prostatic hyperplasia (enlarged prostate)',
      'Overactive bladder and incontinence',
      'Kidney and bladder tumours',
      'Erectile dysfunction',
      'Male infertility',
    ],
    commonInvestigations: [
      'Urinalysis and urine culture',
      'Ultrasound of kidneys and bladder',
      'PSA (prostate-specific antigen) blood test',
      'Cystoscopy (when clinically indicated)',
      'CT urogram',
      'Urodynamic studies',
    ],
    whenToConsult: [
      'Blood in urine',
      'Frequent or painful urination',
      'Kidney or flank pain',
      'Difficulty passing urine',
      'Recurring urinary tract infections',
      'Prostate concerns',
      'Male reproductive health concerns',
    ],
    commonTreatmentApproaches: 'Management depends on the specific condition and may include medications, dietary modification, minimally invasive procedures or surgery. Your urologist will advise based on your clinical assessment.',
    relatedSpecialities: ['nephrology', 'general-surgery', 'oncology'],
    lastReviewed: '2026-09-01',
  },
  {
    specialityId: 'internal-medicine',
    overview: 'Internists (specialists in internal medicine) diagnose and provide non-surgical treatment for a wide range of diseases in adults. They often manage multiple conditions and coordinate care with other specialists.',
    commonConditions: [
      'Diabetes mellitus',
      'Hypertension',
      'Thyroid disorders',
      'Anaemia',
      'Chronic kidney disease',
      'Respiratory infections',
      'Fever of unknown origin',
      'Metabolic syndrome',
    ],
    commonInvestigations: [
      'Complete blood count (CBC)',
      'Blood glucose and HbA1c',
      'Thyroid function tests',
      'Renal and liver function tests',
      'Lipid profile',
      'Chest X-ray',
      'ECG',
    ],
    whenToConsult: [
      'Uncontrolled diabetes or blood pressure',
      'Unexplained fatigue or weight changes',
      'Persistent fever or recurrent infections',
      'Multiple chronic conditions requiring coordinated management',
      'When a primary care referral is needed for complex disease',
    ],
    commonTreatmentApproaches: 'Treatment depends on the underlying conditions. Internists often coordinate care across multiple organ systems and may manage medications for several conditions simultaneously.',
    relatedSpecialities: ['cardiology', 'endocrinology', 'nephrology', 'pulmonology', 'gastroenterology'],
    lastReviewed: '2026-09-01',
  },
];


