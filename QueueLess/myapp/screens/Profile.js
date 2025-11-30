import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { VENDORS } from "../data/vendors";

export default function Profile({
  navigation,
  user,
  favoriteVendors = [],
  ordersCount = 0,
}) {
  const name = user?.name || "Campus User";
  const email = user?.email || "student@example.com";
  const studentId = user?.studentId || "0000000";
  const initials =
    user?.name
      ?.split(" ")
      .filter((p) => p.length > 0)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join("") || "CU";

  const favoriteVendorObjects = VENDORS.filter((v) =>
    favoriteVendors.includes(v.id)
  );

  function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          }),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        bounces={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.studentId}>Student ID: {studentId}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{ordersCount}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorite Cafes</Text>
          {favoriteVendorObjects.length === 0 ? (
            <Text style={styles.emptyText}>
              You have no favorites yet. Tap the heart on a cafe to add it here.
            </Text>
          ) : (
            <View style={styles.favoritesList}>
              {favoriteVendorObjects.map((vendor) => (
                <TouchableOpacity
                  key={vendor.id}
                  style={styles.favoriteCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("VendorDetails", { vendorId: vendor.id })
                  }
                >
                  <View style={styles.favoriteIconCircle}>
                    <Text style={styles.favoriteIconText}>☕️</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.favoriteName}>{vendor.name}</Text>
                    <Text style={styles.favoriteMeta}>{vendor.type}</Text>
                  </View>
                  <Text style={styles.favoriteChevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.9}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    backgroundColor: "#2563EB",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1E40AF",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 4,
  },
  email: {
    color: "#E5ECFF",
    fontSize: 13,
  },
  studentId: {
    color: "#C7D2FE",
    fontSize: 13,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#1D4ED8",
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    color: "#DBEAFE",
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  emptyText: {
    fontSize: 13,
    color: "#6B7280",
  },
  favoritesList: {
    gap: 10,
  },
  favoriteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  favoriteIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  favoriteIconText: {
    fontSize: 20,
  },
  favoriteName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  favoriteMeta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  favoriteChevron: {
    fontSize: 20,
    color: "#9CA3AF",
    marginLeft: 8,
  },
  logoutButton: {
    marginTop: 8,
    backgroundColor: "#FEE2E2",
    borderRadius: 20,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#B91C1C",
    fontSize: 15,
    fontWeight: "600",
  },
});