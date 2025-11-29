// screens/Orders.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StatusStep = ({ step, completed, current, label }) => (
  <View style={styles.statusStepContainer}>
    <View
      style={[
        styles.stepCircle,
        completed && styles.stepCircleCompleted,
        current && styles.stepCircleCurrent,
      ]}
    >
      {completed && <Text style={styles.stepCheckmark}>✓</Text>}
      {current && <Text style={styles.stepDot}>●</Text>}
    </View>
    <Text
      style={[
        styles.stepLabel,
        (completed || current) && styles.stepLabelActive,
      ]}
    >
      {label}
    </Text>
  </View>
);

export default function Orders({ orders }) {
  const getOrderStatus = (status) => {
    switch (status) {
      case 'Confirmed':
        return 1;
      case 'Preparing':
        return 2;
      case 'Ready for Pickup':
        return 3;
      case 'Completed':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
          <Text style={styles.subtitle}>Track your orders in real-time</Text>
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>
              Your orders will appear here once you place one
            </Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const currentStep = getOrderStatus(item.status);
              return (
                <View style={styles.card}>
                  {/* Header with vendor and status */}
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.vendorName}>{item.vendorName}</Text>
                      <Text style={styles.orderId}>Order #{item.code}</Text>
                    </View>
                    <View style={styles.statusPill}>
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  </View>

                  {/* Status Progress */}
                  <View style={styles.statusTracker}>
                    <StatusStep
                      step={1}
                      completed={currentStep >= 1}
                      current={currentStep === 1}
                      label="Confirmed"
                    />
                    <View style={styles.statusLine} />
                    <StatusStep
                      step={2}
                      completed={currentStep >= 2}
                      current={currentStep === 2}
                      label="Preparing"
                    />
                    <View style={styles.statusLine} />
                    <StatusStep
                      step={3}
                      completed={currentStep >= 3}
                      current={currentStep === 3}
                      label="Ready"
                    />
                    <View style={styles.statusLine} />
                    <StatusStep
                      step={4}
                      completed={currentStep >= 4}
                      current={currentStep === 4}
                      label="Completed"
                    />
                  </View>

                  {/* Divider */}
                  <View style={styles.divider} />

                  {/* Items Summary */}
                  <View style={styles.itemsSection}>
                    <Text style={styles.itemsTitle}>Items ({item.items.length})</Text>
                    {item.items.slice(0, 2).map((i, idx) => (
                      <Text key={idx} style={styles.itemSummary}>
                        • {i.name} x{i.quantity}
                      </Text>
                    ))}
                    {item.items.length > 2 && (
                      <Text style={styles.moreItems}>
                        + {item.items.length - 2} more items
                      </Text>
                    )}
                  </View>

                  {/* Time and Total */}
                  <View style={styles.footer}>
                    <View>
                      <Text style={styles.timeLabel}>Pickup Time</Text>
                      <Text style={styles.timeValue}>{item.pickupTime}</Text>
                    </View>
                    <View style={styles.totalSection}>
                      <Text style={styles.totalLabel}>Total</Text>
                      <Text style={styles.totalValue}>
                        QAR {item.total.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  {/* Pickup Code */}
                  {currentStep >= 3 && (
                    <View style={styles.codeBox}>
                      <Text style={styles.codeText}>Show this at pickup counter</Text>
                      <Text style={styles.codeValue}>{item.code}</Text>
                      <TouchableOpacity style={styles.copyButton}>
                        <Text style={styles.copyButtonText}>Copy Code</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>📞 Call Vendor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
                      <Text style={styles.actionButtonTextSecondary}>Reorder</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
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
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '700',
  },
  orderId: {
    fontSize: 12,
    color: '#7A7F8C',
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: '#E3F7E9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E7F3B',
  },
  statusTracker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  statusStepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E3EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleCompleted: {
    backgroundColor: '#1E7F3B',
  },
  stepCircleCurrent: {
    backgroundColor: '#276EF1',
    borderWidth: 2,
    borderColor: '#E0E3EB',
  },
  stepCheckmark: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  stepDot: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  stepLabel: {
    fontSize: 10,
    color: '#9BA3B4',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#276EF1',
    fontWeight: '600',
  },
  statusLine: {
    flex: 0.5,
    height: 2,
    backgroundColor: '#E0E3EB',
    marginBottom: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E3EB',
    marginVertical: 10,
  },
  itemsSection: {
    marginBottom: 10,
  },
  itemsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2430',
    marginBottom: 6,
  },
  itemSummary: {
    fontSize: 12,
    color: '#555A66',
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 11,
    color: '#276EF1',
    fontWeight: '500',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  timeLabel: {
    fontSize: 12,
    color: '#7A7F8C',
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalSection: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 12,
    color: '#7A7F8C',
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#276EF1',
  },
  codeBox: {
    backgroundColor: '#1E7F3B',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  codeText: {
    color: '#E0F5E0',
    fontSize: 12,
    marginBottom: 6,
  },
  codeValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  copyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#276EF1',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    borderColor: '#E0E3EB',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtonTextSecondary: {
    color: '#276EF1',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7A7F8C',
    textAlign: 'center',
  },
});
