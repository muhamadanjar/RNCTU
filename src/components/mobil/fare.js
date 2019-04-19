import React from "react";
import {Text,View} from "react-native";
import styles from "./fare.styles.js";

export const Fare = ({fare})=>{
	return (
		<View style={styles.fareContainer}>
			<Text style={styles.fareText}> FARE: IDR</Text> <Text style={styles.amount}>{fare}</Text>
		</View>

	);
}

export default  Fare;