import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class SettingsForm extends Component {
    render() {
        const { fields: { dispName, email, city, state }, handleSubmit, resetForm, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Name</label>
            <input placeholder="Name" className="form-control" {...dispName} type="text"/>
            </div>
            <div className="form-group">
            <label>Email</label>
            <input placeholder="Email" className="form-control" {...email} type="text"/>
            </div>
            <div className="form-group">
            <label>City</label>
            <input placeholder="City" className="form-control" {...city} type="text"/>
            </div>
            <div className="form-group">
            <label>State</label>
            <input placeholder="State" className="form-control" {...state} type="text"/>
            </div>
            <div>
              <button type="submit" disabled={submitting} className="btn btn-primary btn-flat" >
                {submitting ? <i/> : <i/>} Make change
              </button>
            </div>
            </form>
        );
    }
}

SettingsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

// Decorate the form component
export default reduxForm({
    form: 'settings',
    fields: ['dispName', 'email', 'city', 'state']
})(SettingsForm);
