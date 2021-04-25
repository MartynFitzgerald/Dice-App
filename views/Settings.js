/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Settings.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Overlay, Icon } from 'react-native-elements'

//Import components.
import EditSettings from './Components/EditSettings';

export default class SettingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      item: [],
      list: [
        {
          name: 'Darkmode',
          icon: 'brightness-6',
          onPress: () => {this.toggleModal(this.state.list[0]);}
        },
        {
          name: 'Actions',
          icon: 'forward',
          onPress: () => {this.toggleModal(this.state.list[1]);}
        },
        {
          name: 'Locations',
          icon: 'search',
          onPress: () => {this.toggleModal(this.state.list[2]);}
        },
        {
          name: 'Timer Duration',
          icon: 'timer',
          onPress: () => {this.toggleModal(this.state.list[3]);}
        },
        {
          name: 'About',
          icon: 'info',
          onPress: () => {this.toggleModal(this.state.list[4]);}
        },
        {
          name: 'Help',
          icon: 'help',
          onPress: () => {this.toggleModal(this.state.list[5]);}
        },
      ]
    }
  }
  
  componentDidMount() {

  };

  toggleModal = (item=null) => {
    this.setState({item: item})
    this.setState({isModalVisible: !this.state.isModalVisible})
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (    
    <ListItem bottomDivider onPress={item.onPress} >
      <Icon name={item.icon} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  ) 

  render() {
    const { isModalVisible, list, item } = this.state;
    return (
      <View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />
        <Overlay isVisible={isModalVisible} onBackdropPress={this.toggleModal} animationDuration={20} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}} childrenWrapperStyle={{backgroundColor: '#fff'}}>
          <EditSettings item={item} toggleModal={this.toggleModal}/>
        </Overlay>
      </View>
    );
  }
}