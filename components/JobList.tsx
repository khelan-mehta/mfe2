// components/JobList.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Job {
  id: string;
  title: string;
  time: string;
  location?: string;
  subtitle?: string;
  icon: any;
  color: string;
  budget?: string;
}

interface JobListProps {
  jobs: Job[];
  onJobPress: (job: Job) => void;
}

export const JobList: React.FC<JobListProps> = ({ jobs, onJobPress }) => {
  return (
    <View style={styles.jobsContainer}>
      {jobs.map((job) => {
        const Icon = job.icon;
        return (
          <TouchableOpacity key={job.id} style={styles.jobItem} onPress={() => onJobPress(job)}>
            <View style={[styles.jobItemIcon, { backgroundColor: job.color }]}>
              <Icon size={24} color="#0EA5E9" />
            </View>
            <View style={styles.jobItemContent}>
              <Text style={styles.jobItemTitle}>{job.title}</Text>
              <Text style={styles.jobItemTime}>
                {job.subtitle || `${job.time}${job.location ? ' • ' + job.location : ''}`}
              </Text>
              {job.budget && <Text style={styles.jobBudget}>Budget: {job.budget}</Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  jobsContainer: {
    paddingHorizontal: 20,
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  jobItemIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  jobItemContent: {
    flex: 1,
  },
  jobItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  jobItemTime: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  jobBudget: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
});