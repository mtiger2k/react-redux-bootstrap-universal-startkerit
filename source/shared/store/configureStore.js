import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

import DevTools from '../middleware/devtools';
import promiseMiddleware from '../middleware/promiseMiddleware';

import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import user from '../reducers/user';
import news from '../reducers/news';
import message from '../reducers/message';
import { routerReducer as routing } from 'react-router-redux';

const middlewares = process.env.NODE_ENV === 'development' ?
    [applyMiddleware(promiseMiddleware, createLogger()), DevTools.instrument()] :
    [applyMiddleware(promiseMiddleware, createLogger())];

export default function configureStore(initialState, apolloClient) {
  const store = createStore(
      combineReducers({
          auth,
          user,
          news,
          message,
          routing,
          apollo: apolloClient.reducer()
      }),
    initialState,
      compose(applyMiddleware(apolloClient.middleware()), ...middlewares)
  )

  return store
}

