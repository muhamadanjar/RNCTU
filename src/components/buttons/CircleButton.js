import React, { Component } from 'react'
import { View,Text,TouchableHighlight,StyleSheet } from 'react-native'
import colors from '../../utils/Colors';
export class CircleButton extends Component{
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
            <Text style={{ fontSize:22 }}>Only image clickable</Text>
            <TouchableHighlight style={ styles.imageContainer }>
                    <Image style={ styles.image } source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
            </TouchableHighlight> 
            <Text style={{ fontSize:22 }}>Entire Row Clickable</Text>
            <TouchableHighlight style={ styles.imageContainer2 }>
                    <Image style={ styles.image } source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
            </TouchableHighlight> 
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
      marginTop:60
    },
    imageContainer: {
      height:128,
      width: 128,
      borderRadius: 64
    },
    image: {
      height:128,
      width: 128,
      borderRadius: 64
    },
    imageContainer2: {
  
    }
});
