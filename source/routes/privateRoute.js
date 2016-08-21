import React from 'react';
import { redirectToLoginWithMessage } from '../shared/actions/auth';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';

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
        <Grid>
          <div>Loading...</div>
        </Grid>
      );
    }

    return <Wrapped {...this.props} />;
  }
});

export default privateRoute;
