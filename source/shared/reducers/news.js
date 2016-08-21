'use strict';
import {
    FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAIL
} from '../actions/types'

function receivePosts(state = { }, action) {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.result.data,
        lastUpdated: Date.now()
      })
    default:
      return state
  }
}

export default receivePosts;

