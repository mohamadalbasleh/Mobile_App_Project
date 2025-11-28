import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue, fontSizes, spacing } from '../utils/responsiveUtils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Dummy user data
const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  image: "https://i.pravatar.cc/150?img=3",
  orders: 12,
  spent: 250.75,
  rating: 4.7,
};

const Profile = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2',  }}>
      
      {/* 🟦 Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* 🟦 Scrollable sections */}
      <ScrollView style={{ flex: 1, marginTop: 15 }}>

        {/* 🟦 Stats Section */}
        <View style={styles.section}>
          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.orders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>${user.spent.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Spent</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* 🟦 Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.itemRow} onPress={() => alert("Payment Methods")}>
            <Feather name="credit-card" size={20} color="#333" style={{ marginRight: 15 }} />
            <Text style={styles.itemText}>Payment Methods</Text>
            <Feather name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow} onPress={() => alert("Saved Locations")}>
            <Feather name="map-pin" size={20} color="#333" style={{ marginRight: 15 }} />
            <Text style={styles.itemText}>Saved Locations</Text>
            <Feather name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow} onPress={() => alert("Preferences")}>
            <Feather name="sliders" size={20} color="#333" style={{ marginRight: 15 }} />
            <Text style={styles.itemText}>Preferences</Text>
            <Feather name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* 🟦 Notifications & Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications & Settings</Text>

          <TouchableOpacity style={styles.itemRow} onPress={() => alert("Notifications")}>
            <Feather name="bell" size={20} color="#333" style={{ marginRight: 15 }} />
            <Text style={styles.itemText}>Notifications</Text>
            <Feather name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow} onPress={() => alert("App Settings")}>
            <Feather name="settings" size={20} color="#333" style={{ marginRight: 15 }} />
            <Text style={styles.itemText}>App Settings</Text>
            <Feather name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* 🟦 Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.itemRow} onPress={() => alert("Help Center")}>
            <Feather name="help-circle" size={20} color="#333" style={{ marginRight: 15 }} />
            <Text style={styles.itemText}>Help Center</Text>
            <Feather name="chevron-right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow} onPress={() => alert("Logging out")}>
            <Feather name="log-out" size={20} color="red" style={{ marginRight: 15 }} />
            <Text style={[styles.itemText, { color: 'red', fontWeight: 'bold' }]}>Log Out</Text>
            <Feather name="chevron-right" size={20} color="red" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: '#1455F1',
  },
  profileImage: { 
    width: RFValue(100), 
    height: RFValue(100), 
    borderRadius: RFValue(50), 
    marginBottom: spacing.lg 
  },
  name: { 
    color: '#fff', 
    fontSize: fontSizes.xxl, 
    fontWeight: 'bold' 
  },
  email: { 
    color: '#fff', 
    fontSize: fontSizes.base, 
    marginTop: spacing.sm 
  },

  section: {
    marginVertical: spacing.md,
    backgroundColor: '#fff',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    marginHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: '#555',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    flexWrap: 'wrap',
  },
  statBox: { 
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    minWidth: '30%'
  },
  statNumber: { 
    fontSize: fontSizes.lg, 
    fontWeight: 'bold' 
  },
  statLabel: { 
    fontSize: fontSizes.sm, 
    color: '#777',
    marginTop: spacing.xs
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  itemText: { 
    fontSize: fontSizes.base, 
    color: '#333',
    marginLeft: spacing.md
  },
});
