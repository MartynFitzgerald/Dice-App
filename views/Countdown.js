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
import { Button, Text } from 'react-native-paper';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

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
};

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 0,
      isTimerActive: false
    }
  };

  componentDidMount() {
    
  };

  onStart = () => this.setState({isTimerActive: true});

  onReset = () => {
    this.setState({isTimerActive: false})
    this.setState({key: this.state.key + 1})
  };

  render() {
    const { user } = this.props;
    const { key, isTimerActive } = this.state;
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
        <CountdownCircleTimer
          key={key}
          isPlaying={isTimerActive}
          duration={user.timer || 60}
          remainingTime={user.timer || 60}
          size={250}
          strokeLinecap={"round"}
          colors={[
            ['#7BC763', 0.4],
            ['#C25408', 0.4],
            ['#C11D03', 0.2],
          ]}
          children={timerChildren}
          onComplete={() => this.setState({isTimerActive: false})}/>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
          <Button style={{ width: "47.5%", margin: 5 }} onPress={this.onStart} mode="contained">
            Start Timer
          </Button>
          <Button style={{ width: "47.5%", margin: 5 }} onPress={this.onReset} mode="contained" >
            Reset Timer
          </Button>
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
