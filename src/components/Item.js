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
  Animated
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swipeout from 'react-native-swipeout';

const EXPANDED = 20;
const COLLAPESED = 0;


class Item extends Component {

  componentWillMount() {
    this.state = {
      myText: 'I\'m ready to get swiped!',
    };
  }
 
  onSwipeLeft(gestureState) {
  }
 
  onSwipeRight(gestureState) {
  }

  render() {
    const { imgSrc, name, price, onPressDelete, disabled, isListed } = this.props;

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    var swipeoutBtns = [
      {
        text: 'Delete',
        onPress: onPressDelete,
        autoClose: true,
        backgroundColor: '#ff0000'
      }
    ]
    return (
       <Swipeout
          right={swipeoutBtns}
          style={isListed ? styles.containerListed : styles.container}
          disabled={!isListed}
          >
        <View style={styles.item}>
          <Image style={styles.img} source={{uri: imgSrc}}/>
            <View>
              <Text style={isListed ? styles.nameListed : styles.name}>{name}</Text>
              <Text style={isListed ? styles.priceListed : styles.price}>${price}</Text>
            </View>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  delete: {
    backgroundColor: '#FF0000'
  },
  container: {
    shadowColor: '#1B1F23',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    shadowOpacity: 0.10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  containerListed: {
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
  },
  item: {
    // border: 1px solid #eee,   
    borderColor: '#eeeeee',
    borderWidth: 1,   
    height: 100, 
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10

    // padding: 10,
  },
  price: {
    color: '#81C22D',
    marginTop: 6,
    marginLeft: 20,
    fontSize: 40,
    // font-family: "LeagueGothic","Lucida Sans","Lucida Grande",sans-serif,
  },
  priceListed: {
    color: '#81C22D',
    marginTop: 6,
    marginLeft: 20,
    fontSize: 20,
  },
  name: {
      marginTop: 3,
      marginLeft: 20,
      fontSize: 15,
      // font-family: 'Lucida Sans','Lucida Grande',sans-serif,
  },
  nameListed: {
    marginTop: 3,
      marginLeft: 20,
    fontSize: 20,
  },
  img: {
    width: 80,
    height: '100%'
    // border: 1px solid #eee;    
  }
});

// AppRegistry.registerComponent('Item', () => Item);
export default Item;