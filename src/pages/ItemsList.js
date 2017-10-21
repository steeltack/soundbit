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
import Item from '../components/Item';
import Items from '../models/Items';
import Total from '../models/Total';

const items = new Items();
const total = new Total();

class CheckoutPage extends Component {
    static navigationOptions = {
        title: 'Bought items',
    };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, styles.heading]}>Please show to a representative</Text>
        <Text style={[styles.header, {color: '#81C22D'}]}>Paid! ${total.grandTotal()}</Text>
         <ScrollView style={styles.items}>
         {  items.map((item, i) =>
              <Item
                isListed={true}
                key={item.name + i}
                {...item}

              />)
         }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  heading: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  header: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 18
  }
});

export default CheckoutPage;