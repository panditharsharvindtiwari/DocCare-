import { Patient } from '../types/patient';

// All patient records are fictional demo data.
// No real patient information is used.
export const demoPatients: Patient[] = [
  { id: 'pat-001', authUserId: 'auth-pat-001', name: 'Rahul Verma',        phone: '9876543210', email: 'rahul.verma@demo.dcp',    age: 38, gender: 'Male',   address: 'Scheme 54, Indore',        createdAt: '2026-09-01T10:00:00Z' },
  { id: 'pat-002', authUserId: 'auth-pat-002', name: 'Priya Sharma',       phone: '9876543211', email: 'priya.sharma@demo.dcp',   age: 29, gender: 'Female', address: 'Vijay Nagar, Indore',      createdAt: '2026-09-02T10:00:00Z' },
  { id: 'pat-003', authUserId: 'auth-pat-003', name: 'Arun Malhotra',      phone: '9876543212', email: 'arun.malhotra@demo.dcp',  age: 55, gender: 'Male',   address: 'Palasia, Indore',          createdAt: '2026-09-03T10:00:00Z' },
  { id: 'pat-004', authUserId: 'auth-pat-004', name: 'Sunita Joshi',       phone: '9876543213', email: 'sunita.joshi@demo.dcp',   age: 42, gender: 'Female', address: 'MR-10, Indore',            createdAt: '2026-09-04T10:00:00Z' },
  { id: 'pat-005', authUserId: 'auth-pat-005', name: 'Vikram Patel',       phone: '9876543214', email: 'vikram.patel@demo.dcp',   age: 33, gender: 'Male',   address: 'Bhanwarkuan, Indore',      createdAt: '2026-09-05T10:00:00Z' },
  { id: 'pat-006', authUserId: 'auth-pat-006', name: 'Anjali Singh',       phone: '9876543215', email: 'anjali.singh@demo.dcp',   age: 26, gender: 'Female', address: 'LIG Colony, Indore',       createdAt: '2026-09-06T10:00:00Z' },
  { id: 'pat-007', authUserId: 'auth-pat-007', name: 'Mahesh Gupta',       phone: '9876543216', email: 'mahesh.gupta@demo.dcp',   age: 61, gender: 'Male',   address: 'Sudama Nagar, Indore',     createdAt: '2026-09-07T10:00:00Z' },
  { id: 'pat-008', authUserId: 'auth-pat-008', name: 'Rekha Tiwari',       phone: '9876543217', email: 'rekha.tiwari@demo.dcp',   age: 48, gender: 'Female', address: 'Annapurna, Indore',        createdAt: '2026-09-08T10:00:00Z' },
  { id: 'pat-009', authUserId: 'auth-pat-009', name: 'Deepak Chandra',     phone: '9876543218', email: 'deepak.chandra@demo.dcp', age: 44, gender: 'Male',   address: 'Saket Nagar, Indore',      createdAt: '2026-09-09T10:00:00Z' },
  { id: 'pat-010', authUserId: 'auth-pat-010', name: 'Kavita Rao',         phone: '9876543219', email: 'kavita.rao@demo.dcp',     age: 35, gender: 'Female', address: 'Bhawarkuan, Indore',       createdAt: '2026-09-10T10:00:00Z' },
  { id: 'pat-011', authUserId: 'auth-pat-011', name: 'Sanjay Dixit',       phone: '9876543220', email: 'sanjay.dixit@demo.dcp',   age: 52, gender: 'Male',   address: 'Rajendra Nagar, Indore',   createdAt: '2026-09-11T10:00:00Z' },
  { id: 'pat-012', authUserId: 'auth-pat-012', name: 'Meera Saxena',       phone: '9876543221', email: 'meera.saxena@demo.dcp',   age: 31, gender: 'Female', address: 'Tilak Nagar, Indore',      createdAt: '2026-09-12T10:00:00Z' },
  { id: 'pat-013', authUserId: 'auth-pat-013', name: 'Ramesh Yadav',       phone: '9876543222', email: 'ramesh.yadav@demo.dcp',   age: 58, gender: 'Male',   address: 'Mahalaxmi Nagar, Indore',  createdAt: '2026-09-13T10:00:00Z' },
  { id: 'pat-014', authUserId: 'auth-pat-014', name: 'Nisha Trivedi',      phone: '9876543223', email: 'nisha.trivedi@demo.dcp',  age: 27, gender: 'Female', address: 'Chhota Bangarda, Indore',  createdAt: '2026-09-14T10:00:00Z' },
  { id: 'pat-015', authUserId: 'auth-pat-015', name: 'Harish Kumar',       phone: '9876543224', email: 'harish.kumar@demo.dcp',   age: 40, gender: 'Male',   address: 'Lasudia Mori, Indore',     createdAt: '2026-09-15T10:00:00Z' },
];

// Demo staff accounts (no real staff data)
export const demoStaffUsers = [
  { id: 'staff-rec-001', email: 'reception@demo.dcp', password: 'demo1234', role: 'receptionist' as const, name: 'Prerna Jain' },
  { id: 'staff-doc-bharat', email: 'dr.rawat@demo.dcp', password: 'demo1234', role: 'doctor' as const, name: 'Dr. Bharat Rawat', doctorId: 'doc-bharat-rawat' },
  { id: 'staff-doc-alkesh', email: 'dr.jain@demo.dcp', password: 'demo1234', role: 'doctor' as const, name: 'Dr. Alkesh Jain', doctorId: 'doc-alkesh-jain' },
  { id: 'staff-admin-001', email: 'admin@demo.dcp', password: 'demo1234', role: 'admin' as const, name: 'Admin User' },
];
