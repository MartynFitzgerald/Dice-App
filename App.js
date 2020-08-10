import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

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
            headerRight: () => (
              <TouchableOpacity
                style={{padding:15}}
                onPress={() => navigation.navigate('Settings')}>
                <Icon name='settings' />
            </TouchableOpacity>),
            route: {route}, 
            navigation: {navigation}}
          )}/>
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={({route, navigation}) => ({
              headerTitle: 'Settings', 
              headerLeft: () => (
                <TouchableOpacity
                  style={{padding:15}}
                  onPress={() => navigation.goBack()}>
                  <Icon name='arrow-back' />
              </TouchableOpacity>),
              route: {route}, 
              navigation: {navigation}}
            )}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
