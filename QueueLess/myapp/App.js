  import React, { useState } from "react";
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { Ionicons } from "@expo/vector-icons";
  import { VENDORS } from "./data/vendors";
  import Login from "./screens/Login";
  import SignUp from "./screens/SignUp";
  import ResetPassword from "./screens/ResetPassword";
  import Home from "./screens/Home";
  import VendorDetails from "./screens/VendorDetails";
  import Cart from "./screens/Cart";
  import Orders from "./screens/Orders";
  import Profile from "./screens/Profile";
  import Payment from "./screens/Payment";

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  export default function App() {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [favoriteVendors, setFavoriteVendors] = useState([]);
    const [user] = useState({
      name: "Sulistiantoo P",
      email: "60301414@udst.edu.qa",
      studentId: "60301414",
    });

    function addToCart(item, vendorName) {
      setCartItems((prev) => {
        const index = prev.findIndex(
          (c) => c.id === item.id && c.vendorName === vendorName
        );
        if (index !== -1) {
          const updated = [...prev];
          updated[index].quantity += 1;
          return updated;
        }
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            vendorName,
            quantity: 1,
          },
        ];
      });
    }

    function decreaseFromCart(itemId) {
      setCartItems((prev) =>
        prev
          .map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      );
    }

    function clearCart() {
      setCartItems([]);
    }

    function getCartTotal() {
      return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    function generatePickupCode() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const letter = letters[Math.floor(Math.random() * letters.length)];
      const number = Math.floor(10 + Math.random() * 89);
      return `${letter}${number}`;
    }

    function placeOrder(paymentMethod, cardDetails) {
      if (cartItems.length === 0) {
        return null;
      }

      const firstVendorName = cartItems[0].vendorName;

      const vendorInfo = VENDORS.find(
        (v) =>
          v.name.trim().toLowerCase() === firstVendorName.trim().toLowerCase()
      );

      const estimatedTime = vendorInfo?.time || "10–15 min";

      const newOrder = {
        id: Date.now().toString(),
        vendorName: firstVendorName,
        items: cartItems,
        total: getCartTotal(),
        status: "Ready for Pickup",
        estimatedTime,
        code: generatePickupCode(),
        paymentMethod: paymentMethod || "Cash",
        cardDetails: cardDetails || null,
        createdAt: new Date().toISOString(),
      };

      setOrders((prev) => [newOrder, ...prev]);
      setCartItems([]);
      return newOrder;
    }

    function toggleFavoriteVendor(vendorId) {
      setFavoriteVendors((prev) =>
        prev.includes(vendorId)
          ? prev.filter((id) => id !== vendorId)
          : [...prev, vendorId]
      );
    }

    const sharedProps = {
      cartItems,
      orders,
      addToCart,
      decreaseFromCart,
      placeOrder,
      getCartTotal,
      favoriteVendors,
      toggleFavoriteVendor,
      user,
    };

    function MainTabs(propsFromStack) {
      const { favoriteVendors, orders, user } = propsFromStack;

      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#276EF1",
            tabBarInactiveTintColor: "#9BA3B4",
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIcon: ({ color, size }) => {
              let iconName = "home-outline";
              if (route.name === "Home") iconName = "home-outline";
              if (route.name === "Cart") iconName = "cart-outline";
              if (route.name === "Orders") iconName = "clipboard-outline";
              if (route.name === "Profile") iconName = "person-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home">
            {(tabProps) => <Home {...tabProps} />}
          </Tab.Screen>

          <Tab.Screen name="Cart">
            {(tabProps) => (
              <Cart
                {...tabProps}
                cartItems={cartItems}
                addToCart={addToCart}
                decreaseFromCart={decreaseFromCart}
                placeOrder={placeOrder}
                getCartTotal={getCartTotal}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Orders">
            {(tabProps) => <Orders {...tabProps} orders={orders} />}
          </Tab.Screen>

          <Tab.Screen name="Profile">
            {(tabProps) => (
              <Profile
                {...tabProps}
                user={user}
                favoriteVendors={favoriteVendors}
                ordersCount={orders.length}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Create Account" }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
            {(stackProps) => <MainTabs {...stackProps} {...sharedProps} />}
          </Stack.Screen>

          <Stack.Screen name="VendorDetails" options={{ title: "Menu" }}>
            {(stackProps) => (
              <VendorDetails
                {...stackProps}
                addToCart={addToCart}
                favoriteVendors={favoriteVendors}
                toggleFavoriteVendor={toggleFavoriteVendor}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Payment" options={{ title: "Checkout" }}>
            {(stackProps) => <Payment {...stackProps} placeOrder={placeOrder} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
