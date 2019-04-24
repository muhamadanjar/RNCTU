import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  StatusBar
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import Promo from '../components/mobil/promo'
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import SearchBar from '../components/SearchBar';
import Categories from '../components/explore/Categories';
import Listings from '../components/explore/Listings';
import colors from '../utils/Colors';
import categoriesList from '../data/categories';
import listings from '../data/listings';
import CircleButton from '../components/buttons/CircleButton';

class ExploreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteListings: [],
    };
    this.handleAddToFav = this.handleAddToFav.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.onCreateListClose = this.onCreateListClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  handleAddToFav(listing) {
    const { navigate } = this.props.navigation;
    let { favouriteListings } = this.state;

    const index = favouriteListings.indexOf(listing.id);
    if (index > -1) {
      favouriteListings = favouriteListings.filter(item => item !== listing.id);
      this.setState({ favouriteListings });
    } else {
      navigate('CreateList', { listing, onCreateListClose: this.onCreateListClose });
    }
  }

  onCreateListClose(listingId, listCreated) {
    let { favouriteListings } = this.state;
    if (listCreated) {
      favouriteListings.push(listingId);
    } else {
      favouriteListings = favouriteListings.filter(item => item !== listingId);
    }
    this.setState({ favouriteListings });
  }

  renderListings() {
    return listings.map((listing, index) => (
      <View
        key={`listing-${index}`}
      >
        <Listings
          key={`listing-item-${index}`}
          title={listing.title}
          boldTitle={listing.boldTitle}
          listings={listing.listings}
          showAddToFav={listing.showAddToFav}
          handleAddToFav={this.handleAddToFav}
          favouriteListings={this.state.favouriteListings}
        />
      </View>
    ));
  }

  render() {
    const { data,navigation } = this.props;
    const { navigate } = navigation;
    console.log(data)
    return (
      <View style={styles.wrapper}>
        {/* <SearchBar /> */}
        
        <HeaderComponent></HeaderComponent>
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Promo/>
          <Text style={styles.heading}>
            Selamat Datang di Utama Trans
          </Text>
          <View style={styles.products}>
            <CircleButton text={'Rental'} handleOnPress={()=>navigate('CreateList')} imageSource={require('../assets/img/rental.png')}/>
            <CircleButton text={'Taxi'} handleOnPress={()=>navigate('Order')} imageSource={require('../assets/img/taxi.png')}/>
          </View>
          <View style={styles.categories}>
            {/* <Categories categories={categoriesList} handleOnPress={()=>navigate('Order')} /> */}
          </View>
          {/* {this.renderListings()} */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollview: {
    paddingTop: 0,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  categories: {
    marginBottom: 40,
  },
  products:{
    alignItems:'center',
    flexDirection:'row',
    marginLeft:20,
    marginRight:20
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginTop:10,
    paddingLeft: 20,
    paddingBottom: 10,
    color: colors.gray04,
  },
  androidHeader: {
    ...Platform.select({
        android: {
            paddingTop: StatusBar.currentHeight,
        }
    })
  }
});


// const ListingsQuery = gql`
//   query {
//     multipleListings{
//       title,
//       description
//     }
//   }
// `

// const ExploreContainerTab = graphql(ListingsQuery)(ExploreContainer);
const ExploreContainerTab = ExploreContainer;
export default ExploreContainerTab;
