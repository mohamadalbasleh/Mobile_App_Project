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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter email and password.');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // If we reach here, login success → go to main app
      navigation.replace('MainTabs');
    } catch (error) {
      console.log('Login error', error);
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  }

  function goToSignUp() {
    navigation.navigate('SignUp');
  }

  async function handleForgotPassword() {
    if (!email) {
      Alert.alert('Email Required', 'Please enter your email address.');
      return;
    }

    navigation.navigate('ResetPassword', { email: email.trim() });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo circle */}
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>☕</Text>
        </View>

        <Text style={styles.appName}>Campus Queue</Text>
        <Text style={styles.tagline}>Skip the line, save time</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="60xxxxxx@udst.edu.qa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.linkRight} onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Don't have an account? </Text>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.bottomLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.footerCopy}>
          © 2025 Campus Queue. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const responsiveSizes = {
  logoWidth: width * 0.18,
  logoRadius: width * 0.09,
  containerPadding: width * 0.06,
  logoText: width * 0.08,
  appNameFont: width * 0.055,
  taglineFont: width * 0.035,
  labelFont: width * 0.035,
  inputFont: width * 0.035,
  buttonHeight: height * 0.065,
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F7FB' },
  container: { 
    flex: 1, 
    paddingHorizontal: responsiveSizes.containerPadding, 
    justifyContent: 'center' 
  },
  logoCircle: {
    width: responsiveSizes.logoWidth,
    height: responsiveSizes.logoWidth,
    borderRadius: responsiveSizes.logoRadius,
    backgroundColor: '#276EF1',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  logoText: { fontSize: responsiveSizes.logoText, color: '#FFFFFF' },
  appName: { 
    fontSize: responsiveSizes.appNameFont, 
    fontWeight: '700', 
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  tagline: {
    fontSize: responsiveSizes.taglineFont,
    color: '#7A7F8C',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  inputGroup: { marginBottom: height * 0.018 },
  label: { 
    fontSize: responsiveSizes.labelFont, 
    marginBottom: height * 0.008, 
    color: '#1F2430',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.018,
    borderWidth: 1.5,
    borderColor: '#E0E3EB',
    fontSize: responsiveSizes.inputFont,
    color: '#1F2430',
  },
  linkRight: { alignItems: 'flex-end', marginBottom: height * 0.02 },
  linkText: { color: '#276EF1', fontSize: responsiveSizes.labelFont, fontWeight: '600' },
  primaryButton: {
    backgroundColor: '#276EF1',
    borderRadius: 14,
    paddingVertical: responsiveSizes.buttonHeight * 0.4,
    alignItems: 'center',
    marginBottom: height * 0.025,
    shadowColor: '#276EF1',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: { 
    color: '#FFFFFF', 
    fontSize: width * 0.04, 
    fontWeight: '700' 
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.03,
  },
  bottomText: { fontSize: responsiveSizes.labelFont, color: '#555A66' },
  bottomLink: { 
    fontSize: responsiveSizes.labelFont, 
    color: '#276EF1', 
    fontWeight: '700' 
  },
  demoBox: {
    backgroundColor: '#EEF3FF',
    borderRadius: 12,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  demoTitle: { fontSize: responsiveSizes.labelFont, fontWeight: '700' },
  demoSubtitle: { 
    fontSize: responsiveSizes.taglineFont, 
    color: '#7A7F8C', 
    textAlign: 'center' 
  },
  footerCopy: {
    fontSize: responsiveSizes.taglineFont * 0.8,
    textAlign: 'center',
    color: '#9AA0B2',
  },
});