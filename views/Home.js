/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Home.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

//Import Classes.
import Dices from './Dices';
import Countdown from './Countdown';

//Import functions.
import storage from '../models/Storage';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        darkmode: 0,
        timer: 30,
      },
      isTimerActive: false
    }
  };

  componentDidMount() {
    storage.get(`user`)
    .then((user) => {
      if (user == undefined || user == null) {
        storage.set(`user`, this.state.user);
      } else {
        this.setState({user: user});
      }
    });
  };

  render() {
    const { user } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Dices/>
        <Countdown user={user}/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  remainingTime: {
    fontSize: 46,
  },
});
