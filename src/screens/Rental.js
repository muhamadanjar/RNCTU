import React, { Component } from 'react'
import { View,Text,TouchableHighlight,StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
export default class Rental  extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.wrapper}>
                <Text>Ini Adalah Rental</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1
    }
})
