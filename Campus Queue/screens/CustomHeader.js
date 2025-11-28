import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RFValue, fontSizes, spacing } from '../utils/responsiveUtils';

const { width: windowWidth } = Dimensions.get('window');

export default function CustomHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back 👋</Text>
      <View style={styles.row}>
        <Text style={styles.title}>Order Your Meal</Text>

        <TouchableOpacity style={styles.campusBtn}>
          <Text style={styles.campusText}>Main Campus</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search for food or restaurants…"
        style={styles.search}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: "#1455F1",
  },
  welcome: { 
    color: "#fff", 
    fontSize: fontSizes.base, 
    opacity: 0.9,
    marginBottom: spacing.sm
  },
  title: { 
    color: "#fff", 
    fontSize: fontSizes.xxxl, 
    fontWeight: "700",
    flex: 1
  },
  row: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginVertical: spacing.md,
    flexWrap: 'wrap'
  },
  campusBtn: {
    backgroundColor: "#ffffff22",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    marginTop: spacing.sm,
  },
  campusText: { 
    color: "#fff", 
    fontSize: fontSizes.sm,
    fontWeight: '600'
  },
  search: {
    marginTop: spacing.lg,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSizes.base,
  },
});
