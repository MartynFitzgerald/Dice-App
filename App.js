import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import HomeScreen from './views/Home';
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
      <Stack.Navigator initialRouteName="Login" headerMode = 'none' >
        <Stack.Screen name="Login" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
