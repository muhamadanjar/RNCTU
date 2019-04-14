import React, { Component } from 'react'
import { View,Text,TouchableHighlight,StyleSheet,Image } from 'react-native'
import colors from '../../utils/Colors';
import PropTypes from 'prop-types'
export default class CircleButton extends Component{
    render(){
        const {
            loading,
            disabled,
            text,
            textColor,
            background,
            icon,
            handleOnPress,
            textSize,
            textWeight,
            iconPosition,
            textAlign,
            borderColor,
            imageSource
          } = this.props;
        const backgroundColor = background || 'transparent';
        const color = textColor || colors.black;
        const fontSize = textSize || 16;
        const fontWeight = textWeight || '600';
        const alignPosition = textAlign || 'center';
        const iconLocation = iconPosition || 'left';
        const border = borderColor || colors.white;
        const opacityStyle = disabled || loading ? 0.5 : 1;
        const textOpacity = loading ? 0 : 1;
        const rippleColor = backgroundColor === 'transparent' ? color : 'rgba(0,0,0,0.4)';
        return (<View style={styles.container}>
            <TouchableHighlight style={ styles.imageContainer } onPress={handleOnPress}>
                <Image style={ styles.image } source={imageSource} />
            </TouchableHighlight> 
            <Text style={styles.text}>{text}</Text>
        </View>)
    }
}

CircleButton.propTypes = {
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string,
    textSize: PropTypes.string,
    textWeight: PropTypes.string,
    textAlign: PropTypes.string,
    background: PropTypes.string,
    borderColor: PropTypes.string,
    icon: PropTypes.object,
    iconPosition: PropTypes.string,
    handleOnPress: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:5,
      alignItems:'center',
      marginBottom:10
    },
    imageContainer: {
      height:128,
      width: 128,
      borderRadius: 64,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor:'#FFF'
    },
    image: {
      height:80,
      width: 80,
      borderRadius: 14,
    },
    text:{
      fontWeight:'bold',
      fontSize:12
    },
    imageContainer2: {
  
    }
});
