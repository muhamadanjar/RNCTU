import React from 'react'
import { View,Text,Dimensions,StyleSheet,TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../utils/Colors';
const {width} = Dimensions.get('window')
const HeaderComponent =({text,navigation,icon,IconOnpress}) =>{
    return (<View style={styles.wrapper}>
        <View style={styles.navBar}>
            <TouchableHighlight onPress={IconOnpress}>
                <Icon name={icon} size={25}/>
            </TouchableHighlight>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.navRight}></View>
        </View>       
    </View>)
}
HeaderComponent.defaultProps = {
    icon:'navicon'
}

const styles = StyleSheet.create({
    wrapper:{
        flex:0.1,
    },
    navBar:{
        backgroundColor: Colors.blue,
        height:55,
        elevation:3,
        paddingHorizontal:15,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between'
    },
    navRight:{

    },
    text:{
        fontSize:23,fontWeight:'600',color:'#FFF'
    }
});

export default HeaderComponent