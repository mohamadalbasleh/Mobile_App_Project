import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';

import Home from '../screens/Home';
import Order from '../screens/Orders';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#1455F1' },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#ccc',
        tabBarIcon: ({ color, size }) => {
  let iconName;
  if (route.name === 'Home') iconName = 'home-outline';
  else if (route.name === 'Cart') iconName = 'cart-outline';
  else if (route.name === 'Order') iconName = 'list-outline';
  else if (route.name === 'Profile') iconName = 'person-outline';

  return <Ionicons name={iconName} size={size} color={color} />;
  
}
      })}
    >
      <Tab.Screen name="Home" component={Home}  options={{headerShown:false}}/>
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Profile" component={Profile} options={{headerShown:false}} />
    </Tab.Navigator>
  );
}
