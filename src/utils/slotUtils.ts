import { DoctorSchedule } from '../types/doctor';
import { Appointment } from '../types/appointment';
import { addMinutesToTime, generateTimeSlots, getDayOfWeek, isSlotExpired } from './formatUtils';

export interface SlotAvailability {
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  remaining: number;
  status: 'AVAILABLE' | 'LIMITED' | 'FULL' | 'PAST';
}

const inactiveStatuses = new Set<Appointment['status']>(['CANCELLED', 'RESCHEDULED']);

export function getScheduleForDate(schedules: DoctorSchedule[], dateStr: string, doctorId: string) {
  return schedules.find(schedule => schedule.doctorId === doctorId && schedule.dayOfWeek === getDayOfWeek(dateStr) && schedule.active);
}

export function getGeneratedSlots(
  schedules: DoctorSchedule[],
  existingAppointments: Appointment[],
  dateStr: string,
  doctorId: string,
): SlotAvailability[] {
  const schedule = getScheduleForDate(schedules, dateStr, doctorId);
  if (!schedule) return [];

  const capacity: number = schedule.slotCapacity ?? 3;
  const starts = generateTimeSlots(schedule.startTime, schedule.endTime, schedule.slotDuration);
  const breakStart = schedule.breakStartTime ? timeToMinutes(schedule.breakStartTime) : -1;
  const breakEnd = schedule.breakEndTime ? timeToMinutes(schedule.breakEndTime) : -1;
  const appointments = existingAppointments.filter(appointment => appointment.doctorId === doctorId && appointment.date === dateStr && !inactiveStatuses.has(appointment.status));

  return starts
    .map(startTime => {
      const endTime = addMinutesToTime(startTime, schedule.slotDuration);
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      if (breakStart >= 0 && startMinutes < breakEnd && endMinutes > breakStart) return null;
      const booked = appointments.filter(appointment => appointment.time === startTime).length;
      const past = isSlotExpired(dateStr, startTime);
      const remaining = Math.max(0, capacity - booked);
      return {
        startTime,
        endTime,
        capacity,
        booked,
        remaining,
        status: past ? 'PAST' as const : remaining === 0 ? 'FULL' as const : remaining === 1 ? 'LIMITED' as const : 'AVAILABLE' as const,
      };
    })
    .filter(Boolean) as SlotAvailability[];
}

export function getAvailableSlots(schedules: DoctorSchedule[], existingAppointments: Appointment[], dateStr: string, doctorId: string): string[] {
  return getGeneratedSlots(schedules, existingAppointments, dateStr, doctorId)
    .filter(slot => slot.remaining > 0 && slot.status !== 'PAST')
    .map(slot => slot.startTime);
}

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
