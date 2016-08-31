import React from 'react';

import UserPanel from '../../../lib/sidebar/UserPanel';
import avatar from '../../../img/user2-160x160.jpg'

/*const user = {
  name: 'Alexander Pierce',
  title: 'Web Developer',
  joined: 'Nov. 2012',
  avatar: '/dist/img/user2-160x160.jpg',
  isOnline: true,
};*/

export default function ({user}) {
  const onlineIcon = 'fa fa-circle text-success';
  const offlineIcon = 'fa fa-circle text-danger';
  const statusIcon = onlineIcon;
  const statusText = 'Online';
  return (
    <UserPanel
      image={avatar}
      name={user.dispName}
      statusIcon={statusIcon}
      statusText={statusText}
    />
  );
}
