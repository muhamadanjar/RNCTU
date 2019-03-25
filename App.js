import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Navigation from './src/navigation'
import {Provider} from 'react-redux'
// import FBSDK from 'react-native-fbsdk'
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
      accessToken:null
    }
  }
  componentDidMount() {
    // AccessToken.getCurrentAccessToken()
    // .then((data) => {
    //   this.setState({
    //     accessToken: data.accessToken
    //   })
    // })
    // .catch(error => {
    //   console.log(error)
    // })
  }
  render() {
    return this.InitApp()
  }
  InitApp(){
    const AppStore = store(window.___INTITIAL_STATE__);
    return (
      <Provider store={AppStore}>
        <Navigation/>
      </Provider>
    )
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
