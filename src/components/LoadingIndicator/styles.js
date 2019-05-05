import { StyleSheet } from "react-native"
import { Dimensions } from "react-native"
import {Colors} from '../../utils'
const { height, width } = Dimensions.get("window")
const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.blue
  },
  text: {
    color: "white"
  }
}

export default styles