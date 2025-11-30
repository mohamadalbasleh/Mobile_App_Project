import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { VENDORS } from "../data/vendors";

const { width, height } = Dimensions.get('window');
const CATEGORIES = ['All', 'Cafe', 'Coffee', 'Food', 'Snacks', 'Drinks'];

export default function Home({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("All");

  function openVendor(vendorId) {
    navigation.navigate("VendorDetails", { vendorId });
  }

  const filteredVendors =
  activeCategory === 'All'
    ? VENDORS
    : VENDORS.filter(
        (v) => v.categoryTag === activeCategory
      );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerWelcome}>Welcome back 👋</Text>
          <Text style={styles.headerTitle}>Order Your Meal</Text>

          <View style={styles.locationRow}>
            <View style={styles.locationPill}>
              <Text style={styles.locationPin}>📍</Text>
              <Text style={styles.locationText}>Main Campus</Text>
            </View>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or restaurants..."
            placeholderTextColor="#C7CED9"
          />

          {/* CATEGORY CHIPS (now clickable) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryRow}
            contentContainerStyle={{ paddingRight: 6 }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                  onPress={() => setActiveCategory(cat)}
                  activeOpacity={0.9}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isActive && styles.categoryTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <View style={styles.popularRow}>
            <Text style={styles.sectionTitle}>Popular Now</Text>
            <Text style={styles.foundText}>{filteredVendors.length} found</Text>
          </View>

          {filteredVendors.map((v) => (
            <TouchableOpacity
              key={v.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => openVendor(v.id)}
            >
              {v.image ? (
                <Image source={v.image} style={styles.cardImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageText}>Photo</Text>
                </View>
              )}

              <View style={styles.cardMiddle}>
                <Text style={styles.cardTitle}>{v.name}</Text>
                <Text style={styles.cardSubtitle}>{v.type}</Text>

                <View style={styles.cardBottomRow}>
                  <Text style={styles.timeText}>⏱ {v.time}</Text>
                  <View style={styles.openPill}>
                    <Text style={styles.openText}>Open</Text>
                  </View>
                </View>
              </View>

              <View style={styles.ratingBox}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingText}>
                  {v.rating ? v.rating.toFixed(1) : "4.5"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const HEADER_HEIGHT = 260;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerWelcome: {
    color: "#E5ECFF",
    fontSize: 14,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 4,
  },
  locationRow: {
    marginTop: 12,
    marginBottom: 8,
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#1D4ED8",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  locationPin: { fontSize: 13, marginRight: 4 },
  locationText: { color: "#FFFFFF", fontSize: 13 },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    marginTop: 6,
  },
  categoryRow: {
    marginTop: 14,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#1E40AF",
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: "#FFFFFF",
  },
  categoryText: {
    fontSize: 13,
    color: "#C7D2FE",
  },
  categoryTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },

  body: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  popularRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  foundText: {
    fontSize: 13,
    color: "#9CA3AF",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  cardImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
    marginRight: 12,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  imageText: {
    fontSize: 12,
    color: "#6B7280",
  },
  cardMiddle: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    marginBottom: 4,
  },
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 8,
  },
  openPill: {
    backgroundColor: "#DCFCE7",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  openText: {
    fontSize: 11,
    color: "#15803D",
  },
  ratingBox: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  star: { color: "#FBBF24", fontSize: 16 },
  ratingText: { fontSize: 14, fontWeight: "600", marginTop: 2 },
});
