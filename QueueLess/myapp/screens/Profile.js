// screens/Profile.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function RowItem({ title, note }) {
  return (
    <View style={styles.rowItem}>
      <Text style={styles.rowTitle}>{title}</Text>
      {note ? <Text style={styles.rowNote}>{note}</Text> : null}
    </View>
  );
}

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Blue header with user info */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@university.edu</Text>
        <Text style={styles.studentId}>Student ID: 2024-12345</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>47</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>$342</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.sectionLabel}>Account</Text>
        <RowItem title="Personal Information" />
        <RowItem title="Payment Methods" note="2 cards" />
        <RowItem title="Saved Locations" />

        <Text style={styles.sectionLabel}>Preferences</Text>
        <RowItem title="Notifications" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    backgroundColor: '#276EF1',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#3F83FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  email: {
    color: '#E0E6FF',
    fontSize: 13,
  },
  studentId: {
    color: '#E0E6FF',
    fontSize: 13,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF20',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: '#E0E6FF',
    fontSize: 12,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#7A7F8C',
    marginTop: 8,
    marginBottom: 6,
  },
  rowItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  rowTitle: {
    fontSize: 15,
  },
  rowNote: {
    fontSize: 12,
    color: '#7A7F8C',
    marginTop: 2,
  },
});