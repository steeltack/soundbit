import React, { Component } from 'react';
import { View } from 'react-native';
import ScannerPage from './pages/ScannerPage';
import CheckoutPage from './pages/CheckoutPage';
import ItemsList from './pages/ItemsList';
import { BottomNavigation } from 'react-native-material-ui';

import {
    StackNavigator,
} from 'react-navigation';

import {
  TabNavigator,
} from 'react-navigation';

export default App = TabNavigator({
    Main: {screen: ScannerPage},
    Checkout: {screen: CheckoutPage},
    ItemsList: {screen: ItemsList}
},
{
   tabBarOptions: {
       showIcon: true,
        activeTintColor: '#e91e63',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            paddingBottom: 15,
        },
  }
});

/*export default class App extends Component {
    componentWillMount() {
        this.state = {
            active: 'today',
        }
    }

    getView() {
        return {
            Main: <ScannerPage />,
            Checkout: <CheckoutPage />,
            ItemsList: <ItemsList />
        }
    }


    render() {
        const CurrentView = this.getView()[this.state.active];
        return(
            <View>
                <View>
                    { CurrentView }
                </View>
                <BottomNavigation
                    active={this.state.active}
                    hidden={false}
                    style={{backgroundColor: '#333'}}
                >
                    <BottomNavigation.Action
                        key="today"
                        icon="today"
                        label="Today"
                        onPress={() => this.setState({ active: 'Main' })}
                    />
                    <BottomNavigation.Action
                        key="people"
                        icon="people"
                        label="People"
                        onPress={() => this.setState({ active: 'Checkout' })}
                    />
                    <BottomNavigation.Action
                        key="bookmark-border"
                        icon="bookmark-border"
                        label="Bookmark"
                        onPress={() => this.setState({ active: 'ItemsList' })}
                    />
                    {/*<BottomNavigation.Action
                        key="settings"
                        icon="settings"
                        label="Settings"
                        onPress={() => this.setState({ active: 'settings' })}
                    />*///}
               /* </BottomNavigation>
            </View>
        )
    }
}*/