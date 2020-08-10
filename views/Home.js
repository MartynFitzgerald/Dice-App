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
        <Dices/>
    );
  }
}
