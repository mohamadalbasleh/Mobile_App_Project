import { StyleSheet, Text, View,Dimensions, TouchableOpacity,Image ,ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from "@expo/vector-icons";
import { useEffect } from 'react';
import { RFValue, fontSizes, spacing } from '../utils/responsiveUtils';
import { app, analytics } from '../config/firebase';
import { RFValue, fontSizes, spacing } from '../utils/responsiveUtils';


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
    
const Restaurant = ({route,navigation}) => {
  

 const coffees = [
  {
    id: 1,
    name: "Espresso",
    description: "Strong, black coffee served in a small cup.",
    price: 3.0,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"
  },
  {
    id: 2,
    name: "Americano",
    description: "Espresso diluted with hot water for a milder flavor.",
    price: 3.5,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  },
  {
    id: 3,
    name: "Cappuccino",
    description: "Espresso with steamed milk and a layer of foam.",
    price: 4.0,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  },
  {
    id: 4,
    name: "Latte",
    description: "Espresso with lots of steamed milk and a thin layer of foam.",
    price: 4.5,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  },
  {
    id: 5,
    name: "Mocha",
    description: "Espresso with chocolate syrup and steamed milk.",
    price: 5.0,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  },
  {
    id: 6,
    name: "Macchiato",
    description: "Espresso with a small amount of foamed milk on top.",
    price: 3.5,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  },
  {
    id: 7,
    name: "Flat White",
    description: "Espresso with velvety steamed milk, popular in Australia/New Zealand.",
    price: 4.0,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  },
  {
    id: 8,
    name: "Iced Coffee",
    description: "Chilled coffee served with ice cubes, optional milk or syrup.",
    price: 4.0,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  },
  {
    id: 9,
    name: "Affogato",
    description: "Espresso poured over a scoop of vanilla ice cream.",
    price: 5.5,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  },
  {
    id: 10,
    name: "Irish Coffee",
    description: "Coffee with Irish whiskey, sugar, and whipped cream.",
    price: 6.0,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZho24o-K-Nlooh7FozahVaZrJw3T3nzBPYA&s"  }
];
const { resName, rating, time } = route.params;

  return (
    
    <View style={{}}>
      {/* Custom Header */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: spacing.lg, backgroundColor: "#1455F1" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={RFValue(24)} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: spacing.lg }}>
          {/* Dynamic restaurant name */}
          <Text style={{ color: "#fff", fontSize: fontSizes.lg, fontWeight: "bold" }}>
            {resName}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: spacing.sm }}>
            <Feather name="star" size={RFValue(16)} color="yellow" />
            <Text style={{ color: "#fff", marginLeft: spacing.sm, fontSize: fontSizes.sm }}>
              {rating || 0} {/* default to 0 if not passed */}
            </Text>

            <Feather
              name="clock"
              size={RFValue(16)}
              color="#fff"
              style={{ marginLeft: spacing.lg }}
            />
            <Text style={{ color: "#fff", marginLeft: spacing.sm, fontSize: fontSizes.sm }}>
              {time || "N/A"} {/* default if not passed */}
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      
    <ScrollView style={{ padding: spacing.md }}>
            
            {coffees.map((R, i) => (
            <TouchableOpacity key={i} style={styles.resView}>
                <View style={styles.resText}>
                <Text style={{fontSize: fontSizes.base, fontWeight: '600'}}>{R.name}</Text>
                <Text style={{fontSize: fontSizes.sm, color: '#666', marginTop: spacing.xs}}>{R.description}</Text>
                <Text style={{fontSize: fontSizes.base, marginTop: spacing.sm}}>
                    <Feather name="dollar-sign" size={RFValue(16)} color="gray" /> {R.price}
                </Text>
                </View>
                <Image source={{ uri: R.image }} style={{ width: RFValue(80), height: RFValue(80), borderRadius: 10, marginLeft: spacing.md }} />
            </TouchableOpacity>
            ))}
        </ScrollView>
    
    </View>
  )
}

export default Restaurant

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray'
    },
    resView:{
      flexDirection: 'row',
      marginBottom: spacing.lg,
      padding: spacing.md,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center'
    },
    resText:{
     flex:1 
    },
    open:{
      borderRadius:25,
      width:windowWidth*.2,
      height:RFValue(30),
      textAlign:'center',
      textAlignVertical:'center'
    },
    rating:{
      paddingLeft:windowWidth*.1,
      paddingBottom:windowHeight*.05,
      flexDirection:'row'
    }

})