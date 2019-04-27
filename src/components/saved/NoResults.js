import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import colors from '../../utils/Colors';

export default class NoResults extends Component {
  render() {
  	return (
    <View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>
Daftar Booking
        </Text>
        <Text style={styles.description}>
        Anda belum membuat pesanan. Mulailah sekarang

        </Text>
        <Text style={styles.description}>

        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableHighlight style={styles.findHomesButton}>
          <Text style={styles.findHomesButtonText}>
Buat Pesanan
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  	);
  }
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 40,
    color: colors.gray04,
    marginTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray04,
    paddingLeft: 20,
    paddingRight: 20,
  },
  footer: {
  	position: 'absolute',
  	width: '100%',
  	height: 80,
  	bottom: 0,
  	borderTopWidth: 1,
  	borderTopColor: colors.gray05,
  	paddingLeft: 20,
  	paddingRight: 20,
  },
  findHomesButton: {
  	paddingTop: 15,
  	paddingBottom: 15,
  	marginTop: 16,
  	borderRadius: 3,
  	backgroundColor: colors.green03,
  },
  findHomesButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
});
