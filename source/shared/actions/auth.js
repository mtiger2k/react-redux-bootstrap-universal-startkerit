import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL,
  SIGN_OUT,
  SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL,
  SET_MESSAGE, SET_MESSAGE_SUCCESS, SET_MESSAGE_FAIL
} from './types';

// AUTH ACTIONS
export function signUpUser(name, email, password) {
  return  {
    types: [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL],
    promise: client => client.post('/api/signup', {
    dispName: name,
    email: email,
    password: password
  }),
      afterSuccess: (dispatch, getState, response) => {
    localStorage.setItem('auth-token', getState().auth.token);
    browserHistory.push('/');
  }
};
}

export function signInUser(email, password) {
  return  {
    types: [SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL],
    promise: client => client.post('/api/signin', {
      email: email,
      password: password
    }),
      afterSuccess: (dispatch, getState, response) => {
    localStorage.setItem('auth-token', getState().auth.token);
    const routingState = getState().routing.locationBeforeTransitions.state || {};
    browserHistory.push(routingState.nextPathname || '');
  }
};
}

export function signOutUser() {
  return {
    type: SIGN_OUT
  }
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}

export function redirectToLoginWithMessage(messageKey) {
  return (dispatch, getState) => {
    const currentPath = getState().routing.locationBeforeTransitions.pathname;
    dispatch(setMessage(messageKey));
    browserHistory.replace({pathname: '/login', state: {nextPathname: currentPath}});
  }
}
