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
import { List, Divider, Portal, Modal, Provider } from 'react-native-paper'

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
          icon: 'magnify',
          onPress: () => {this.toggleModal(this.state.list[2]);}
        },
        {
          name: 'Timer Duration',
          icon: 'timer',
          onPress: () => {this.toggleModal(this.state.list[3]);}
        },
        {
          name: 'About',
          icon: 'information',
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
    <View>
      <List.Item  
        onPress={item.onPress}
        title={item.name}
        left={props => <List.Icon {...props} icon={item.icon} />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
    </View>
  ) 

  render() {
    const { isModalVisible, list, item } = this.state;
    return (
      <Provider>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          renderItem={this.renderItem}
        />
        <Portal>
          <Modal visible={isModalVisible} onDismiss={this.toggleModal} contentContainerStyle={ {backgroundColor: 'white', padding: 20, margin:10 }}>
            <EditSettings item={item} toggleModal={this.toggleModal}/>
          </Modal>
        </Portal>
      </Provider>
    );
  }
}