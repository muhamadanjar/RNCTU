import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NetInfo} from 'react-native';
import Navigation from './src/navigation'
import OfflineComponent from './src/components/OfflineComponent'
import {Provider} from 'react-redux'
import store from './src/store'
import {
  authCheck
} from './src/modules/auth/store/actions'
store().dispatch(authCheck())
// const { AccessToken } = FBSDK
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      accessToken:null,
      offlineMode:true
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return this.InitApp()
  }
  InitApp(){
    const AppStore = store(window.___INTITIAL_STATE__);
    return (
      <Provider store={AppStore}>
        <OfflineComponent/>
        <Navigation/>
      </Provider>
    )
  }
  checkApp(){
    const {offlineMode} = this.state;
    if(offlineMode){
      return <OfflineComponent/>
    }else{
      return <Navigation/>
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
