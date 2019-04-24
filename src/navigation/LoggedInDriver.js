import React, { Component } from 'react'
import {
    createBottomTabNavigator,
    createStackNavigator,
  } from 'react-navigation';

import ExploreContainer from '../containers/ExploreContainer'
import CreateList from '../screens/CreateList';
const HomeTab = createStackNavigator({
    ExploreContainer: {
      screen: ExploreContainer,
      navigationOptions: {
        header: null,
      },
    },
    CreateList: { screen: CreateList },
},{
    mode: 'modal',
});
HomeTab.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
};
const LoggedInDriver = createBottomTabNavigator({
    Home:{
        screen: HomeTab,
        navigationOptions: {
            tabBarLabel: 'HOME',
            tabBarIcon: CustomTabBarIcon(Platform.OS ==='ios' ? 'ios-home':'md-home', 22),
        },
    }
})
export default LoggedInDriver;