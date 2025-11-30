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
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../Config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

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

const responsiveSizes = {
  headerPadding: width * 0.05,
  avatarSize: width * 0.2,
  avatarRadius: width * 0.1,
  nameFont: width * 0.055,
  emailFont: width * 0.032,
  labelFont: width * 0.04,
  sectionFont: width * 0.038,
  rowPadding: width * 0.04,
};

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
    paddingTop: height * 0.03,
    paddingBottom: height * 0.03,
    paddingHorizontal: responsiveSizes.headerPadding,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  avatarCircle: {
    width: responsiveSizes.avatarSize,
    height: responsiveSizes.avatarSize,
    borderRadius: responsiveSizes.avatarRadius,
    backgroundColor: '#3F83FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.015,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: responsiveSizes.avatarSize * 0.4,
    fontWeight: '800',
  },
  name: {
    color: '#FFFFFF',
    fontSize: responsiveSizes.nameFont,
    fontWeight: '800',
    marginBottom: height * 0.005,
  },
  email: {
    color: '#E0E6FF',
    fontSize: responsiveSizes.emailFont,
    marginBottom: height * 0.005,
  },
  studentId: {
    color: '#E0E6FF',
    fontSize: responsiveSizes.emailFont,
    marginBottom: height * 0.02,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF20',
    borderRadius: 16,
    paddingVertical: height * 0.015,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '800',
  },
  statLabel: {
    color: '#E0E6FF',
    fontSize: width * 0.028,
    marginTop: height * 0.005,
  },
  body: {
    paddingHorizontal: responsiveSizes.rowPadding,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.03,
  },
  sectionLabel: {
    fontSize: responsiveSizes.sectionFont,
    fontWeight: '700',
    color: '#1F2430',
    marginTop: height * 0.025,
    marginBottom: height * 0.015,
  },
  rowItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: height * 0.018,
    paddingHorizontal: responsiveSizes.rowPadding,
    marginBottom: height * 0.012,
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
    fontSize: width * 0.05,
    marginRight: width * 0.03,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: responsiveSizes.labelFont,
    fontWeight: '600',
    color: '#1F2430',
  },
  rowNote: {
    fontSize: responsiveSizes.emailFont,
    color: '#7A7F8C',
    marginTop: height * 0.006,
  },
  rowArrow: {
    fontSize: width * 0.045,
    color: '#7A7F8C',
    marginLeft: width * 0.02,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 14,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: responsiveSizes.labelFont,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    fontSize: responsiveSizes.emailFont,
    color: '#9BA3B4',
    marginBottom: height * 0.01,
  },
});