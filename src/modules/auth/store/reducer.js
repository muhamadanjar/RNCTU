import HTTP from '../../../utils/Http';
import axios from 'axios'
import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGIN_SAMPLE,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_LOGIN_GOOGLE,
  AUTH_ALERT,
  AUTH_RESET_PASSWORD,
  AUTH_REGISTER,
  SET_LOGGED_IN_STATE,
} from './action-types';
import {BASE_URL,API_VERSION,LOGIN_URL,REGISTER} from '../../../utils/config'
import AsyncStorage from '@react-native-community/async-storage';
import usersample from '../../../data/user.json';
import { registerAnimation } from 'react-native-animatable';
const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch(type) {
      case AUTH_REFRESH_TOKEN:
      case AUTH_LOGIN_SAMPLE:
        return loginSample(payload.email,payload.password)
      case AUTH_LOGIN_GOOGLE:
        return {...state,isAuthenticated:true,user:payload.user}
      case AUTH_LOGIN:
        return login(state, payload);
      case AUTH_CHECK:
        return checkAuth(state);
      case AUTH_LOGOUT:
        return logout(state);
      case AUTH_RESET_PASSWORD:
        return resetPassword(state);
      case AUTH_ALERT:
        return {alertError:payload}
      case AUTH_REGISTER:
        return register(payload);
      default:
        return state;
    }
};

function login(state, payload) {
    return {
        ...state, payload,
    }
}
function register(payload){
 return{...state}

}
function loginSample(email,password) {
  const action = (dispatch) => {
    if (email === usersample.email && password === usersample.password) {
      dispatch(setLoggedInState(true));
      return true;
    }
    dispatch(setLoggedInState(false));
    return false;
  };
  return action;
}

async function checkAuth(state) {
    try {
      const value = await AsyncStorage.getItem('access_token')
      console.log(value);
      state = Object.assign({}, state, {
        isAuthenticated: true,
        token:value
      })
      if (state.isAuthenticated) {
        HTTP.defaults.headers.common['Authorization'] = `Bearer ${value}`;
      }
      console.log(state);
      
      return state;
    } catch(e) {
      // error reading value
    }
  
    
}

function logout(state) {
  AsyncStorage.removeItem('access_token')
    return {
        ...state, isAuthenticated: false
    }
}

function resetPassword(state) {
    return {
        ...state, resetPassword: true,
    }
}

  
export const getAuth = state => state.auth.isAuthenticated;  
export default reducer;
  