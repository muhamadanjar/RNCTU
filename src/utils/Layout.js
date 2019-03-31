import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import iPhoneSize from './dimensions'
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  iPhoneSize,
};
