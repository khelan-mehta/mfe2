// types/index.ts - Shared TypeScript interfaces

export interface UserProfile {
  id: string;
  mobile: string;
  email: string | null;
  name: string | null;
  profile_photo: string | null;
  city: string | null;
  pincode: string | null;
  kyc_status: 'pending' | 'submitted' | 'approved' | 'rejected' | null;
  subscription_id: string | null;
  subscription_plan: 'silver' | 'gold' | null;
  subscription_expires_at: { $date: { $numberLong: string } } | null;
  worker_profile_id: string | null;
  worker_is_verified: boolean | null;
}

export interface WorkerProfile {
  worker_id: string;
  categories: string[];
  subcategories: string[];
  experience_years: number;
  description: string;
  hourly_rate: number;
  license_number?: string;
  service_areas: string[];
  is_verified: boolean;
  verification_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export interface KycFormData {
  fullName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  documentType: string;
  documentNumber: string;
  documentFrontImage: string;
  documentBackImage: string;
  selfieImage: string;
}

export interface WorkerFormData {
  categories: string[];
  subcategories: string[]; // Service names selected
  experienceYears: string;
  description: string;
  hourlyRate: string;
  licenseNumber: string;
  serviceAreas: string;
}

export interface Service {
  _id?: string;
  serviceId: string;
  name: string;
  serviceCategory: string;
  price: string;
  rating: string;
  description: string;
  icon: string;
  color: string;
}

export interface CategoryWithServices {
  category: string;
  services: Service[];
  expanded: boolean;
}

export interface WorkerProfile {
  _id?: string;
  user_id: string;
  categories: string[];
  subcategories: string[];
  experience_years: number;
  description: string;
  hourly_rate: number;
  license_number?: string;
  service_areas: string[];
  subscription_plan: 'None' | 'Silver' | 'Gold';
  subscription_expires_at?: string;
  is_verified: boolean;
  is_available: boolean;
  rating: number;
  total_reviews: number;
  total_jobs_completed: number;
  created_at: string;
  updated_at: string;
}

// Flow States for Worker Setup
export type FlowState =
  | 'loading'
  | 'kyc_required'
  | 'kyc_under_review'
  | 'kyc_rejected'
  | 'subscription_required'
  | 'worker_profile_required'
  | 'worker_pending'
  | 'worker_verified'
  | 'complete';

export type PaymentStatus = 'idle' | 'processing' | 'verifying' | 'success' | 'failed';

// Navigation Props
export interface ProfileScreenProps {
  navigation: any;
  onLogout: () => void;
}

export interface WorkerSetupScreenProps {
  navigation: any;
  onComplete?: () => void;
}

export interface KycScreenProps {
  navigation: any;
  onBack?: () => void;
}