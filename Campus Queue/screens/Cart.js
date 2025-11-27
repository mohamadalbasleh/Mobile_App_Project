import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

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
    <View style={{ flex: 1, padding: 15 }}>

      {/* 🟦 Show EMPTY CART if no items */}
      {isEmpty ? (
        <>
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Feather name="shopping-cart" size={120} color="#666" />
            <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 20 }}>
              Your cart is empty
            </Text>
            <Text style={{ marginTop: 10, fontSize: 16 }}>
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
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            {cartItems.length} item(s)
          </Text>

          {/* 🟦 Cart Items List */}
          <ScrollView style={{ maxHeight: windowHeight * 0.5 }}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 80, height: 80, borderRadius: 10 }}
                />

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {item.name}
                  </Text>

                  <Text style={{ flexDirection: 'row', marginVertical: 3 }}>
                    <Feather name="dollar-sign" size={16} color="gray" />
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
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Feather name="trash" size={22} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* 🟦 Checkout Section */}
          <View style={{ marginTop: 20 }}>
            <View style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Subtotal</Text>
              <Text style={styles.checkoutLabel}>
                <Feather name="dollar-sign" size={18} /> {subtotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Tax</Text>
              <Text style={styles.checkoutLabel}>
                <Feather name="dollar-sign" size={18} /> {tax.toFixed(2)}
              </Text>
            </View>

            <View style={styles.checkoutRow}>
              <Text style={styles.checkoutLabel}>Total</Text>
              <Text style={styles.checkoutLabel}>
                <Feather name="dollar-sign" size={18} /> {total.toFixed(2)}
              </Text>
            </View>

            <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
              <Feather name="clock" size={20} color="blue" />
              <Text style={{ marginLeft: 6 }}>Estimated Pickup: 15 minutes</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.Browse, { width: windowWidth * 0.9 }]}
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
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  qtyBtn: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },

  qtyNumber: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 10,
  },

  checkoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  checkoutLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },

  Browse: {
    backgroundColor: "#003bfd",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
    width: windowWidth * 0.5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
