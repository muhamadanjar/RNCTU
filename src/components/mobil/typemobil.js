import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text,
} from 'react-native';
import iPhoneSize from '../../utils/dimensions';

const size = iPhoneSize();
let cardSize = 100;
let cardMargin = 8;

if (size === 'small') {
  cardSize = 90;
  cardMargin = 4;
} else if (size === 'large') {
  cardSize = 115;
}

export default class TypeMobil extends Component {
  get Categories() {
    const { typem, onHandlePress } = this.props;
    console.log(typem);
    
    if(typeof typem !== 'undefined' && typem.length>0){
    return typem.map((category, index) => (
      <TouchableHighlight
        style={styles.card}
        key={`category-item-${index}`}
        onPress={()=>this.props._selectedTypeCar(category.id)}
      > 
        <Text>{category.type}</Text>
      </TouchableHighlight>
    ));
    }else{
      return null;
    }
    
  }

  render() {
  	return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      horizontal
      showHorizontalScrollIndicator={false}
    >
      {this.Categories}
    </ScrollView>
  	);
  }
}

const styles = StyleSheet.create({
  wrapper: {
  	flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: cardSize,
    height: cardSize,
    marginRight: cardMargin,
    marginLeft: cardMargin,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
