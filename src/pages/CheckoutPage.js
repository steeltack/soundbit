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
  Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Item from '../components/Item';
import Items from '../models/Items';
import Total from '../models/Total';

const items = new Items();
const total = new Total();

const VISA_LOGO = 'https://s-media-cache-ak0.pinimg.com/originals/3d/d3/de/3dd3de3c0ea439adcd71d4531e0e181c.jpg'

class CheckoutPage extends Component {
    static navigationOptions = {
        title: 'Checkout',
    };

  constructor() {
    super()

    this.state = {
      canScan: true,
      items: [],
      total: 0,
      isCheckingOut: false
    }
  }

  payNow() {
    if (total.isEmpty()) {
      AlertIOS.alert(
        'No items in your cart',
        null,
         [
          {text: 'Cancel', onPress: () => this.cancelled()},
          {text: 'Go to scanner', onPress: () => this.goToScanner()},
        ],
      )
      return;
    }

    if (total.isComplete()) {
      this.props.navigation.navigate('ItemsList');
      return;
    }
    AlertIOS.alert(
      'Your card ending in 5555 will be charged',
      '$' + total.grandTotal(),
        [
          {text: 'Cancel', onPress: () => this.cancelled()},
          {text: 'Continue', onPress: () => this.checkout()},
        ],
    )
  }
  goToScanner() {
    this.props.navigation.navigate('Main');
  }

  cancelled(value) {
    console.log('cancelled')
  }

  checkout(value) {
    this.setState({isCheckingOut: true})
    let timeout = setTimeout(() => {
      total.pay()
      this.setState({isCheckingOut: false})
      this.props.navigation.navigate('ItemsList');
    }, 1000)
  }
  render() {

    if (this.state.isCheckingOut) {
      return (
        <View style={styles.container}>
          <Spinner visible={true} textContent={"Checking out..."} textStyle={{color: '#FFF'}} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.cc}>
          <Image style={styles.img} source={{uri: VISA_LOGO}}/>
          <Text>PERSONAL .... 5555</Text>
        </View>
        <View style={[styles.cc, styles.ccAdd]}>
          <Text style={styles.plus}>+</Text>
          <Text>Add Card</Text>
        </View>
        <View>
          <View
            style={styles.paymentContainer}
          >
            <ScrollView style={styles.items}>
            {
              items.map((item, i) => <Text key={item.name + i}>{item.name}   -  ${item.price}</Text>)
            }
          </ScrollView>
            <Text style={styles.text}>Sub total: ${total.amount()}</Text>
            <Text style={styles.text}>Tax: ${total.tax()}</Text>
            <Text style={styles.text}>Total: ${total.grandTotal()}</Text>
          </View>
        </View>
        <Text
            style={styles.payNow}
            onPress={() => this.payNow()}
          >
           {total.isComplete() ? 'PAIED: SEE LIST': 'PAY NOW'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
  },
  text: {
    fontSize: 18,
    marginBottom: 10
  },
  cc: {
    height: 35,
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 7,
    flexDirection: 'row',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: '#ffffff'
  },
  ccAdd: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
     borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
  },
  plus: {
    paddingBottom: 5,
    paddingTop: 0,
    paddingLeft: 7,
    paddingRight: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 2,
    marginRight: 5,
  },
  img: {
    width: 40,
    height: 17,
    marginRight: 5,
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 2,
    borderRadius: 2
  },
  paymentContainer: {
    marginTop: 20,
    paddingLeft: 5,
    height: 300,
  },
  payNow: {
    width: '100%',
    alignSelf: 'flex-end',
    height: '100%',
    backgroundColor: '#81C22D',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    letterSpacing: 2,
    fontSize: 12,
    textAlign: 'center',
    //TODO alignment on text here will not work properly on ios and android
    textAlignVertical: 'center',
    paddingTop: 18,
    height: 50,
    marginTop: 21
  },
  items: {
    marginBottom: 40
  }
});

// AppRegistry.registerComponent('ReactProject', () => ReactProject);

export default CheckoutPage;