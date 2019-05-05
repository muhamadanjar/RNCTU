import React,{Component} from 'react'
import { View,Image,StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
export default class Promo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {listPromo} = this.props
        return(
            <Swiper
            autoplay={true}
            style={styles.swiper}>
            {listPromo.length>0 && listPromo.map((item)=>this.renderList(item))}
            {/* <View style={styles.container}>
                <Image
                    style={{ flex: 1, height: 200, width: null, resizeMode: 'contain' }}
                    source={require('../../assets/swiper/swiper_1.jpg')} />
            </View>
            <View style={styles.container}>
                <Image
                    style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                    source={require('../../assets/swiper/swiper_3.jpg')} />
            </View>
            <View style={styles.container}>
                <Image
                    style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }}
                    source={require('../../assets/swiper/swiper_2.jpg')} />
            </View>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/swiper/swiper_4.jpg')} />
            </View> */}
        </Swiper>
        )
    }
    renderList(promo){
        return(
            <View style={styles.container} key={promo.id}>
                <Image
                    style={styles.image}
                    source={{uri:promo.image_path}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swiper:{ height: 200,backgroundColor:'#000' },
    container:{flex:1},
    image:{
        flex: 1, height: null, width: null, resizeMode: 'contain'
    }
})