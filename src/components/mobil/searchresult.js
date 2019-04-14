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
			
		
		return(
			<View style={styles.searchResultsWrapper} >
				<List
					dataArray={predictions}
					renderRow={(item)=>
						<View>
							<ListItem onPress={()=>handleSelectedAddress(item.placeID)} button avatar>
								<Left style={styles.leftContainer}>
									<Icon style={styles.leftIcon} name="location-on" />
								</Left>
								<Body>
									<Text style={styles.primaryText}>{item.primaryText}</Text>
									<Text style={styles.secondaryText}>{item.secondaryText}</Text>
								</Body>
							</ListItem>
						</View>
					}
				/>
				<FlatList
					style={{ backgroundColor: this.state.searchBarFocused ? 'rgba(0,0,0,0.3)' : 'white' }}
					data={predictions}
					renderItem={({ item }) => 
						<View>
							<Text style={{ padding: 20, fontSize: 20 }}>{item.primaryText}</Text>
						</View>
					}
					
				/>
			</View>

		);}else{
			return null
		}
};

export default FormSearchResults;
