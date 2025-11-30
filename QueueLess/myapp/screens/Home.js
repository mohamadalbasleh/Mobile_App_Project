import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { VENDORS } from "../data/vendors";

export default function Home({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Cafe", "Food & Drinks"];

  const filteredVendors = useMemo(() => {
    if (activeCategory === "All") return VENDORS;
    if (activeCategory === "Cafe") {
      return VENDORS.filter((v) => v.categoryTag === "Cafe");
    }
    if (activeCategory === "Food & Drinks") {
      return VENDORS.filter((v) => v.categoryTag === "Food & Drinks");
    }
    return VENDORS;
  }, [activeCategory]);

  function renderVendor({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("VendorDetails", { vendorId: item.id })
        }
      >
        <View style={styles.cardRow}>
          <View style={styles.cardImageWrapper}>
            {item.image ? (
              <Image source={item.image} style={styles.cardImage} />
            ) : (
              <View style={styles.cardImagePlaceholder}>
                <Text style={styles.cardImageText}>☕️</Text>
              </View>
            )}
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.vendorName}>{item.name}</Text>
            <Text style={styles.vendorType}>{item.type}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaChip}>
                <Ionicons name="time-outline" size={12} color="#4B5563" />
                <Text style={styles.metaText}>{item.time}</Text>
              </View>
              <View style={styles.metaChip}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.metaText}>
                  {item.rating ? item.rating.toFixed(1) : "4.5"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>UDST QueueLess</Text>
            <Text style={styles.subtitle}>
              Order ahead and skip the cafeteria line
            </Text>
          </View>
        </View>

        <View style={styles.categoryRow}>
          <FlatList
            data={categories}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryListContent}
            renderItem={({ item }) => {
              const isActive = item === activeCategory;
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item)}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isActive && styles.categoryTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Campus vendors</Text>
          <Text style={styles.sectionSubtitle}>
            Showing {filteredVendors.length} places
          </Text>
        </View>

        <FlatList
          data={filteredVendors}
          keyExtractor={(item) => item.id}
          renderItem={renderVendor}
          contentContainerStyle={styles.listContent}
        />
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    maxWidth: "80%",
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  categoryRow: {
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  categoryListContent: {
    paddingHorizontal: 8,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#000000",
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  categoryText: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 14,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardImagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImageText: {
    fontSize: 22,
  },
  cardInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  vendorType: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    marginRight: 6,
  },
  metaText: {
    fontSize: 11,
    color: "#4B5563",
    marginLeft: 4,
  },
});