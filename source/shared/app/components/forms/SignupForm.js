import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class SignupForm extends Component {
    render() {
        const { fields: { name, email, password, confirmPassword }, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Name</label>
            <input placeholder="Name" className="form-control" {...name} type="text"/>
            </div>
            <div className="form-group">
            <label>Email</label>
            <input placeholder="Email" className="form-control" {...email} type="text"/>
            </div>
            <div className="form-group">
            <label>Password</label>
            <input placeholder="Password" className="form-control" {...password} type="password"/>
            </div>
            <div className="form-group">
            <label>Confirm password</label>
            <input placeholder="Confirm password" className="form-control" {...confirmPassword} type="password"/>
            </div>
            <button type="submit" className="btn btn-primary btn-flat">Signup</button>
            </form>
        );
    }
}

// Decorate the form component
export default reduxForm({
    form: 'signup',
    fields: ['name', 'email', 'password', 'confirmPassword']
})(SignupForm);
