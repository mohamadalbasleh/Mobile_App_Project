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
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style={styles.emptyContainer}>
        <View style={styles.emptyContent}>
          <View style={styles.emptyIconCircle}>
            <Text style={styles.emptyIconText}>🛒</Text>
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add items from your favorite campus vendors
          </Text>

          <TouchableOpacity style={styles.emptyButton} onPress={handleBrowse}>
            <Text style={styles.emptyButtonText}>Browse Vendors</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const total = getCartTotal();
  const deliveryFee = 5.0;
  const taxAmount = total * 0.05;
  const grandTotal = total + deliveryFee + taxAmount;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🛍️ Your Order</Text>
          <Text style={styles.headerSubtitle}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart</Text>
        </View>
      </View>

      {/* Items List */}
      <ScrollView 
        style={styles.itemsContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Items Section */}
        <View style={styles.itemsSection}>
          {cartItems.map((item, index) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemLeft}>
                <View style={styles.itemIconBox}>
                  <Text style={styles.itemIcon}>🍽️</Text>
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemVendor}>{item.vendorName}</Text>
                  <Text style={styles.itemPrice}>QAR {item.price.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.itemRight}>
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
            </View>
          ))}
        </View>

        {/* Order Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRows}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>QAR {total.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>QAR {deliveryFee.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (5%)</Text>
              <Text style={styles.summaryValue}>QAR {taxAmount.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>QAR {grandTotal.toFixed(2)}</Text>
          </View>

          <View style={styles.savingsBox}>
            <Text style={styles.savingsText}>💰 Save time & skip the queue!</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>
            Proceed to Checkout • QAR {grandTotal.toFixed(2)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={handleBrowse}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Empty State
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EEF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#276EF1',
  },
  emptyIconText: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1F2430',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7A7F8C',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: '#276EF1',
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
    shadowColor: '#276EF1',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  // Main Container
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  // Header
  header: {
    backgroundColor: 'linear-gradient(135deg, #276EF1 0%, #3F83FF 100%)',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: '#276EF1',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#E0E6FF',
    fontWeight: '500',
  },

  // Items Section
  itemsContainer: {
    flex: 1,
  },
  itemsSection: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  itemIconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemIcon: {
    fontSize: 28,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-around',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2430',
  },
  itemVendor: {
    fontSize: 12,
    color: '#7A7F8C',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#276EF1',
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E0E3EB',
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  quantityButtonDisabled: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
    borderRadius: 6,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#276EF1',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 6,
    color: '#1F2430',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2430',
  },

  // Summary Card
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2430',
    marginBottom: 16,
  },
  summaryRows: {
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#7A7F8C',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2430',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#E0E3EB',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2430',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#276EF1',
  },
  savingsBox: {
    backgroundColor: '#E3F7E9',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  savingsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E7F3B',
  },

  // Footer
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#E0E3EB',
  },
  checkoutButton: {
    backgroundColor: '#276EF1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#276EF1',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  continueShoppingButton: {
    borderWidth: 2,
    borderColor: '#276EF1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueShoppingText: {
    color: '#276EF1',
    fontSize: 15,
    fontWeight: '700',
  },
});