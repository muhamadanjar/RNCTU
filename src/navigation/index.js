import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTab';
import AuthScreen from '../pages/Login'
import HomeScreen from '../pages/Mobil'
export default createAppContainer(createSwitchNavigator({
    Main: HomeScreen,
    Auth: AuthScreen,
}));