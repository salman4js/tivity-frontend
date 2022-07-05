import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Signin from './Screens/Signup';
import Home from './Screens/Home';
import Bottom from './Screens/Bottom';
import Home2 from './Screens/Home2';
import Brief from './Screens/Brief';
import New from './Screens/NewNote';
import Expense from './Screens/Expenses'
import Profile from './Screens/Profile';
import Edit from './Screens/Edit';
import Before from './Screens/Before';
import Bar from './Screens/Bar';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();

export default function App() {

  const [islogged, setIslogged] = useState();

  const getData = async() => {
    var value = await AsyncStorage.getItem('@storage_Key')
    console.log("storedvalue" ,value.length);
    if(value.length > 1){
      setIslogged(true);
      console.log("Setting bottom as an main screen now!")
      console.log(islogged);
    } else {
      setIslogged(false)
    }
  }

  
  useEffect(() => {
    getData();
  },[]);

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen options = {{headerShown : false}} name = "Login" component = {Login} />
          <Stack.Screen options = {{headerShown : false}} name = "Signin" component = {Signin} />
          <Stack.Screen options = {{headerShown : false}} name = "Home" component={Home} />
          <Stack.Screen options = {{headerShown : false}} name = "Bottom" component={Bottom} />
          <Stack.Screen options = {{headerShown : false}} name = "Home2" component={Home2}/>
          <Stack.Screen options = {{headerShown : false}} name = "Brief" component = {Brief} />
          <Stack.Screen options = {{headerShown : false}} name = "New" component={New} />
          <Stack.Screen options = {{headerShown : false}} name = "Expense" component = {Expense} />
          <Stack.Screen options = {{headerShown : false}} name = "Profile" component={Profile} />
          <Stack.Screen options = {{headerShown : true}} name = "Edit" component={Edit} />
          <Stack.Screen options = {{headerShown : true}} name = "Before" component={Before} />
          <Stack.Screen options = {{headerShown : true}} name = "Expense Analytics" component={Bar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
