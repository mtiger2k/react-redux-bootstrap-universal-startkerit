import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'

import UserMenu from '../../../lib/header/UserMenu';
import avatar from '../../../img/user2-160x160.jpg'
/*
const user = {
  name: 'Alexander Pierce',
  title: 'Web Developer',
  email: 'Nov. 2012',
  avatar: '/dist/img/user2-160x160.jpg',
  online: true,
};
*/

function onLinkClick(link) {
  // eslint-disable-next-line no-alert
  //alert(`route to ${link.url}`);
  browserHistory.push(link.url);
}

function onButtonClick(button) {
  // eslint-disable-next-line no-alert
  //alert(`button ${button.text} clicked`);
  if (button.url) {
    browserHistory.push(button.url);
  }
}

function getUserMenu({user}) {
  return (
    <UserMenu
      image={avatar}
      name={user.dispName}
      title={`${user.dispName} - ${user.dispName}`}
      description={`Email ${user.email}`}
      links={[
        { key: 1, text: 'Followers', url: '/followers' },
        { key: 2, text: 'Sales', url: '/sales' },
        { key: 3, text: 'Friends', url: '/friends' },
      ]}
      buttons={[
        { key: 1, text: 'Profile', align: 'left', url: '/settings' },
        { key: 2, text: 'Sign out', url: '/logout' },
      ]}
      onLinkClick={onLinkClick}
      onButtonClick={onButtonClick}
    />
  );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.authenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(getUserMenu)