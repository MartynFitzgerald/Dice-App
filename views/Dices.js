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
import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import { Button } from 'react-native-elements';

import dicesPositions from '../data/dicesPositions';

export default class Dices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      objects: [],
      isDicesActive: false,
      chosenDicesPositions: [],
      amountOfDices: 1
    }
  };

  componentDidMount() {
    const { amountOfDices } = this.state;

    this.setState({ chosenDicesPositions: dicesPositions.filter(x => x.amount == amountOfDices) });
    
    THREE.suppressExpoWarnings(true);
  };

  onContextCreate = async ({ gl, width, height, scale: pixelRatio, }) => {
    const { chosenDicesPositions } = this.state;
    
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    this.camera.position.z = 4.5 + (chosenDicesPositions[0].camera / 1.5);

    this.createShapes();
    this.createLighting();
  };

  createShapes = () => {
    const { objects, amountOfDices, chosenDicesPositions } = this.state;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });
    
    for(let i = 0; i < amountOfDices; i++) { //Get amount of dices here
        objects.push(new THREE.Mesh(geometry, material));
        
        objects[i].position.x -= chosenDicesPositions[0].positions[i].x;
        objects[i].position.y -= chosenDicesPositions[0].positions[i].y;

        this.scene.add(objects[i]);
    }
  };

  createLighting = () => {
    const light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(0, 0, 2);

    this.scene.add(new THREE.AmbientLight(0x404040));
    this.scene.add(light);
  };    

  onRender = delta => {
    const { isDicesActive, amountOfDices, objects } = this.state;
    
    if(isDicesActive) {
        for(let i = 0; i < amountOfDices; i++) {
            if (Math.log2(i) % 1 === 0){ // Get the power of two 
                objects[i].rotation.x += (Math.floor(Math.random() * 7) + 5) * delta;
                objects[i].rotation.y += (Math.floor(Math.random() * 4) + 2) * delta;
            } else {
                objects[i].rotation.x -= (Math.floor(Math.random() * 7) + 5) * delta;
                objects[i].rotation.y -= (Math.floor(Math.random() * 4) + 2) * delta;
            }
        }
    }
    this.renderer.render(this.scene, this.camera);
  };

  onRoll = () => {
    const { amountOfDices, objects } = this.state;
    //Role the dice.
    this.setState({isDicesActive: true});
    //Timer to stop the dice from rolling.
    setTimeout(() => {
      this.setState({isDicesActive: false});

      //After roll function, make objects look at camera.
      for(let i = 0; i < amountOfDices; i++) {
        objects[i].lookAt(this.camera.position);
      }
    }, 10 * 1000);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GraphicsView
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          style={{ alignItems: 'stretch', flex:1 }}
        />
        <View style={{ alignItems: "center", backgroundColor: "#fff" }}>
          <Button
            containerStyle={{ width: "50%", marginVertical: 20, padding: 1 }}
            onPress={this.onRoll}
            title="Roll Dices!"
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  remainingTime: {
    fontSize: 46,
  },
});
