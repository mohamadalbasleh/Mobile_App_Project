// screens/Home.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const CATEGORIES = ['All', 'Coffee', 'Fast Food', 'Healthy', 'Pizza'];

const VENDORS = [
  {
    id: '1',
    name: 'Campus Coffee Bar',
    type: 'Coffee & Pastries',
    time: '5–10 min',
    rating: '4.8',
  },
  {
    id: '2',
    name: 'The Burger Joint',
    type: 'Fast Food',
    time: '10–15 min',
    rating: '4.6',
  },
  {
    id: '3',
    name: 'Fresh Salad Co.',
    type: 'Healthy',
    time: '8–12 min',
    rating: '4.7',
  },
  {
    id: '4',
    name: 'Pizza Paradise',
    type: 'Pizza & Italian',
    time: '12–18 min',
    rating: '4.5',
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Blue header */}
        <View style={styles.header}>
          <Text style={styles.headerWelcome}>Welcome back 👋</Text>
          <Text style={styles.headerTitle}>Order Your Meal</Text>

          <TouchableOpacity style={styles.locationChip}>
            <Text style={styles.locationText}>Main Campus</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or restaurants..."
          />

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryRow}
          >
            {CATEGORIES.map((cat, index) => {
              const isActive = index === 0; // "All" active
              return (
                <View
                  key={cat}
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
                    {cat}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Popular Now */}
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Popular Now</Text>

          {VENDORS.map((v) => (
            <View key={v.id} style={styles.card}>
              {/* Placeholder box for image */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>Photo</Text>
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{v.name}</Text>
                <Text style={styles.cardSubtitle}>{v.type}</Text>

                <View style={styles.cardRow}>
                  <Text style={styles.cardMeta}>⏱ {v.time}</Text>
                  <View style={styles.statusChip}>
                    <Text style={styles.statusText}>Open Now</Text>
                  </View>
                </View>
              </View>

              <View style={styles.ratingBadge}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingText}>{v.rating}</Text>
              </View>
            </View>
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
    backgroundColor: '#F5F7FB',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#276EF1',
    paddingHorizontal: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerWelcome: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 12,
  },
  locationChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#3F83FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
  },
  categoryRow: {
    marginTop: 14,
  },
  categoryChip: {
    backgroundColor: '#3F83FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#3F4A6E20',
  },
  categoryChipActive: {
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 13,
    color: '#E0E6FF',
  },
  categoryTextActive: {
    color: '#276EF1',
    fontWeight: '600',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E6EAF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imageText: {
    fontSize: 12,
    color: '#7A7F8C',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7A7F8C',
    marginBottom: 4,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardMeta: {
    fontSize: 12,
    color: '#7A7F8C',
    marginRight: 8,
  },
  statusChip: {
    backgroundColor: '#E3F7E9',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 11,
    color: '#1E7F3B',
  },
  ratingBadge: {
    alignItems: 'center',
  },
  ratingStar: {
    color: '#FFC107',
    fontSize: 14,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
  },
});