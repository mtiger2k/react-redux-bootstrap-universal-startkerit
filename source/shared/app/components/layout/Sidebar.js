import React from 'react';
import { connect } from 'react-redux'
import SidebarWrapper from '../../../lib/sidebar/SidebarWrapper';

import UserPanel from '../../containers/sidebar/UserPanel';
import SidebarSearch from '../../containers/sidebar/SidebarSearch';
import SidebarMenu from '../../containers/sidebar/SidebarMenu';

function Sidebar({isAuthenticated, user}) {
  return (
    <SidebarWrapper>
      {isAuthenticated && <UserPanel user={user}/>}
      {isAuthenticated && <SidebarSearch />}
      <SidebarMenu />
    </SidebarWrapper>
  );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.authenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(Sidebar)
