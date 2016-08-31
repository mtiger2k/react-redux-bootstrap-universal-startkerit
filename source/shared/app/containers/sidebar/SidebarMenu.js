import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import SidebarMenuWrapper from '../../../lib/sidebar/SidebarMenuWrapper';
import SidebarMenuHeader from '../../../lib/sidebar/SidebarMenuHeader';
import TreeMenu from '../../../lib/sidebar/TreeMenu';

const privateMainMenus = [
  {
    key: 4,
    id: 4,
    icon: 'fa fa-diamond',
    title: 'My Apps',
    items: [
      { key: 101, id: 101, title: 'News', url: '/news' },
      { key: 102, id: 102, title: 'Authors', url: '/authors' }
    ],
  },
];

const publicMainMenus = [
  {
    key: 1,
    id: 1,
    icon: 'fa fa-dashboard',
    title: 'Dashboard',
    items: [
      { key: 11, id: 11, title: 'Dashboard v1', url: '/dashboard/v1' },
      { key: 12, id: 12, title: 'Dashboard v2', url: '/dashboard/v2' },
    ],
  },
  {
    key: 3,
    id: 3,
    icon: 'fa fa-th',
    title: 'Widgets',
    label: 'new',
    labelColor: 'green',
    url: '/widgets',
  },
  {
    key: 10,
    id: 10,
    icon: 'fa fa-folder',
    title: 'Examples',
    items: [
      { key: 103, id: 103, title: 'Calculator', url: '/calculator' },
      { key: 108, id: 108, title: 'Blank Page', url: '/examples/blank-page' },
    ],
  },
  {
    key: 11,
    id: 11,
    icon: 'fa fa-share',
    title: 'Multilevel',
    items: [
      { key: 111, id: 111, title: 'Level One', url: '/level-one' },
      {
        key: 112,
        id: 112,
        title: 'Level One',
        items: [
          { key: 1121, id: 1121, title: 'Level Two', url: '/level-two' },
          { key: 1122, id: 1122,
            title: 'Level Two',
            items: [
              {
                key: 112201,
                id: 112201,
                title: 'Level Three',
                url: '/level-three',
              },
              {
                key: 112202,
                id: 112202,
                title: 'Level Three',
                url: '/level-three',
              },
            ],
          },
        ],
      },
      { key: 113, id: 113, title: 'Level One', url: '/level-one' },
    ],
  }
];

const publicLabelsMenus = [
  {
      key: 92,
      id: 92,
      iconColor: 'aqua',
      title: 'Documentation',
      showLabel: false
    },
    {
    key: 93,
    id: 93,
    iconColor: 'aqua',
    title: 'About',
    showLabel: false,
    url: '/about'
  },
];


function onMenuClick(item) {
  if (item.url) {
    browserHistory.push(item.url);
  }
}

class SidebarMenu extends React.Component {
  render() {
  const mainMenus = this.props.isAuthenticated ? publicMainMenus.concat(privateMainMenus) : publicMainMenus;
  const labelsMenus = publicLabelsMenus;
  return (
    <SidebarMenuWrapper>
      <SidebarMenuHeader title="MAIN NAVIGATION" />
      {mainMenus.map((menu) =>
        <TreeMenu
          {...menu}
          onClick={() => onMenuClick(menu)}
          onItemClick={onMenuClick}
        />
      )}
      <SidebarMenuHeader title="LABELS" />
      {labelsMenus.map((menu) =>
        <TreeMenu
          {...menu}
          onClick={() => onMenuClick(menu)}
          onItemClick={onMenuClick}
        />
      )}
    </SidebarMenuWrapper>
  );
  }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.authenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(SidebarMenu)
