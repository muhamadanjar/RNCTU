import React from 'react'
import { View,Text } from 'react-native'
import colors from '../utils/Colors'
const HeaderComponent =({text}) =>{
    return (<View style={{justifyContent:'center',alignItems:'center',height:50,backgroundColor: colors.blue,borderBottomColor: '#757575'}}>
        <Text style={{fontSize:23,fontWeight:'600',color:'#FFF'}}>Utama Trans</Text>
    </View>)
}

export default HeaderComponent