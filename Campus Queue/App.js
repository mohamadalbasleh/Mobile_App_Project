import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Login from './screens/Login';
import TopTabs from "./navigation/TopTabs";



import {createContext} from 'react'
import CustomHeader from './screens/CustomHeader';
import Restaurant from './screens/Restaurant';
import BottomTabs from './navigation/BottomTabs';


const Stack = createNativeStackNavigator()
export const AppContext = createContext();

export default function App() {
 

  return (

<NavigationContainer>
  <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        
       
      }}
  >
    <Stack.Screen 
      name="Login" 
      component={Login} 
      options={{headerShown:false}} 
    />

    <Stack.Screen 
      name="Home" 
      component={Home} 
      options={{ title: 'Overview',headerShown:false}}  
    />

    {/** 🔥 USE THE TOP TAB NAVIGATOR HERE */}
    <Stack.Screen 
      name="TopTabs" 
      component={TopTabs} 
      options={{ title: 'TopTabs',
        header:()=> <CustomHeader/>
      }}  
    />

    
    <Stack.Screen 
      name="Restaurant" 
      component={Restaurant} 
      options={{ title: 'Restaurant',headerShown: false}}  
    />
 
      <Stack.Screen 
      name="BottomTabs" 
      component={BottomTabs} 
       options={{ title: 'BottomTabs'
        ,headerShown: false
      }}  
    />

  


  
  </Stack.Navigator>
</NavigationContainer>



  );
}

