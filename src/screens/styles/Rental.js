import { StyleSheet,Dimensions } from 'react-native'
import {Colors} from '../../utils'

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
    popupButtons: {
        marginTop: 0,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: "#eee",
        justifyContent:'center'
    },
    popupButton: {
        flex: 1,
        marginVertical:5
    },
    btnClose:{
        height:20,
        backgroundColor:'#20b2aa',
        padding:20
    },
    floatingMenuButtonStyle: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 35
    },
    title: {
        fontSize: 6
    },
    footerContainer:{
        position: 'absolute',
        height:50, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor:Colors.blue2
    }
})

export default styles;