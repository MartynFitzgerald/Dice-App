/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|     Project :  Dice Application
|
|    File Name:  home.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  };
  render() {
    return (
      <View
        style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LinearGradient
          colors={['rgba(235,51,73,1)', 'rgba(244,92,67,1)']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: 'absolute',
            alignContent: 'center',
            justifyContent: 'center',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
        }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 15,
            color: '#fff',
            textAlign: 'center',
          }}>
          Sign in with Facebook
        </Text>
      </LinearGradient>
      </View>
    );
  }
}
