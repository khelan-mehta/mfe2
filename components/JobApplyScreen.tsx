import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  User,
} from 'lucide-react-native';

import {styles, colors} from "components/styles/JobApplyStyles";

export default function JobDetailsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Heading */}
      <Text style={styles.heading}>Job Details</Text>

      {/* Job Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.iconBox}>
          <Briefcase size={24} color={colors.primary} />
        </View>

        <View style={styles.summaryContent}>
          <Text style={styles.jobTitle}>Senior UI/UX Designer</Text>
          <Text style={styles.company}>Mento Services Pvt Ltd</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Design</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metaText}>₹45,000 / month</Text>
          </View>

          <View style={styles.locationRow}>
            <MapPin size={14} color={colors.textLight} />
            <Text style={styles.location}>Ahmedabad, India</Text>
          </View>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailCard}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.sectionText}>
          We are looking for a creative UI/UX Designer who can design intuitive,
          user-friendly interfaces for web and mobile applications.
        </Text>

        <Text style={styles.sectionTitle}>Eligibility</Text>
        <Text style={styles.sectionText}>
          • 2+ years of experience in UI/UX{'\n'}
          • Strong portfolio{'\n'}
          • Knowledge of Figma / Adobe XD
        </Text>

        <Text style={styles.sectionTitle}>Company Brief</Text>
        <Text style={styles.sectionText}>
          Mento Services is a technology-driven company providing digital,
          automation, and software solutions to businesses across India.
        </Text>

        <Text style={styles.sectionTitle}>HR Details</Text>
        <Text style={styles.sectionText}>
          HR Name: Priya Shah{'\n'}
          Email: hr@mentoservices.com{'\n'}
          Contact: +91 9XXXXXXXXX
        </Text>
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton} disabled>
        <Text style={styles.applyText}>Apply Now</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

