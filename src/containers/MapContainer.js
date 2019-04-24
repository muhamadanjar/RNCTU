import React,{Component} from 'react'
import { View,StyleSheet } from 'react-native'
import FormSearchBox from '../components/mobil/searchbox'
import FormSearchResults from '../components/mobil/searchresult'
import MapView from 'react-native-maps'
export class MapContainer extends Component{
    state ={
        region : {
            latitude:5.5195655,
            longitude:95.3815473,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
        }
    }
    constructor(props){
        super(props)
    }
    render(){
        const {selectedAddress,getInputData,toggleSearchResultModal,getAddressPredictions,resultTypes,predictions,getSelectedAddress } = this.props;
        const { selectedPickUp, selectedDropOff } = selectedAddress || {};
        return(
        <View style={styles.container}>
          <MapView
              provider={MapView.PROVIDER_GOOGLE}
              style={styles.map}
              region={this.state.region}
              initialRegion={this.state.region}
          >
            { selectedPickUp &&
              <MapView.Marker
                coordinate={{latitude:selectedPickUp.location.latitude, longitude:selectedPickUp.location.longitude}}
                pinCol  or="green"
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
        </View>)
    }
}

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
export default MapContainer