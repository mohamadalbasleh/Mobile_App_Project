import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment({ navigation, placeOrder }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  function handlePay() {
    if (!cardName || !cardNumber || !expiry || !cvv) {
      Alert.alert("Missing info", "Please fill in all card details.");
      return;
    }

    const digits = cardNumber.replace(/\D/g, "");
    const last4 = digits.slice(-4) || "0000";

    const cardDisplay = `Visa •••• ${last4}`;

    const newOrder = placeOrder("Card", cardDisplay);

    if (newOrder) {
      Alert.alert(
        "Order placed",
        `Payment: ${newOrder.paymentMethod}\n` +
          (newOrder.cardDetails ? `Card: ${newOrder.cardDetails}\n` : "") +
          `Show code ${newOrder.code} at the pickup counter.`,
        [
          {
            text: "View Orders",
            onPress: () => navigation.navigate("MainTabs", { screen: "Orders" }),
          },
        ]
      );
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Payment</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Name on Card</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={cardName}
            onChangeText={setCardName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="4111 1111 1111 1111"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.field, styles.half]}>
            <Text style={styles.label}>Expiry</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={expiry}
              onChangeText={setExpiry}
            />
          </View>
          <View style={[styles.field, styles.half]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              secureTextEntry
              keyboardType="number-pad"
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payText}>Pay and Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    flex: 1,
  },
  payButton: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  payText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});