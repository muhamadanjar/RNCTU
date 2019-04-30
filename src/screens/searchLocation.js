import React,{Component} from 'react'
import { View,FlatList,ActivityIndicator } from 'react-native'
import {ListItem} from 'react-native-elements'
import _ from 'lodash'
import users from '../data/users'
const contains = ({ name, email }, query) => {
    const { first, last } = name;
    if (first.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }
  
    return false;
};
  
export const getUsers = (limit = 20, query = "") => {
    return new Promise((resolve, reject) => {
      if (query.length === 0) {
        resolve(_.take(users, limit));
      } else {
        const formattedQuery = query.toLowerCase();
        const results = _.filter(users, user => {
          return contains(user, formattedQuery);
        });
        resolve(_.take(results, limit));
      }
    });
};
class SearchLocation extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            data: [],
            error: null
        }
    }
    componentDidMount() {
        this.makeRemoteRequest();
    }
    
    makeRemoteRequest(){
        this.setState({ loading: true });
        getUsers()
        .then(users => {
          this.setState({
            loading: false,
            data: users
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
    };
    
    renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderFooter = () => {
    if (!this.state.loading) return null;

    return (
        <View
        style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
        }}
        >
        <ActivityIndicator animating size="large" />
        </View>
    );
    };
    render(){
        return(
        <View>
            <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <ListItem
                    roundAvatar
                    title={`${item.name.first} ${item.name.last}`}
                    subtitle={item.email}
                    avatar={{ uri: item.picture.thumbnail }}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
              />
            </View>
        </View>
        )
    }
}

export default SearchLocation;