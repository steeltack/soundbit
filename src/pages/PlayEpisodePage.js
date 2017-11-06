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

import Slider from "react-native-slider";

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

class DurationSlider extends Component {
  render() {
     <View
        style={controlStyles.container}
      >
        <Slider
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
        />
      </View>
  }
}

class Controls extends Component {
  render() {
    const {
      isPlaying,
      onPressBack,
      onPressPlay,
      onPressPause,
      onPressForwards,
      onSeek,
      progress,
      progressFormatted,
      durationFormatted,
      remainingFormatted
    } = this.props;

    return (
      <View
        style={controlStyles.container}
      >
        <View
          style={controlStyles.sliderContainer}
        >
          <Slider
            value={progress || 0}
            style={controlStyles.slider}
            onValueChange={onSeek}
          />
          <View
            style={controlStyles.durationContainer}
          >
            <Text>{progressFormatted}</Text>
            <Text>-{remainingFormatted}</Text>
          </View>
        </View>
        <View
          style={controlStyles.controlsContainer}
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
      </View>
    )
  }
}

const controlStyles = StyleSheet.create({
  container: {
    height: '28%',
    position: 'absolute',
    paddingTop: 20,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#aaa'
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '50%',
  },
  sliderContainer: {
    width: '75%',
    alignSelf: 'center',
    height: '30%',
    marginBottom: 10,
  },
  durationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  slider: {

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
          ...state,
          isFirstPlay: false,
        })
      }
    });
  }

  render() {
    const {
      isFirstPlay,
      isPlaying,
      progress,
      duration,
      progressFormatted,
      durationFormatted,
      remainingFormatted
    } = this.state;

    return (
      <View style={styles.container}>
        <Controls
          progress={this.audioControls && this.audioControls.fractionComplete}
          progressFormatted={progressFormatted}
          durationFormatted={durationFormatted}
          remainingFormatted={remainingFormatted}
          isPlaying={isPlaying}
          onPressBack={() => this.audioControls.back(15)}
          onSeek={value => {
              const progress = this.audioControls.fractionToProgress(value)
              this.setState({progress})
              this.audioControls.seek(progress);
            }
          }
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