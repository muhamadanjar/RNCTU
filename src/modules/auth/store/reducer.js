import HTTP from '../../../utils/Http';
import axios from 'axios'
import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGIN_SAMPLE,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  SET_LOGGED_IN_STATE,
} from './action-types';
import {BASE_URL,API_VERSION,LOGIN_URL} from '../../../utils/config'
import AsyncStorage from '@react-native-community/async-storage';
import usersample from '../../../data/user.json';
const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch(type) {
      case AUTH_REFRESH_TOKEN:
      case AUTH_LOGIN_SAMPLE:
        return loginSample(payload.email,payload.password)
      case AUTH_LOGIN:
        return login(state, payload);
      case AUTH_CHECK:
        return checkAuth(state);
      case AUTH_LOGOUT:
        return logout(state);
      case AUTH_RESET_PASSWORD:
        return resetPassword(state);
      default:
        return state;
    }
};

function login(state, payload) {
    const url = `${BASE_URL}/${API_VERSION}/${LOGIN_URL}`
    console.log(url,payload);
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'}
    
    HTTP.post(url,payload,header).then((res)=>{
      let data = res.data;
      if (data.success) {
        AsyncStorage.setItem('access_token', data.data.token);
        HTTP.defaults.headers.common['Authorization'] = `Bearer ${payload}`;  
        state = Object.assign({}, state, {
          isAuthenticated: !!AsyncStorage.getItem('access_token'),
          token:data
        })
        return true;
      }
      
    }).catch((error)=>console.log(error));
    
    return {
        ...state, isAuthenticated: true,
    }
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

function checkAuth(state) {
    try {
      const value = AsyncStorage.getItem('access_token')
      if(value !== null) {
        value.finally((data)=>{
          state = Object.assign({}, state, {
            isAuthenticated: !!AsyncStorage.getItem('access_token'),
            token:data
          })
          if (state.isAuthenticated) {
            HTTP.defaults.headers.common['Authorization'] = `Bearer ${data}`;
          }
        })
        
        
    
        return state;
      }
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
  