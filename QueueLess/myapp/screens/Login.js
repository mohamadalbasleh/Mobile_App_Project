import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, trimmedEmail, password)
      .then(() => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      })
      .catch((error) => {
        setLoading(false);
        let message = "Unable to sign in. Please check your details.";
        if (error.code === "auth/user-not-found") {
          message = "No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          message = "Incorrect password.";
        } else if (error.code === "auth/invalid-email") {
          message = "Invalid email address.";
        }
        Alert.alert("Login failed", message);
      });
  }

  function handleForgotPassword() {
    navigation.navigate("ResetPassword");
  }

  function handleSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.logoEmoji}>☕️</Text>
        </View>
        <Text style={styles.title}>Campus Queue</Text>
        <Text style={styles.subtitle}>Skip the line, save time</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="60xxxxxx@udst.edu.qa"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotLink}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signInButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.signInText}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerNote}>
          © 2025 Campus Queue. All rights reserved.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: "center",
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 40,
    color: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 32,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 15,
    color: "#111827",
  },
  forgotLink: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  forgotText: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "500",
  },
  signInButton: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  footerLink: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
  },
  footerNote: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 40,
  },
});