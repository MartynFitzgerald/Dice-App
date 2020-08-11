/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|     Project :  Dice Application
|
|    File Name:  home.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React from 'react';
import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import Constants from 'expo-constants';
import { View, StyleSheet, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const children = ({ remainingTime }) => {
  const minutes = Math.floor((remainingTime % 3600) / 60)
  const seconds = remainingTime % 60

  return `${minutes}:${seconds}`
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      roll: false,
    }
  }

  componentDidMount() {
    THREE.suppressExpoWarnings();
  };

  onContextCreate = async ({ gl, canvas, width, height, scale: pixelRatio, }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    this.camera.position.z = 4.5;
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });
    
    this.firstCube = new THREE.Mesh(geometry, material);
    this.secondCube = new THREE.Mesh(geometry, material);
    
    this.scene.add(this.firstCube);
    this.scene.add(this.secondCube);

    this.firstCube.position.x -= .8;
    this.secondCube.position.x += .8;

    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(0, 0, 2);
    this.scene.add(light);
  };

  onRender = delta => {
      this.renderer.render(this.scene, this.camera);
  };

  onRoll = async () => {
    let timePassed = false;
    console.log(timePassed);

    setTimeout((timePassed) => {
      timePassed = true;
    }, 10 * 1000, timePassed);

    console.log(timePassed);
    
    
    while (!timePassed) {
      this.firstCube.rotation.x += 5 * (Math.random() * 0.1);
      this.firstCube.rotation.y += 3 * (Math.random() * 0.1);
      this.secondCube.rotation.x -= 5 * (Math.random() * 0.1);
      this.secondCube.rotation.y -= 3 * (Math.random() * 0.1);
      break;
    }
  };

   

  render() {

    return (
      <View style={{ flex: 1 }}>
        <GraphicsView
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          style={{alignItems: 'stretch', flex:1}}
        />
        <View style={{ flex: 2, alignItems: "center", backgroundColor: "#fff" }}>
          <Button
            containerStyle={{ width: "50%", marginVertical: 20}}
            onPress={this.onRoll}
            title="Roll Dices!"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <CountdownCircleTimer
            isPlaying
            duration={10}
            children={children}
            size={250}
            colors={[
              ['#7BC763', 0.4],
              ['#C25408', 0.4],
              ['#C11D03', 0.2],
            ]}
            onComplete={() => {
              // do your stuff here
              return [true, 1500] // repeat animation in 1.5 seconds
          }}>
            
            {({ remainingTime, animatedColor }) => (
              <View style={{alignContent:"center", alignItems:"center"}}>
              <Animated.Text style={{ color:"#A2A2A4", fontSize: 30 }}>
                {"Remaining"}
              </Animated.Text>
              <Animated.Text style={{ color: animatedColor, fontSize: 45   }}>
                {remainingTime}
              </Animated.Text>
              <Animated.Text style={{ color:"#A2A2A4", fontSize: 30 }}>
                {"Seconds"}
              </Animated.Text>
              </View>
            )}
          </CountdownCircleTimer>
          <Button
            containerStyle={{ width: "50%", marginVertical: 40 }}
            title="Start Timer"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
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
