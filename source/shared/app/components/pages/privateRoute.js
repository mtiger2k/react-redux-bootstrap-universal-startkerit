import React from 'react';
import { redirectToLoginWithMessage } from '../../../actions/auth';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';

import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.authenticated
});
const mapDispatchToProps = {
  redirectToLoginWithMessage
};

const privateRoute = (Wrapped) => connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

  componentDidMount() {
    this.redirectIfNotLogged(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfNotLogged(nextProps);
  }

  redirectIfNotLogged(props) {
    const {loading, isAuthenticated} = props;
    if (loading === false && !isAuthenticated) {
      this.props.redirectToLoginWithMessage('login.error.private');
    }
  }

  render() {
    const {loading, isAuthenticated} = this.props;
    if (loading || !isAuthenticated) {
      return (
    <PageWrapper>
      <PageHeader
        title="Loading page"
        description=""
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'Loading' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <div>Loading...</div>
      </PageContent>
    </PageWrapper>      );
    }

    return <Wrapped {...this.props} />;
  }
});

export default privateRoute;
