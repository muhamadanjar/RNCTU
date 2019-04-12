import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTab';
import AuthScreen from '../pages/Login'
import HomeScreen from '../pages/Mobil'
import Order from '../screens/Order'
import LoggedOut from '../screens/LoggedOut'
import LogIn from '../screens/LogIn'
import TurnOnNotifications from '../screens/TurnOnNotifications'
import ForgotPassword from '../screens/ForgotPassword'
import LoggedInTabNavigator from './LoggedInTabNavigator'

export default createAppContainer(createSwitchNavigator({
    
    Main: LoggedOut,
    Auth: LogIn,
    TurnOnNotifications:TurnOnNotifications,
    ForgotPassword:ForgotPassword,
    Order:Order,
    LoggedIn: {
      screen: LoggedInTabNavigator,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
}));
