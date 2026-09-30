import { format, parseISO, isToday, isPast, isFuture, addMinutes } from 'date-fns';

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'dd MMM yyyy');
  } catch {
    return dateStr;
  }
}

export function formatTime(timeStr: string): string {
  try {
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:${String(m).padStart(2, '0')} ${period}`;
  } catch {
    return timeStr;
  }
}

export function formatDateTime(dateStr: string, timeStr: string): string {
  return `${formatDate(dateStr)}, ${formatTime(timeStr)}`;
}

export function isDateToday(dateStr: string): boolean {
  try {
    return isToday(parseISO(dateStr));
  } catch {
    return false;
  }
}

export function isDatePast(dateStr: string): boolean {
  try {
    return isPast(parseISO(dateStr));
  } catch {
    return false;
  }
}

export function isDateFuture(dateStr: string): boolean {
  try {
    return isFuture(parseISO(dateStr));
  } catch {
    return false;
  }
}

export function isSlotExpired(dateStr: string, timeStr: string): boolean {
  try {
    const [h, m] = timeStr.split(':').map(Number);
    const slotDate = parseISO(dateStr);
    slotDate.setHours(h, m, 0, 0);
    return isPast(slotDate);
  } catch {
    return true;
  }
}

export function formatRelativeTime(isoString: string): string {
  try {
    const date = parseISO(isoString);
    return format(date, 'dd MMM yyyy, h:mm a');
  } catch {
    return isoString;
  }
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  slotDuration: number
): string[] {
  const slots: string[] = [];
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startTotal = startH * 60 + startM;
  const endTotal = endH * 60 + endM;

  for (let t = startTotal; t + slotDuration <= endTotal; t += slotDuration) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }
  return slots;
}

export function getDayOfWeek(dateStr: string): number {
  try {
    return parseISO(dateStr).getDay();
  } catch {
    return -1;
  }
}

export function addMinutesToTime(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  const base = new Date(2000, 0, 1, h, m);
  const result = addMinutes(base, minutes);
  return `${String(result.getHours()).padStart(2, '0')}:${String(result.getMinutes()).padStart(2, '0')}`;
}
