import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class AuthorForm extends Component {
    render() {
        const { fields: { firstName, lastName }, handleSubmit, resetForm, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input placeholder="First name" className="form-control" {...firstName} type="text"/>
            </div>
            <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input placeholder="Last name" className="form-control" {...lastName} type="text"/>
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary btn-flat">Add Author</button>
            </form>
        );
    }
}

AuthorForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

// Decorate the form component
export default reduxForm({
    form: 'author',
    fields: ['firstName', 'lastName']
})(AuthorForm);
