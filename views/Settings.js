/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|     Project :  Dice Application
|
|    File Name:  home.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Instructions',
    icon: 'info'
  },
  {
    name: 'Actions',
    icon: 'forward'
  },
  {
    name: 'Locations',
    icon: 'search'
  },
  {
    name: 'Timer Duration',
    icon: 'timer'
  }
];


export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {

  };

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftIcon={{ name: item.icon }}
      bottomDivider
      chevron
    />
  )

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
