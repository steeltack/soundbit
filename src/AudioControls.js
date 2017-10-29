import Sound from 'react-native-sound';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

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

    resume() {
        this.current.resume();
    }
}

class StreamingSound {
    constructor() {
        this.current = ReactNativeAudioStreaming;
    }

   play(url) {
        current.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
    }

    pause() {
        this.current.pause();
    }

    stop() {
        this.current.stop();
    }

    resume() {
        this.current.resume();
    }
}

export default class AudioControls {
    constructor() {
        this.isStreaming = false;
        this.streamingAudio = new StreamingSound()
        this.localAudio = new LocalSound()
    }

    player() {
        return this.isStreaming ? this.streamingAudio : this.localAudio;
    }

    play() {
        this.player().play();
    }

    pause() {
        this.player().pause();
    }

    stop() {
        this.player().stop();
    }
}