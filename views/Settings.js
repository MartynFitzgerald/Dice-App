/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Settings.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import Overlay from 'react-native-modal-overlay';

//Import components.
import Modal from './Components/Instructions';

export default class SettingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      item: [],
      list: [
        {
          name: 'Instructions',
          icon: 'info',
          onPress: () => {this.toggleModal(this.state.list[0]);}
        },
        {
          name: 'Darkmode',
          icon: 'brightness-6',
          onPress: () => {this.toggleModal(this.state.list[1]);}
        },
        {
          name: 'Actions',
          icon: 'forward',
          onPress: () => {this.toggleModal(this.state.list[2]);}
        },
        {
          name: 'Locations',
          icon: 'search',
          onPress: () => {this.toggleModal(this.state.list[3]);}
        },
        {
          name: 'Timer Duration',
          icon: 'timer',
          onPress: () => {this.toggleModal(this.state.list[4]);}
        }
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
    <ListItem
      title={item.name}
      leftIcon={{ name: item.icon }}
      onPress={item.onPress}
      bottomDivider
      chevron
    />
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
        <Overlay visible={isModalVisible} onClose={this.toggleModal} animationDuration={20} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}} childrenWrapperStyle={[styles.white]} closeOnTouchOutside>
          <Modal item={item} toggleModal={this.toggleModal}/>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: `#fff`,
  }
});