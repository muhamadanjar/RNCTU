import React,{Component} from 'react'
import { View,StyleSheet,Dimensions,Text } from 'react-native'
import FormSearchBox from '../components/mobil/searchbox'
import FormSearchResults from '../components/mobil/searchresult'
import MapView from 'react-native-maps'
import { Button } from 'react-native-elements';
import Colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'
import Categories from '../components/explore/Categories';
import categoriesList from '../data/categories';
const {width,height} = Dimensions.get('window')

export class MapContainer extends Component{
    state ={
        region : {
            latitude:3.6422756,
            longitude:98.5294038,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
        }
    }
    constructor(props){
        super(props)
    }
    handleOrder(){
      let payload = {harga:this.props.fare}
      this.props.bookCar(payload);
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
              ref={ref => { this.map = ref; }}
          >
            { selectedPickUp &&
              <MapView.Marker
                coordinate={{latitude:selectedPickUp.location.latitude, longitude:selectedPickUp.location.longitude}}
                pinCol  or="green"
              >
                <View style={styles.marker}>
                  <Text style={styles.text}>{selectedPickUp.name}</Text>
                  <Icon name="chevron-right" size={10}/>
                </View>
              </MapView.Marker>
            }
            { selectedDropOff &&
              <MapView.Marker
                coordinate={{latitude:selectedDropOff.location.latitude, longitude:selectedDropOff.location.longitude}}
                pinColor="blue"
              >
                <View style={styles.marker}>
                  <Text style={styles.text}>{selectedPickUp.name}</Text>
                  <Icon name="chevron-right" size={10}/>
                </View>
              </MapView.Marker>

            }
          </MapView>
          {this.props.fare &&
          <View style={styles.infoBox}>
            <View style={styles.infoWrapper}>
              <Categories categories={categoriesList} handleOnPress={()=>navigate('Order')} />
              <View style={{padding:5,alignItems:'center'}}>
                <Text style={{fontSize:25}}>{this.props.fare}</Text>
              </View>
              <View style={{alignItems:'center'}}>
                <Button raised icon={{name: 'cached'}} title='Pesan' onPress={()=>this.handleOrder()} />
              </View>
            </View>
          </View>
          }
          
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
  },
  infoBox:{
    width:width,
    position:'absolute',
    bottom:40,
    flex:1,
    
  },
  infoWrapper:{
    marginLeft:15,
    marginRight:10,
    marginTop:10,
    marginBottom:0,
    backgroundColor:"#fff",
    opacity:0.9,
    height:75,
    borderRadius:7,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },

  marker: {
    backgroundColor: Colors.green01,
    padding: 5,
    borderRadius: 5,
  },
  marketText: {
    color: Colors.primary,
    fontWeight: "bold"
  }

  
}
export default MapContainer