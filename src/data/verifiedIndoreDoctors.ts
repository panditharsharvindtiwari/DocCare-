import type { Doctor } from '../types/doctor';

type SourceKey = 'medanta' | 'bombay' | 'jupiter';
interface DirectoryEntry {
  id: string;
  name: string;
  specialityId: string;
  designation: string;
  source: SourceKey;
  sourceUrl: string;
  expertise?: string[];
  subspecialty?: string;
}

const sourceInfo: Record<SourceKey, { hospital: string; url: string }> = {
  medanta: { hospital: 'Medanta Hospital, Indore', url: 'https://www.medanta.org/doctor-listing/doctors-in-indore' },
  bombay: { hospital: 'Bombay Hospital, Indore', url: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  jupiter: { hospital: 'Vishesh Jupiter Hospital, Indore', url: 'https://www.jupiterhospital.com/indore/' },
};

// Entries are transcribed from official hospital directories. Where a directory
// does not publish a field, it remains explicitly unlisted rather than inferred.
const directoryEntries: DirectoryEntry[] = [
  // Medanta Indore, official doctor listing pages
  { id: 'doc-ameya-bihani', name: 'Dr. Ameya Bihani', specialityId: 'oncology', designation: 'Director', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Head and neck oncosurgery', 'Thyroid surgery'] },
  { id: 'doc-cs-agarwal', name: 'Dr. C.S. Agarwal', specialityId: 'cardiology', designation: 'Associate Director', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Echocardiography', '3D echo', 'TEE'] },
  { id: 'doc-hari-prasad-yadav', name: 'Dr. Hari Prasad Yadav', specialityId: 'gastroenterology', designation: 'Associate Director', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['GI endoscopy', 'Gastroenterology', 'Liver disease'] },
  { id: 'doc-sunil-kumar-jain', name: 'Dr. Sunil Kumar Jain', specialityId: 'radiology', designation: 'Associate Director', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['CT reporting', 'MRI reporting', 'Radiodiagnosis'] },
  { id: 'doc-arvind-kinger', name: 'Dr. Arvind Kinger', specialityId: 'ent', designation: 'Senior Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Endoscopic nasal surgery', 'Endoscopic ear surgery', 'Rhinoplasty'] },
  { id: 'doc-jyoti-wadhwani', name: 'Dr. Jyoti Wadhwani', specialityId: 'internal-medicine', designation: 'Senior Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Internal medicine', 'Critical care', 'Non-invasive cardiac care'] },
  { id: 'doc-namrata-kachhara', name: 'Dr. Namrata Kachhara', specialityId: 'obstetrics-gynaecology', designation: 'Senior Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Gynaecology and obstetrics', 'Urogynaecology'] },
  { id: 'doc-tanmay-bharani', name: 'Dr. Tanmay Bharani', specialityId: 'endocrinology', designation: 'Senior Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Diabetes mellitus', 'Thyroid diseases', 'Metabolic bone diseases'] },
  { id: 'doc-varun-kataria', name: 'Dr. Varun Kataria', specialityId: 'neurology', designation: 'Senior Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Stroke', 'Epilepsy', 'Headache'] },
  { id: 'doc-anshul-agrawal', name: 'Dr. Anshul Agrawal', specialityId: 'urology', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Endourology', 'Uro-oncology', 'Renal transplantation'] },
  { id: 'doc-arun-singh-bhadauria', name: 'Dr. Arun Singh Bhadauria', specialityId: 'gastroenterology', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Pancreatobiliary disease', 'Hepatology', 'Endoscopic surgery'] },
  { id: 'doc-avinash-mandloi', name: 'Dr. Avinash Mandloi', specialityId: 'orthopaedics', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Complex trauma care', 'Knee and hip replacement', 'Fracture care'] },
  { id: 'doc-gautam-raj-panjabi', name: 'Dr. Gautam Raj Panjabi', specialityId: 'rheumatology', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Rheumatology and immunology'] },
  { id: 'doc-raman-sharma', name: 'Dr. Raman Sharma', specialityId: 'psychiatry', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Adult psychiatry', 'Geriatric psychiatry', 'Cognitive behavioural therapy'] },
  { id: 'doc-ritesh-kumar-gupta', name: 'Dr. Ritesh Kumar Gupta', specialityId: 'cardiology', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Coronary angiography and angioplasty', 'TAVR', 'Structural heart intervention'] },
  { id: 'doc-smita-jain', name: 'Dr. Smita Jain', specialityId: 'critical-care', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Critical care', 'Bronchoscopy'] },
  { id: 'doc-swati-chinchure', name: 'Dr. Swati Chinchure', specialityId: 'interventional-radiology', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Diagnostic neurointerventions', 'Therapeutic neurointerventions', 'Spinal pain interventions'] },
  { id: 'doc-tanay-joshi', name: 'Dr. Tanay Joshi', specialityId: 'pulmonology', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore', expertise: ['Interventional pulmonology', 'Sleep medicine', 'Allergy'] },
  { id: 'doc-vivek-sharma-medanta', name: 'Dr. Vivek Sharma', specialityId: 'gastroenterology', designation: 'Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/hospitals-near-me/indore-hospital/speciality/gastroenterology/doctor/dr-vivek-sharma-1', expertise: ['Surgical gastroenterology', 'Hepatobiliary surgery', 'Colorectal surgery'] },
  { id: 'doc-akshay-kumar-khairwar', name: 'Dr. Akshay Kumar Khairwar', specialityId: 'critical-care', designation: 'Associate Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore?page=4', expertise: ['Anaesthesia and critical care', 'Neuro critical care', 'Cardiac critical care'] },
  { id: 'doc-leena-rajani', name: 'Dr. Leena Rajani', specialityId: 'neurology', designation: 'Associate Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore?page=4', expertise: ['Stroke', 'Epilepsy', 'Movement disorders'] },
  { id: 'doc-sachin-bajaj', name: 'Dr. Sachin Bajaj', specialityId: 'radiology', designation: 'Associate Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore?page=5', expertise: ['MRI reporting', 'CT reporting', 'Ultrasonography'] },
  { id: 'doc-vijay-kumar-soni', name: 'Dr. Vijay Kumar Soni', specialityId: 'general-surgery', designation: 'Visiting Consultant', source: 'medanta', sourceUrl: 'https://www.medanta.org/doctor-listing/doctors-in-indore?page=5', expertise: ['Laparoscopic surgery', 'Gastrointestinal surgery', 'General surgery'] },

  // Bombay Hospital Indore, official panel of consultants
  { id: 'doc-kriti-bansal', name: 'Dr. Kriti Bansal', specialityId: 'gastroenterology', designation: 'Gastroenterologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-ashish-kumar-verma', name: 'Dr. Ashish Kumar Verma', specialityId: 'critical-care', designation: 'Intensivist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-ashish-kumar-dwivedi', name: 'Dr. Ashish Kumar Dwivedi', specialityId: 'neurosurgery', designation: 'Neurosurgeon', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-avinash-jain-bombay', name: 'Dr. Avinash Jain', specialityId: 'pulmonology', designation: 'Chest Physician', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-aviral-jain', name: 'Dr. Aviral Jain', specialityId: 'gastroenterology', designation: 'GI Surgeon', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-devendra-patil', name: 'Dr. Devendra Patil', specialityId: 'obstetrics-gynaecology', designation: 'Obstetrician & Gynaecologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-kavita-ghadale', name: 'Dr. Kavita Ghadale', specialityId: 'obstetrics-gynaecology', designation: 'Obstetrician & Gynaecologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-tanu-soni', name: 'Dr. Tanu Soni', specialityId: 'obstetrics-gynaecology', designation: 'Consultant Gynaecologist & Laparoscopic Surgeon', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-mahendra-kumar-gupta', name: 'Dr. Mahendra Kumar Gupta', specialityId: 'plastic-surgery', designation: 'Plastic Surgeon', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-yogesh-kumar-tatwade', name: 'Dr. Yogesh Kumar Tatwade', specialityId: 'plastic-surgery', designation: 'Plastic Surgeon', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-surbhi-godha', name: 'Dr. Surbhi Godha', specialityId: 'ent', designation: 'ENT Specialist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-rajat-kedia', name: 'Dr. Rajat Kedia', specialityId: 'ent', designation: 'ENT Specialist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-santosh-ahuja', name: 'Dr. Santosh Ahuja', specialityId: 'critical-care', designation: 'Critical Care Specialist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-shailendra-rai', name: 'Dr. Shailendra Rai', specialityId: 'critical-care', designation: 'Critical Care Specialist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-nikita-khandelwal', name: 'Dr. Nikita Khandelwal', specialityId: 'pathology', designation: 'Pathologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-piyush-vyas', name: 'Dr. Piyush Vyas', specialityId: 'pathology', designation: 'Pathologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-praveen-singh', name: 'Dr. Praveen Singh', specialityId: 'pathology', designation: 'Pathologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-nupoor-acharya', name: 'Dr. Nupoor Acharya', specialityId: 'rheumatology', designation: 'Rheumatologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-sanjeev-asati', name: 'Dr. Sanjeev Asati', specialityId: 'orthopaedics', designation: 'Spine Surgeon', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants', subspecialty: 'Spine surgery' },
  { id: 'doc-mukesh-gupta', name: 'Dr. Mukesh Gupta', specialityId: 'radiology', designation: 'Radiologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-devendra-goyal', name: 'Dr. Devendra Goyal', specialityId: 'radiology', designation: 'Radiologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-suraj-makhija', name: 'Dr. Suraj Makhija', specialityId: 'radiology', designation: 'Radiologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-priyank-dwivedi', name: 'Dr. Priyank Dwivedi', specialityId: 'radiology', designation: 'Radiologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-divakar-jain', name: 'Dr. Divakar Jain', specialityId: 'surgical-oncology', designation: 'Surgical Oncologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-vivek-jha', name: 'Dr. Vivek Jha', specialityId: 'urology', designation: 'Urologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-vivek-sullere', name: 'Dr. Vivek Sullere', specialityId: 'cardiology', designation: 'Cardiologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-abhimanyu-nigam', name: 'Dr. Abhimanyu Nigam', specialityId: 'cardiology', designation: 'Cardiologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-manish-jain', name: 'Dr. Manish Jain', specialityId: 'internal-medicine', designation: 'General Physician', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-ashwin-parchani', name: 'Dr. Ashwin Parchani', specialityId: 'internal-medicine', designation: 'General Physician', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-naman-jain', name: 'Dr. Naman Jain', specialityId: 'paediatrics', designation: 'Paediatrician & Neonatologist', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },
  { id: 'doc-shitanshu-dube', name: 'Dr. Shitanshu Dube', specialityId: 'emergency-medicine', designation: 'Emergency Physician', source: 'bombay', sourceUrl: 'https://www.bombayhospitalindore.com/panel-of-consultants' },

  // Vishesh Jupiter Hospital Indore official specialty teams
  { id: 'doc-vinod-somani', name: 'Dr. Vinod Somani', specialityId: 'cardiology', designation: 'Consultant - Interventional Cardiologist', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/cardiology-indore/' },
  { id: 'doc-aniruddha-vyas', name: 'Dr. Aniruddha Vyas', specialityId: 'cardiology', designation: 'Electrophysiology & Interventional Cardiology', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/cardiology-indore/' },
  { id: 'doc-atul-karande', name: 'Dr. Atul Karande', specialityId: 'cardiology', designation: 'Director - Echocardiography and Stress Test', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/cardiology-indore/' },
  { id: 'doc-akshay-jain-jupiter', name: 'Dr. Akshay Jain', specialityId: 'orthopaedics', designation: 'Consultant Spine Surgeon', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/orthopaedics-indore/', subspecialty: 'Spine surgery' },
  { id: 'doc-arpit-agrawal', name: 'Dr. Arpit Agrawal', specialityId: 'orthopaedics', designation: 'Consultant - Paediatric Orthopaedics', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/orthopaedics-indore/', subspecialty: 'Paediatric orthopaedics' },
  { id: 'doc-abhinav-anand', name: 'Dr. Abhinav Anand', specialityId: 'gastroenterology', designation: 'Consultant Gastroenterologist and Hepatologist', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/gastroenterology-indore/', subspecialty: 'Hepatology' },
  { id: 'doc-arun-vishnar', name: 'Dr. Arun Vishnar', specialityId: 'gastroenterology', designation: 'Consultant - Gastroenterology', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/gastroenterology-indore/' },
  { id: 'doc-ashok-ladha', name: 'Dr. Ashok Ladha', specialityId: 'gastroenterology', designation: 'Consultant - Gastroenterologist and Colorectal Surgeon', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/gastroenterology-indore/', subspecialty: 'Colorectal surgery' },
  { id: 'doc-anurag-mohta', name: 'Dr. Anurag Mohta', specialityId: 'paediatrics', designation: 'Consultant - Pediatrics', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/paediatrics-indore/' },
  { id: 'doc-shruti-purohit', name: 'Dr. Shruti Purohit', specialityId: 'paediatrics', designation: 'Consultant Pediatrician and Neonatologist', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/paediatrics-indore/', subspecialty: 'Neonatology' },
  { id: 'doc-aditi-neema', name: 'Dr. Aditi Neema', specialityId: 'physical-medicine', designation: 'Consultant - Pediatric Rehabilitation', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/paediatrics-indore/', subspecialty: 'Pediatric rehabilitation' },
  { id: 'doc-ravi-ranjan-tripathi', name: 'Dr. Ravi Ranjan Tripathi', specialityId: 'paediatrics', designation: 'Consultant - Paediatric Cardiologist', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/paediatrics-indore/', subspecialty: 'Pediatric cardiology' },
  { id: 'doc-deepak-jain-jupiter', name: 'Dr. Deepak Jain', specialityId: 'neurology', designation: 'Consultant - Neurology', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/neurology-indore/' },
  { id: 'doc-indu-bhana', name: 'Dr. Indu Bhana', specialityId: 'neurology', designation: 'Consultant Neurologist', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/neurology-indore/' },
  { id: 'doc-vinod-kumar-rai', name: 'Dr. Vinod Kumar Rai', specialityId: 'neurology', designation: 'Consultant Neurologist', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/neurology-indore/' },
  { id: 'doc-deepak-agrawal', name: 'Dr. Deepak Agrawal', specialityId: 'surgical-oncology', designation: 'Director - Surgical Oncologist', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/oncology-indore/' },
  { id: 'doc-manish-siddha', name: 'Dr. Manish Siddha', specialityId: 'radiation-oncology', designation: 'Director - Radiation Oncology', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/oncology-indore/' },
  { id: 'doc-ashvin-kumar-rangole', name: 'Dr. Ashvin Kumar Rangole', specialityId: 'surgical-oncology', designation: 'Consultant - Surgical Oncology, Robotic & HIPEC Surgeon', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/oncology-indore/' },
  { id: 'doc-tanuj-shrivastava', name: 'Dr. Tanuj Shrivastava', specialityId: 'surgical-oncology', designation: 'Consultant - Surgical Oncology, Robotic & HIPEC Surgeon', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/oncology-indore/' },
  { id: 'doc-vinay-kumar-bohara', name: 'Dr. Vinay Kumar Bohara', specialityId: 'hematology', designation: 'Consultant - Haematologist and Bone Marrow Transplant Physician', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/haematology-and-bmt-indore/' },
  { id: 'doc-akash-tiwari', name: 'Dr. Akash Tiwari', specialityId: 'oncology', designation: 'Consultant - Medical Oncology', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/oncology-indore/' },
  { id: 'doc-rishi-ajay-khanna', name: 'Dr. Rishi Ajay Khanna', specialityId: 'ent', designation: 'Senior Consultant, ENT - Head & Neck Onco Surgeon', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/oncology-indore/', subspecialty: 'Head and neck oncosurgery' },
  { id: 'doc-shashank-vaidya', name: 'Dr. Shashank Vaidya', specialityId: 'internal-medicine', designation: 'Consultant - Internal Medicine', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/internal-medicine-indore/' },
  { id: 'doc-ashok-sethia', name: 'Dr. Ashok Sethia', specialityId: 'internal-medicine', designation: 'Consultant - Internal Medicine', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/internal-medicine-indore/' },
  { id: 'doc-sanjay-gujrati', name: 'Dr. Sanjay Gujrati', specialityId: 'internal-medicine', designation: 'Consultant - Internal Medicine', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/internal-medicine-indore/' },
  { id: 'doc-akhilesh-dubey', name: 'Dr. Akhilesh Dubey', specialityId: 'internal-medicine', designation: 'Consultant - Internal Medicine', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/internal-medicine-indore/' },
  { id: 'doc-bhavesh-talera', name: 'Dr. (Major) Bhavesh Talera', specialityId: 'internal-medicine', designation: 'Consultant Physician', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/internal-medicine-indore/' },
  { id: 'doc-yusuf-saifee', name: 'Dr. Yusuf Saifee', specialityId: 'urology', designation: 'Consultant - Urology and Kidney Transplantation', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/urology-indore/' },
  { id: 'doc-abhishek-laddha', name: 'Dr. Abhishek Laddha', specialityId: 'urology', designation: 'Urology & Uro Oncology', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/urology-indore/', subspecialty: 'Uro-oncology' },
  { id: 'doc-vandana-bansal', name: 'Dr. Vandana Bansal', specialityId: 'general-surgery', designation: 'Consultant - General Surgery', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/general-surgery-and-minimal-access-surgery-indore/' },
  { id: 'doc-amitabh-goel', name: 'Dr. Amitabh Goel', specialityId: 'general-surgery', designation: 'Consultant - Laparoscopic Surgery & General Surgery', source: 'jupiter', sourceUrl: 'https://www.jupiterhospital.com/specialities/indore/general-surgery-and-minimal-access-surgery-indore/' },
];

export const verifiedIndoreDoctors: Doctor[] = directoryEntries.map(entry => {
  const source = sourceInfo[entry.source];
  return {
    id: entry.id,
    name: entry.name,
    specialityId: entry.specialityId,
    subspecialty: entry.subspecialty,
    designation: entry.designation,
    qualifications: 'Not listed in the cited directory.',
    experience: 'Not listed in the cited directory.',
    languages: [],
    bio: entry.name + ' is listed in the publicly available ' + source.hospital + ' doctor directory.',
    expertise: entry.expertise || [],
    sourceUrl: entry.sourceUrl || source.url,
    sourceVerifiedAt: '2026-09-30',
    profileType: 'PUBLIC_REFERENCE',
    hospital: source.hospital,
    location: 'Indore',
    active: true,
    schedules: [],
  };
});
