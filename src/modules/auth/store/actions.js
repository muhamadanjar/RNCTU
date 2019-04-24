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
    AUTH_LOGIN_GOOGLE
  } from './action-types';
import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';
import {BASE_URL,API_VERSION,LOGIN_URL,REGISTER} from '../../../utils/config'
import HTTP from '../../../utils/Http'
import AsyncStorage from '@react-native-community/async-storage';
  export function authCheck() {
    return {
      type: AUTH_CHECK,
    }
  }

  export function authLogin(payload) {
    return async (dispatch)=>{
      try {
        const url = `${BASE_URL}/${API_VERSION}/${LOGIN_URL}`
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
            return true;
          }
        }).catch((error)=>console.log(error));    
      } catch (error) {
        console.log(error)
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
      const url = `${BASE_URL}/${API_VERSION}/${REGISTER}`
      console.log(url,payload);
      HTTP.post(url,payload).then((res)=>{
        const response = res.data;
        if(response){
          dispatch({
            type: AUTH_REGISTER,
            payload:response
          })
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
