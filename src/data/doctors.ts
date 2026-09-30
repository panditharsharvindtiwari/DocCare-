import { Doctor, DoctorSchedule } from '../types/doctor';
import { verifiedIndoreDoctors } from './verifiedIndoreDoctors';

// ============================================================
// IMPORTANT DISCLAIMER
// Doctor information displayed below is sourced from publicly
// available professional directories maintained by the listed
// hospitals. Doctor Care Plus is not affiliated with any of the
// listed hospitals or clinicians. Appointment availability shown
// in this prototype is simulated demo availability only and does
// not represent real appointment slots with these doctors.
// ============================================================

// Schedules are stored separately and referenced by doctorId
export const doctorSchedules: DoctorSchedule[] = [
  // Cardiology
  { id: 'sched-001', doctorId: 'doc-bharat-rawat',      dayOfWeek: 1, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-002', doctorId: 'doc-bharat-rawat',      dayOfWeek: 3, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-003', doctorId: 'doc-bharat-rawat',      dayOfWeek: 5, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  { id: 'sched-004', doctorId: 'doc-alkesh-jain',       dayOfWeek: 2, startTime: '10:00', endTime: '14:00', slotDuration: 30, active: true },
  { id: 'sched-005', doctorId: 'doc-alkesh-jain',       dayOfWeek: 4, startTime: '10:00', endTime: '14:00', slotDuration: 30, active: true },

  { id: 'sched-006', doctorId: 'doc-shailendra-trivedi', dayOfWeek: 1, startTime: '11:00', endTime: '14:00', slotDuration: 30, active: true },
  { id: 'sched-007', doctorId: 'doc-shailendra-trivedi', dayOfWeek: 4, startTime: '11:00', endTime: '14:00', slotDuration: 30, active: true },

  { id: 'sched-008', doctorId: 'doc-idris-khan',        dayOfWeek: 2, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },
  { id: 'sched-009', doctorId: 'doc-idris-khan',        dayOfWeek: 5, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  // Gastroenterology
  { id: 'sched-010', doctorId: 'doc-ravi-rathi',        dayOfWeek: 1, startTime: '10:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-011', doctorId: 'doc-ravi-rathi',        dayOfWeek: 3, startTime: '10:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-012', doctorId: 'doc-ravi-rathi',        dayOfWeek: 6, startTime: '10:00', endTime: '12:00', slotDuration: 30, active: true },

  { id: 'sched-013', doctorId: 'doc-lalji-patel',       dayOfWeek: 2, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-014', doctorId: 'doc-lalji-patel',       dayOfWeek: 5, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  // Neurology
  { id: 'sched-015', doctorId: 'doc-alok-mandliya',     dayOfWeek: 1, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-016', doctorId: 'doc-alok-mandliya',     dayOfWeek: 4, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  { id: 'sched-017', doctorId: 'doc-rajneesh-kachhara', dayOfWeek: 2, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-018', doctorId: 'doc-rajneesh-kachhara', dayOfWeek: 5, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  // Orthopaedics
  { id: 'sched-019', doctorId: 'doc-anish-garg',        dayOfWeek: 1, startTime: '10:00', endTime: '14:00', slotDuration: 30, active: true },
  { id: 'sched-020', doctorId: 'doc-anish-garg',        dayOfWeek: 3, startTime: '10:00', endTime: '14:00', slotDuration: 30, active: true },

  { id: 'sched-021', doctorId: 'doc-arvind-rawal',      dayOfWeek: 2, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-022', doctorId: 'doc-arvind-rawal',      dayOfWeek: 4, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  { id: 'sched-023', doctorId: 'doc-anand-gupta',       dayOfWeek: 1, startTime: '11:00', endTime: '14:00', slotDuration: 30, active: true },
  { id: 'sched-024', doctorId: 'doc-anand-gupta',       dayOfWeek: 5, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  // Dermatology
  { id: 'sched-025', doctorId: 'doc-ayushman-bindal',   dayOfWeek: 2, startTime: '10:00', endTime: '14:00', slotDuration: 30, active: true },
  { id: 'sched-026', doctorId: 'doc-ayushman-bindal',   dayOfWeek: 5, startTime: '10:00', endTime: '13:00', slotDuration: 30, active: true },

  { id: 'sched-027', doctorId: 'doc-jayesh-kothari',    dayOfWeek: 1, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },
  { id: 'sched-028', doctorId: 'doc-jayesh-kothari',    dayOfWeek: 3, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  // OB-GYN
  { id: 'sched-029', doctorId: 'doc-kawita-bapat',      dayOfWeek: 1, startTime: '10:00', endTime: '14:00', slotDuration: 30, active: true },
  { id: 'sched-030', doctorId: 'doc-kawita-bapat',      dayOfWeek: 3, startTime: '10:00', endTime: '14:00', slotDuration: 30, active: true },
  { id: 'sched-031', doctorId: 'doc-kawita-bapat',      dayOfWeek: 6, startTime: '10:00', endTime: '12:00', slotDuration: 30, active: true },

  { id: 'sched-032', doctorId: 'doc-amita-dhakad',      dayOfWeek: 2, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-033', doctorId: 'doc-amita-dhakad',      dayOfWeek: 5, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  // ENT
  { id: 'sched-034', doctorId: 'doc-anil-gwaliorkar',   dayOfWeek: 2, startTime: '10:00', endTime: '14:00', slotDuration: 30, active: true },
  { id: 'sched-035', doctorId: 'doc-anil-gwaliorkar',   dayOfWeek: 4, startTime: '10:00', endTime: '13:00', slotDuration: 30, active: true },

  // Nephrology
  { id: 'sched-036', doctorId: 'doc-omprakash-rathi',   dayOfWeek: 1, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },
  { id: 'sched-037', doctorId: 'doc-omprakash-rathi',   dayOfWeek: 4, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  // Paediatrics
  { id: 'sched-038', doctorId: 'doc-rakesh-shukla',     dayOfWeek: 1, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-039', doctorId: 'doc-rakesh-shukla',     dayOfWeek: 3, startTime: '09:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-040', doctorId: 'doc-rakesh-shukla',     dayOfWeek: 5, startTime: '09:00', endTime: '11:30', slotDuration: 30, active: true },

  // Neurosurgery
  { id: 'sched-041', doctorId: 'doc-ankit-gupta',       dayOfWeek: 3, startTime: '10:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-042', doctorId: 'doc-ankit-gupta',       dayOfWeek: 6, startTime: '09:00', endTime: '12:00', slotDuration: 30, active: true },

  // Urology
  { id: 'sched-043', doctorId: 'doc-pritesh-shrimali',  dayOfWeek: 2, startTime: '10:00', endTime: '13:00', slotDuration: 30, active: true },
  { id: 'sched-044', doctorId: 'doc-pritesh-shrimali',  dayOfWeek: 5, startTime: '10:00', endTime: '13:00', slotDuration: 30, active: true },
];

export const doctors: Doctor[] = [
  // â”€â”€ CARDIOLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-bharat-rawat',
    name: 'Dr. Bharat Rawat',
    specialityId: 'cardiology',
    designation: 'Consultant, Cardiac Sciences',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Bharat Rawat is listed as a consultant in Cardiac Sciences at Medanta Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Cardiac Sciences'],
    photoUrl: undefined,
    sourceUrl: 'https://www.medanta.org/hospitals/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Medanta Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-bharat-rawat'),
  },
  {
    id: 'doc-alkesh-jain',
    name: 'Dr. Alkesh Jain',
    specialityId: 'cardiology',
    designation: 'Consultant, Cardiac Sciences',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Alkesh Jain is listed as a consultant in Cardiac Sciences at Medanta Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Cardiac Sciences'],
    photoUrl: undefined,
    sourceUrl: 'https://www.medanta.org/hospitals/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Medanta Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-alkesh-jain'),
  },
  {
    id: 'doc-shailendra-trivedi',
    name: 'Dr. Shailendra Trivedi',
    specialityId: 'cardiology',
    designation: 'Consultant, Cardiology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Shailendra Trivedi is listed under Cardiology at Jupiter Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Cardiology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.jupiterhospital.com/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Jupiter Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-shailendra-trivedi'),
  },
  {
    id: 'doc-idris-khan',
    name: 'Dr. Idris Ahmed Khan',
    specialityId: 'cardiology',
    designation: 'Consultant, Cardiology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'Urdu', 'English'],
    bio: 'Dr. Idris Ahmed Khan is listed under Cardiology at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Cardiology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-idris-khan'),
  },

  // â”€â”€ GASTROENTEROLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-ravi-rathi',
    name: 'Dr. Ravi Rathi',
    specialityId: 'gastroenterology',
    designation: 'Consultant, Gastroenterology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Ravi Rathi is listed as a Gastroenterologist at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Gastroenterology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-ravi-rathi'),
  },
  {
    id: 'doc-lalji-patel',
    name: 'Dr. Lalji Patel',
    specialityId: 'gastroenterology',
    designation: 'Consultant, Gastroenterology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Lalji Patel is listed under Gastroenterology at Jupiter Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Gastroenterology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.jupiterhospital.com/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Jupiter Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-lalji-patel'),
  },

  // â”€â”€ NEUROLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-alok-mandliya',
    name: 'Dr. Alok Mandliya',
    specialityId: 'neurology',
    designation: 'Consultant, Neurology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Alok Mandliya is listed under Neurology at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Neurology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-alok-mandliya'),
  },
  {
    id: 'doc-rajneesh-kachhara',
    name: 'Dr. Rajneesh Kachhara',
    specialityId: 'neurology',
    designation: 'Consultant, Neurosciences',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Rajneesh Kachhara is listed under Neurosciences at Medanta Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Neurosciences'],
    photoUrl: undefined,
    sourceUrl: 'https://www.medanta.org/hospitals/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Medanta Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-rajneesh-kachhara'),
  },

  // â”€â”€ ORTHOPAEDICS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-anish-garg',
    name: 'Dr. Anish Garg',
    specialityId: 'orthopaedics',
    designation: 'Consultant, Orthopaedics',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Anish Garg is listed under Orthopaedics at Medanta Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Orthopaedics'],
    photoUrl: undefined,
    sourceUrl: 'https://www.medanta.org/hospitals/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Medanta Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-anish-garg'),
  },
  {
    id: 'doc-arvind-rawal',
    name: 'Dr. Arvind Rawal',
    specialityId: 'orthopaedics',
    designation: 'Consultant, Orthopaedics',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Arvind Rawal is listed under Orthopaedics at Jupiter Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Orthopaedics'],
    photoUrl: undefined,
    sourceUrl: 'https://www.jupiterhospital.com/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Jupiter Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-arvind-rawal'),
  },
  {
    id: 'doc-anand-gupta',
    name: 'Dr. Anand Gupta',
    specialityId: 'orthopaedics',
    designation: 'Consultant, Orthopaedics',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Anand Gupta is listed under Orthopaedics at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Orthopaedics'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-anand-gupta'),
  },

  // â”€â”€ DERMATOLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-ayushman-bindal',
    name: 'Dr. Ayushman Bindal',
    specialityId: 'dermatology',
    designation: 'Consultant, Dermatology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Ayushman Bindal is listed under Dermatology at Medanta Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Dermatology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.medanta.org/hospitals/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Medanta Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-ayushman-bindal'),
  },
  {
    id: 'doc-jayesh-kothari',
    name: 'Dr. Jayesh Kothari',
    specialityId: 'dermatology',
    designation: 'Consultant, Dermatology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Jayesh Kothari is listed under Dermatology at Jupiter Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Dermatology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.jupiterhospital.com/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Jupiter Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-jayesh-kothari'),
  },

  // â”€â”€ OBSTETRICS & GYNAECOLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-kawita-bapat',
    name: 'Dr. Kawita Bapat',
    specialityId: 'obstetrics-gynaecology',
    designation: 'Consultant, Obstetrics & Gynaecology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Kawita Bapat is listed under Obstetrics & Gynaecology at Jupiter Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Obstetrics & Gynaecology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.jupiterhospital.com/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Jupiter Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-kawita-bapat'),
  },
  {
    id: 'doc-amita-dhakad',
    name: 'Dr. Amita Dhakad',
    specialityId: 'obstetrics-gynaecology',
    designation: 'Consultant, Obstetrics & Gynaecology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Amita Dhakad is listed under Obstetrics & Gynaecology at Jupiter Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Obstetrics & Gynaecology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.jupiterhospital.com/indore',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Jupiter Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-amita-dhakad'),
  },

  // â”€â”€ ENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-anil-gwaliorkar',
    name: 'Dr. Anil Gwaliorkar',
    specialityId: 'ent',
    designation: 'Consultant, ENT',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Anil Gwaliorkar is listed under ENT at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['ENT'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-anil-gwaliorkar'),
  },

  // â”€â”€ NEPHROLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-omprakash-rathi',
    name: 'Dr. Omprakash Rathi',
    specialityId: 'nephrology',
    designation: 'Consultant, Nephrology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Omprakash Rathi is listed under Nephrology at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Nephrology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-omprakash-rathi'),
  },

  // â”€â”€ PAEDIATRICS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-rakesh-shukla',
    name: 'Dr. Rakesh Shukla',
    specialityId: 'paediatrics',
    designation: 'Consultant, Paediatrics',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Rakesh Shukla is listed under Paediatrics at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Paediatrics'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-rakesh-shukla'),
  },

  // â”€â”€ NEUROSURGERY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-ankit-gupta',
    name: 'Dr. Ankit Gupta',
    specialityId: 'neurosurgery',
    designation: 'Consultant, Neurosurgery',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Ankit Gupta is listed under Neurosurgery at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Neurosurgery'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-ankit-gupta'),
  },

  // â”€â”€ UROLOGY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'doc-pritesh-shrimali',
    name: 'Dr. Pritesh Shrimali',
    specialityId: 'urology',
    designation: 'Consultant, Urology',
    qualifications: 'Information not available from public source',
    experience: 'Information not available',
    languages: ['Hindi', 'English'],
    bio: 'Dr. Pritesh Shrimali is listed under Urology at Bombay Hospital, Indore, in the hospital\'s publicly available consultant directory.',
    expertise: ['Urology'],
    photoUrl: undefined,
    sourceUrl: 'https://www.bombayhospitalindore.com',
    sourceVerifiedAt: '2026-09-01',
    profileType: 'PUBLIC_REFERENCE',
    hospital: 'Bombay Hospital, Indore',
    location: 'Indore',
    active: true,
    schedules: doctorSchedules.filter(s => s.doctorId === 'doc-pritesh-shrimali'),
  },
];

