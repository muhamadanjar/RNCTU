import React, { Component } from 'react'
import { View,StyleSheet,Dimensions,Text,Image } from 'react-native'
import Swiper from 'react-native-swiper'
import {ListItem,Card} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import LinearGradient from 'react-native-linear-gradient'
var { height,width } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]
export default class Home extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} showsButtons={true} height={230}>
                  <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                  </View>
                  <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                  </View>
                  <View style={styles.slide3}>
                    <Image resizeMode='stretch' style={styles.image} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
                    <Text style={styles.text}>And simple</Text>
                  </View>
                </Swiper>
                {
                  list.map((l, i) => (
                    <ListItem
                      key={i}
                      leftAvatar={{ source: { uri: l.avatar_url } }}
                      title={l.name}
                      subtitle={l.subtitle}
                      Component={TouchableScale}
                      activeScale={0.95}
                      friction={90}
                      tension={100}
                      ViewComponent={LinearGradient}
                      linearGradientProps={{
                        colors: ['#FF9800', '#F44336'],
                      }}
                    />
                  ))
                }
                <Card title="CARD WITH DIVIDER">
                  <View>
                    <Text>Mobil</Text>
                  </View>
                  <View>
                    <Text>Sewa</Text>
                  </View>
                </Card>
                {/* <View style={[styles.box, styles.box1]}></View>
                <View style={[styles.box, styles.box2]}></View>
                <View style={[styles.box, styles.box3]}></View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    box: {
      height: box_height
    },
    box1: {
      backgroundColor: '#2196F3'
    },
    box2: {
      backgroundColor: '#8BC34A'
    },
    box3: {
      backgroundColor: '#e3aa1a'
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    image: {
      width,
      flex: 1
    }
  });
