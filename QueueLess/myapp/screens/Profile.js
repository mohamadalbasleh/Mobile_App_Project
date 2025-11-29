// screens/Profile.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function RowItem({ title, note, onPress, icon }) {
  return (
    <TouchableOpacity style={styles.rowItem} onPress={onPress}>
      <View style={styles.rowContent}>
        {icon && <Text style={styles.rowIcon}>{icon}</Text>}
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{title}</Text>
          {note ? <Text style={styles.rowNote}>{note}</Text> : null}
        </View>
      </View>
      <Text style={styles.rowArrow}>›</Text>
    </TouchableOpacity>
  );
}

function SwitchItem({ title, value, onToggle, icon }) {
  return (
    <View style={styles.rowItem}>
      <View style={styles.rowContent}>
        {icon && <Text style={styles.rowIcon}>{icon}</Text>}
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{title}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E0E3EB', true: '#276EF1' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export default function Profile({ navigation, auth }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => {
          // Firebase logout logic would go here
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>QAR 285</Text>
              <Text style={styles.statLabel}>Spent</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Payment Section */}
          <Text style={styles.sectionLabel}>💳 Payment</Text>
          <RowItem
            title="Saved Cards"
            note="1 card on file"
            icon="💳"
            onPress={() => Alert.alert('Saved Cards', 'View and manage your payment cards')}
          />
          <RowItem
            title="Wallet Balance"
            note="QAR 250.00"
            icon="📱"
            onPress={() => Alert.alert('Wallet', 'View your university account balance')}
          />
          <RowItem
            title="Transaction History"
            note="View all payments"
            icon="📋"
            onPress={() => Alert.alert('History', 'Transaction history')}
          />

          {/* Account Section */}
          <Text style={styles.sectionLabel}>👤 Account</Text>
          <RowItem
            title="Personal Information"
            note="Edit profile details"
            icon="👤"
            onPress={() => Alert.alert('Profile', 'Edit your personal information')}
          />
          <RowItem
            title="Saved Locations"
            note="2 saved locations"
            icon="📍"
            onPress={() => Alert.alert('Locations', 'Manage your saved locations')}
          />
          <RowItem
            title="Dietary Preferences"
            note="Vegetarian, Gluten-free"
            icon="🥗"
            onPress={() => Alert.alert('Preferences', 'Update your dietary preferences')}
          />

          {/* Preferences Section */}
          <Text style={styles.sectionLabel}>⚙️ Preferences</Text>
          <SwitchItem
            title="Push Notifications"
            icon="🔔"
            value={notifications}
            onToggle={setNotifications}
          />
          <SwitchItem
            title="Order Updates"
            icon="📲"
            value={true}
            onToggle={() => {}}
          />
          <SwitchItem
            title="Marketing Emails"
            icon="📧"
            value={false}
            onToggle={() => {}}
          />

          {/* Help Section */}
          <Text style={styles.sectionLabel}>❓ Support</Text>
          <RowItem
            title="Help Center"
            note="FAQ and guides"
            icon="❓"
            onPress={() => Alert.alert('Help', 'Visit our help center')}
          />
          <RowItem
            title="Contact Us"
            note="Chat or email support"
            icon="💬"
            onPress={() => Alert.alert('Contact', 'Contact our support team')}
          />
          <RowItem
            title="About QueueLess"
            note="Version 1.0.0"
            icon="ℹ️"
            onPress={() => Alert.alert('About', 'QueueLess v1.0.0 - Skip the line, save time')}
          />

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>

          {/* Version */}
          <Text style={styles.versionText}>QueueLess v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#276EF1',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3F83FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  email: {
    color: '#E0E6FF',
    fontSize: 13,
    marginBottom: 2,
  },
  studentId: {
    color: '#E0E6FF',
    fontSize: 13,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF20',
    borderRadius: 16,
    paddingVertical: 12,
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
    fontSize: 11,
    marginTop: 2,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2430',
    marginTop: 16,
    marginBottom: 10,
  },
  rowItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rowIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2430',
  },
  rowNote: {
    fontSize: 12,
    color: '#7A7F8C',
    marginTop: 2,
  },
  rowArrow: {
    fontSize: 18,
    color: '#7A7F8C',
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9BA3B4',
  },
});