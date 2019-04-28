import React from 'react';
import { createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTab';

import SignUp from '../screens/SignUp'
import Order from '../screens/Order'
import Rental from '../screens/Rental'
import LoggedOut from '../screens/LoggedOut'
import LogIn from '../screens/LogIn'
import TurnOnNotifications from '../screens/TurnOnNotifications'
import ForgotPassword from '../screens/ForgotPassword'
import LoggedInTabNavigator from './LoggedInTabNavigator'
const LoggedInCustomer = createStackNavigator({
  LoggedInMain: LoggedInTabNavigator,
  Order:Order,
  Rental:Rental,
},{
  initialRouteName:'LoggedInMain',
  headerMode:'none'
})
const LoggedInDriver = createStackNavigator({
  LoggedInMain: LoggedInTabNavigator,
  Order:Order,
  Rental:Rental,
},{
  initialRouteName:'LoggedInMain',
  headerMode:'none'
})
export default createAppContainer(createSwitchNavigator({
  Main: LoggedOut,
  LoggedIn: LoggedInCustomer,
  Auth: LogIn,
  SignUp: SignUp,
  TurnOnNotifications:TurnOnNotifications,
  ForgotPassword:ForgotPassword,
  
}));
