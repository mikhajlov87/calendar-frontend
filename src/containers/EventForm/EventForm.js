// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
// Components
import DateField from '../../components/DateField/DateField';
import TimeField from '../../components/TimeField/TimeField';
import CheckBox from '../../components/Checkbox/Checkbox';
import ButtonSuccess from '../../components/ButtonSuccess/ButtonSuccess';
import ButtonDefault from '../../components/ButtonDefault/ButtonDefault';
import RenderField from './RenderField/RenderField';
import ModalConfirmBody from '../../components/ModalConfirm/ModalConfirmBody';
// Helpers
import { validate } from '../../helpers/validation/formValidation';
import formFieldsProps from './config';
// Actions
import { modalsActions, eventsActions } from './actions';
// Styles
import * as styles from './EventForm.scss';

class EventForm extends Component {
  state = {
    formData: null
  };

  confirmSubmitting = (formData) => {
    const { showMessageModal } = this.props.modalsActions;
    const { eventItemId } = this.props.match.params;
    const modalMessage = (
      (eventItemId)
        ? (this.renderConfirmSaveChangesModalBody())
        : (this.renderBodyConfirmModal())
    );
    this.setState({ formData });
    showMessageModal(modalMessage);
  };

  createEvent = () => {
    const { formData } = this.state;
    const { createEventItem } = this.props.eventsActions;
    createEventItem(formData);
  };

  saveChanges = () => {
    const { formData } = this.state;
    const { id } = this.props.initialValues;
    const { updateEventItem } = this.props.eventsActions;
    const eventObject = { ...formData, id };
    updateEventItem(eventObject);
  };

  abortCreatingEvent = () => {
    const { hideMessageModal } = this.props.modalsActions;
    this.setState({
      formData: null
    });
    hideMessageModal();
  };

  renderConfirmSaveChangesModalBody = () => (
    <ModalConfirmBody
      rejected={this.abortCreatingEvent}
      accepted={this.saveChanges}
      rejectButtonLabel="cancel"
      acceptButtonLabel="save changes"
      modalHeader="Your are confirm SAVE changes?"
      modalBody="...and add it into the your Calendar"
    />
  );

  renderBodyConfirmModal = () => (
    <ModalConfirmBody
      rejected={this.abortCreatingEvent}
      accepted={this.createEvent}
      rejectButtonLabel="cancel"
      acceptButtonLabel="accept"
      modalHeader="Your are confirm CREATE Event?"
      modalBody="...and add it into the your Calendar"
    />
  );

  renderFormField = ({ label, name, placeholder, stringFormat, initTime }, component) => (
    <Field
      id={name}
      label={label}
      name={name}
      component={component}
      type="text"
      placeholder={placeholder}
      {...stringFormat}
      {...initTime}
    />
  );

  renderEventNameFormGroup = () => (
    <div className={styles.formGroup}>
      { this.renderFormField(formFieldsProps.nameField, RenderField) }
    </div>
  );

  renderStartEventFormGroup = ({ isFullDayValue }) => (
    <div className={styles.formGroup}>
      <div className={styles.spaceBetween}>
        { this.renderFormField(formFieldsProps.startDate, DateField) }
        { !isFullDayValue && (this.renderFormField(formFieldsProps.startTime, TimeField)) }
        { this.renderFormField(formFieldsProps.isFullDay, CheckBox) }
      </div>
    </div>
  );

  renderEndEventFormGroup = ({ isFullDayValue }) => (
    !(isFullDayValue) && (
      <div className={styles.formGroup}>
        <div className={styles.spaceAround}>
          { this.renderFormField(formFieldsProps.endDate, DateField) }
          { this.renderFormField(formFieldsProps.endTime, TimeField) }
        </div>
      </div>
    )
  );

  renderEventCaptionFormGroup = ({ label, name }) => (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.formLabel}>{ label }</label>
      <div className={styles.formControl}>
        { this.renderFormField(formFieldsProps.eventCaption, 'textarea') }
      </div>
    </div>
  );

  renderFormFooter = ({ pristine, submitting, reset }) => (
    <div className={styles.formFooter}>
      <span className={styles.required}> * - that field required</span>
      <ButtonSuccess type="submit" disabled={pristine || submitting}>Submit</ButtonSuccess>
      <ButtonDefault disabled={pristine || submitting} onClick={reset}>Clear</ButtonDefault>
    </div>
  );

  render() {
    const { handleSubmit, pristine, submitting, reset, isFullDayValue } = this.props;
    return (
      <div className={styles.form}>
        <form onSubmit={handleSubmit(this.confirmSubmitting)}>
          { this.renderEventNameFormGroup() }
          { this.renderStartEventFormGroup({ isFullDayValue }) }
          { this.renderEndEventFormGroup({ isFullDayValue }) }
          { this.renderEventCaptionFormGroup(formFieldsProps.eventCaption) }
          { this.renderFormFooter({ pristine, submitting, reset }) }
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  eventsActions: PropTypes.object,
  modalsActions: PropTypes.object,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  isFullDayValue: PropTypes.bool,
  initialValues: PropTypes.object,
  match: PropTypes.object
};

const selector = formValueSelector('EventForm');

const mapStateToProps = (state) => {
  const isFullDayValue = selector(state, 'isFullDay');
  return {
    form: state.reduxForm,
    isFullDayValue,
    initialValues: state.events.currentEventItem
  };
};

const mapDispatchToProps = dispatch => ({
  eventsActions: bindActionCreators(eventsActions, dispatch),
  modalsActions: bindActionCreators(modalsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'EventForm',
  validate
})(withRouter(EventForm)));
