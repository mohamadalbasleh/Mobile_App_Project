import { StyleSheet, Text, View,Dimensions,TextInput,Button,Image, TouchableOpacity, ScrollView } from 'react-native'
import { RFValue, fontSizes, spacing } from '../utils/responsiveUtils'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Login = ({route,navigation}) => {
 


  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
    <View style={{marginTop:windowHeight*.08, justifyContent: 'center', flex: 1}}>
      <View style={{marginTop:windowHeight*.05}}>
        <Image source={require('../assets/CoffeeCup.png')} style={{width:windowWidth*.25,height:windowHeight*.12,alignSelf:'center', maxWidth: 120, maxHeight: 100}}/>
        <Text style={{alignSelf:'center',fontWeight:'bold', fontSize: fontSizes.xxl, marginTop: spacing.md}}>Campus Queue</Text>
        <Text style={{alignSelf:'center', fontSize: fontSizes.base, marginTop: spacing.sm, color: '#666'}}>Skip the line, save time </Text>
      </View>
      <View style={{marginTop:windowHeight*.06, paddingHorizontal: spacing.lg}}>
        <Text style={styles.font}>Email</Text>
        <TextInput placeholder='60xxxxx@udst.ude.qa' style={styles.in} placeholderTextColor="#999"/>

        <Text style={[styles.font, {marginTop: spacing.md}]}>Password</Text>
        <TextInput placeholder='Enter your password' style={styles.in} secureTextEntry placeholderTextColor="#999"/>

        <Text style={[styles.font,{color:'blue',fontWeight:'500',margin:spacing.md, marginTop: spacing.lg}]}>Forgot password?</Text>
        <TouchableOpacity style={[styles.Demo,{backgroundColor:"blue",alignSelf:'center'}]} onPress={()=>navigation.navigate("BottomTabs")}>
            <Text style={[styles.font, { color: 'white', marginLeft: spacing.md, fontWeight:'bold',textAlign:'center', fontSize: fontSizes.lg }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: windowHeight * .04,
            flexWrap: 'wrap'
          }}>
          <Text style={[styles.font,{fontWeight:"500", fontSize: fontSizes.base}]}>Don't have an account?</Text>

          <TouchableOpacity>
            <Text style={[styles.font, { color: 'blue', marginLeft: spacing.sm, fontWeight:"500", fontSize: fontSizes.base }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: windowHeight * .04}}>
          <TouchableOpacity style={styles.Demo}>
            <Text style={[styles.font, { color: '#2747b3ff', marginLeft: spacing.md, fontWeight:"500", textAlign:'center', fontSize: fontSizes.base }]}>Demo Mode</Text>
            <Text style={[styles.font, { color: 'blue', marginLeft: spacing.md, fontWeight:"500", textAlign:'center', fontSize: fontSizes.sm }]}>Click Sign in to continue</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
    </ScrollView>
    
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        backgroundColor:'gray'
    },
    in:{
      borderWidth:1,
      width:windowWidth*.9,
      borderRadius:10,
      alignSelf:'center',
      marginVertical: spacing.sm,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      fontSize: fontSizes.base,
      borderColor: '#ddd'
    },
    font:{
      fontWeight:'600',
      marginLeft:0,
      fontSize: fontSizes.base,
      color: '#333'
    },
    Demo:{
      backgroundColor:"#7a97f728",
      width:windowWidth*.9,
      height:windowHeight*.08,
      minHeight: 65,
      borderRadius:10,
      justifyContent: 'center',
      alignItems: 'center'
    }
})