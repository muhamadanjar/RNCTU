import React, { Component } from 'react'
import { View,Text,TouchableHighlight,StyleSheet,Image,Picker } from 'react-native'
import PropTypes from 'prop-types'
import HeaderComponent from '../components/HeaderComponent'
import Colors from '..//utils/Colors'
export default class Rental  extends Component{
    state = {
        user:null
    }
    constructor(props){
        super(props)
        
    }
    render(){
        return(
            <View style={styles.wrapper}>
                <HeaderComponent text={'Rental Mobil'}></HeaderComponent>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/img/rental.png')}/>
                    <View style={{paddingLeft:5,marginTop:20,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:25,fontWeight:'800'}}>Pesan per Jam</Text>
                        <Text style={{fontSize:20}}>dapatkan mobil dan supir untuk durasi yang anda inginkan</Text>
                    </View>
                    
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.form}>
                        <Text>Tes</Text>
                        <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}  itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}>
                            <Picker.Item label = "Steve" value = "steve" />
                            <Picker.Item label = "Ellen" value = "ellen" />
                            <Picker.Item label = "Maria" value = "maria" />
                        </Picker>
                    </View>
                </View>
            </View>
        )
    }
    updateUser = (user) => {
        this.setState({user:user})
    }
}

Rental.PropTypes = {
    navigation: PropTypes.shape({
        dispatch: PropTypes.func,
    }).isRequired,
    region: PropTypes.object
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    imageContainer:{
        marginTop:50,
        alignContent:'center',
        alignItems:'center'  
    },
    image:{
        resizeMode:'contain',
        width:200,
        height:200
    },
    formContainer:{
        position:'absolute',
        bottom:0
    },
    form:{
        backgroundColor:Colors.white,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:2,
        paddingRight:5,
        alignContent:'center'
    },
    header:{
        alignItems:'center',
        justifyContent:'center'
    }
})
