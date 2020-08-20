/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  EditSettings.js  
|  Description:  This is the file that holds the class of the settings overlay 
|                component.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Import components.
import Darkmode from './Darkmode';
import Actions from './Actions';
import Locations from './Locations';
import TimerDuration from './TimerDuration';
import About from './About';
import Help from './Help';

export default class EditSettings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  };

  render() {
    const { item, toggleModal } = this.props;
    if ( item != undefined ) {
      switch( item.name ) {
        case 'Darkmode': return (
          <View style={styles.container}>
            <Darkmode item={ item } toggleModal={ toggleModal }/>
          </View>
        );
        case 'Actions': return (
          <View>
            <Actions item={ item } toggleModal={ toggleModal }/>
          </View>
        );
        case 'Locations': return (
          <View>
            <Locations item={ item } toggleModal={ toggleModal }/>
          </View>
        );
        case 'Timer Duration': return (
          <View>
            <TimerDuration item={ item } toggleModal={ toggleModal }/>
          </View>
        );
        case 'About': return (
          <View>
              <About item={ item } toggleModal={ toggleModal }/>
          </View>
        );
        case 'Help': return (
          <View>
              <Help item={ item } toggleModal={ toggleModal }/>
          </View>
        );
      }
    }
    return (
      <View>
          <Text>Error has occurred!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    maxWidth:"95%",
    padding: 8,
  },
  remainingTime: {
    fontSize: 46,
  },
});
