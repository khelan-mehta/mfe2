// constants/index.ts - Static configuration and data

import { Platform } from 'react-native';
import { SubscriptionPlan } from '../types';

// API Configuration
export const getApiBaseUrl = (): string => {
  if (Platform.OS === 'web') {
    return 'https://api.mentoservices.com/api/v1';
  } else if (Platform.OS === 'android') {
    return 'https://api.mentoservices.com/api/v1';
  } else {
    return 'https://api.mentoservices.com/api/v1';
  }
};

export const API_BASE_URL = getApiBaseUrl();

// Razorpay Configuration
export const RAZORPAY_KEY = 'rzp_live_RrozxPwaxxlYaP';

// Subscription Plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'silver',
    name: 'Silver',
    price: 499,
    duration: '1 Year',
    features: [
      'Profile visibility boost',
      'Priority in search results',
      'Basic analytics',
      'Email support',
    ],
    color: '#9CA3AF',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 799,
    duration: '1 Year',
    features: [
      'All Silver features',
      'Featured profile badge',
      'Advanced analytics',
      'Priority support',
      'Unlimited job applications',
    ],
    popular: true,
    color: '#F59E0B',
  },
];

// Worker Categories
export const WORKER_CATEGORIES = [
  'Plumber',
  'Electrician',
  'Carpenter',
  'Painter',
  'AC Technician',
  'Cleaner',
  'Cook',
  'Driver',
  'Gardener',
  'Security Guard',
];

// Document Types
export const DOCUMENT_TYPES = [
  { label: 'Aadhaar', value: 'aadhaar' },
  { label: 'PAN', value: 'pan' },
  { label: 'Driving License', value: 'drivinglicense' },
  { label: 'Voter ID', value: 'voterid' },
];

// AsyncStorage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  WORKER_PROFILE_ID: 'worker_profile_id',
  SUBSCRIPTION_ID: 'subscription_id',
};