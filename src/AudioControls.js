import Sound from 'react-native-sound';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import Moment from 'moment';


const streamingPlayStates = {
    stopped: 'STOPPED',
    paused: 'PAUSED',
    playing: 'PLAYING',
}

class LocalSound {
    constructor() {
        this.current = null;
    }

    play(url, onEnd) {
        this.current = new Sound(url, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else {
                this.current.play(onEnd);
            }
        });
    }

    pause() {
        this.current && this.current.pause();
    }

    stop() {
        this.current && this.current.stop();
    }

    forwards(seconds) {
        if (!this.current) {
            return;
        }
        this.current.getCurrentTime(time => {
            this.current.setCurrentTime(time + seconds);
        });
    }

    back(seconds) {
        if (!this.current) {
            return;
        }
          this.current.getCurrentTime(time => {
            this.current.setCurrentTime(time + seconds);
        });
    }



    resume() {
        this.current && this.current.play();
    }

    seek(seconds) {
        this.current.setCurrentTime(seconds)
    }

    getDuration() {
        this.current.getDuration()
    }

    setSpeed(value) {
        this.current.setSpeed(value)
    }

    getVolume() {
        this.current.getVolume()
    }

    setVolume(value) {
        this.current.setVolume(value)
    }

    status(func) {
         if (!this.current) {
            return;
        }
        this.current.getCurrentTime(progress => {
            const duration = this.current.getDuration();

            // mirroring react-native-streaming status function return values
            func({
                progress,
                duration,
            })
        });
    }
}

class StreamingSound {
    constructor() {
        this.current = ReactNativeAudioStreaming;
    }

   play(url) {
        ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
    }

    pause() {
        this.current && this.current.pause();
    }

    stop() {
        this.current && this.current.stop();
    }

    forwards(seconds) {
        this.current && this.current.goForward(seconds);
    }

    back(seconds) {
        this.current && this.current.goBack(seconds);
    }

    resume() {
        this.current && this.current.resume();
    }

    seek(seconds) {
        this.current && this.current.seekToTime(seconds)
    }

    status(func) {
        this.current && this.current.getStatus((error, status) => {
            func(status);
        })

    }
}

export default class AudioControls {
    constructor(obj) {
        this.onStateChange = obj.onStateChange;
        this.isStreaming = false;
        this.streamingAudio = new StreamingSound()
        this.localAudio = new LocalSound()
        this.playState = {
            isPlaying: false,
            duration: null,
            currentTime: null,
        }
    }

    updatePlayState(obj) {
        this.playState = {
            ...this.playState,
            ...obj,
        }
        this.progressCheck();
        this.onStateChange(this.playState)
        return this.playState;
    }



    player() {
        return this.isStreaming ? this.streamingAudio : this.localAudio;
    }

    play(opt) {
        // set duration in this.playstate
        // update playstate when playing
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

        // only works for localSound
        const onEnd = () => {
            this.updatePlayState({
                isPlaying: false
            })
        }

        this.player().play(audioLocation, onEnd) ;
        this.updatePlayState({
            isPlaying: true
        })
    }

    progressCheck(func) {
        if (this.progressCheckInterval || !this.playState.isPlaying) {
            return;
        }

        // this is to check if the player has stopped playing.
        // let lastProgress = null;
        let isPlaying = null;

        this.progressCheckInterval = setInterval(() => {
            if (!this.playState.isPlaying) {
                clearInterval(this.progressCheckInterval)
                this.progressCheckInterval = null;
            }

            this.updateStatus();

        }, 1000);
    }

    /**
     * Sourced from:
     * https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
     */
    formatTime(time) {
        time = Math.round(time)
         var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
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
        this.updateStatus();
    }

    back(seconds) {
        this.player().back(seconds);
        this.updateStatus();
    }

    seek(seconds) {
        this.player().seek(seconds || 0);
        this.updatePlayState({
            progress: seconds || 0
        })
    }

    status(func) {
       this.player().status(func);
    }

    updateStatus() {
        this.player().status(status => {
                let isPlaying = this.playState.isPlaying;

                const isStatus = status.status;
                const isStopped = isStatus && status.status === streamingPlayStates.stopped
                if (isStopped) {
                    isPlaying = false;
                }

                const {
                    duration,
                    progress
                } = status;

                const remaining = duration - progress;

                this.updatePlayState({
                    ...status,
                    remaining,
                    progressFormatted: this.formatTime(progress),
                    durationFormatted: this.formatTime(duration),
                    remainingFormatted: this.formatTime(remaining),
                    isPlaying
                })
            })
    }

    get fractionComplete() {
        const { progress, duration } = this.playState;
        return (progress / duration ) || 0
    }

    fractionToProgress(percent) {
        const { duration } = this.playState;
        if (!duration) {
            return 0;
        }
        return duration * percent;
    }
}