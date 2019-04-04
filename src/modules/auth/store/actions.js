import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
    AUTH_USER,
    SET_LOGGED_IN_STATE
  } from './action-types';
import user from '../../../data/user.json';

  export function authCheck() {
    return {
      type: AUTH_CHECK,
    }
  }

  export function authLogin(payload) {
    return {
      type: AUTH_LOGIN,
      payload,
    };
  }

  export const logIn = (email, password) => {
    const action = (dispatch) => {
      if (email === user.email && password === user.password) {
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
