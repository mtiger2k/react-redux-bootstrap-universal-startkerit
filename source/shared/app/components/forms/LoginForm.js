import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class LoginForm extends Component {
    render() {
        const { fields: { email, password }, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Email</label>
            <input placeholder="Email" className="form-control" {...email} type="text"/>
            </div>
            <div className="form-group">
            <label>Password</label>
            <input placeholder="Password" className="form-control" {...password} type="password"/>
            </div>
            <div className="row">
                <div className="col-xs-4 pull-right">
                    <button type="submit" className="btn btn-primary btn-block btn-flat">Login</button>
                </div>
            </div>
            </form>
        );
    }
}

// Decorate the form component
export default reduxForm({
    form: 'signup',
    fields: [ 'email', 'password' ]
})(LoginForm);
