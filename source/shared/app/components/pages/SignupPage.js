import React from 'react';
import { connect } from 'react-redux'
import { signUpUser, setMessage } from '../../../actions/auth'

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

import SignupForm from '../forms/SignupForm';

export class SignupPage extends React.Component {

    handleSignup = (data) => {
        console.log(data);
        this.props.signUpUser(data.name, data.email, data.password);
    }

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
            <SignupForm onSubmit = {this.handleSignup} />
            </div>
          </Box>
          </PageContent>
        </PageWrapper>
      );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { signUpUser, setMessage })(SignupPage)
