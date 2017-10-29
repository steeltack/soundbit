'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  AlertIOS,
  ScrollView,
  Animated,
} from 'react-native';

import {
  Button,
  Avatar
} from 'react-native-material-ui';

// import Moment from 'moment';

import Sound from 'react-native-sound';

import map from 'lodash/map';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  * as Pods from '../actions/pods';
import Me from '../../me.m4a';

import CheckoutFooter from '../components/CheckoutFooter';
import { Player, ReactNativeAudioStreaming } from 'react-native-audio-streaming';

const url = "http://rss.art19.com/episodes/95fe892c-1309-421a-be21-7297b0698dd1.mp3";
console.log("one 1")

console.log("one 2")

class PlayEpisodePage extends Component {
    static navigationOptions = {
        title: 'Shows',
    };

  constructor() {
    super()

  }

  componentDidMount() {
    console.log("mounted!!!!")
    console.log("mounted", Sound)
    var whoosh = new Sound(Me, (error) => {
       if (error) {
                console.log('failed to load the sound!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', error);
            } else {
              console.log('play@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
                whoosh.play(); // have to put the call to play() in the onload callback
            }
    });

    // ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
    // whoosh.play((success) => {
    //   if (success) {
    //     console.log('successfully finished playing');
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //     // reset the player to its uninitialized state (android only)
    //     // this is the only option to recover after an error occured and use the player again
    //     // whoosh.reset();
    //   }
    // });
    // setTimeout(() => {
    //   ReactNativeAudioStreaming.stop();
    // }, 10000)
  }

  render() {
    console.log("render", {})
    const yes = 'yes'
    return (
      <View style={styles.container}>
        <Text
          style={{top: '10%'}}
          onPress={() => console.log('yah!!', yes)}
        >hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
    bracketLeft: {
    borderColor: '#555555',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    height: '60%',
    width: 30,
  },
  bracketRight: {
    borderColor: '#555555',
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    height: '60%',
    width: 30,
  },
  items: {
    height: 500,
  },
  cameraContainer: {
    height: '100%',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  noItems: {
    padding: 20,
    textAlign: 'center',
    // font-family: "LeagueGothic","Lucida Sans","Lucida Grande",sans-serif;
  }
});

const mapStateToProps = (state) => {
  const { pods } = state;
  return {
    pod: pods && pods[1]
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addPod: Pods.addPod,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayEpisodePage);