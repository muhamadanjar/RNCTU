import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import sizes from '../utils/size'
import colors from '../utils/Colors'

export default class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style,
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}
        >
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

Button.defaultProps = {
  startColor: colors.primary,
  endColor: colors.secondary,
  start: { x: 0.0, y: 0.0 },
  end: { x: 1.0, y: 0.0 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: colors.white,
}


const styles = StyleSheet.create({
  button: {
    borderRadius: sizes.radius,
    height: sizes.base * 3,
    justifyContent: 'center',
    marginVertical: sizes.padding / 3,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: { backgroundColor: colors.accent, },
  primary: { backgroundColor: colors.primary, },
  secondary: { backgroundColor: colors.secondary, },
  tertiary: { backgroundColor: colors.tertiary, },
  black: { backgroundColor: colors.black, },
  white: { backgroundColor: colors.white, },
  gray: { backgroundColor: colors.gray01, },
  gray2: { backgroundColor: colors.gray02, },
  gray3: { backgroundColor: colors.gray03, },
  gray4: { backgroundColor: colors.gray04, },
});