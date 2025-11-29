// screens/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config';

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
            placeholder="your.email@university.edu"
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

        <TouchableOpacity style={styles.linkRight}>
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

        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Demo Mode</Text>
          <Text style={styles.demoSubtitle}>
            Use your Firebase account to continue
          </Text>
        </View>

        <Text style={styles.footerCopy}>
          © 2025 Campus Queue. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F7FB' },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#276EF1',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: { fontSize: 32, color: '#FFFFFF' },
  appName: { fontSize: 22, fontWeight: '600', textAlign: 'center' },
  tagline: {
    fontSize: 14,
    color: '#7A7F8C',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, marginBottom: 4, color: '#1F2430' },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E3EB',
    fontSize: 14,
  },
  linkRight: { alignItems: 'flex-end', marginBottom: 16 },
  linkText: { color: '#276EF1', fontSize: 13 },
  primaryButton: {
    backgroundColor: '#276EF1',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  bottomText: { fontSize: 13, color: '#555A66' },
  bottomLink: { fontSize: 13, color: '#276EF1', fontWeight: '500' },
  demoBox: {
    backgroundColor: '#EEF3FF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  demoTitle: { fontSize: 14, fontWeight: '600' },
  demoSubtitle: { fontSize: 13, color: '#7A7F8C', textAlign: 'center' },
  footerCopy: {
    fontSize: 11,
    textAlign: 'center',
    color: '#9AA0B2',
  },
});