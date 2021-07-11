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
import { Divider, Text, Button } from 'react-native-paper';

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
        <Text style={{fontSize: 24}}>{item.name}</Text>
        <Divider style={{ marginVertical: 10 }}/>
        <Text>How to use the application</Text>
        <Button
            style={{ width: "100%", marginVertical: 20, padding: 1 }}
            onPress={toggleModal}
            mode="contained"
          >
            Close
        </Button>
      </View>
    );
  };
};