import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { RFValue, fontSizes, spacing } from '../utils/responsiveUtils';
import { app, analytics } from '../config/firebase';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Cart = ({ route, navigation }) => {

  // 🟦 Cart Items (replace later with real data from params)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Espresso",
      description: "Strong, black coffee served in a small cup.",
      price: 3.5,
      qty: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"
    },
  ]);

  // 🟦 Update quantity
  const updateQty = (item, change) => {
    setCartItems(prev =>
      prev.map(i =>
        i.id === item.id
          ? { ...i, qty: Math.max(1, i.qty + change) } // never go below 1
          : i
      )
    );
  };

  // 🟦 Remove item
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  // 🟦 Calculate totals
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const isEmpty = cartItems.length === 0;

  return (
    <View style={{ flex: 1, padding: spacing.lg, backgroundColor: '#f5f5f5' }}>

      {/* 🟦 Show EMPTY CART if no items */}
      {isEmpty ? (
        <>
          <View style={{ alignItems: 'center', marginTop: windowHeight * 0.1, flex: 1, justifyContent: 'center' }}>
            <Feather name="shopping-cart" size={RFValue(100)} color="#666" />
            <Text style={{ fontWeight: 'bold', fontSize: fontSizes.xxl, marginTop: spacing.lg, textAlign: 'center' }}>
              Your cart is empty
            </Text>
            <Text style={{ marginTop: spacing.md, fontSize: fontSizes.base, textAlign: 'center', color: '#666' }}>
              Add items from your favorite campus vendors
            </Text>
          </View>

          <TouchableOpacity style={styles.Browse} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Browse Vendors</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* 🟦 Items Count */}
          <Text style={{ fontSize: fontSizes.lg, marginBottom: spacing.md, fontWeight: '600' }}>
            {cartItems.length} item(s)
          </Text>

          {/* 🟦 Cart Items List */}
          <ScrollView style={{ maxHeight: windowHeight * 0.45, marginBottom: spacing.lg }}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: RFValue(80), height: RFValue(80), borderRadius: 10 }}
                />

                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={{ fontSize: fontSizes.lg, fontWeight: '600' }}>
                    {item.name}
                  </Text>

                  <Text style={{ flexDirection: 'row', marginVertical: spacing.sm, fontSize: fontSizes.base }}>
                    <Feather name="dollar-sign" size={RFValue(16)} color="gray" />
                    {item.price.toFixed(2)}
                  </Text>

                  {/* Quantity */}
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={() => updateQty(item, -1)}>
                      <Text style={styles.qtyBtn}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyNumber}>{item.qty}</Text>

                    <TouchableOpacity onPress={() => updateQty(item, 1)}>
                      <Text style={styles.qtyBtn}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Delete */}
                <TouchableOpacity onPress={() => removeItem(item.id)} style={{ padding: spacing.sm }}>
                  <Feather name="trash" size={RFValue(20)} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* 🟦 Checkout Section */}
          <View style={{ marginTop: spacing.lg }}>
            <View style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Subtotal</Text>
              <Text style={styles.checkoutLabel}>
                <Feather name="dollar-sign" size={RFValue(16)} /> {subtotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Tax</Text>
              <Text style={styles.checkoutLabel}>
                <Feather name="dollar-sign" size={RFValue(16)} /> {tax.toFixed(2)}
              </Text>
            </View>

            <View style={[styles.checkoutRow, { borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: spacing.md, marginTop: spacing.md }]}>
              <Text style={[styles.checkoutLabel, { fontWeight: '700' }]}>Total</Text>
              <Text style={[styles.checkoutLabel, { fontWeight: '700' }]}>
                <Feather name="dollar-sign" size={RFValue(18)} /> {total.toFixed(2)}
              </Text>
            </View>

            <View style={{ marginTop: spacing.lg, flexDirection: "row", alignItems: "center" }}>
              <Feather name="clock" size={RFValue(18)} color="blue" />
              <Text style={{ marginLeft: spacing.md, fontSize: fontSizes.base }}>Estimated Pickup: 15 minutes</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.Browse}
            onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>
              Proceed to checkout
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    padding: spacing.md,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: spacing.lg,
    alignItems: "center",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    width: 'auto',
    alignSelf: 'flex-start'
  },

  qtyBtn: {
    fontSize: fontSizes.lg,
    fontWeight: "bold",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },

  qtyNumber: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    paddingHorizontal: spacing.md,
  },

  checkoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },

  checkoutLabel: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
  },

  Browse: {
    backgroundColor: "#003bfd",
    paddingVertical: spacing.lg,
    borderRadius: 10,
    marginTop: spacing.xxl,
    alignSelf: "center",
    width: Math.min(windowWidth * 0.85, 350),
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: fontSizes.lg,
  },
});
