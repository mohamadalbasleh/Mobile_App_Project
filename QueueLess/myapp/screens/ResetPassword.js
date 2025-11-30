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
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Config";
export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    navigation.goBack();
  }

  function handleReset() {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !newPassword || !confirmPassword) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Weak password", "New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Password mismatch", "New passwords do not match.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    sendPasswordResetEmail(auth, trimmedEmail)
      .then(() => {
        setLoading(false);
        Alert.alert(
          "Reset link sent",
          "A password reset link has been sent to your email. Click it to set your new password.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      })
      .catch((error) => {
        setLoading(false);
        let message = "Unable to send reset email.";
        if (error.code === "auth/user-not-found") {
          message = "No account found with this email.";
        } else if (error.code === "auth/invalid-email") {
          message = "Invalid email address.";
        }
        Alert.alert("Error", message);
      });
  }

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        <View style={styles.card}>
          <Text style={styles.icon}>🔒</Text>
          <Text style={styles.cardText}>
            Enter your email to receive a password reset link.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@university.edu"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
            onPress={handleReset}
            disabled={loading}
          >
            <Text style={styles.primaryText}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleCancel}>
            <Text style={styles.secondaryText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#E0ECFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#1F2933",
    textAlign: "center",
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
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
  secondaryText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
});