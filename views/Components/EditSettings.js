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
import Instructions from './Instructions';
import Darkmode from './Darkmode';
import Actions from './Actions';
import Locations from './Locations';
import TimerDuration from './TimerDuration';

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
        case 'Instructions': return (
          <View style={ styles.viewOverall }>
              <Instructions item={ item } toggleModal={ toggleModal }/>
          </View>
          );
        case 'Darkmode': return (
          <View style={styles.viewOverall}>
            <Darkmode item={ item } toggleModal={ toggleModal }/>
          </View>
        );
        case 'Actions': return (
          <View style={styles.viewOverall}>
            <Actions item={ item } toggleModal={ toggleModal }/>
          </View>
        );
        case 'Locations': return (
          <View style={styles.viewOverall}>
            <Locations item={ item } toggleModal={ toggleModal }/>
          </View>
        );
        case 'Timer Duration': return (
          <View style={styles.viewOverall}>
            <TimerDuration item={ item } toggleModal={ toggleModal }/>
          </View>
        );
      }
    }
    return (
      <View style={styles.viewOverall}>
          <Text>Error has occurred!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  viewOverall: {
      backgroundColor: `#fff`,
      minHeight: '50%',
      maxHeight: 700,
  }
});