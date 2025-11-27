
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const restaurants = [
  {
    id: 1,
    name: "Campus Coffee Bar",
    category: "Coffee & Pastries",
    rating: 4.8,
    time: "5-10 min",
    status: "Open Now",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&q=80&w=800",
  },
  {
    id: 2,
    name: "The Burger Joint",
    category: "Fast Food",
    rating: 4.6,
    time: "10-15 min",
    status: "Open Now",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&q=80&w=800",
  },
  {
    id: 3,
    name: "Healthy Fresh Bowls",
    category: "Healthy",
    rating: 4.9,
    time: "15-20 min",
    status: "Open Now",
    image:
      "https://images.unsplash.com/photo-1556845512-2705eab5f972?auto=format&q=80&w=800",
  },
  {
    id: 4,
    name: "Italian Pizza House",
    category: "Pizza",
    rating: 4.7,
    time: "20-30 min",
    status: "Closed",
    image:
      "https://images.unsplash.com/photo-1603079845776-91520ecf7f5f?auto=format&q=80&w=800",
  },
  {
    id: 5,
    name: "Sushi Hub",
    category: "Japanese",
    rating: 4.5,
    time: "25-35 min",
    status: "Open Now",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&q=80&w=800",
  },
  {
    id: 6,
    name: "Taco Fiesta",
    category: "Mexican",
    rating: 4.3,
    time: "10-20 min",
    status: "Open Now",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&q=80&w=800",
  },
];

export default function Asian({ navigation }) {
  const [Arestaurants, setARestaurants] = useState([]);
   useEffect(() => {
  const filtered = restaurants.filter(r => r.category === "Asian");
  setARestaurants(filtered);
}, []);
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      {Arestaurants.map((R, i) => (
        <TouchableOpacity
          key={i}
          style={styles.resView}
          onPress={() => navigation.navigate('Restaurant', { resName: R.name, rating: R.rating, time: R.time })}
        >
          <Image source={{ uri: R.image }} style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10 }} />
          <View style={styles.resText}>
            <Text>{R.name}</Text>
            <Text>{R.category}</Text>
            <Text><Feather name="clock" size={16} color="gray" /> {R.time}</Text>
          </View>
          <View>
            <View style={styles.rating}>
              <Feather name="star" size={16} color="#fffb00ff" />
              <Text> {R.rating}</Text>
            </View>
            <Text style={[styles.open, { backgroundColor: R.status === "Closed" ? "red" : "green" }]}>{R.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resView: { flexDirection: 'row', marginBottom: 20, padding: 10, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' },
  resText: { flex: 1 },
  open: { borderRadius: 25, width: windowWidth * .2, height: windowHeight * .03, textAlign: 'center', textAlignVertical: 'center' },
  rating: { paddingLeft: windowWidth * .1, paddingBottom: windowHeight * .05, flexDirection: 'row' },
});
