/**
 * Generates a Doctor Care Plus appointment ID.
 * Format: DCP-YYYY-XXXXXX (6 random uppercase alphanumeric chars)
 */
export function generateAppointmentId(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DCP-${year}-${suffix}`;
}

export function generateId(prefix: string = ''): string {
  const randomStr = Math.random().toString(36).substring(2, 11);
  return prefix ? `${prefix}-${randomStr}` : randomStr;
}
