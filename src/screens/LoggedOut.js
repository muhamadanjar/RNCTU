import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../utils/Colors';
import transparentHeaderStyle from '../utils/navigation.styles';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import styles from './styles/LoggedOut';

const airbnbLogo = require('../assets/img/taxi.png');

export default class LoggedOut extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton handleButtonPress={() => navigation.navigate('Auth')} location="right" color={colors.white} text="Log In" />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

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
            text="Continue with Facebook"
            textColor={colors.green01}
            background={colors.white}
            icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
            handleOnPress={()=>this.onFacebookPress()}
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
