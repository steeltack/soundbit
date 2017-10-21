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
  Image,
  Button
} from 'react-native';

class CheckoutFooter extends Component {
  render() {
    const { total, onSubmit } = this.props;
    return (
      <View style={styles.total}>
        <View 
        >
          <Text 
            style={styles.checkout}
            onPress={onSubmit}
          >
            CHECKOUT
          </Text>
        </View>
        <View>
          <Text style={styles.checkoutTotal}>Total: ${total}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  total: {
    height: 50,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderTopColor: '#eeeeee',
    borderTopWidth: 1, 
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  checkout: {
    width: 150,
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
    // font-family: 'Lucida Sans','Lucida Grande',sans-serif,
  },
  checkoutText: {
    color: '#ffffff',
    letterSpacing: 2,
    fontSize: 12,
  },
  checkoutTotal: {
    fontSize: 17,
    color: '#555555',
    // font-family: 'Lucida Sans','Lucida Grande',sans-serif;
    marginLeft: 20,
  },
  totalAmount: {
    color: '#555555',
    // font-family: "LeagueGothic","Lucida Sans","Lucida Grande",sans-serif;
  }
});

export default CheckoutFooter;