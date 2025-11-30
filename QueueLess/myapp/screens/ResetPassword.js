import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../Config';

const { width, height } = Dimensions.get('window');

export default function ResetPassword({ navigation, route }) {
  const [email, setEmail] = useState(route.params?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  async function handleResetPassword() {
    // Validation
    if (!currentPassword) {
      Alert.alert('Missing Field', 'Please enter your current password.');
      return;
    }
    if (!newPassword) {
      Alert.alert('Missing Field', 'Please enter a new password.');
      return;
    }
    if (!confirmPassword) {
      Alert.alert('Missing Field', 'Please confirm your new password.');
      return;
    }

    // Password length check
    if (newPassword.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    // Match check
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match', 'New password and confirmation password do not match.');
      return;
    }

    // Same as current check
    if (newPassword === currentPassword) {
      Alert.alert('Same Password', 'New password cannot be the same as current password.');
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Error', 'No user logged in. Please go back and login first.');
        return;
      }

      // Re-authenticate user before updating password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      Alert.alert(
        'Success!',
        'Your password has been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      console.log('Reset password error:', error);
      
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Current password is incorrect.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'New password is too weak. Use at least 6 characters.');
      } else {
        Alert.alert('Error', error.message || 'Failed to reset password.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={width * 0.07} color="#276EF1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
        <View style={{ width: width * 0.07 }} />
      </View>

      <View style={styles.container}>
        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="lock-open" size={width * 0.08} color="#276EF1" />
          <Text style={styles.infoText}>
            Enter your current password and choose a new password
          </Text>
        </View>

        {/* Current Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your current password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPass}
              placeholderTextColor="#9BA3B4"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowCurrentPass(!showCurrentPass)}
            >
              <Ionicons
                name={showCurrentPass ? 'eye' : 'eye-off'}
                size={width * 0.05}
                color="#7A7F8C"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter a new password (min 6 characters)"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPass}
              placeholderTextColor="#9BA3B4"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowNewPass(!showNewPass)}
            >
              <Ionicons
                name={showNewPass ? 'eye' : 'eye-off'}
                size={width * 0.05}
                color="#7A7F8C"
              />
            </TouchableOpacity>
          </View>
          {newPassword.length > 0 && newPassword.length < 6 && (
            <Text style={styles.warningText}>
              Password must be at least 6 characters
            </Text>
          )}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPass}
              placeholderTextColor="#9BA3B4"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPass(!showConfirmPass)}
            >
              <Ionicons
                name={showConfirmPass ? 'eye' : 'eye-off'}
                size={width * 0.05}
                color="#7A7F8C"
              />
            </TouchableOpacity>
          </View>
          {confirmPassword.length > 0 && newPassword !== confirmPassword && (
            <Text style={styles.warningText}>Passwords do not match</Text>
          )}
          {confirmPassword.length > 0 && newPassword === confirmPassword && newPassword.length >= 6 && (
            <Text style={styles.successText}>Passwords match ✓</Text>
          )}
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.buttonDisabled]}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.primaryButtonText}>Update Password</Text>
          )}
        </TouchableOpacity>

        {/* Back to Login Link */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const responsiveSizes = {
  containerPadding: width * 0.06,
  labelFont: width * 0.035,
  inputFont: width * 0.035,
  buttonHeight: height * 0.065,
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F7FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E3EB',
  },
  backButton: {
    padding: width * 0.02,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#1F2430',
  },
  container: {
    flex: 1,
    paddingHorizontal: responsiveSizes.containerPadding,
    paddingTop: height * 0.03,
  },
  infoBox: {
    backgroundColor: '#EEF3FF',
    borderRadius: 14,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
    marginBottom: height * 0.035,
  },
  infoText: {
    fontSize: responsiveSizes.labelFont,
    color: '#276EF1',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: height * 0.01,
  },
  inputGroup: {
    marginBottom: height * 0.022,
  },
  label: {
    fontSize: responsiveSizes.labelFont,
    marginBottom: height * 0.008,
    color: '#1F2430',
    fontWeight: '600',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E3EB',
    paddingHorizontal: width * 0.035,
  },
  input: {
    flex: 1,
    paddingVertical: height * 0.018,
    fontSize: responsiveSizes.inputFont,
    color: '#1F2430',
  },
  eyeButton: {
    padding: width * 0.02,
  },
  warningText: {
    fontSize: responsiveSizes.labelFont * 0.85,
    color: '#FF6B6B',
    marginTop: height * 0.006,
    fontWeight: '500',
  },
  successText: {
    fontSize: responsiveSizes.labelFont * 0.85,
    color: '#4CAF50',
    marginTop: height * 0.006,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#276EF1',
    borderRadius: 14,
    paddingVertical: responsiveSizes.buttonHeight * 0.4,
    alignItems: 'center',
    marginTop: height * 0.04,
    marginBottom: height * 0.015,
    shadowColor: '#276EF1',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: '700',
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: '#E0E3EB',
    borderRadius: 14,
    paddingVertical: responsiveSizes.buttonHeight * 0.4,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    color: '#7A7F8C',
    fontSize: width * 0.04,
    fontWeight: '700',
  },
});
