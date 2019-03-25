import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
const styles = {
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	map:{
		...StyleSheet.absoluteFillObject
	}
}
export const MapComponent = ({ 
    navigation,
    region,
    getInputData,
    toggleSearchResultModal,
    getAddressPredictions,
    resultTypes,
    predictions,
    getSelectedAddress,
    selectedAddress,
    carMarker,
	nearByDrivers,
	getPesananNotComplete
})=>{

    const { selectedPickUp, selectedDropOff } = selectedAddress || {};
	const region2 = {
		latitude:5.5195655,
		longitude:95.3815473,
		latitudeDelta:0.0922,
		longitudeDelta:0.0421
	}
	
    return(
		<View style={styles.container}>
            <MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={region2}
				initialRegion={region2}
			>
				{ selectedPickUp &&
					<MapView.Marker
						coordinate={{latitude:selectedPickUp.latitude, longitude:selectedPickUp.longitude}}
						pinColor="green"
					/>	
				}
				{ selectedDropOff &&
					<MapView.Marker
						coordinate={{latitude:selectedDropOff.latitude, longitude:selectedDropOff.longitude}}
						pinColor="blue"
					/>	
				}
			</MapView>
		</View>
	)

}

export default MapComponent;