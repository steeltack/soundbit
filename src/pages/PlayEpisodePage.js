'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  AlertIOS,
  ScrollView,
  Animated,
  Image,
} from 'react-native';

import {
  Button,
  Avatar
} from 'react-native-material-ui';

// import Moment from 'moment';

// import Sound from 'react-native-sound';

import map from 'lodash/map';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  * as Pods from '../actions/pods';
import Me from '../../me.m4a';
import AudioControls from '../AudioControls';
import appContent from '../content';

const { assets } = appContent

const url = "http://rss.art19.com/episodes/95fe892c-1309-421a-be21-7297b0698dd1.mp3";

class Controls extends Component {

  render() {
    const {
      isPlaying,
      onPressBack,
      onPressPlay,
      onPressPause,
      onPressForwards
    } = this.props;

    return (
      <View
        style={controlStyles.container}
      >
        <TouchableWithoutFeedback
          onPress={onPressBack}
        >
          <Image
            style={controlStyles.skipBackButton}
            source={require('../../assets/icons/skip.png')}
          />
        </TouchableWithoutFeedback>

        { !isPlaying
          ? <TouchableWithoutFeedback
              onPress={onPressPlay}
            >
              <Image

                style={controlStyles.playButton}
                source={require('../../assets/icons/play.png')}
              />
            </TouchableWithoutFeedback>
          : <TouchableWithoutFeedback
              onPress={onPressPause}
            >
              <Image
                style={controlStyles.pauseButton}
                source={require('../../assets/icons/pause.png')}
              />
            </TouchableWithoutFeedback>
        }
        <TouchableWithoutFeedback
          onPress={onPressForwards}
        >
          <Image
            style={controlStyles.skipForwardsButton}
            source={require('../../assets/icons/skip.png')}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const controlStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '15%',
    borderTopWidth: 1,
    borderTopColor: '#aaa'
  },
  playButton: {
    height: 50,
    width: 50
  },
  pauseButton: {
    height: 50,
    width: 50
  },
  hidden: {
    display: 'none'
  },
  skipBackButton: {
    height: 50,
    width: 50,
    transform: [{scaleX: -1}]
  },
  skipForwardsButton: {
    height: 50,
    width: 50
  }
})

class PlayEpisodePage extends Component {
    static navigationOptions = {
        title: 'Shows',
    };

  constructor() {
    super()
    this.state = {
      isPlaying: false,
      isFirstPlay: true
    }
  }

  componentDidMount() {
    this.audioControls = new AudioControls({
      onStateChange: state => {
        console.log("state", state)
        this.setState({
          isPlaying: state.isPlaying,
          isFirstPlay: false
        })
      }
    });

    // setInterval(() => {
    //   this.audioControls.status(status => {
    //     console.log('status!!!!!!!!!!!!!!!', status)
    //   })
    // }, 1000)
  }

  render() {
    const {
      isFirstPlay,
      isPlaying
    } = this.state;

    return (
      <View style={styles.container}>
        <Controls
          isPlaying={isPlaying}
          onPressBack={() => this.audioControls.back(15)}
          onPressPlay={() => {
              isFirstPlay
                ? this.audioControls.play(url)
                : this.audioControls.resume();
            }
          }
          onPressPause={() => this.audioControls.pause()}
          onPressForwards={() => this.audioControls.forwards(15)}
        />
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