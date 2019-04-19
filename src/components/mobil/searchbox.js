import React from "react";
import {Text,KeyboardAvoidingView} from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./searchbox.styles.js";

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
					<KeyboardAvoidingView>
					<InputGroup>
						<Input
							onFocus={()=>toggleSearchResultModal("pickUp")}
							style={styles.inputSearch}
							placeholder="Choose pick-up location"
							onChangeText={handleInput.bind(this, "pickUp")}
							value={selectedPickUp && selectedPickUp.name}
						/>
					</InputGroup>
					</KeyboardAvoidingView>
				</View>
				<View style={styles.secondInputWrapper}>
					<Text style={styles.label}>DROP-OFF</Text>
					<KeyboardAvoidingView>
					<InputGroup>

						<Input
							onFocus={()=>toggleSearchResultModal("dropOff")}
							style={styles.inputSearch}
							placeholder="Choose drop-off location"
							onChangeText={handleInput.bind(this, "dropOff")}
							value={selectedDropOff && selectedDropOff.name}
						/>
					</InputGroup>
					</KeyboardAvoidingView>
				</View>
			</View>

		);
};

export default FormSearchBox;
