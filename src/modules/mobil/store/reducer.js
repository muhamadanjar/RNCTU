import HTTP from '../../../utils/Http';
import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
  } from './action-types';
  
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


export default reducer