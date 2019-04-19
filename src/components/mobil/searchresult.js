import React from "react";
import {Text,FlatList} from "react-native";
import { View, List, ListItem, Left, Body } from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./searchresult.styles.js";

export const FormSearchResults = ({predictions, getSelectedAddress,searchBarFocused})=> {
	function handleSelectedAddress(placeID){
		getSelectedAddress(placeID)
	}
	state = {
		searchBarFocused: false
	}
		if (predictions !== null || predictions !== undefined) {
			console.log(predictions);
		return(
			<View style={styles.searchResultsWrapper} >
				<FlatList
					data={Object.keys(predictions)}
					renderItem={({ item }) => 
						<View>
							<ListItem onPress={()=>handleSelectedAddress(predictions[item].placeID)} button avatar>
								<Left style={styles.leftContainer}>
									<Icon style={styles.leftIcon} name="location-on" />
								</Left>
								<Body>
									<Text style={styles.primaryText}>{predictions[item].primaryText}</Text>
									<Text style={styles.secondaryText}>{predictions[item].secondaryText}</Text>
								</Body>
							</ListItem>
						</View>
					}
					ListEmptyComponent={() => <Text style={{ padding: 20, fontSize: 20 }}>Data Tidak Ada</Text>}
					
				/>
			</View>

		);}else{
			return null
		}
};

export default FormSearchResults;
