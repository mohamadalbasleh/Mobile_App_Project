import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { RFValue, fontSizes, spacing } from '../utils/responsiveUtils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Order = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Campus Coffee Bar",
      price: 3.5,
      status: "Preparing",
      timestamp: "11:15 AM",
      estimated: "11:25 AM",
      counter: 5, // Pickup counter number
    },
    {
      id: 2,
     name: "The Burger Joint",
      price: 4.0,
      status: "Ready for Pickup",
      timestamp: "11:20 AM",
      estimated: "11:30 AM",
      counter: 3,
    },
    {
      id: 3,
      name: "Healthy Fresh Bowls",
      price: 4.5,
      status: "Preparing",
      timestamp: "11:22 AM",
      estimated: "11:35 AM",
      counter: 7,
    },
  ]);

  return (
    <View style={{ flex: 1, padding: spacing.lg, backgroundColor: '#f2f2f2' }}>
      <Text style={styles.title}>Active Orders</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((order, index) => (
          <View key={order.id} style={[styles.orderCard, { minHeight: RFValue(180) }]}>
            
            {/* Left: Order Number */}
            <Text style={styles.orderNumber}>{index + 1}.</Text>

            {/* Center: Order Details */}
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.orderName}>{order.name}</Text>
              <Text style={styles.orderPrice}>Total: ${order.price.toFixed(2)}</Text>
              <Text style={styles.orderTime}>Ordered: {order.timestamp}</Text>
              <Text style={styles.orderTime}>Ready by: {order.estimated}</Text>
            </View>

            {/* Right: Status + Pickup Counter */}
            <View style={{ alignItems: 'flex-end', marginLeft: spacing.md }}>
              <View style={[
                styles.statusContainer,
                { backgroundColor: order.status === "Ready for Pickup" ? 'green' : '#FFA500' }
              ]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>

              <View style={styles.counterContainer}>
                <Text style={styles.counterText}>Counter #{order.counter}</Text>
              </View>
            </View>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  orderNumber: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    width: RFValue(30),
  },
  orderName: { 
    fontSize: fontSizes.lg, 
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  orderPrice: { 
    fontSize: fontSizes.base, 
    color: '#555', 
    marginTop: spacing.sm 
  },
  orderTime: { 
    fontSize: fontSizes.sm, 
    color: '#777', 
    marginTop: spacing.xs 
  },
  statusContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginBottom: spacing.sm,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.sm,
  },
  counterContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 15,
    backgroundColor: '#1455F1',
  },
  counterText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.base,
  },
});
