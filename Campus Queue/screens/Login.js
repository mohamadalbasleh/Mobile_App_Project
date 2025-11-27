import { StyleSheet, Text, View,Dimensions,TextInput,Button,Image, TouchableOpacity } from 'react-native'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Login = ({route,navigation}) => {
 


  return (
    <View style={{marginTop:windowHeight*.1}}>
      <View style={{marginTop:windowHeight*.1}}>
        <Image source={require('../assets/CoffeeCup.png')} style={{width:windowWidth*.2,height:windowHeight*.09,alignSelf:'center'}}/>
        <Text style={{alignSelf:'center',fontWeight:'bold'}}>Campus Queue</Text>
        <Text style={{alignSelf:'center'}}>Skip the line, save time </Text>
      </View>
      <View style={{marginTop:windowHeight*.06}}>
        <Text style={styles.font}>Email</Text>
        <TextInput placeholder='60xxxxx@udst.ude.qa' style={styles.in}/>

        <Text style={styles.font}>Password</Text>
        <TextInput placeholder='Enter your password' style={styles.in}/>

        <Text style={[styles.font,{color:'blue',fontWeight:'condensed',margin:9}]}>Forgot password?</Text>
        <TouchableOpacity style={[styles.Demo,{backgroundColor:"blue",alignSelf:'center'}]} onPress={()=>navigation.navigate("BottomTabs")}>
            <Text style={[styles.font, { color: 'white', marginLeft: 5,fontWeight:'bold',textAlign:'center',marginTop:windowHeight*.018 }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: windowHeight * .03
          }}>
          <Text style={[styles.font,{fontWeight:"condensed"}]}>Don't have an account?</Text>

          <TouchableOpacity>
            <Text style={[styles.font, { color: 'blue', marginLeft: 5,fontWeight:"condensed" }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
            ustifyContent: 'center',
            alignItems: 'center',
            marginTop: windowHeight * .03}}>
          <TouchableOpacity style={styles.Demo}>
            <Text style={[styles.font, { color: '#2747b3ff', marginLeft: 5,fontWeight:"condensed",textAlign:'center',marginTop:7 }]}>Demo Mode</Text>
            <Text style={[styles.font, { color: 'blue', marginLeft: 5,fontWeight:"condensed",textAlign:'center' }]}>Click Sign in to continue</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
    
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        backgroundColor:'gray'
    },in:{
      borderWidth:1,
      width:windowWidth*.9,
      borderRadius:10,
      alignSelf:'center',
      margin:4
    },font:{
      fontWeight:'bold',
      marginLeft:windowWidth*.066
    },Demo:{
      backgroundColor:"#7a97f728",
      width:windowWidth*.9,
      height:windowHeight*.06,
      borderRadius:10
    }
    

})