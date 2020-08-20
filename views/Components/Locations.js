/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Locations.js  
|  Description:  This is the file that holds the class of the Locations 
|                component.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View } from 'react-native';
import { Divider, Button, Text } from 'react-native-elements'

export default class Help extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  };

  render() {
    const { item, toggleModal } = this.props;
    return (
      <View>
        <Text h4>{item.name}</Text>
        <Divider style={{ backgroundColor: 'grey' }} />
        <Text>How to use the application</Text>
        <Button
          title="Back"
          onPress={toggleModal}
        />
      </View>
    );
  };
};