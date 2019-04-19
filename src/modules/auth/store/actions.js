import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
    AUTH_USER,
    SET_LOGGED_IN_STATE,
    AUTH_LOGIN_SAMPLE
  } from './action-types';

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
    return{
      type: AUTH_LOGIN_SAMPLE,
      payload:{email,password}
    }
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
