// screens/Payment.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Payment({ route, navigation, placeOrder }) {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { total } = route.params || { total: 0 };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Fast and secure payment',
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: '📱',
      description: 'University Account Balance',
    },
  ];

  const handlePayment = async () => {
    if (!selectedPayment) {
      Alert.alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Place the order
      const order = placeOrder();

      if (order) {
        Alert.alert('Payment Successful', `Order #${order.code} confirmed!`, [
          {
            text: 'View Order',
            onPress: () => {
              navigation.replace('MainTabs', { screen: 'Orders' });
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Payment Failed', 'Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Payment Method</Text>
          <Text style={styles.subtitle}>Select how you'd like to pay</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Total</Text>
            <Text style={styles.summaryValue}>QAR {total.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>QAR 5.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (5%)</Text>
            <Text style={styles.summaryValue}>QAR {(total * 0.05).toFixed(2)}</Text>
          </View>
          <View style={[styles.divider, styles.boldDivider]} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              QAR {(total + 5 + total * 0.05).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentCard,
              selectedPayment === method.id && styles.paymentCardActive,
            ]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <View style={styles.paymentIcon}>
              <Text style={styles.icon}>{method.icon}</Text>
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentName}>{method.name}</Text>
              <Text style={styles.paymentDescription}>{method.description}</Text>
            </View>

            <View
              style={[
                styles.radio,
                selectedPayment === method.id && styles.radioActive,
              ]}
            >
              {selectedPayment === method.id && (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Additional Info */}
        {selectedPayment === 'card' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>💳 Card Information</Text>
            <Text style={styles.infoText}>
              Your payment information is encrypted and secure. We accept Visa,
              Mastercard, and American Express.
            </Text>
          </View>
        )}

        {selectedPayment === 'apple' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🍎 Apple Pay</Text>
            <Text style={styles.infoText}>
              Quick and easy payment using your Apple wallet. Your card details
              are never shared with merchants.
            </Text>
          </View>
        )}

        {selectedPayment === 'wallet' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📱 University Wallet</Text>
            <Text style={styles.infoText}>
              Current Balance: QAR 250.00
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.payButtonText}>
              Pay QAR {(total + 5 + total * 0.05).toFixed(2)}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={isProcessing}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7F8C',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
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
  divider: {
    height: 1,
    backgroundColor: '#E0E3EB',
    marginVertical: 8,
  },
  boldDivider: {
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#276EF1',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1F2430',
  },
  paymentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E3EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  paymentCardActive: {
    borderColor: '#276EF1',
    backgroundColor: '#F0F4FF',
  },
  paymentIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F5F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  paymentDescription: {
    fontSize: 12,
    color: '#7A7F8C',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E3EB',
  },
  radioActive: {
    borderColor: '#276EF1',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#276EF1',
    alignSelf: 'center',
    marginTop: 2,
  },
  infoBox: {
    backgroundColor: '#EEF3FF',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#555A66',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E3EB',
  },
  payButton: {
    backgroundColor: '#276EF1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#E0E3EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#555A66',
    fontSize: 14,
    fontWeight: '600',
  },
});
