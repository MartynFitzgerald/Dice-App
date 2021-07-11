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
import { GLView } from 'expo-gl';
import { Renderer } from "expo-three";
import { Button } from 'react-native-elements';

import dicesPositions from '../data/dicesPositions';
import fontJSON from '../assets/fonts/gentilis_bold.typeface';

function addLabel( text, location, group, rotY = null, rotX = null, rotZ = null ) {
  let loader = new THREE.FontLoader();
  let font = loader.parse(fontJSON);

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

  diceAnimation = () => {
    const { isDicesActive, amountOfDices, objects } = this.state;
      if(isDicesActive) {
        const min = 5;
        const max = 15;
        const rand = (min + Math.random() * (max - min)) / 100;

        for(let i = 0; i < amountOfDices; i++) {
            if (Math.log2(i) % 1 === 0){ // Get the power of two 
                objects[i].rotation.x += rand;
                objects[i].rotation.y += rand;
            } else {
                objects[i].rotation.x -= rand;
                objects[i].rotation.y -= rand;
            }
        }
    }
  };

  onContextCreate = async (gl) => {
    const { chosenDicesPositions } = this.state;

    // 1. Scene
    var scene = new THREE.Scene();
    // 2. Camera
    const camera = new THREE.PerspectiveCamera(30, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    camera.position.z = 4.5 + (chosenDicesPositions[0].camera / 1.5); //4.5
    // 3. Renderer
    const renderer = new Renderer({ gl });
    renderer.setClearColor(0xffffff);
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // 4. Shapes
    this.createShapes(scene);
    // 4. Lighting
    this.createLighting(scene);

    const animate = () => {
      requestAnimationFrame(animate);
      
      this.diceAnimation();

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    
    animate();
  };

  createShapes = (scene) => {
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

      scene.add(objects[i]);
    }
  };

  createLighting = (scene) => {
    const light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(0, 0, 2);

    scene.add(new THREE.AmbientLight(0x404040));
    scene.add(light);
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
        let radToRound = THREE.Math.degToRad( 90 );

        let lookAtCamX = Math.round(objects[0].rotation.x / radToRound) * radToRound;
        let lookAtCamY = Math.round(objects[0].rotation.x / radToRound) * radToRound;

        if (lookAtCamX < 0) {
          //lookAtCamX = Math.abs(lookAtCamX, (lookAtCamX * 2)); Not working
        }

        objects[i].rotation.x = lookAtCamX;
        objects[i].rotation.y = lookAtCamY;
      }
    }, 10 * 1000);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GLView
          onContextCreate={this.onContextCreate}
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
