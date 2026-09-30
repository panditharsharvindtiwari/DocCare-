export type ProfileType = 'INTERNAL' | 'PUBLIC_REFERENCE' | 'DEMO' | 'PLACEHOLDER';

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  breakStartTime?: string;
  breakEndTime?: string;
  breakReason?: string;
  slotDuration: 20 | 30 | 60; // minutes
  slotCapacity?: 1 | 2 | 3 | 4 | 5;
  active: boolean;
}

export interface Doctor {
  id: string;
  authUserId?: string;
  name: string;
  specialityId: string;
  subspecialty?: string;
  designation: string;
  qualifications: string;
  experience: string;
  languages: string[];
  bio: string;
  expertise: string[];
  photoUrl?: string;
  photoSourceUrl?: string;
  photoLicense?: string;
  gender?: 'Male' | 'Female' | 'Other';
  sourceUrl?: string;
  sourceVerifiedAt?: string;
  profileType: ProfileType;
  hospital: string;
  location: string;
  active: boolean;
  schedules: DoctorSchedule[];
}


