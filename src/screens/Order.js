import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View,Text } from 'react-native'
import colors from '../utils/Colors'
import MapView from "react-native-maps";
import transparentHeaderStyle from '../utils/navigation.styles'
import { NavigationActions } from 'react-navigation';
import styles from './styles/Order'
const navigateToTabsAction = NavigationActions.navigate({
  routeName: 'LoggedIn',
});


export default class Order extends Component{
    static navigationOptions = () => ({
      headerLeft: null,
      headerStyle: transparentHeaderStyle,
      headerTransparent: true,
      gesturesEnabled: false,
    });
    constructor(props){
      super(props)
    }
    render(){
      const { navigation } = this.props;
      const region = {
        latitude:5.5195655,
        longitude:95.3815473,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
      }
      return (
        <View style={styles.wrapper}>
          <MapView
              provider={MapView.PROVIDER_GOOGLE}
              style={styles.map}
              region={region}
              initialRegion={region}
          >
          </MapView>
        </View>
      )
    }
}

Order.propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };
