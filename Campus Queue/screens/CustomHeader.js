import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#1455F1",
  },
  welcome: { color: "#fff", fontSize: 16, opacity: 0.9 },
  title: { color: "#fff", fontSize: 26, fontWeight: "700" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  campusBtn: {
    backgroundColor: "#ffffff22",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  campusText: { color: "#fff", fontSize: 14 },
  search: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
  },
});
