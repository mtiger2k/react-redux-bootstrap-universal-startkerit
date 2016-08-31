import React from 'react';
import { connect } from 'react-redux'
import { fetchUser, updateUser } from '../../../actions/user'

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

import SettingsForm from '../forms/SettingsForm';

export class SettingsPage extends React.Component {

    handleChange = (data) => {
        console.log(data);
        this.props.updateUser(data);
    }

    render() {
      return (
        <PageWrapper>
          <PageHeader
            title="Settings page"
            description="welcome to settings page"
          >
            <Breadcrumb
              items={[
                { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
                { key: 2, title: 'Settings' },
              ]}
            />
          </PageHeader>
          <PageContent>
            <Box
            title="Settings"
            status="primary"
            >
            <div id="settings">
            <SettingsForm initialValues = {this.props.initialValues} onSubmit = {this.handleChange} />
            </div>
          </Box>
          </PageContent>
        </PageWrapper>
      );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.user
  }
}

export default connect(mapStateToProps, { updateUser })(SettingsPage)
