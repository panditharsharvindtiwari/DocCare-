import { addDays, format } from 'date-fns';
import { doctors } from './doctors';
import { demoPatients } from './patients';
import { generateId, generateAppointmentId } from '../utils/idUtils';
import { getGeneratedSlots } from '../utils/slotUtils';
import { Appointment, AppointmentStatus, canTransition } from '../types/appointment';
import type { Doctor, DoctorSchedule } from '../types/doctor';
import type { Patient } from '../types/patient';
import type { UserRole } from '../types/user';

const STORAGE_KEY = 'dcp_mock_db';
const CREDENTIALS_KEY = 'dcp_registered_credentials';
let _credentials: Record<string, { salt: string; hash: string }> = {};
let _appointments: Appointment[] = [];
let _patients: Patient[] = [...demoPatients];
let _schedules: DoctorSchedule[] = doctors.flatMap(doctor => doctor.schedules);
const listeners = new Set<() => void>();
let dbVersion = 0;

function emitChange() { dbVersion++; listeners.forEach(listener => listener()); }
function getPatientDemoAppointments(): Appointment[] {
  const doctor = doctors.find(item => item.id === 'doc-bharat-rawat');
  if (!doctor) return [];
  const nextDates: string[] = [];
  for (let offset = 1; offset <= 21 && nextDates.length < 2; offset++) {
    const date = format(addDays(new Date(), offset), 'yyyy-MM-dd');
    if (doctor.schedules.some(schedule => schedule.dayOfWeek === new Date(`${date}T12:00:00`).getDay())) nextDates.push(date);
  }
  if (!nextDates.length) return [];
  const make = (patientIndex: number, date: string, time: string, status: AppointmentStatus, tokenNumber?: number): Appointment => {
    const id = `DCP-DEMO-${patientIndex + 1}`;
    const timestamp = new Date().toISOString();
    return { id, patientId: `pat-demo-${patientIndex + 1}`, patientName: `Demo Patient ${patientIndex + 1}`, patientPhone: `900000000${patientIndex + 1}`, doctorId: doctor.id, date, time, endTime: slots.find(slot => slot.startTime === time)?.endTime, status, tokenNumber, appointmentType: 'FIRST_VISIT', createdAt: timestamp, updatedAt: timestamp, events: [{ id: `evt-${id}`, appointmentId: id, status, changedBy: 'Doctor Care Plus demo', changedByRole: 'system', timestamp }] };
  };
  const schedule = doctor.schedules.find(item => item.dayOfWeek === new Date(`${nextDates[0]}T12:00:00`).getDay())!;
  const slots = getGeneratedSlots(doctor.schedules, [], nextDates[0], doctor.id);
  const times = slots.map(slot => slot.startTime);
  const sample = times.slice(0, 3);
  if (sample.length < 3) return [];
  const seeded = [make(0, nextDates[0], sample[0], 'BOOKED'), make(1, nextDates[0], sample[1], 'CONFIRMED'), make(2, nextDates[0], sample[2], 'WAITING', 1)];
  void schedule;
  return seeded;
}

function initDb() {
  try {
    const savedCredentials = localStorage.getItem(CREDENTIALS_KEY);
    if (savedCredentials) _credentials = JSON.parse(savedCredentials) as Record<string, { salt: string; hash: string }>;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as { appointments?: Appointment[]; patients?: Patient[]; schedules?: DoctorSchedule[] };
      _appointments = parsed.appointments ?? [];
      _patients = parsed.patients ?? [...demoPatients];
if (parsed.schedules?.length) _schedules = parsed.schedules;
      for (const appointment of _appointments) {
        if (appointment.id.startsWith('DCP-DEMO-')) {
          const demoIndex = Number(appointment.id.slice('DCP-DEMO-'.length));
          appointment.patientId = `pat-demo-${demoIndex}`;
          appointment.patientName = `Demo Patient ${demoIndex}`;
          appointment.patientPhone = `900000000${demoIndex}`;
          const doctor = doctors.find(item => item.id === appointment.doctorId);
          appointment.endTime = doctor ? getGeneratedSlots(doctor.schedules, [], appointment.date, appointment.doctorId).find(slot => slot.startTime === appointment.time)?.endTime : appointment.endTime;
        }
      }
    }
    if (_appointments.length === 0) _appointments = getPatientDemoAppointments();
    saveDb();
  } catch (error) {
    console.error('Failed to initialize mock database', error);
  }
}
function saveCredentials() { localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(_credentials)); }
async function hashPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}
function saveDb() { localStorage.setItem(STORAGE_KEY, JSON.stringify({ appointments: _appointments, patients: _patients, schedules: _schedules })); }
function validSchedule(schedule: DoctorSchedule) {
  const minutes = (value: string) => {
    const [hours, mins] = value.split(':').map(Number);
    return Number.isInteger(hours) && Number.isInteger(mins) && hours >= 0 && hours < 24 && mins >= 0 && mins < 60 ? hours * 60 + mins : -1;
  };
  const start = minutes(schedule.startTime);
  const end = minutes(schedule.endTime);
  const hasBreakStart = Boolean(schedule.breakStartTime);
  const hasBreakEnd = Boolean(schedule.breakEndTime);
  const breakStart = schedule.breakStartTime ? minutes(schedule.breakStartTime) : -1;
  const breakEnd = schedule.breakEndTime ? minutes(schedule.breakEndTime) : -1;
  return start >= 0 && end > start && (schedule.dayOfWeek === 0 || (schedule.dayOfWeek >= 1 && schedule.dayOfWeek <= 6)) &&
    [20, 30, 60].includes(schedule.slotDuration) && [1, 2, 3, 4, 5].includes(schedule.slotCapacity ?? 3) &&
    hasBreakStart === hasBreakEnd && (!hasBreakStart || (breakStart >= start && breakEnd > breakStart && breakEnd <= end));
}
function withSchedules(doctor: Doctor): Doctor { return { ...doctor, schedules: _schedules.filter(schedule => schedule.doctorId === doctor.id) }; }
initDb();

