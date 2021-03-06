import React, { Component } from 'react'
import { View,Text,TouchableHighlight,ScrollView,TouchableOpacity,StyleSheet,Image,FlatList,Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import HeaderComponent from '../components/HeaderComponent'

import {Colors,carTypes} from '../utils'
import TypeMobil from '../components/mobil/typemobil'
import categoriesList from '../data/categories';
import * as mainActions from '../modules/app/store/action'
import * as mobilActions from '../modules/mobil/store/actions'
import Modal from 'react-native-modal'
import { connect,bindActionCreators } from 'react-redux';
import transparentHeaderStyle from '../utils/navigation.styles'
import { ListItem,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Footer,FooterTab,Button,Container} from 'native-base'
import LoadingIndicator from '../components/LoadingIndicator'
const {width,height} = Dimensions.get('window');
import styles from './styles/Rental'
class Rental  extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:null,
            durasi:null,
            visibleModal:null,
            durationPesan:null,
            durationList:null
        }
        console.log(carTypes);
        
    }
    componentDidMount(){
        this.props.getCurrentLocation();
        this.props.getTypeCar();
    }
    setModalVisible(visible) {
        console.log(this.state);
        this.setState({visibleModal: visible});
    }
    render(){
        if(this.props.region == null){
            return this.renderLoading()
        }
        return this.renderRental()
        

    }
    renderRental(){
        return(
            <Container>
                <Header
                leftComponent={<TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Icon name={'chevron-left'} size={20}/></TouchableOpacity>}
                centerComponent={<Text style={{fontSize:20}}>RentCar</Text>}
                rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/img/rental.png')}/>
                    <View style={{paddingLeft:5,marginTop:20,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:25,fontWeight:'800'}}>Pesan per Jam</Text>
                        <Text style={{fontSize:20}}>dapatkan mobil dan supir untuk durasi yang anda inginkan</Text>
                    </View>
                </View>
                
                <View style={styles.formContainer}>
                    
                    <View style={styles.typemobil}>
                        <TypeMobil typem={this.props.typecar} {...this.props} />
                    </View>
                    {/* <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{this.state.durationPesan}</Text>
                    </View> */}

                    <Modal
                        isVisible={this.state.visibleModal === true}
                        onRequestClose={() => { this.setState({ visibleModal:null }) } }
                        onSwipeComplete={() => this.setState({ visibleModal: null })}
                        swipeDirection="down"
                        scrollTo={this.handleScrollTo}
                        scrollOffset={this.state.scrollOffset}
                        scrollOffsetMax={400 - 300} // content height - ScrollView height
                        style={styles.bottomModal}
                        >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({visibleModal: false})
                            } }>
                            <Icon name={'chevron-left'} size={25} style={[styles.modalBackIcon]} />
                        </TouchableOpacity>
                        <View style={styles.scrollableModal}>
                            <ScrollView
                            ref={ref => (this.scrollViewRef = ref)}
                            onScroll={this.handleOnScroll}
                            scrollEventThrottle={16}
                            >
                                {this.renderModalContent(this.props.rp)}
                            </ScrollView>

                        </View>
                            <View style={styles.popupButtons}>
                                <TouchableOpacity onPress={() => {this.setModalVisible(false) }} style={styles.btnClose}>
                                <Text style={styles.txtClose}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                </View>
                {this.renderFooter()}
                
            </Container>
        )
    }
    updateUser = (user) => {
        this.setState({user:user})
    }
    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
    );
    renderModalContent = (listItems) => {
        console.log(listItems);
        return(
            <FlatList
                style={{ backgroundColor: this.state.searchBarFocused ? Colors.blue3 : 'white' }}
                data={listItems}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}/>
        
    )};
    renderItem = (item)=>{
        return(
            <ListItem
            roundAvatar
            title={`${item.rp_name}`}
            onPress={()=>{
                this.props.selectedRp(item.rp_id);this.setState({visibleModal:null})
            }}
            />
          
        )
    }
    handleOnScroll = event => {
        this.setState({
          scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };

    renderTab(tabInfo) {
        const subTitle = tabInfo.pricing ? `$${tabInfo.pricing}` : tabInfo.title
        return (
          <Button vertical key={tabInfo.type} onPress={() => this.onTaxiTypeSelected(tabInfo)}>
            <Icon size={25} name={tabInfo.icon} style={this.formatTabElement(tabInfo)} />
            <Text style={this.formatTabElement(tabInfo, styles.type)}>{tabInfo.type}</Text>
            <Text style={this.formatTabElement(tabInfo, styles.title)}>{subTitle}</Text>
          </Button>
        )
    }
    formatTabElement(tabInfo, style = {}) {
        // Clone the styles so that customization will not impacted to template
        const elementStyle = { ...style }
        const tabIsActive = this.props.selectedTaxiType === tabInfo
        elementStyle.color = tabIsActive ? "#FF5E3A" : "grey"
    
        return elementStyle
    }
    onTaxiTypeSelected = taxiType => {
        if (taxiType.type !== this.props.selectedTaxiType.type) {
          this.props.setSelectedTaxiType(taxiType)
        }
    }

    handlePesan(){
        console.log('Handle Post Rencar');
        this.props.postRentCar();
    }
    
    handleScrollTo = p => {
        if (this.scrollViewRef) {
          this.scrollViewRef.scrollTo(p);
        }
    };
    renderFooter(){
        return(
            <View style={styles.footerContainer}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Button onPress={()=>this.setModalVisible(true)} style={{backgroundColor: Colors.blue2,
                        height:50,
                        width:width - (width*0.5),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <MaterialIcon name={'package'} size={25}/>
                        <Text style={{marginLeft:10,fontSize:24,color: 'white'}}>Pilih</Text>
                    </Button>
                    <Button onPress={()=>this.handlePesan()} style={{backgroundColor: Colors.blue2,
                        height:50,
                        width:width - (width*0.5),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <Icon name={'car'} size={25}/>
                        <Text style={{marginLeft:10,fontSize:24,color: 'white'}}>Pesan</Text>
                    </Button>
                    
                </View>
                
            </View>
        )
    }

    renderLoading(){
        return <LoadingIndicator/>
    }
}
Rental.propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
};
const mapStateToProps = (state) => ({
    user: state.user || {},
    region:state.mobil.region,
    typecar:state.main.typecar || {},
    rp:state.main.rp || {},
    selectedTypeCar:state.main.selectedTypeCar,
    selectedRP:state.main.selectedRP
});
// const mapDispatchToProps = dispatch => bindActionCreators(mainActions, dispatch);
const mapDispatchToProps ={
    ...mainActions,
    ...mobilActions
}


export default connect(mapStateToProps,mapDispatchToProps)(Rental)
