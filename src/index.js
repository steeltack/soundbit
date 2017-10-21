import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { register } from './store/storeInstance';
import configureStore from './store/configureStore';
import Routes from './routes';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

let store = configureStore({
    pods: {
        1: {
            id: 1,
            podName: 'first',
            userIds: [1, 2, 3],
            meditationTimes: {
                1: {
                    time: 'Every dat at 2',
                    duration: 100000, 
                    reoccurring: true
                }
            }
        },
    users: {
            1: {
                name: 'john',
                pods: [1],
                nextMeditations: [
                    3,
                    6
                ],
                previousMeditations: [
                    1,
                    5,
                ]
            }
        }
    },
    meditations: {
        1: {
            duration: 5,
            pod: [1],
            scheduledTime: '2pm'
        }
    }
});
register(store);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
            <Routes />
        </ThemeProvider>
      </Provider>
    )
  }
}
