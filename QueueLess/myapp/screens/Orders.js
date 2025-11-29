// screens/Orders.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Orders({ orders }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <Text style={styles.subtitle}>Track your orders in real-time</Text>

      {orders.length === 0 ? (
        <Text style={styles.emptyText}>You don’t have any orders yet.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 8 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.headerRow}>
                <View>
                  <Text style={styles.vendorName}>{item.vendorName}</Text>
                  <Text style={styles.orderId}>Order #{item.code}</Text>
                </View>
                <View style={styles.statusPill}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.readyBox}>
                <Text style={styles.readyText}>Ready for pickup!</Text>
                <Text style={styles.readyTime}>{item.pickupTime}</Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  QAR {item.total.toFixed(2)}
                </Text>
              </View>

              <View style={styles.codeBox}>
                <Text style={styles.codeText}>Show this at pickup counter</Text>
                <Text style={styles.codeValue}>{item.code}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: { fontSize: 22, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#7A7F8C', marginBottom: 16 },
  emptyText: { color: '#7A7F8C' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  vendorName: { fontSize: 18, fontWeight: '600' },
  orderId: { fontSize: 13, color: '#7A7F8C' },
  statusPill: {
    backgroundColor: '#E3F7E9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: 12, color: '#1E7F3B' },
  readyBox: {
    backgroundColor: '#E7F7E7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  readyText: { fontSize: 14, color: '#1E7F3B' },
  readyTime: { fontSize: 16, fontWeight: '600', color: '#1E7F3B' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalLabel: { fontSize: 14 },
  totalValue: { fontSize: 14, fontWeight: '600' },
  codeBox: {
    backgroundColor: '#1E7F3B',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  codeText: { color: '#fff', fontSize: 13, marginBottom: 4 },
  codeValue: { color: '#fff', fontSize: 26, fontWeight: '700' },
});