// Merge official public-reference entries into the shared doctor source.
doctors.push(...verifiedIndoreDoctors);

// Prototype availability is a configurable demo schedule, not a claim about
// real hospital calendars. Doctors with a listed sample schedule keep it;
// the rest receive weekday clinic hours so the booking flow is demonstrable.
for (const doctor of doctors) {
  if (doctor.schedules.length === 0) {
    doctor.schedules = [1, 2, 3, 4, 5].map(dayOfWeek => ({
      id: `demo-${doctor.id}-${dayOfWeek}`,
      doctorId: doctor.id,
      dayOfWeek: dayOfWeek as 1 | 2 | 3 | 4 | 5,
      startTime: '10:00',
      endTime: '18:00',
      breakStartTime: '13:00',
      breakEndTime: '14:00',
      breakReason: 'Lunch Break',
      slotDuration: 30,
      slotCapacity: 3,
      active: true,
    }));
  } else {
    doctor.schedules = doctor.schedules.map(schedule => ({
      ...schedule,
      slotCapacity: schedule.slotCapacity ?? 3,
      breakStartTime: schedule.breakStartTime ?? (schedule.startTime < '13:00' && schedule.endTime > '13:00' ? '13:00' : undefined),
      breakEndTime: schedule.breakEndTime ?? (schedule.startTime < '13:00' && schedule.endTime > '13:00' ? (schedule.endTime < '14:00' ? schedule.endTime : '14:00') : undefined),
      breakReason: schedule.breakReason ?? (schedule.startTime < '13:00' && schedule.endTime > '13:00' ? 'Lunch Break' : undefined),
    }));
  }
}