export const mockDb = {
  subscribe(listener: () => void) { listeners.add(listener); return () => listeners.delete(listener); },
  getVersion() { return dbVersion; },
  getDoctors(): Doctor[] { return doctors.map(withSchedules); },
  getDoctorById(id: string): Doctor | undefined { const doctor = doctors.find(item => item.id === id); return doctor ? withSchedules(doctor) : undefined; },
  getDoctorsBySpeciality(specialityId: string): Doctor[] { return doctors.filter(doctor => doctor.specialityId === specialityId).map(withSchedules); },
  getSchedules(): DoctorSchedule[] { return [..._schedules]; },
  setDoctorSchedules(doctorId: string, schedules: DoctorSchedule[]) {
    if (!doctors.some(doctor => doctor.id === doctorId)) throw new Error('DOCTOR_NOT_FOUND');
    if (new Set(schedules.map(schedule => schedule.dayOfWeek)).size !== schedules.length || schedules.some(schedule => schedule.doctorId !== doctorId || !validSchedule(schedule))) throw new Error('INVALID_SCHEDULE');
    _schedules = [..._schedules.filter(schedule => schedule.doctorId !== doctorId), ...schedules]; saveDb(); emitChange();
  },
  async authenticate(email: string, password: string) {
    const patient = _patients.find(item => item.email.toLowerCase() === email.toLowerCase());
    const credential = _credentials[email.toLowerCase()];
    if (patient && credential && await hashPassword(password, credential.salt) === credential.hash) return { userId: patient.id, role: 'patient' as UserRole, name: patient.name };
    if (patient && !credential && password === 'password123') return { userId: patient.id, role: 'patient' as UserRole, name: patient.name };
    const demoStaff = [
      { email: 'rec.indore@doctorcare.in', password: 'password123', userId: 'staff-rec-1', role: 'receptionist' as const, name: 'Receptionist (Indore)' },
      { email: 'doc.sharma@doctorcare.in', password: 'password123', userId: 'staff-doc-1', role: 'doctor' as const, name: 'Dr. Bharat Rawat', doctorId: 'doc-bharat-rawat' },
      { email: 'admin@doctorcare.in', password: 'admin123', userId: 'staff-admin-1', role: 'admin' as const, name: 'System Admin' },
      { email: 'dr.rawat@demo.dcp', password: 'demo1234', userId: 'staff-doc-bharat', role: 'doctor' as const, name: 'Dr. Bharat Rawat', doctorId: 'doc-bharat-rawat' },
      { email: 'reception@demo.dcp', password: 'demo1234', userId: 'staff-rec-001', role: 'receptionist' as const, name: 'Prerna Jain' },
      { email: 'admin@demo.dcp', password: 'demo1234', userId: 'staff-admin-001', role: 'admin' as const, name: 'Admin User' },
    ];
    const staff = demoStaff.find(item => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (staff) return { userId: staff.userId, role: staff.role as UserRole, name: staff.name, doctorId: 'doctorId' in staff ? staff.doctorId : undefined };
    return null;
  },
  async registerPatient(data: { name: string; email: string; phone: string; password: string }) {
    const email = data.email.toLowerCase();
    if (_patients.some(patient => patient.email.toLowerCase() === email)) throw new Error('EMAIL_EXISTS');
    const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
    _credentials[email] = { salt, hash: await hashPassword(data.password, salt) }; saveCredentials();
    const newPatient: Patient = { id: generateId('pat'), authUserId: generateId('auth'), name: data.name, email, phone: data.phone, createdAt: new Date().toISOString() };
    _patients.push(newPatient); saveDb(); emitChange(); return newPatient;
  },
  getPatientById(id: string): Patient | undefined { return _patients.find(patient => patient.id === id); },
  getAppointments(): Appointment[] { return [..._appointments]; },
  getAppointmentById(id: string): Appointment | undefined { return _appointments.find(appointment => appointment.id === id); },
  getAppointmentByIdAndPhone(id: string, phone: string): Appointment | undefined { return _appointments.find(appointment => appointment.id === id && appointment.patientPhone === phone); },
  getAppointmentsByPatientId(patientId: string): Appointment[] { return _appointments.filter(appointment => appointment.patientId === patientId); },
  getAppointmentsByDate(date: string): Appointment[] { return _appointments.filter(appointment => appointment.date === date); },
  getAppointmentsByDoctorId(doctorId: string): Appointment[] { return _appointments.filter(appointment => appointment.doctorId === doctorId); },
  rescheduleAppointment(id: string, date: string, time: string, changedBy: string): Appointment {
    const previous = this.getAppointmentById(id);
    if (!previous) throw new Error('NOT_FOUND');
    if (!canTransition(previous.status, 'RESCHEDULED')) throw new Error('INVALID_TRANSITION');
    const doctor = this.getDoctorById(previous.doctorId);
    const appointmentsWithoutPrevious = _appointments.filter(appointment => appointment.id !== id);
    const slot = doctor && getGeneratedSlots(doctor.schedules, appointmentsWithoutPrevious, date, doctor.id).find(item => item.startTime === time);
    if (!doctor || !slot || slot.remaining <= 0 || slot.status === 'PAST') throw new Error('SLOT_UNAVAILABLE');
    const timestamp = new Date().toISOString();
    const newId = generateAppointmentId();
    previous.status = 'RESCHEDULED';
    previous.updatedAt = timestamp;
    previous.events.push({ id: generateId('evt'), appointmentId: previous.id, timestamp, status: 'RESCHEDULED', changedBy, changedByRole: 'receptionist', note: `Rescheduled to ${newId}` });
    const replacement: Appointment = {
      id: newId, patientId: previous.patientId, patientName: previous.patientName, patientPhone: previous.patientPhone,
      doctorId: previous.doctorId, date, time, endTime: slot.endTime, status: 'BOOKED', reason: previous.reason,
      appointmentType: previous.appointmentType, rescheduledFromId: previous.id, createdAt: timestamp, updatedAt: timestamp,
      events: [{ id: generateId('evt'), appointmentId: newId, timestamp, status: 'BOOKED', changedBy, changedByRole: 'receptionist', note: `Rescheduled from ${previous.id}` }],
    };
    _appointments.push(replacement); saveDb(); emitChange(); return replacement;
  },
  createAppointment(data: { patientId: string; patientName: string; patientPhone: string; doctorId: string; date: string; time: string; reason?: string; appointmentType: 'FIRST_VISIT' | 'FOLLOW_UP' }): Appointment {
    const doctor = this.getDoctorById(data.doctorId);
    const slot = doctor && getGeneratedSlots(doctor.schedules, _appointments, data.date, data.doctorId).find(item => item.startTime === data.time);
    if (!doctor || !slot || slot.remaining <= 0 || slot.status === 'PAST') throw new Error('SLOT_UNAVAILABLE');
    const id = generateAppointmentId();
    const timestamp = new Date().toISOString();
    const appointment: Appointment = { id, ...data, endTime: slot.endTime, status: 'BOOKED', createdAt: timestamp, updatedAt: timestamp, events: [{ id: generateId('evt'), appointmentId: id, timestamp, status: 'BOOKED', changedBy: data.patientName, changedByRole: 'patient' }] };
    _appointments.push(appointment); saveDb(); emitChange(); return appointment;
  },
  cancelAppointment(id: string, changedBy: string, changedByRole: 'patient' | 'receptionist' | 'admin'): Appointment {
    const appointment = this.getAppointmentById(id); if (!appointment) throw new Error('NOT_FOUND');
    return this.updateAppointmentStatus(id, 'CANCELLED', changedBy, changedByRole);
  },
  updateAppointmentStatus(id: string, newStatus: AppointmentStatus, changedBy: string, changedByRole: 'patient' | 'receptionist' | 'doctor' | 'admin'): Appointment {
    const appointment = this.getAppointmentById(id); if (!appointment) throw new Error('NOT_FOUND');
    if (newStatus === 'RESCHEDULED') throw new Error('RESCHEDULE_REQUIRES_TARGET');
    if (!canTransition(appointment.status, newStatus)) throw new Error('INVALID_TRANSITION');
    if (newStatus === 'CHECKED_IN' && !appointment.tokenNumber) {
      const sameSlot = _appointments.filter(item => item.doctorId === appointment.doctorId && item.date === appointment.date && item.time === appointment.time && !['CANCELLED', 'RESCHEDULED'].includes(item.status) && item.tokenNumber);
      appointment.tokenNumber = sameSlot.length + 1;
    }
    appointment.status = newStatus; appointment.updatedAt = new Date().toISOString();
    appointment.events.push({ id: generateId('evt'), appointmentId: appointment.id, timestamp: appointment.updatedAt, status: newStatus, changedBy, changedByRole });
    saveDb(); emitChange(); return appointment;
  },
  reset() { _appointments = []; _patients = [...demoPatients]; saveDb(); emitChange(); },
};
