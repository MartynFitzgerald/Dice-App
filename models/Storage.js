/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Storage.js  
|  Description:  This is the file that holds the functionality to interact with
|                data stored onto the users device.
|                
*===========================================================================*/
import { AsyncStorage } from 'react-native';
/* 
  A function that stores information using the id and data inputs.
*/
exports.set = async function(id, data) {
  await AsyncStorage.setItem(`@Dice:${id}`, JSON.stringify(data)).catch((error) => console.error(error));
};
/* 
  A function that stores information using the id input.
*/
exports.get = async function(id) {
  return await AsyncStorage.getItem(`@Dice:${id}`).then((data) => {
    return JSON.parse(data);
  }).catch((error) => console.error(error));
};
/* 
  A function that removes information stored using the id inputs.
*/
exports.remove = async function(id) {
  await AsyncStorage.removeItem(`@Dice:${id}`).catch((error) => console.error(error));
};