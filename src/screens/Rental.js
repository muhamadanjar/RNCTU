import React, { Component } from 'react'
import { View,Text,TouchableHighlight,ScrollView    ,TouchableOpacity,StyleSheet,Image,FlatList,Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import HeaderComponent from '../components/HeaderComponent'
import Colors from '..//utils/Colors'
import TypeMobil from '../components/mobil/typemobil'
import categoriesList from '../data/categories';
import * as mainActions from '../modules/app/store/action'
import * as mobilActions from '../modules/mobil/store/actions'
import Modal from 'react-native-modal'
import { connect,bindActionCreators } from 'react-redux';
import transparentHeaderStyle from '../utils/navigation.styles'
import { ListItem } from 'react-native-elements';
const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    imageContainer:{
        marginTop:50,
        alignContent:'center',
        alignItems:'center'  
    },
    image:{
        resizeMode:'contain',
        width:200,
        height:200
    },
    formContainer:{
        position:'absolute',
        bottom:0,
        backgroundColor:Colors.white,
        width:width
    },
    form:{
        backgroundColor:Colors.white,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:2,
        paddingRight:5,
        alignContent:'center',
        
    },
    textInput: {
        display: 'flex',
        marginTop: 11,
        marginLeft: 44,
        color: Colors.gray02,
    },
    header:{
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    inputWrapper:{
        display: 'flex',
        borderWidth: 1,
        borderColor: Colors.gray03,
        backgroundColor: Colors.white,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        borderRadius: 3,
        height: 40,
        marginTop: 28,
        marginLeft: 21,
        marginRight: 21,
    },
    typemobil:{
        marginBottom: 40,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollableModal: {
        height: 300,
    },
    scrollableModalContent1: {
        height: 200,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText1: {
        fontSize: 20,
        color: 'white',
    },
    scrollableModalContent2: {
        height: 200,
        backgroundColor: '#A9DCD3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText2: {
        fontSize: 20,
        color: 'white',
    },
})
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
    }
    componentDidMount(){
        this.props.getTypeCar();
        this.props.getRentPackage(1);
    }
    render(){
        return(
            <View style={styles.wrapper}>
                <HeaderComponent 
                navigation={this.props.navigation}
                icon={'arrow-left'}
                IconOnpress={()=>this.props.navigation.goBack()} 
                text={'Rencar'}/>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/img/rental.png')}/>
                    <View style={{paddingLeft:5,marginTop:20,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:25,fontWeight:'800'}}>Pesan per Jam</Text>
                        <Text style={{fontSize:20}}>dapatkan mobil dan supir untuk durasi yang anda inginkan</Text>
                    </View>
                </View>
                
                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{this.state.durationPesan}</Text>
                    </View>
                    <View style={styles.typemobil}>
                        <TypeMobil typem={this.props.typecar} {...this.props} />
                    </View>
                    {this.renderButton('Pilih',()=>this.setState({visibleModal:'scrollable'}))}
                    {this.renderButton('Pesan',()=>this.handlePesan())}
                    <Modal
                        isVisible={this.state.visibleModal === 'scrollable'}
                        onSwipeComplete={() => this.setState({ visibleModal: null })}
                        swipeDirection="down"
                        scrollTo={this.handleScrollTo}
                        scrollOffset={this.state.scrollOffset}
                        scrollOffsetMax={400 - 300} // content height - ScrollView height
                        style={styles.bottomModal}
                        >
                        <View style={styles.scrollableModal}>
                            <ScrollView
                            ref={ref => (this.scrollViewRef = ref)}
                            onScroll={this.handleOnScroll}
                            scrollEventThrottle={16}
                            >
                                {this.renderModalContent(this.props.rp)}
                            </ScrollView>
                        </View>
                        </Modal>
                </View>
            </View>
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

    handlePesan(){
        console.log('Handle Post Rencar');
        this.props.postRentCar();
    }
    
    handleScrollTo = p => {
        if (this.scrollViewRef) {
          this.scrollViewRef.scrollTo(p);
        }
    };
}
Rental.propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
};
const mapStateToProps = (state) => ({
    user: state.user || {},
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
