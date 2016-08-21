import { SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_OUT, SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAIL, DELETE_USER } from '../actions/types';

export default function(auth = { authenticated: false, token: '', loading: false }, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return Object.assign({}, auth, {
        authenticated: true,
        token: action.result.data.token
      })
    case SIGN_UP_FAIL:
      return Object.assign({}, auth, {
        authenticated: false,
        token: ''
      })
    case SIGN_OUT:
      return Object.assign({}, auth, {
        authenticated: false,
        token: ''
      })
    case SIGN_IN_SUCCESS:
      console.log(action);
      return Object.assign({}, auth, {
        authenticated: true,
        token: action.result.data.token
      })
    case SIGN_IN_FAIL:
      console.log(action);
      return Object.assign({}, auth, {
        authenticated: false,
        token: ''
      })
    case DELETE_USER:
      return Object.assign({}, auth, {
        authenticated: false,
        token: ''
      })
    default:
      return auth
  }

}
