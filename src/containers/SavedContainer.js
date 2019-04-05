import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import NoResults from '../components/saved/NoResults';
import colors from '../utils/Colors';

export default class SavedContainer extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <NoResults />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: colors.white,
  },
});
