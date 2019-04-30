import React, { Component } from 'react'
import { View,Text,TouchableHighlight,TouchableOpacity,StyleSheet,Image,FlatList,Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import HeaderComponent from '../components/HeaderComponent'
import Colors from '..//utils/Colors'
import TypeMobil from '../components/mobil/typemobil'
import categoriesList from '../data/categories';
import * as mainActions from '../modules/app/store/action'
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
    }
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
                <View style={styles.typemobil}>
                    <TypeMobil typem={categoriesList} handleOnPress={()=>console.log('type mobil di klik')} />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{this.state.durationPesan}</Text>
                    </View>
                    {this.renderButton('Pilih',()=>this.setState({visibleModal:1}))}
                    {this.renderButton('Pesan',()=>this.handlePesan())}
                    <Modal isVisible={this.state.visibleModal === 1}>
                        {this.renderModalContent(this.props.typecar)}
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
        <View style={styles.modalContent}>
            {/* <FlatList
                style={{ backgroundColor: this.state.searchBarFocused ? Colors.blue3 : 'white' }}
                data={listItems}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}/> */}
            
          {this.renderButton("Tutup", () => this.setState({ visibleModal: null }))}
        </View>
    )};
    renderItem = (item)=>{
        return(
            <ListItem
            roundAvatar
            title={`${item.type}`}
            avatar={{ uri: item.image }}
            />
        )
    }
    handleOnScroll = event => {
        this.setState({
          scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };

    handlePesan(){
        console.log('handle Pesan');
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
    typecar:state.main.typecar || {}
});
// const mapDispatchToProps = dispatch => bindActionCreators(mainActions, dispatch);
const mapDispatchToProps ={
    ...mainActions
}





export default connect(mapStateToProps,mapDispatchToProps)(Rental)
