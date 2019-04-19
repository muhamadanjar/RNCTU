import { StyleSheet,Dimensions } from 'react-native';
import colors from '../../utils/Colors';
const {height,width} = Dimensions.get('window')
const styles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      flex: 1,
	    justifyContent:"center",
	    alignItems:"center"
    },
    map:{
      ...StyleSheet.absoluteFillObject,
      // position:'absolute',
      // width:width,
      // height:height,
      // zIndex:1
      
	  }
});

export default styles