import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RFValue, fontSizes, spacing } from '../utils/responsiveUtils';
import { app, analytics } from '../config/firebase';

import FastFood from '../screens/FastFood';
import Healthy from '../screens/Healthy';
import Coffee from '../screens/Coffee';
import Pizza from "../screens/Pizza";
import Asian from '../screens/Asian';
import All from '../screens/All';

const Tab = createMaterialTopTabNavigator();
const { width: windowWidth } = Dimensions.get('window');

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
          placeholderTextColor="#999"
        />
      </View>

      {/* 🔵 TOP TABS */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#1455F1' },
          tabBarLabelStyle: { fontSize: RFValue(12), fontWeight: 'bold', color: "white" },
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