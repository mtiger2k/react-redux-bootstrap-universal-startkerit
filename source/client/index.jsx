'use strict';
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
//import getRoutes from '../routes';
import getRoutes from '../shared/app/routes';
import configureStore from '../shared/store/configureStore';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { setupAxiosInterceptors } from './axios';
import DevTools from '../shared/middleware/devtools';
import { redirectToLoginWithMessage, signOutUser } from '../shared/actions/auth';

import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const client = new ApolloClient({
  networkInterface: createNetworkInterface('/api/graphql'),
  //queryTransformer: addTypename,
  initialState: window.__INITIAL_STATE__
})

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, client);
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators({redirectToLoginWithMessage, signOutUser}, store.dispatch);
setupAxiosInterceptors(() => actions.redirectToLoginWithMessage('login.error.unauthorized'));

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <div>
    {devTools}
    <Router routes={getRoutes(actions.signOutUser)} history={history} />
    </div>
  </ApolloProvider>,
  document.getElementById('app')
)
