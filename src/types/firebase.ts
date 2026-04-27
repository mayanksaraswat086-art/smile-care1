// Firestore Types for SmileCare

export interface Service {
  id: string;
  name: string;
  category: 'Preventive' | 'Cosmetic' | 'Restorative' | 'Orthodontic' | 'Surgical' | 'Emergency';
  duration: string;
  price: string;
  description: string;
  popular: boolean;
  color: string;
  urgent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Dentist {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  languages: string;
  bio: string;
  photo: string;
  photoAlt: string;
  badge: string;
  badgeColor: string;
  nextSlot?: string;
  education?: string;
  certifications?: string;
  achievements?: string;
  about?: string;
  services?: string;
  clinicHours?: string;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: 'appointment' | 'insurance' | 'billing' | 'records' | 'feedback' | 'other';
  message: string;
  status: 'pending' | 'resolved' | 'in-progress';
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  service: string;
  dentistName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  email: string;
  phone: string;
  notes?: string;
  isExistingPatient: boolean;
  consentGiven: boolean;
  insuranceProvider?: string;
  memberId?: string;
  referenceNumber: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  insuranceProvider?: string;
  memberId?: string;
  medicalHistory?: string[];
  allergies?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DentalRecord {
  id: string;
  patientId: string;
  appointmentId?: string;
  type: 'xray' | 'treatment' | 'prescription' | 'notes';
  title: string;
  description: string;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
