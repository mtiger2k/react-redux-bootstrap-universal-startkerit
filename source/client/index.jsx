'use strict';
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from '../routes';
import configureStore from '../shared/store/configureStore';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { setupAxiosInterceptors } from './axios';
import DevTools from '../shared/middleware/devtools';
import { redirectToLoginWithMessage, signOutUser } from '../shared/actions/auth';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators({redirectToLoginWithMessage, signOutUser}, store.dispatch);
setupAxiosInterceptors(() => actions.redirectToLoginWithMessage('login.error.unauthorized'));

ReactDOM.render(
  <Provider store={store}>
    <div>
    {devTools}
    <Router routes={getRoutes(actions.signOutUser)} history={history} />
    </div>
  </Provider>,
  document.getElementById('app')
)

