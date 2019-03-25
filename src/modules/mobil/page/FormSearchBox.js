import React from "react";
import {Text} from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./SearchBoxStyles.js";

export const FormSearchBox = ({getInputData, toggleSearchResultModal, getAddressPredictions, selectedAddress})=> {
	const { selectedPickUp, selectedDropOff } = selectedAddress || {};
	function handleInput(key, val){
		getInputData({
			key,
			value:val
		});
		getAddressPredictions();
	}

		return(
			<View style={styles.searchBox}>
				<View style={styles.inputWrapper}>
					<Text style={styles.label}>PICK UP</Text>
					<InputGroup>
						<Input 
							onFocus={()=>toggleSearchResultModal("pickUp")}
							style={styles.inputSearch}
							placeholder="Choose pick-up location"
							onChangeText={handleInput.bind(this, "pickUp")}
							value={selectedPickUp && selectedPickUp.name}
						/>
					</InputGroup>
				</View>
				<View style={styles.secondInputWrapper}>
					<Text style={styles.label}>DROP-OFF</Text>
					<InputGroup>
						
						<Input
							onFocus={()=>toggleSearchResultModal("dropOff")}
							style={styles.inputSearch}
							placeholder="Choose drop-off location"
							onChangeText={handleInput.bind(this, "dropOff")}
							value={selectedDropOff && selectedDropOff.name}
						/>
					</InputGroup>
				</View>
			</View>

		);
};

export default FormSearchBox;