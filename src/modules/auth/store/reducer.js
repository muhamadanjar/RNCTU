import HTTP from '../../../utils/Http';
import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
} from './action-types';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch(type) {
      case AUTH_REFRESH_TOKEN:
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
  AsyncStorage.setItem('access_token', payload);
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${payload}`;

    return {
        ...state, isAuthenticated: true,
    }
}

function checkAuth(state) {
    state = Object.assign({}, state, {
        isAuthenticated: !!AsyncStorage.getItem('access_token')
    })

    if (state.isAuthenticated) {
        HTTP.defaults.headers.common['Authorization'] = `Bearer ${AsyncStorage.getItem('access_token')}`;
    }

    return state;
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
  