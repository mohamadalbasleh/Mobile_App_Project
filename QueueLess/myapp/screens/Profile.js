// screens/Profile.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../Config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

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

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        // Fallback if user doc doesn't exist
        setUserData({
          firstName: user.displayName?.split(' ')[0] || 'User',
          lastName: user.displayName?.split(' ')[1] || '',
          displayName: user.displayName || 'User',
          email: user.email,
          studentId: 'N/A',
          totalOrders: 0,
          walletBalance: 0,
          rating: 5.0,
        });
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
      Alert.alert('Error', 'Could not load profile data');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await signOut(auth);
            navigation.replace('Login');
          } catch (error) {
            Alert.alert('Error', 'Failed to logout: ' + error.message);
          }
        },
      },
    ]);
  }

  function handleEditProfile() {
    Alert.prompt(
      'Edit First Name',
      'Update your first name',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: (newFirstName) => {
            if (newFirstName.trim()) {
              updateUserName(newFirstName, userData.lastName);
            }
          },
        },
      ],
      'plain-text',
      userData?.firstName
    );
  }

  async function updateUserName(firstName, lastName) {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          firstName: firstName,
          displayName: `${firstName} ${lastName}`,
        });
        fetchUserData();
        Alert.alert('Success', 'Profile updated!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#276EF1" />
        </View>
      </SafeAreaView>
    );
  }

  const initials = (
    (userData?.firstName?.charAt(0) || 'U') +
    (userData?.lastName?.charAt(0) || '')
  ).toUpperCase();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with user info */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{userData?.displayName || 'User'}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
          <Text style={styles.studentId}>
            Student ID: {userData?.studentId || 'N/A'}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{userData?.totalOrders || 0}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                QAR {userData?.walletBalance || 0}
              </Text>
              <Text style={styles.statLabel}>Balance</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {userData?.rating?.toFixed(1) || '5.0'}
              </Text>
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
            note="Manage your cards"
            icon="💳"
            onPress={() =>
              Alert.alert('Saved Cards', 'View and manage your payment cards')
            }
          />
          <RowItem
            title="Wallet Balance"
            note={`QAR ${userData?.walletBalance || 0}`}
            icon="📱"
            onPress={() =>
              Alert.alert('Wallet', 'View your university account balance')
            }
          />
          <RowItem
            title="Transaction History"
            note={`${userData?.totalOrders || 0} transactions`}
            icon="📋"
            onPress={() => Alert.alert('History', 'Transaction history')}
          />

          {/* Account Section */}
          <Text style={styles.sectionLabel}>👤 Account</Text>
          <RowItem
            title="Personal Information"
            note={`${userData?.firstName || ''} ${userData?.lastName || ''}`}
            icon="👤"
            onPress={handleEditProfile}
          />
          <RowItem
            title="Saved Locations"
            note="Manage your locations"
            icon="📍"
            onPress={() =>
              Alert.alert('Locations', 'Manage your saved locations')
            }
          />
          <RowItem
            title="Dietary Preferences"
            note="Update your preferences"
            icon="🥗"
            onPress={() =>
              Alert.alert('Preferences', 'Update your dietary preferences')
            }
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
            onPress={() =>
              Alert.alert(
                'About',
                'QueueLess v1.0.0 - Skip the line, save time'
              )
            }
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
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
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
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
    fontWeight: '800',
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
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2430',
    marginTop: 18,
    marginBottom: 10,
  },
  rowItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
    fontWeight: '600',
    color: '#1F2430',
  },
  rowNote: {
    fontSize: 12,
    color: '#7A7F8C',
    marginTop: 4,
  },
  rowArrow: {
    fontSize: 18,
    color: '#7A7F8C',
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9BA3B4',
    marginBottom: 8,
  },
});