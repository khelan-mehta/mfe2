import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { UserProfile, WorkerProfile, FlowState, JobSeekerProfile, JobFlowState } from '../types';
import { API_BASE_URL, STORAGE_KEYS } from '../constants';
import { determineFlowState, determineJobFlowState } from '../utils';
import { authorizedFetch } from '../utils/authorizedFetch';
import { getCurrentLocation } from '../utils/location';

interface UseProfileReturn {
  loading: boolean;
  refreshing: boolean;
  userProfile: UserProfile | null;
  workerProfile: WorkerProfile | null;
  jobSeekerProfile: JobSeekerProfile | null;
  flowState: FlowState;
  jobFlowState: JobFlowState;
  loadUserData: () => Promise<void>;
  handleRefresh: () => void;
  handleUnauthorized: () => Promise<void>;
  fetchWorkerProfile: (workerId: string) => Promise<WorkerProfile | null>;
  fetchJobSeekerProfile: () => Promise<JobSeekerProfile | null>;
}

export const useProfile = (onLogout?: () => void): UseProfileReturn => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workerProfile, setWorkerProfile] = useState<WorkerProfile | null>(null);
  const [jobSeekerProfile, setJobSeekerProfile] = useState<JobSeekerProfile | null>(null);
  const [flowState, setFlowState] = useState<FlowState>('loading');
  const [jobFlowState, setJobFlowState] = useState<JobFlowState>('loading');

  /* --------------------
     Logout handler
  -------------------- */
  const handleUnauthorized = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.WORKER_PROFILE_ID,
        STORAGE_KEYS.SUBSCRIPTION_ID,
        STORAGE_KEYS.JOB_SEEKER_PROFILE_ID,
        STORAGE_KEYS.JOB_SEEKER_SUBSCRIPTION_ID,
      ]);
      onLogout?.();
    } catch (error) {
      console.error('Error during unauthorized logout:', error);
    }
  }, [onLogout]);

  /* --------------------
     Worker profile fetch
  -------------------- */
  const fetchWorkerProfile = useCallback(
    async (workerId: string): Promise<WorkerProfile | null> => {
      try {
        const response = await authorizedFetch(
          `${API_BASE_URL}/worker/profile/${workerId}`,
          {},
          handleUnauthorized
        );

        if (!response.ok) return null;

        const result = await response.json();

        if (result.success && result.data) {
          setWorkerProfile(result.data);
          return result.data;
        }

        return null;
      } catch (error) {
        console.error('Error fetching worker profile:', error);
        return null;
      }
    },
    [handleUnauthorized]
  );

  /* --------------------
     Job Seeker profile fetch
  -------------------- */
  const fetchJobSeekerProfile = useCallback(
    async (): Promise<JobSeekerProfile | null> => {
      try {
        const response = await authorizedFetch(
          `${API_BASE_URL}/job-seeker/profile`,
          {},
          handleUnauthorized
        );

        if (!response.ok) return null;

        const result = await response.json();

        if (result.success && result.data) {
          setJobSeekerProfile(result.data);
          return result.data;
        }

        return null;
      } catch (error) {
        console.error('Error fetching job seeker profile:', error);
        return null;
      }
    },
    [handleUnauthorized]
  );

  /* --------------------
     User profile fetch
  -------------------- */
  const loadUserData = useCallback(async () => {
    try {
      setLoading(true);

      // Only check if user is logged in
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (!token) {
        await handleUnauthorized();
        return;
      }

      const response = await authorizedFetch(
        `${API_BASE_URL}/user/profile`,
        {},
        handleUnauthorized
      );

      if (!response.ok) {
        await handleUnauthorized();
        return;
      }

      const result = await response.json();

      if (!result.success || !result.data) {
        throw new Error('Failed to fetch profile');
      }

      const profile: UserProfile = result.data;
      setUserProfile(profile);

      const newFlowState = determineFlowState(profile);
      setFlowState(newFlowState);

      const newJobFlowState = determineJobFlowState(profile);
      setJobFlowState(newJobFlowState);

      if (profile.worker_profile_id) {
        await fetchWorkerProfile(profile.worker_profile_id);
      }

      if (profile.job_seeker_profile_id) {
        await fetchJobSeekerProfile();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.showWarning('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [handleUnauthorized, fetchWorkerProfile, fetchJobSeekerProfile]);

  /* --------------------
     Pull to refresh
  -------------------- */
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserData();
  }, [loadUserData]);

  const updateWorkerLocation = useCallback(async () => {
    try {
      if (!workerProfile) return;

      const coords = await getCurrentLocation();
      if (!coords) return;

      await authorizedFetch(
        `${API_BASE_URL}/worker/location`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(coords),
        },
        handleUnauthorized
      );
    } catch (error) {
      console.log('Failed to update location (silent):', error);
    }
  }, [workerProfile, handleUnauthorized]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
  if (workerProfile) {
    updateWorkerLocation();
  }
}, [workerProfile, updateWorkerLocation]);

  return {
    loading,
    refreshing,
    userProfile,
    workerProfile,
    jobSeekerProfile,
    flowState,
    jobFlowState,
    loadUserData,
    handleRefresh,
    handleUnauthorized,
    fetchWorkerProfile,
    fetchJobSeekerProfile,
  };
};
