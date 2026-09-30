export interface Patient {
  id: string;
  authUserId: string;
  name: string;
  phone: string;
  email: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  address?: string;
  createdAt: string;
}
