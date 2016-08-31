import React, { PropTypes } from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import Layout from './components/layout/Layout';

import HomePage from './components/pages/HomePage';
import DashboardOne from './components/pages/DashboardOne';
import DashboardTwo from './components/pages/DashboardTwo';
import Widgets from './components/pages/Widgets';
import {
  LevelOnePage,
  LevelTwoPage,
  LevelThreePage,
} from './components/pages/MultiLevelPage';
import BlankPage from './components/pages/BlankPage';

import AboutPage from './components/pages/AboutPage';
import NewsPage from './components/pages/NewsPage';
import AuthorsPage from './components/pages/AuthorsPage';
import CalculatorPage from './components/pages/CalculatorPage';

import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import SettingsPage from './components/pages/SettingsPage';

import ErrorPage from './components/pages/ErrorPage';
import privateRoute from './components/pages/privateRoute';

const propTypes = {
  store: PropTypes.object,
};

export default function App(onLogout) {
  const logout = (nextState, replace, cb) => {
      onLogout();
      replace('/');
      cb();
    };
  return (
      <Route path="/" name="Shared App" component={Layout}>
        <IndexRoute name="Welcome" component={HomePage} />
        <Route name="Dashboard V1" path="dashboard/v1" component={DashboardOne} />
        <Route name="Dashboard V2" path="dashboard/v2" component={DashboardTwo} />
        <Route name="Widgets" path="widgets" component={Widgets} />
        <Route name="Level One" path="level-one" component={LevelOnePage} />
        <Route name="Level Two" path="level-two" component={LevelTwoPage} />
        <Route name="Level Three" path="level-three" component={LevelThreePage} />
        <Route name="Blank Page" path="examples/blank-page" component={BlankPage} />
        <Route name="About" path="about" component={AboutPage} />
        <Route name="Calculator" path="calculator" component={CalculatorPage} />
        <Route name="News" path="news" component={NewsPage} />
        <Route name="Authors" path="authors" component={AuthorsPage} />
        <Route name="Signup" path="signup" component={SignupPage} />
        <Route name="Login" path="login" component={LoginPage} />
        <Route path="logout" onEnter={logout}/>
        <Route name="Settings" path="settings" component={privateRoute(SettingsPage)} />
        <Route path="*" name="Error" component={ErrorPage} />
      </Route>
  );
}

App.propTypes = propTypes;
