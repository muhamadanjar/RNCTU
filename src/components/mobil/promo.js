import React,{Component} from 'react'
import { View,Image } from 'react-native'
import Swiper from 'react-native-swiper'
export default class Promo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Swiper
            autoplay={true}
            style={{ height: 200,backgroundColor:'#000' }}>
            <View style={{ flex: 1 }}>
                <Image
                    style={{ flex: 1, height: 200, width: null, resizeMode: 'contain' }}
                    source={require('../../assets/swiper/swiper_2.jpg')} />
            </View>
            <View style={{ flex: 1 }}>
                <Image
                    style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                    source={require('../../assets/swiper/swiper_3.jpg')} />
            </View>
            <View style={{ flex: 1 }}>
                <Image
                    style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                    source={require('../../assets/swiper/swiper_2.jpg')} />
            </View>
        </Swiper>
        )
    }
}