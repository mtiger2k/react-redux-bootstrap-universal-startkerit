import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class AuthorForm extends Component {
    render() {
        const { fields: { firstName, lastName }, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input className="form-control" {...firstName} type="text"/>
            </div>
            <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input className="form-control" {...lastName} type="text"/>
            </div>
            <button type="submit">Submit</button>
            </form>
    );
    }
}

// Decorate the form component
export default reduxForm({
    form: 'author',
    fields: ['firstName', 'lastName']
})(AuthorForm);
