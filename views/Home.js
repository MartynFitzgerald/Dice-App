/*=============================================================================
|      Editors:  Martyn Fitzgerald
|     Project :  Dice Application
|
|    File Name:  Home.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

//Import functions.
import storage from '../models/Storage';

const timerChildren = ({ remainingTime, animatedColor }) => {
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
      user: {
        darkmode: 0,
        timer: 30,
      },
      isTimerActive: false,
    }
  }

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

  onCountdown = () => {
    //Start the timer.
    this.setState({isTimerActive: true});
  };

  render() {
    const { user, isTimerActive, timer } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, alignItems: "center", backgroundColor: "#fff" }}>
          <Button
            containerStyle={{ width: "50%", marginVertical: 20}}
            onPress={this.onRoll}
            title="Roll Dices!"
          />
          <CountdownCircleTimer
            isPlaying={isTimerActive}
            duration={user.timer || 90}
            remainingTime={user.timer || 90}
            size={250}
            strokeLinecap={"round"}
            colors={[
              ['#7BC763', 0.4],
              ['#C25408', 0.4],
              ['#C11D03', 0.2],
            ]}
            children={timerChildren}
            onComplete={() => {
              this.setState({isTimerActive: false});
              return [false, timer] // repeat animation in 1.5 seconds
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
