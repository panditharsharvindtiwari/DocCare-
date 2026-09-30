export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone?: string;
}
