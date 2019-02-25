import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTab';
import AuthScreen from '../pages/Login'
export default createAppContainer(createSwitchNavigator({
    Auth: AuthScreen,
    Main: MainTabNavigator,
}));