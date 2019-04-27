import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View,Text,ToastAndroid,TouchableOpacity } from 'react-native'

import colors from '../utils/Colors'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../modules/mobil/store/actions';
import HeaderComponent from '../components/HeaderComponent'
import transparentHeaderStyle from '../utils/navigation.styles'
import { NavigationActions } from 'react-navigation';
import styles from './styles/Order'
import MapContainer from '../containers/MapContainer'
import RNGooglePlaces from 'react-native-google-places'
import { Header,Title } from "native-base";
const navigateToTabsAction = NavigationActions.navigate({
  routeName: 'LoggedIn',
});
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const carMarker = require('../assets/img/carMarker.png')
class Order extends Component{
    static navigationOptions = () => ({
      // headerLeft: null,
      headerStyle: transparentHeaderStyle,
      headerTransparent: true,
      gesturesEnabled: false,
    });
    constructor(props){
      super(props)
    }
    componentDidMount() {
  		var rx = this;
      this.props.getCurrentLocation();
      RNGooglePlaces.getCurrentPlace(['placeID', 'location', 'name', 'address'])
      .then((results) => console.log(results))
      .catch((error) => console.log(error.message));

    }
    componentWillReceiveProps(){
      const { selectedPickUp, selectedDropOff } = this.props.selectedAddress || {};
      if(selectedPickUp !== undefined && selectedDropOff !== undefined){
        console.log(this.mc);
        
        // this.map.fitToCoordinates([selectedPickUp.location, selectedDropOff.location], {
        //   edgePadding: DEFAULT_PADDING,
        //   animated: true,
        // });
      }
    }
    render(){
      const { navigation,selectedAddress,getInputData,toggleSearchResultModal,getAddressPredictions,resultTypes,predictions,getSelectedAddress } = this.props;
      const { selectedPickUp, selectedDropOff } = selectedAddress || {};
      const region = {
        latitude:5.5195655,
        longitude:95.3815473,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
      }
      return (
        <View style={{flex:1}}>
          <HeaderComponent text={'Pemesanan'}/>
          <MapContainer region={this.props.region} 
							getInputData={getInputData}
							toggleSearchResultModal={this.props.toggleSearchResultModal}
							getAddressPredictions={this.props.getAddressPredictions}
							resultTypes={this.props.resultTypes}
							predictions={this.props.predictions}
							getSelectedAddress={this.props.getSelectedAddress}
							selectedAddress={selectedAddress}
							carMarker={carMarker}
              nearByDrivers={this.props.nearByDrivers}
              fare={this.props.fare}
              ref={ref => { this.mc = ref; }}
              bookCar={this.props.bookCar}
          />          
        </View>
      )
    }
}

Order.propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
    region: PropTypes.object
};
const mapStateToProps = (state) => ({
	region: state.region || {},
	inputData:state.mobil.inputData || {},
	resultTypes:state.mobil.resultTypes || {},
	predictions:state.mobil.predictions ||  [],
	selectedAddress:state.mobil.selectedAddress || {},
	fare:state.mobil.fare,
	booking:state.mobil.booking || {},
	nearByDrivers:state.mobil.nearByDrivers || [],
	mobilavailable:state.mobil.mobilavailable || {},
	user:state.auth.user || {},
});
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Order);
