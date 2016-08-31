import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class AuthorForm extends Component {
    render() {
        const { fields: { firstName, lastName }, handleSubmit } = this.props;
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
            <button type="submit" className="btn btn-primary btn-flat">Add Author</button>
            </form>
        );
    }
}

// Decorate the form component
export default reduxForm({
    form: 'author',
    fields: ['firstName', 'lastName']
})(AuthorForm);
