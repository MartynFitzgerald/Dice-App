/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  TimerDuration.js  
|  Description:  This is the file that holds the class of the TimerDuration 
|                component.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TimerDuration extends Component {
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
        <Text>Modify timer duration</Text>
      </View>
    );
  };
};