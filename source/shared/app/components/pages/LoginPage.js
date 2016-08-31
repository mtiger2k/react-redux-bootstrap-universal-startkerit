import React from 'react';
import { connect } from 'react-redux'
import { signInUser } from '../../../actions/auth'

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

import LoginForm from '../forms/LoginForm';
import LoginWrapper from './LoginWrapper';

export class LoginPage extends React.Component {

    handleLogin = (data) => {
        console.log(data);
        this.props.signInUser(data.email, data.password);
    }

    render() {
      return (
        <PageWrapper>
          <PageContent>
            <LoginWrapper>
            <div className="login-box-body">
                <p className="login-box-msg">Sign in to start your session</p>
            <LoginForm onSubmit = {this.handleLogin} />
            </div>
            </LoginWrapper>
          </PageContent>
        </PageWrapper>
      );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { signInUser })(LoginPage)
