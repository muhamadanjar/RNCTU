import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
    AUTH_USER,
    SET_LOGGED_IN_STATE,
    AUTH_LOGIN_SAMPLE,
    AUTH_REGISTER,
    AUTH_LOGIN_GOOGLE,
    SYNC_DATA
  } from './action-types';
import { GoogleSignin,statusCodes } from 'react-native-google-signin';
import {USER_GET,LOGIN_POST, REGISTER_POST,SYNC_DATA_POST} from '../../../utils/config'
import HTTP from '../../../utils/Http'
import AsyncStorage from '@react-native-community/async-storage';
  export function authCheck(payload) {
    return dispatch =>{
      let header = {
        'Authorization': `Bearer ${payload}`,
        'Accept': 'application/json'}
      HTTP.get(USER_GET,header).then((res)=>{
        let response = res.data;
        if(status){
          dispatch( {
            type: AUTH_CHECK,
          });
        }
      });
    }
    
  }

  export function authLogin(payload) {
    return async (dispatch)=>{
      try {
        const url = `${LOGIN_POST}`
        let header = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'}
        
        HTTP.post(url,payload,header).then((res)=>{
          let data = res.data;
          if (data.success) {
            AsyncStorage.setItem('access_token', data.data.token);
            payload.token = data.data.token;
            payload.isAuthenticated = true;
            HTTP.defaults.headers.common['Authorization'] = `Bearer ${payload}`;  
            dispatch({type:AUTH_LOGIN,payload});
            
          }
          return false;
        }).catch((error)=>{
          dispatch({type:'ERROR_MESSAGE'})
          throw error;
        });    
      } catch (error) {
        dispatch({type:'ERROR_MESSAGE'})
        console.log(error)
        throw error;
      }
    }
    ;
  }

  export const logIn = (email, password) => {
    const action = (dispatch) => {
      if (email === usersample.email && password === usersample.password) {
        dispatch(setLoggedInState(true));
        return true;
      }
      dispatch(setLoggedInState(false));
      return false;
    };
    return action;
  };

  export const setLoggedInState = loggedInState => (
    {
      type: SET_LOGGED_IN_STATE,
      loggedInState,
    }
  );

  export function authLogout() {
    return {
      type: AUTH_LOGOUT,
    }
  }

  export function authRefreshToken(payload) {
    return {
      type: AUTH_REFRESH_TOKEN,
      payload
    }
  }

  export function authResetPassword() {
    return {
      type: AUTH_RESET_PASSWORD,
    }
  }

  export function authUser(payload) {
    return {
      type: AUTH_USER,
      payload
    }
  }

  export function authRegister(payload){
    return (dispatch)=>{
      const url = `${REGISTER_POST}`
      console.log(url,payload);
      HTTP.post(url,payload).then((res)=>{
        const response = res.data;
        if(response){
          if (response.status) {
            dispatch({
              type: AUTH_REGISTER,
              payload:response
            })  
          }
          
        }
        })
      .catch((err)=>{console.error(err);return false;})
    
    }
    
  }

  export function _signInWithGoogle(){
    return async (dispatch) =>{
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        dispatch({type:SYNC_DATA,payload:userInfo});  
        dispatch({type:AUTH_LOGIN_GOOGLE,payload:userInfo});  
      } catch (error) {
        console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          message = 'Sign in Cancelled'
        }else{
          message = 'Error'
        }
        dispatch({type:'ERROR_MESSAGE',payload:error.code})
      }
      
    }
    
  };
  export function _getCurrentUserGoogle(){
    return async (dispatch) =>{
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        const userInfo = await GoogleSignin.signInSilently();
        console.log(userInfo);
      } catch (error) {
        console.error(error);
      }
    }
    
  };
  _signOutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
  
      this.setState({ userInfo: null, error: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };
  
  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };

  export function sync_data_user(data){
    return async (dispatch)=>{
      try {
        let a = await HTTP.get(SYNC_DATA_POST,data); 
        dispatch({type:SYNC_DATA,payload:a});
      } catch (error) {
        throw error;
      }
      
    }
  }
