import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View,Text,ToastAndroid } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import FormSearchBox from '../components/mobil/searchbox'
import FormSearchResults from '../components/mobil/searchresult'
import colors from '../utils/Colors'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../modules/mobil/store/actions';
import MapView from "react-native-maps";
import transparentHeaderStyle from '../utils/navigation.styles'
import { NavigationActions } from 'react-navigation';
import styles from './styles/Order'
const navigateToTabsAction = NavigationActions.navigate({
  routeName: 'LoggedIn',
});


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
  	}
    render(){
      console.log(this.props);
      const { navigation,selectedAddress,getInputData,toggleSearchResultModal,getAddressPredictions,resultTypes,predictions,getSelectedAddress } = this.props;
      const { selectedPickUp, selectedDropOff } = selectedAddress || {};
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
            { selectedPickUp &&
              <MapView.Marker
                coordinate={{latitude:selectedPickUp.location.latitude, longitude:selectedPickUp.location.longitude}}
                pinColor="green"
              />
            }
            { selectedDropOff &&
              <MapView.Marker
                coordinate={{latitude:selectedDropOff.location.latitude, longitude:selectedDropOff.location.longitude}}
                pinColor="blue"
              />
            }
          </MapView>
          <FormSearchBox
    				getInputData={getInputData}
    				toggleSearchResultModal={toggleSearchResultModal}
    				getAddressPredictions={getAddressPredictions}
    				selectedAddress={selectedAddress}
    			/>
          { (resultTypes.pickUp || resultTypes.dropOff) &&
            <FormSearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
          }
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
	region: state.mobil.region || {},
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
