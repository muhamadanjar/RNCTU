import React, { PureComponent } from 'react'
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import { colors } from 'react-native-elements';
const { width } = Dimensions.get('window');
function MiniOfflineSign() {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
}
class OfflineComponent extends PureComponent {
    state = {
      isConnected: true
    };
  
    componentDidMount() {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }
  
    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
  
    handleConnectivityChange = isConnected => {
      if (isConnected) {
        this.setState({ isConnected });
      } else {
        this.setState({ isConnected });
      }
    };
  
    render() {
      if (!this.state.isConnected) {
        return <MiniOfflineSign />;
      }
      return null;
    }
  }
  
  const styles = StyleSheet.create({
    offlineContainer: {
      backgroundColor: '#b52424',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width,
      position: 'absolute',
      top: 30
    },
    offlineText: { color: '#fff' }
  });
  
  export default OfflineComponent;