/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|     Project :  Dice Application
|
|    File Name:  home.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React from 'react';
import { View, Button } from 'react-native';
import Dices from './components/Dices';

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Dices/>
        <View style={{ flex: 2 }}>
          <Button
            title="Roll Dices!"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            title="Start Timer"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}
