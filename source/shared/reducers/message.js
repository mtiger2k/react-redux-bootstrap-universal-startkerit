import { SET_MESSAGE } from '../actions/types';

export default function(message = '', action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload
    default:
      return message
  }
}
