import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTab';
import AuthScreen from '../pages/Login'
import HomeScreen from '../pages/Mobil'
import LoggedOut from '../screens/LoggedOut'
import LogIn from '../screens/LogIn'
export default createAppContainer(createSwitchNavigator({
    Main: LoggedOut,
    Auth: LogIn,
    Order:HomeScreen
}));
