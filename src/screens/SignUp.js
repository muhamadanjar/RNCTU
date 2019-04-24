import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../modules/auth/store/actions';
import Http from '../utils/Http'
import {BASE_URL,REGISTER, API_VERSION} from '../utils/config'
import { Button, Block, Input, Text } from '../components';
import sizes from '../utils/size'
import colors from '../utils/Colors'
import HeaderComponent from '../components/HeaderComponent'
import { View } from 'native-base';
import RoundedButton from '../components/buttons/RoundedButton';
export class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    no_telepon:null,
    errors: [],
    loading: false,
  }

  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password,no_telepon } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!email) errors.push('email');
    if (!username) errors.push('username');
    if (!password) errors.push('password');

    this.setState({ errors, loading: false });

    if (!errors.length) {
      const payload = {email:email,password:password,username:username,no_telp:no_telepon};
      this.props.authRegister(payload)
      Alert.alert(
        'Success!',
        'Your account has been created',
        [
          {
            text: 'Continue', onPress: () => {
              navigation.navigate('Browse')
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <View style={{flex:1}}>
        <View>
          <HeaderComponent/>
        </View>
        <ScrollView>
          <Block padding={[5, sizes.base * 2]}>
            <Text h1 bold>Sign Up</Text>
            <Block middle>
            <KeyboardAvoidingView>
              <Input
                email
                label="Email"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
            </KeyboardAvoidingView>
              <Input
                label="Username"
                error={hasErrors('username')}
                style={[styles.input, hasErrors('username')]}
                defaultValue={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />
            <KeyboardAvoidingView>
              <Input
                label="No Telepon"
                error={hasErrors('no_telepon')}
                style={[styles.input, hasErrors('no_telepon')]}
                defaultValue={this.state.no_telepon}
                number
                onChangeText={text => this.setState({ no_telepon: text })}
              />
            </KeyboardAvoidingView>
            <KeyboardAvoidingView>
              <Input
                secure
                label="Password"
                error={hasErrors('password')}
                style={[styles.input, hasErrors('password')]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
            </KeyboardAvoidingView>
              <Button gradient onPress={() => this.handleSignUp()}>
                {loading ?
                  <ActivityIndicator size="small" color="white" /> :
                  <Text bold white center>Sign Up</Text>
                }
              </Button>

              <Button onPress={() => navigation.navigate('Auth')}>
                <Text  caption center style={{ textDecorationLine: 'underline' }}>
                  Back to Login
                </Text>
              </Button>
            </Block>
          </Block>
        
        </ScrollView>
      </View>
    )
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(null,mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: colors.gray02,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: colors.accent,
  }
})
