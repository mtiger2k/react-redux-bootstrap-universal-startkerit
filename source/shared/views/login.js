import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signInUser } from '../actions/auth'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signInUser(this.state.email, this.state.password)
  }

  render() {
    return (
      <div className="login content col-sm-4 col-sm-offset-4">
        <div>
          <form className="" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
                <label>Email</label>
                <input className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
          </div>
            <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
            </div>
            <div>
              <button type="submit" className="btn btn-xl btn-block">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  signInUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { signInUser })(Login)
