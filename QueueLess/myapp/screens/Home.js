// screens/Home.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { VENDORS } from '../data/vendors';

const CATEGORIES = ['All', 'Fast Food', 'Pizza', 'Japanese', 'Mexican', 'Indian'];

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter vendors based on search and category
  const filteredVendors = VENDORS.filter((vendor) => {
    const matchesSearch = 
      searchQuery === '' ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.items.some(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'All' || vendor.type.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleVendorPress = (vendorId) => {
    navigation.navigate('VendorDetails', { vendorId });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Blue header */}
        <View style={styles.header}>
          <Text style={styles.headerWelcome}>Welcome back 👋</Text>
          <Text style={styles.headerTitle}>Order Your Meal</Text>

          <TouchableOpacity style={styles.locationChip}>
            <Text style={styles.locationText}>📍 Main Campus</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9BA3B4"
          />

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryRow}
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === selectedCategory;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
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

        {/* Results Section */}
        <View style={styles.body}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? 'Search Results' : 'Popular Now'}
            </Text>
            <Text style={styles.resultCount}>{filteredVendors.length} found</Text>
          </View>

          {filteredVendors.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>No vendors found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredVendors.map((v) => (
              <TouchableOpacity
                key={v.id}
                style={styles.card}
                onPress={() => handleVendorPress(v.id)}
              >
                {/* Placeholder box for image */}
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageText}>🍽️</Text>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{v.name}</Text>
                  <Text style={styles.cardSubtitle}>{v.type}</Text>

                  <View style={styles.cardRow}>
                    <Text style={styles.cardMeta}>⏱ {v.time}</Text>
                    <View style={styles.statusChip}>
                      <Text style={styles.statusText}>Open</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingStar}>★</Text>
                  <Text style={styles.ratingText}>{v.rating.toFixed(1)}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
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
    backgroundColor: '#3F4A6E20',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
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
    paddingBottom: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultCount: {
    fontSize: 13,
    color: '#7A7F8C',
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
    fontSize: 32,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7A7F8C',
    textAlign: 'center',
  },
});