import axios from 'axios';
import { signOutUser } from '../actions/auth'

import {
  FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAIL,
  UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAIL
} from './types';

// USER ACTIONS
export function fetchUser() {
  return  {
    types: [FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAIL],
    promise: client => client.get('/api/user')
};
}

export function updateUser(user) {
  return  {
        types: [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL],
        promise: client => client.put('/api/user', {user: user})
};
}

export function deleteUser() {
  return  {
        types: [DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAIL],
        promise: client => client.delete('/api/user')
};
}
