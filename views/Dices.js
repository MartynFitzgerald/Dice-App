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
import fontJSON from '../assets/fonts/gentilis_bold.typeface';


function addLabel( text, location, group, rotY = null, rotX = null, rotZ = null ) {

  let loader = new THREE.FontLoader();
  let font = loader.parse(fontJSON);
  let fontSize = 20;
  const baseSize = 9
  if (text.length >= baseSize) {
    fontSize = baseSize - 2
  }

  //let fontSize = 0.3 - ((text.length / 10) - 1);

  const geometry  = new THREE.TextGeometry( text, {
    font: font,
		size: 1 / text.length, //fontSize > 0.3  ? fontSize : 0.2,
		height: 0.1,
  });

  //Center text regardless the length
  geometry.center();
  let material = new THREE.MeshBasicMaterial( { color: 0xA7F432 } );
  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.copy( location );

  if (rotY){
    mesh.rotateY(rotY);
  }
  if (rotX){
    mesh.rotateX(rotX);
  }
  if (rotZ){
    mesh.rotateZ(rotZ);
  }
  
  group.add( mesh );
}

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
    this.camera.position.z = 4.5 + (chosenDicesPositions[0].camera / 1.5); //4.5

    this.createShapes();
    this.createLighting();
  };

  createShapes = () => {
    const { objects, amountOfDices, chosenDicesPositions } = this.state;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
    });
    
    for(let i = 0; i < amountOfDices; i++) { //Get amount of dices here
      var group = new THREE.Object3D();//create an empty container
      group.add( new THREE.Mesh(geometry, material) );//add a mesh with geometry to it
      objects.push(group);
        
      objects[i].position.x += chosenDicesPositions[0].positions[i].x;
      objects[i].position.y += chosenDicesPositions[0].positions[i].y;
      
      addLabel("1", new THREE.Vector3(objects[i].position.x + 0, objects[i].position.y, objects[i].position.z + 0.455), group); // Front
      addLabel("2", new THREE.Vector3(objects[i].position.x + 0.455, objects[i].position.y, objects[i].position.z), group, THREE.Math.degToRad( 90 )); // right
      addLabel("3", new THREE.Vector3(objects[i].position.x, objects[i].position.y + 0.455, objects[i].position.z), group, null, THREE.Math.degToRad( 270 )); // top
      addLabel("4", new THREE.Vector3(objects[i].position.x + -0.455, objects[i].position.y, objects[i].position.z), group, THREE.Math.degToRad( 270 )); // left
      addLabel("5", new THREE.Vector3(objects[i].position.x, objects[i].position.y + -0.455, objects[i].position.z), group, null, THREE.Math.degToRad( 90 )); // bottom
      addLabel("6", new THREE.Vector3(objects[i].position.x, objects[i].position.y, objects[i].position.z + -0.455), group, THREE.Math.degToRad( 180 )); // Back

      //objects[i].rotateX(THREE.Math.degToRad( 270 ));

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
      //for(let i = 0; i < amountOfDices; i++) {
      //  objects[i].lookAt(this.camera.position); // does not work 
      //}
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
