import React from 'react';

import { Router, Route, IndexRoute } from 'react-router'
import App from '../shared/views/app';
import Error from '../shared/views/error';
import Layout from '../shared/views/layout';
import About from '../shared/views/about';
import Calculator from '../shared/views/calculator';
import News from '../shared/views/news';
import Authors from '../shared/views/authors';
import Login from '../shared/views/login';
import Signup from '../shared/views/signup';
import Settings from '../shared/views/settings';
import privateRoute from './privateRoute';

export default (onLogout) => (
<Route path="/" name="Shared App" component={Layout}>
    <Route name="About" path="about" component={About} />
    <Route name="Calculator" path="calculator" component={Calculator} />
    <Route name="News" path="news" component={News} />
    <Route name="Authors" path="authors" component={Authors} />
    <IndexRoute name="Welcome" component={App} />
    <Route name="Signup" path="signup" component={Signup} />
    <Route name="Login" path="login" component={Login} />
    <Route path="logout" onEnter={onLogout}/>
    <Route name="Settings" path="settings" component={privateRoute(Settings)} />
    <Route path="*" name="Error" component={Error} />
    </Route>
);
