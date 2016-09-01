import React from 'react';

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

import LoginForm from '../forms/LoginForm';
import LoginWrapper from './LoginWrapper';

export default class LoginPage extends React.Component {

    render() {
      return (
        <PageWrapper>
          <PageContent>
            <LoginWrapper>
            <div className="login-box-body">
                <p className="login-box-msg">Sign in to start your session</p>
            <LoginForm />
            </div>
            </LoginWrapper>
          </PageContent>
        </PageWrapper>
      );
  }
}
