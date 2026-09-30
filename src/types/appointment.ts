export type AppointmentStatus =
  | 'BOOKED'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'WAITING'
  | 'IN_CONSULTATION'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RESCHEDULED';

export interface AppointmentEvent {
  id: string;
  appointmentId: string;
  status: AppointmentStatus;
  changedBy: string;
  changedByRole: string;
  timestamp: string;
  note?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  date: string;        // ISO date string "2026-10-05"
  time: string;        // slot start, "10:30"
  endTime?: string;
  rescheduledFromId?: string;
  status: AppointmentStatus;
  reason?: string;
  tokenNumber?: number;
  appointmentType?: 'FIRST_VISIT' | 'FOLLOW_UP';
  notes?: string;
  reminderStatus?: 'PENDING' | 'SENT';
  createdAt: string;
  updatedAt: string;
  events: AppointmentEvent[];
}

/**
 * Valid appointment state transitions.
 * Key = current status, Value = allowed next statuses.
 */
export const VALID_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  BOOKED: ['CONFIRMED', 'CANCELLED', 'RESCHEDULED'],
  CONFIRMED: ['CHECKED_IN', 'CANCELLED', 'RESCHEDULED'],
  CHECKED_IN: ['WAITING', 'CANCELLED'],
  WAITING: ['IN_CONSULTATION', 'CANCELLED'],
  IN_CONSULTATION: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
  RESCHEDULED: [],
};

export function canTransition(
  current: AppointmentStatus,
  next: AppointmentStatus
): boolean {
  return VALID_TRANSITIONS[current].includes(next);
}

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  BOOKED: 'Booked',
  CONFIRMED: 'Confirmed',
  CHECKED_IN: 'Checked In',
  WAITING: 'Waiting',
  IN_CONSULTATION: 'In Consultation',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  RESCHEDULED: 'Rescheduled',
};
