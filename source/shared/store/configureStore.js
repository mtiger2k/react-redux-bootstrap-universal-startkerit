import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

import DevTools from '../middleware/devtools';
import promiseMiddleware from '../middleware/promiseMiddleware';

const middlewares = process.env.NODE_ENV === 'development' ?
    [applyMiddleware(promiseMiddleware, createLogger()), DevTools.instrument()] :
    [applyMiddleware(promiseMiddleware, createLogger())];

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
      compose(...middlewares)
  )

  return store
}

