import React from 'react';

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

import SignupForm from '../forms/SignupForm';

export default class SignupPage extends React.Component {

    render() {
      return (
        <PageWrapper>
          <PageHeader
            title="Sign up page"
            description="welcome to sign up page"
          >
            <Breadcrumb
              items={[
                { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
                { key: 2, title: 'Sign up' },
              ]}
            />
          </PageHeader>
          <PageContent>
          <Box
            title="Sign Up"
            status="primary"
          >
            <div id="signup">
            <SignupForm />
            </div>
          </Box>
          </PageContent>
        </PageWrapper>
      );
  }
}
