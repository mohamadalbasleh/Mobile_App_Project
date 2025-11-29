// screens/VendorDetails.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { VENDORS } from '../data/vendors';

export default function VendorDetails({ route, addToCart }) {
  const { vendorId } = route.params;
  const vendor = VENDORS.find((v) => v.id === vendorId);

  if (!vendor) {
    return (
      <View style={styles.container}>
        <Text>Vendor not found.</Text>
      </View>
    );
  }

  function handleAdd(item) {
    addToCart(item, vendor.name);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.vendorName}>{vendor.name}</Text>
      <Text style={styles.vendorType}>{vendor.type}</Text>
      <Text style={styles.meta}>
        {vendor.time} • ★ {vendor.rating.toFixed(1)}
      </Text>

      <Text style={styles.menuTitle}>Menu</Text>

      <FlatList
        data={vendor.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View>
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
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  vendorName: { fontSize: 22, fontWeight: '600' },
  vendorType: { fontSize: 14, color: '#7A7F8C', marginTop: 2 },
  meta: { fontSize: 13, color: '#7A7F8C', marginTop: 4, marginBottom: 16 },
  menuTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemName: { fontSize: 15 },
  itemPrice: { fontSize: 14, color: '#276EF1', marginTop: 2 },
  addButton: {
    backgroundColor: '#276EF1',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  separator: { height: 1, backgroundColor: '#E0E3EB' },
});