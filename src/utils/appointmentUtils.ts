import { Appointment, AppointmentStatus, canTransition, AppointmentEvent } from '../types/appointment';
import { generateId } from './idUtils';

/**
 * Creates a new appointment event record.
 */
export function createAppointmentEvent(
  appointmentId: string,
  status: AppointmentStatus,
  changedBy: string,
  changedByRole: string,
  note?: string
): AppointmentEvent {
  return {
    id: generateId(),
    appointmentId,
    status,
    changedBy,
    changedByRole,
    timestamp: new Date().toISOString(),
    note,
  };
}

/**
 * Transitions an appointment to a new status.
 * Returns the updated appointment or throws if the transition is invalid.
 */
export function transitionAppointment(
  appointment: Appointment,
  newStatus: AppointmentStatus,
  changedBy: string,
  changedByRole: string,
  note?: string
): Appointment {
  if (!canTransition(appointment.status, newStatus)) {
    throw new Error(
      `Invalid transition: ${appointment.status} → ${newStatus}`
    );
  }

  const event = createAppointmentEvent(
    appointment.id,
    newStatus,
    changedBy,
    changedByRole,
    note
  );

  return {
    ...appointment,
    status: newStatus,
    updatedAt: new Date().toISOString(),
    events: [...appointment.events, event],
  };
}

/**
 * Returns the ordered status timeline for display.
 * Excludes terminal/branching states from the main flow.
 */
export const MAIN_STATUS_FLOW: AppointmentStatus[] = [
  'BOOKED',
  'CONFIRMED',
  'CHECKED_IN',
  'WAITING',
  'IN_CONSULTATION',
  'COMPLETED',
];

/**
 * Returns the index of a status in the main flow (-1 if not in flow).
 */
export function getStatusFlowIndex(status: AppointmentStatus): number {
  return MAIN_STATUS_FLOW.indexOf(status);
}
