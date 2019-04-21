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
        return _signInWithGoogle()
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
function register(payload){
  const url = `${BASE_URL}/${API_VERSION}/${REGISTER}`
  HTTP.post(url,payload).then((res)=>{
    const response = res.data;
    if(response){
      return true;
    }
  }).catch((err)=>{console.error(err);return false;})

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


_signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('User --->',userInfo);
    this.setState({ userInfo, error: null });
    state = Object.assign({}, state, {
      isAuthenticated:true,
      userInfo
    });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // sign in was cancelled
      // Alert.alert('cancelled');
      dispatch({type:AUTH_ALERT,payload:'camceled'})
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation in progress already
      // Alert.alert('in progress');
      dispatch({type:AUTH_ALERT,payload:'in progress'})
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Alert.alert('play services not available or outdated');
      dispatch({type:AUTH_ALERT,payload:'play services not available or outdated'})
    } else {
      // Alert.alert('Something went wrong', error.toString());
      dispatch({type:AUTH_ALERT,payload:'Something went wrong '+error.toString() })
      // this.setState({
      //   error,
      // });
    }
  }
};
_getCurrentUserGoogle = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    console.log(userInfo);
    
    this.setState({ userInfo });
  } catch (error) {
    console.error(error);
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
  
export const getAuth = state => state.auth.isAuthenticated;  
export default reducer;
  