/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Darkmode.js  
|  Description:  This is the file that holds the class of the Darkmode 
|                component.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View, Switch } from 'react-native';
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
        <View style={{ flexDirection: 'row' }}>
        <Text style={{fontSize: 24}}>{item.name}</Text>
          <View style={{ flex:1, flexDirection: 'row', justifyContent:'flex-end' }}>
            <Switch value={1}/>
          </View>
        </View>
        <Divider style={{ marginVertical: 10 }}/>
        <Text>Change this option to modify the color scheme for the application. The two options is light mode or dark mode. </Text>
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