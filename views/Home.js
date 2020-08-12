/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|     Project :  Dice Application
|
|    File Name:  home.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const children = ({ remainingTime, animatedColor }) => {
  const minutes = Math.floor((remainingTime % 3600) / 60)
  const seconds = remainingTime % 60

  if (remainingTime === 0) {
    return (
      <View style={{alignContent:"center", alignItems:"center"}}>
        <Animated.Text style={{ color:"#A2A2A4", fontSize: 30 }}>{"Time is up!"}</Animated.Text>
      </View>
    )
  } else if (remainingTime <= 59) {
    return (
      <View style={{alignContent:"center", alignItems:"center"}}>
        <Animated.Text style={{ color:"#A2A2A4", fontSize: 30 }}>{"Remaining"}</Animated.Text>
        <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>{seconds}s</Animated.Text>
        <Animated.Text style={{ color:"#A2A2A4", fontSize: 30 }}>{"Seconds"}</Animated.Text>
      </View>
    )
  } else {
    return (
      <View style={{alignContent:"center", alignItems:"center"}}>
        <Animated.Text style={{ color:"#A2A2A4", fontSize: 30 }}>{"Remaining"}</Animated.Text>
        <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>{minutes}m {seconds}s</Animated.Text>
      </View>
    )
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDicesActive: false,
      isTimerActive: false,
      timer: 70,
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
    const { isDicesActive } = this.state;
    
    if(isDicesActive){
      this.firstCube.rotation.x += 7 * delta;
      this.firstCube.rotation.y += 4 * delta;
      this.secondCube.rotation.x -= 7 * delta;
      this.secondCube.rotation.y -= 4 * delta;
    }
    this.renderer.render(this.scene, this.camera);
  };

  onRoll = () => {
    //Role the dice.
    this.setState({isDicesActive: true});
    //Timer to stop the dice from rolling.
    setTimeout(() => {
      this.setState({isDicesActive: false});
    }, 10 * 1000);
  };

  onCountdown = () => {
    //Start the timer.
    this.setState({isTimerActive: true});
  };

  render() {
    const { isTimerActive, timer } = this.state;
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
          />
          <CountdownCircleTimer
            isPlaying={isTimerActive}
            duration={timer}
            remainingTime={timer}
            size={250}
            strokeLinecap={"round"}
            colors={[
              ['#7BC763', 0.4],
              ['#C25408', 0.4],
              ['#C11D03', 0.2],
            ]}
            children={children}
            onComplete={() => {
              this.setState({isTimerActive: false});
              return [false] // repeat animation in 1.5 seconds
          }}/>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", width: "100%", marginVertical: 40 }}>
            <Button
              containerStyle={{ width: "50%", padding: 1 }}
              onPress={this.onCountdown}
              title="Start Timer"
            />
            <Button
              containerStyle={{ width: "50%", padding: 1 }}
              buttonStyle={{ backgroundColor: '#841584' }}
              backgroundColor={'red'}
              onPress={this.onCountdown}
              title="Reset Timer"
            />
          </View>
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
