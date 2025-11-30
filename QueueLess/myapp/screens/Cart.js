import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

export default function Cart({
  navigation,
  cartItems,
  addToCart,
  decreaseFromCart,
  placeOrder,
  getCartTotal,
}) {
  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const itemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function handlePlaceOrder() {
    if (cartItems.length === 0) {
      Alert.alert("Cart is empty", "Please add some items first.");
      return;
    }

    Alert.alert(
      "Choose payment method",
      "How would you like to pay?",
      [
        {
          text: "Card",
          onPress: () => {
            const parentNav = navigation.getParent();
            parentNav?.navigate("Payment", { total: total.toFixed(2) });
          },
        },
        {
          text: "Cash",
          onPress: () => completeOrder("Cash"),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }

  function completeOrder(method) {
    const newOrder = placeOrder(method, null);

    if (newOrder) {
      const message =
        `Payment: ${newOrder.paymentMethod}\n` +
        `Show code ${newOrder.code} at the pickup counter.`;

      Alert.alert("Order placed", message, [
        { text: "View Orders", onPress: () => navigation.navigate("Orders") },
      ]);
    }
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🛒</Text>
        </View>
        <Text style={styles.title}>Your cart is empty</Text>
        <Text style={styles.subtitle}>
          Add items from your favorite campus vendors
        </Text>

        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.browseButtonText}>Browse Vendors</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Your Order</Text>
        <Text style={styles.headerSubtitle}>
          {itemsCount} {itemsCount === 1 ? "item" : "items"} in cart
        </Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id + item.vendorName}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Order Summary</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>🍽</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemVendor}>{item.vendorName}</Text>
                <Text style={styles.itemPrice}>
                  QAR {item.price.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.rightColumn}>
              <View style={styles.qtyBox}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => decreaseFromCart(item.id)}
                >
                  <Text style={styles.qtySymbol}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => addToCart(item, item.vendorName)}
                >
                  <Text style={styles.qtySymbol}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.itemTotal}>
                QAR {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>QAR {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Delivery Fee</Text>
              <Text style={styles.value}>QAR {deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tax (5%)</Text>
              <Text style={styles.value}>QAR {tax.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>
                QAR {total.toFixed(2)}
              </Text>
            </View>

            <View style={styles.promoBox}>
              <Text style={styles.promoText}>
                💰 Save time & skip the queue!
              </Text>
            </View>
          </View>
        }
      />

      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.checkoutText}>
            Proceed to Checkout · QAR {total.toFixed(2)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.secondaryText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB" },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EEF0F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  iconText: { fontSize: 36, color: "#9BA3B4" },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 4 },
  subtitle: {
    fontSize: 14,
    color: "#7A7F8C",
    textAlign: "center",
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: "#276EF1",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  browseButtonText: { color: "#fff", fontWeight: "600" },

  header: {
    backgroundColor: "#2563EB",
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#E5ECFF",
    fontSize: 14,
    marginTop: 4,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemInfo: {
    flexDirection: "row",
    flex: 1,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#EEF0F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  imageText: { fontSize: 20, color: "#9BA3B4" },
  itemName: { fontSize: 15, fontWeight: "600" },
  itemVendor: { fontSize: 13, color: "#7A7F8C", marginTop: 2 },
  itemPrice: { fontSize: 13, color: "#2563EB", marginTop: 4 },

  rightColumn: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  qtySymbol: { fontSize: 16, color: "#2563EB", fontWeight: "700" },
  qtyText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  itemTotal: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  separator: { height: 8 },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  summaryTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: { fontSize: 14, color: "#6B7280" },
  value: { fontSize: 14, color: "#111827" },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  totalLabel: { fontSize: 15, fontWeight: "700" },
  totalValue: { fontSize: 15, fontWeight: "700", color: "#2563EB" },

  promoBox: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#DCFCE7",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  promoText: {
    fontSize: 13,
    color: "#15803D",
  },

  footerButtons: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryButton: {
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563EB",
    backgroundColor: "#FFFFFF",
  },
  secondaryText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 15,
  },
});