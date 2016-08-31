import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Link } from 'react-router'

import HeaderWrapper from '../../../lib/header/HeaderWrapper';
import Logo from '../../../lib/header/Logo';
import MiniLogo from '../../../lib/header/MiniLogo';
import LargeLogo from '../../../lib/header/LargeLogo';
import Navbar from '../../../lib/header/Navbar';

import MessagesMenu from '../../containers/header/MessagesMenu';
import NotificationsMenu from '../../containers/header/NotificationsMenu';
import TasksMenu from '../../containers/header/TasksMenu';
import UserMenu from '../../containers/header/UserMenu';

class Header extends React.Component {
  render() {
      return (
        <HeaderWrapper>
          <Logo onClick={() => browserHistory.push('/')}>
            <MiniLogo>
              <b>A</b>LT
            </MiniLogo>
            <LargeLogo>
              <b>Admin</b>LTE
            </LargeLogo>
          </Logo>
          <Navbar>
            {!this.props.isAuthenticated && <li eventKey={1}><Link to="/login">Login</Link></li>}
            {!this.props.isAuthenticated && <li eventKey={1}><Link to="/signup">Signup</Link></li>}
            {this.props.isAuthenticated && <MessagesMenu />}
            {this.props.isAuthenticated && <NotificationsMenu />}
            {this.props.isAuthenticated && <TasksMenu />}
            {this.props.isAuthenticated && <UserMenu />}
          </Navbar>
        </HeaderWrapper>
      );
  }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.authenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(Header)