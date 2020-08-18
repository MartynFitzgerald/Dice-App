/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Actions.js  
|  Description:  This is the file that holds the class of the Actions 
|                component.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Actions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  };

  render() {
    const { item, toggleModal } = this.props;
    return (
      <View>
        <Text>{item.name} Component</Text>
        <Text>Modify actions</Text>
      </View>
    );
  };
};