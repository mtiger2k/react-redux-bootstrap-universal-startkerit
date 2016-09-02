import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import axios from 'axios';

import { fetchUser } from '../../../actions/user';
import { browserHistory } from 'react-router';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more'
  }
  return errors
}

const submit = (values, dispatch) => {
    return new Promise(
        (resolve, reject) => {
            axios.post('/api/signin', {
                email: values.email,
                password: values.password
              }).then(
                result => {
                    console.log(result);
                    localStorage.setItem('auth-token', result.data.token);
                    dispatch({type: 'SIGN_IN_SUCCESS', result: result});
                    dispatch(fetchUser());
                    browserHistory.push('/');
                    resolve();
                },
                error => {
                    console.log(error);
                    if (error.status == '401')
                        reject({_error: '邮箱或密码不对！'});
                }
              )
        }
    )
}

class LoginForm extends Component {

    renderField(field, label, placeholder, type) {
        return (
        <div className={(field.touched && field.error)?"form-group has-error" : "form-group"}>
        <label>{label}</label>
        <input placeholder={placeholder} className="form-control" {...field} type={type}/>
        {field.touched && field.error && <span className="help-block">{field.error}</span>}
        </div>
        )
    }

    render() {
        const { fields: { email, password }, handleSubmit, resetForm, submitting, error } = this.props;
        return (
            <form onSubmit={handleSubmit(submit)}>
            {error && <div className="alert alert-danger">{error}</div>}
            {this.renderField(email, "Email", "Enter email", "text")}
            {this.renderField(password, "Password", "Enter password", "password")}
            <div className="row">
                <div className="col-xs-4 pull-right">
                    <button type="submit" disabled={submitting} className="btn btn-primary btn-block btn-flat">Login</button>
                </div>
            </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

// Decorate the form component
export default reduxForm({
    form: 'signup',
    fields: [ 'email', 'password' ],
    validate
})(LoginForm);
