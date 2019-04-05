import { StyleSheet } from 'react-native';
import colors from '../../utils/Colors';

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
	    justifyContent:"center",
	    alignItems:"center"
    },
    map:{
		...StyleSheet.absoluteFillObject
	}
});

export default styles