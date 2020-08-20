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
import { View, Text } from 'react-native';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  };

  render() {
    const { item, toggleModal } = this.props;
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>How to use the application</Text>
      </View>
    );
  };
};