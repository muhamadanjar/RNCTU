import React, { Component } from 'react'
import {
	getCurrentLocation,
	getInputData,
	toggleSearchResultModal,
	getAddressPredictions,
	getSelectedAddress,
	bookCar,
	getNearByDrivers,
	getListMobil,
	getPesananNotComplete
} from "../store/actions";
class Mobil extends Component{
    render(){
        <View style={{flex:1}}>
					{this.props.region.latitude &&
						<MobilFormContainer region={this.props.region} 
							getInputData={this.props.getInputData}
							toggleSearchResultModal={this.props.toggleSearchResultModal}
							getAddressPredictions={this.props.getAddressPredictions}
							resultTypes={this.props.resultTypes}
							predictions={this.props.predictions}
							getSelectedAddress={this.props.getSelectedAddress}
							selectedAddress={this.props.selectedAddress}
							navigation={this.props.navigation}
							carMarker={carMarker}
							getCurrentLocation={this.props.getCurrentLocation}
							nearByDrivers={this.props.nearByDrivers}
							getPesananNotComplete={this.props.getPesananNotComplete}
						/>
					}
        </View>
    }
}

Mobil.navigationOptions = {
	title: 'Cari Mobil',
	headerMode: 'none',
	header:null
};

const mapStateToProps = (state) => ({
	region: state.mobil.region,
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

const mapActionCreators = {
	getCurrentLocation,
	getInputData,
	toggleSearchResultModal,
	getAddressPredictions,
	getSelectedAddress,
	bookCar,
	getNearByDrivers,
	getListMobil,
	getPesananNotComplete
};
export default connect(mapStateToProps, mapActionCreators)(Mobil);