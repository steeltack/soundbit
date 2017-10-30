import Sound from 'react-native-sound';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';


class LocalSound {
    constructor() {
        this.current = null;
    }

    play(url) {
        this.current = new Sound(url, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else {
                this.current.play();
            }
        });
    }

    pause() {
        this.current.pause();
    }

    stop() {
        this.current.stop();
    }

    forwards(seconds) {
        this.current.goForward(seconds);
    }

    back(seconds) {
        this.current.goBack(seconds);
    }

    resume() {
        this.current.play();
    }

    seek(seconds) {
        // this.current.seekToTime(seconds)
    }

    status(func) {
        // this.current.getStatus(func)
    }
}

class StreamingSound {
    constructor() {
        this.current = ReactNativeAudioStreaming;
    }

   play(url) {
       console.log('ReactNativeAudioStreaming@@@@@@@@@@@@@@@@@@@@@@@@', ReactNativeAudioStreaming)
        ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
    }

    pause() {
        this.current.pause();
    }

    stop() {
        this.current.stop();
    }

    forwards(seconds) {
        console.log("forards&&&&&&&&&&&&&&&&&&&&&&&", seconds)
        this.current.goForward(seconds);
    }

    back(seconds) {
        this.current.goBack(seconds);
    }

    resume() {
        this.current.resume();
    }

    seek(seconds) {
        this.current.seekToTime(seconds)
    }

    status(func) {
        this.current.getStatus(func)
    }
}

export default class AudioControls {
    constructor(obj) {
        this.onStateChange = obj.onStateChange;
        this.isStreaming = false;
        this.streamingAudio = new StreamingSound()
        this.localAudio = new LocalSound()
        this.playState = {
            isPlaying: false
        }
    }

    updatePlayState(obj) {
        this.playState = {
            ...this.playState,
            ...obj,
        }
        this.onStateChange(this.playState)
        return this.playState;
    }

    player() {
        return this.isStreaming ? this.streamingAudio : this.localAudio;
    }

    play(opt) {
        if (!opt) {
            throw('AudioControls.js play function: opt is required');
        }

        let audioLocation = opt;
        if (opt && isObject(opt)) {
            this.isStreaming = !isUndefined(opt.isStreaming) ? opt.isStreaming : this.isStreaming;
            audioLocation = opt.audio;
        } else if (isString(opt) && opt.match(/^http:\/\//)) {
            this.isStreaming = true
        }

        this.player().play(audioLocation);
        this.updatePlayState({
            isPlaying: true
        })
    }

    pause() {
        this.player().pause();
        this.updatePlayState({
            isPlaying: false
        })
    }

    stop() {
        this.player().stop();
        this.updatePlayState({
            isPlaying: false
        })
    }

    resume() {
        this.player().resume();
        this.updatePlayState({
            isPlaying: true
        })
    }

    forwards(seconds) {
        this.player().forwards(seconds);
    }

    back(seconds) {
        this.player().back(seconds);
    }

    seek() {
        this.player().seek();
    }

    status(func) {
       this.player().status(func);
    }
}