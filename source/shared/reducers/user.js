import { SIGN_OUT, FETCH_USER_SUCCESS, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS } from '../actions/types';

export default function(user = {dispName: ''}, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return Object.assign({}, user,
        action.result.data
      )
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, user,
        action.result.data
      )
    case DELETE_USER_SUCCESS:
      return {}
    case SIGN_OUT:
      return {}
    default:
      return user;
  }
}
