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
import { Button, Text } from 'react-native-elements'

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
          <Text h4>{ item.name }</Text>
          <View style={{ flex:1, flexDirection: 'row', justifyContent:'flex-end' }}>
            <Switch value={1}/>
          </View>
        </View>
        <Text>Change this option to modify the color scheme for the application. The two options is light mode or dark mode. </Text>
        <Button containerStyle={{ paddingVertical:10 }} title="Back" onPress={ toggleModal }/>
      </View>
    );
  };
};