/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  App.js  
|  Description:  This is the initial file that holds the function of the app.s
|                
*===========================================================================*/
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper'

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'

import HomeScreen from './views/Home';  
import SettingsScreen from './views/Settings';

//Fetch font from ttf file.
const fetchFonts = () => {
  return Font.loadAsync({
  Pacifico: require('./assets/fonts/Pacifico.ttf')
  });
};
//Create a navigator of all the different views possible to access.
const Stack = createStackNavigator();

//Exports this function that includes the view that includes the stack of views.
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({route, navigation}) => ({
            headerTitle: 'Dice Application', 
            headerRight: () => (<IconButton icon="cog" size={24} onPress={() => navigation.navigate('Settings')} />),
            route: {route}, 
            navigation: {navigation}}
          )}/>
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={({route, navigation}) => ({
              headerTitle: 'Settings', 
              headerLeft: () => (<IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />),
              route: {route}, 
              navigation: {navigation}}
            )}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
