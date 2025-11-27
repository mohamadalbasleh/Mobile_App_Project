import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FastFood from '../screens/FastFood';
import Healthy from '../screens/Healthy';
import Coffee from '../screens/Coffee';
import Pizza from "../screens/Pizza";
import Asian from '../screens/Asian';
import All from '../screens/All';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <View style={{ flex: 1 }}>
      {/* 🔵 YOUR CUSTOM HEADER ABOVE TABS */}
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

      {/* 🔵 TOP TABS */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#1455F1' },
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', color: "white" },
          tabBarIndicatorStyle: { backgroundColor: 'white', height: 3 },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="All" component={All} options={{ title: "All" }} />
        <Tab.Screen name="FastFood" component={FastFood} options={{ title: "FastFood" }} />
        <Tab.Screen name="Healthy" component={Healthy} options={{ title: "Healthy" }} />
        <Tab.Screen name="Coffee" component={Coffee} options={{ title: "Coffee" }} />
        <Tab.Screen name="Pizza" component={Pizza} options={{ title: "Pizza" }} />
        <Tab.Screen name="Asian" component={Asian} options={{ title: "Asian" }} />
      </Tab.Navigator>
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