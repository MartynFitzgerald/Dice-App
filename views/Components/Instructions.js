/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Instructions.js  
|  Description:  This is the file that holds the class of the instructions 
|                component.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  };

  render() {
    return (
    <View style={styles.viewOverall}>
        <Text>Information Component</Text>
    </View>
    );
  }
};

const styles = StyleSheet.create({
    viewOverall: {
        backgroundColor: `#fff`,
        minHeight: 700,
        maxHeight: 700,
    }
});