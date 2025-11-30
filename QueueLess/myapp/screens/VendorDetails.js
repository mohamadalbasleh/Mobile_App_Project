import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VENDORS } from '../data/vendors';

export default function VendorDetails({
  route,
  addToCart,
  favoriteVendors,
  toggleFavoriteVendor,
}) {
  const { vendorId } = route.params;
  const vendor = VENDORS.find((v) => v.id === vendorId);
  const [activeCategory, setActiveCategory] = useState('All');

  if (!vendor) {
    return (
      <View style={styles.center}>
        <Text>Vendor not found.</Text>
      </View>
    );
  }

  const isFavorite = favoriteVendors?.includes(vendor.id);
  const items = vendor.items || [];

  const categories = useMemo(() => {
    const set = new Set();
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  function handleAdd(item) {
    addToCart(item, vendor.name);
    Alert.alert('Added to cart', `"${item.name}" has been added to your cart.`);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <Text style={styles.vendorType}>{vendor.type}</Text>
            <Text style={styles.metaText}>
              {vendor.time} · ★ {vendor.rating?.toFixed(1)}
            </Text>

            <View style={styles.favoriteContainer}>
              <TouchableOpacity
                style={[
                  styles.favoriteButton,
                  isFavorite && styles.favoriteButtonActive,
                ]}
                onPress={() => toggleFavoriteVendor(vendor.id)}
              >
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={18}
                  color={isFavorite ? '#EF4444' : '#2563EB'}
                />
                <Text
                  style={[
                    styles.favoriteText,
                    isFavorite && styles.favoriteTextActive,
                  ]}
                >
                  {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.menuTitle}>Menu</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryRow}
              contentContainerStyle={{ paddingRight: 10 }}
            >
              {categories.map((cat) => {
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
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={styles.itemTextBlock}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                QAR {item.price.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAdd(item)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  vendorName: { fontSize: 22, fontWeight: '700' },
  vendorType: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  metaText: { fontSize: 13, color: '#9CA3AF', marginTop: 4, marginBottom: 8 },
  favoriteContainer: {
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
  },
  favoriteButtonActive: {
    backgroundColor: '#FEE2E2',
  },
  favoriteText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  favoriteTextActive: {
    color: '#B91C1C',
  },
  menuTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  categoryRow: { marginBottom: 12 },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },
  categoryChipActive: { backgroundColor: '#2563EB' },
  categoryText: { fontSize: 13, color: '#4B5563' },
  categoryTextActive: { color: '#FFFFFF', fontWeight: '600' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemTextBlock: { flex: 1 },
  itemName: { fontSize: 15 },
  itemPrice: { fontSize: 14, color: '#2563EB', marginTop: 2 },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  addButtonText: { color: '#FFFFFF', fontWeight: '600' },
  separator: { height: 1, backgroundColor: '#E5E7EB' },
});