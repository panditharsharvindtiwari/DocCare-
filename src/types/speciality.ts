export type SpecialityCategory =
  | 'Primary Care'
  | "Women's & Men's Health"
  | 'Heart & Blood'
  | 'Brain & Nervous System'
  | 'Bones & Musculoskeletal'
  | 'Skin'
  | 'ENT & Eyes'
  | 'Respiratory'
  | 'Digestive'
  | 'Hormones'
  | 'Kidney'
  | 'Cancer'
  | 'Surgery'
  | 'Emergency & Critical Care'
  | 'Diagnostics'
  | 'Anaesthesia & Pain'
  | 'Sleep & Preventive Care'
  | 'Palliative Care'
  | 'Dental';

export interface Speciality {
  id: string;
  name: string;
  category: SpecialityCategory;
  shortDescription: string;
  icon: string;
  active: boolean;
  featured: boolean;
}

export interface SpecialityContent {
  specialityId: string;
  overview: string;
  commonConditions: string[];
  commonInvestigations: string[];
  whenToConsult: string[];
  commonTreatmentApproaches: string;
  relatedSpecialities: string[];
  lastReviewed: string;
}
