import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';
import colors from '../utils/Colors';
import transparentHeaderStyle from '../utils/navigation.styles';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import styles from './styles/LoggedOut';
import {webClientId} from '../utils/config'
const airbnbLogo = require('../assets/img/taxi.png');

export default class LoggedOut extends Component {
  state ={
    userInfo:null,
    error:null
  }
  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton handleButtonPress={() => navigation.navigate('Auth')} location="right" color={colors.white} text="Log In" />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

  componentDidMount() {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:webClientId,
    });
    // this._getCurrentUser()
  }
  componentDidUpdate(){
    console.log(this.state);
    
  }

  onFacebookPress() {
    console.log('Facebook button pressed');
  }

  onCreateAccountPress() {
    console.log('Create Account button pressed');
    this.props.navigation.navigate('SignUp')
  }

  onMoreOptionsPress() {
    console.log('More options button pressed');
    this.props.navigation.navigate('Auth')
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User --->',userInfo);
      this.setState({ userInfo, error: null });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };
  _getCurrentUser = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo);
      
      this.setState({ userInfo });
    } catch (error) {
      console.error(error);
    }
  };
  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ userInfo: null, error: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image
            source={airbnbLogo}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>
Welcome to Utama Trans.
          </Text>
          <RoundedButton
            text="Continue with Google"
            textColor={colors.green01}
            background={colors.white}
            icon={<Icon name="google" size={20} style={styles.facebookButtonIcon} />}
            handleOnPress={()=>this._signIn()}
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            handleOnPress={()=>this.onCreateAccountPress()}
          />

          <TouchableHighlight
            style={styles.moreOptionsButton}
            onPress={()=>this.onMoreOptionsPress()}
          >
            <Text style={styles.moreOptionsButtonText}>
              More options
            </Text>
          </TouchableHighlight>
          <View style={styles.termsAndConditions}>
            <Text style={styles.termsText}>
              By tapping Continue, Create Account or More
            </Text>
            <Text style={styles.termsText}>
              {' pilihan,'}
            </Text>
            <Text style={styles.termsText}>
              {"saya setuju dengan Utama Trans"}
            </Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>
                Terms of Service
              </Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>
              ,
            </Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>
                Payments Terms of Service
              </Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>
              ,
            </Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>
                Privacy Policy
              </Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>
              , and
            </Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>
                Nondiscrimination Policy
              </Text>
            </TouchableHighlight>
            <Text style={styles.termsText}>
              .
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
