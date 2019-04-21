import React from 'react'
import { View,Text,Dimensions,StyleSheet } from 'react-native'
import colors from '../utils/Colors'
const {width} = Dimensions.get('window')
const HeaderComponent =({text}) =>{
    return (<View style={styles.wrapper}>
        <Text style={styles.text}>Utama Trans</Text>
    </View>)
}

const styles = StyleSheet.create({
    wrapper:{
        width:width,justifyContent:'center',alignItems:'center',height:50,backgroundColor: colors.blue,borderBottomColor: '#757575',height:50
    },
    text:{
        fontSize:23,fontWeight:'600',color:'#FFF'
    }
});

export default HeaderComponent