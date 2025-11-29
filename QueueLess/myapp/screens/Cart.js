// screens/Cart.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

export default function Cart({
  navigation,
  cartItems,
  decreaseFromCart,
  placeOrder,
  getCartTotal,
}) {
  function handleBrowse() {
    navigation.navigate('Home');
  }

  function handleCheckout() {
    const total = getCartTotal();
    navigation.navigate('Payment', { total });
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🛒</Text>
        </View>
        <Text style={styles.title}>Your cart is empty</Text>
        <Text style={styles.subtitle}>
          Add items from your favorite campus vendors
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleBrowse}>
          <Text style={styles.buttonText}>Browse Vendors</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const total = getCartTotal();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Order</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      {/* Items List */}
      <ScrollView style={styles.itemsContainer}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemVendor}>{item.vendorName}</Text>
              <Text style={styles.itemPrice}>
                QAR {item.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decreaseFromCart(item.id)}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{item.quantity}</Text>

              <View style={styles.quantityButtonDisabled}>
                <Text style={styles.quantityButtonText}>+</Text>
              </View>
            </View>

            <Text style={styles.itemTotal}>
              QAR {(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>QAR {total.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>QAR 5.00</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Tax</Text>
            <Text style={styles.summaryValue}>
              QAR {(total * 0.05).toFixed(2)}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              QAR {(total + 5 + total * 0.05).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={handleBrowse}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    backgroundColor: '#276EF1',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  itemCount: {
    fontSize: 14,
    color: '#E0E6FF',
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemVendor: {
    fontSize: 12,
    color: '#7A7F8C',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#276EF1',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#276EF1',
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: '600',
    minWidth: 50,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E3EB',
    marginVertical: 12,
  },
  summarySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#7A7F8C',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E3EB',
    paddingTop: 12,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#276EF1',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E3EB',
  },
  checkoutButton: {
    backgroundColor: '#276EF1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  continueShoppingButton: {
    borderWidth: 1,
    borderColor: '#276EF1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueShoppingText: {
    color: '#276EF1',
    fontSize: 14,
    fontWeight: '600',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEF0F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 36,
    color: '#9BA3B4',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7F8C',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#276EF1',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});