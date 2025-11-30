import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { VENDORS } from "../data/vendors";

export default function Profile({ navigation, favoriteVendors, ordersCount = 0 }) {
  const user = {
    name: "Sulistiantoo P",
    email: "60301414@udst.edu.qa",
    studentId: "60301414",
    rating: 5.0,
  };

  function handleFavorites() {
    if (!favoriteVendors || favoriteVendors.length === 0) {
      Alert.alert(
        "Favorite Cafes",
        "You don't have any favorites yet.\nOpen a cafe and tap \"Add to Favorites\"."
      );
      return;
    }

    const list = favoriteVendors
      .map((id) => {
        const v = VENDORS.find((x) => x.id === id);
        return v ? `• ${v.name}` : `• ${id}`;
      })
      .join("\n");

    Alert.alert("Favorite Cafes", `You have marked these cafes:\n\n${list}`);
  }

  function handleEditProfile() {
    Alert.alert("Personal Information", "Profile editing is not implemented.");
  }

  function handleHelp() {
    Alert.alert(
      "Help & Support",
      "For help, please contact the campus cafeteria or your instructor."
    );
  }

  function handleLogout() {
    Alert.alert("Logout", "This is a prototype. Logout is not implemented.");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>SP</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.studentId}>Student ID: {user.studentId}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{ordersCount}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{user.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorites</Text>

          <TouchableOpacity style={styles.row} onPress={handleFavorites}>
            <View style={styles.rowLeft}>
              <Ionicons name="heart-outline" size={22} color="#2563EB" />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Favorite Cafes</Text>
                <Text style={styles.rowSubtitle}>
                  View your marked cafés
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BA3B4" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              navigation.navigate("MainTabs", { screen: "Orders" })
            }
          >
            <View style={styles.rowLeft}>
              <Ionicons name="receipt-outline" size={22} color="#2563EB" />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>My Orders</Text>
                <Text style={styles.rowSubtitle}>
                  View your past and active orders
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BA3B4" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleEditProfile}>
            <View style={styles.rowLeft}>
              <Ionicons name="person-outline" size={22} color="#2563EB" />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Personal Information</Text>
                <Text style={styles.rowSubtitle}>{user.name}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BA3B4" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.row} onPress={handleHelp}>
            <View style={styles.rowLeft}>
              <Ionicons name="help-circle-outline" size={22} color="#2563EB" />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Help & Support</Text>
                <Text style={styles.rowSubtitle}>
                  Get help about using Campus Queue
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BA3B4" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#2563EB",
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1D4ED8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    color: "#E5ECFF",
    fontSize: 13,
    marginTop: 2,
  },
  studentId: {
    color: "#C7D2FE",
    fontSize: 13,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 16,
    backgroundColor: "rgba(15, 23, 42, 0.15)",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  statLabel: {
    color: "#E5ECFF",
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rowTextBox: {
    marginLeft: 10,
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  footer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
  },
  logoutText: {
    marginLeft: 8,
    color: "#EF4444",
    fontWeight: "700",
    fontSize: 14,
  },
});