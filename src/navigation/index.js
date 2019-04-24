import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTab';
import AuthScreen from '../pages/Login'
import SwiperComponent from '../screens/Swiper'
import AmazonHome from '../screens/AmazonHome'
import SignUp from '../screens/SignUp'
import Order from '../screens/Order'
import Rental from '../screens/Rental'
import LoggedOut from '../screens/LoggedOut'
import LogIn from '../screens/LogIn'
import TurnOnNotifications from '../screens/TurnOnNotifications'
import ForgotPassword from '../screens/ForgotPassword'
import LoggedInTabNavigator from './LoggedInTabNavigator'

export default createAppContainer(createSwitchNavigator({
  // AmazonHome:AmazonHome,
  // Swiper:SwiperComponent,
  Main: LoggedOut,
  LoggedIn: {
    screen: LoggedInTabNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },  
  Auth: LogIn,
  Order:Order,
  SignUp: SignUp,
  TurnOnNotifications:TurnOnNotifications,
  ForgotPassword:ForgotPassword,
  Rental:Rental,
    
}));
