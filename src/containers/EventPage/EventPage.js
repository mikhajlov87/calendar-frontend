// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
// Containers
import EventForm from '../EventForm/EventForm';
// Components
import MessageModalBody from '../../components/MessageModalBody/MessageModalBody';
// Helpers
import { redirectToCurrentDate } from '../../helpers/validate';
import { parseServerError } from '../../helpers/mockRequest';
import { checkIsEventItemExist } from '../../helpers/eventsList';
// Actions
import * as modalActions from '../../actions/modalActions';
import * as eventActions from '../../actions/eventsActions';
// Styles
import * as styles from './EventPage.scss';

class EventPage extends Component {

  componentWillMount() {
    const { eventItemId } = this.props.match.params;
    if (eventItemId) {
      this.verifyPermissionToEdit();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { modalActions: { showMessageModal }, history, currentDate, match: { params: { eventItemId } } } = this.props;

    const {
      eventCreated, addEventError, errorStatusCode, isMessageModalOpen, addEventPending,
      saveEventChangesPending, eventChangesSaved, saveEventChangesError
    } = nextProps;

    const eventWasCreated = (eventCreated && (eventCreated !== this.props.eventCreated));
    const eventWasUpdated = (eventChangesSaved && (eventChangesSaved !== this.props.eventChangesSaved));
    const addEventRequestError = (addEventError && (addEventError !== this.props.addEventError));
    const eventCreatedAndConfirmed = (!isMessageModalOpen && (this.props.isMessageModalOpen && eventCreated));
    const addEventRequest = (addEventPending && (addEventPending !== this.props.addEventPending));

    const saveEventChangesRequestError = (
      saveEventChangesError && (saveEventChangesError !== this.props.saveEventChangesError)
    );

    const saveEventChangesRequest = (
      saveEventChangesPending && (saveEventChangesPending !== this.props.saveEventChangesPending)
    );

    if (eventWasCreated || eventWasUpdated) {
      const message = (eventItemId) ? 'updated' : 'created';
      const modalBody = this.renderMessageModalBody('success', `event was ${message}!`);
      showMessageModal(modalBody);
    }

    if (addEventRequestError || saveEventChangesRequestError) {
      const errorMessage = parseServerError(errorStatusCode);
      const modalBody = this.renderMessageModalBody('error', errorMessage);
      showMessageModal(modalBody);
    }

    if (eventCreatedAndConfirmed) {
      redirectToCurrentDate(history, currentDate);
    }

    if (addEventRequest || saveEventChangesRequest) {
      showMessageModal(this.renderModalBodyWithPreloader());
    }
  }

  componentWillUnmount() {
    const { clearCurrentEventItem } = this.props.eventActions;
    clearCurrentEventItem();
  }

  verifyPermissionToEdit = () => {
    const { eventActions: { getEventItemById }, eventsList, history, currentDate } = this.props;
    const { eventItemId } = this.props.match.params;
    const isEventItemExist = checkIsEventItemExist(eventsList, eventItemId);
    if (isEventItemExist) {
      getEventItemById(eventItemId);
    } else {
      redirectToCurrentDate(history, currentDate);
    }
  };

  renderModalBodyWithPreloader = () => (
    <div className={styles.modalPreloader}>
      <RingLoader loading />
    </div>
  );

  renderMessageModalBody = (status, message) => {
    const { hideMessageModal } = this.props.modalActions;
    return (
      <MessageModalBody
        modalHeader={status}
        modalBody={message}
        acceptButtonLabel="ok"
        accepted={hideMessageModal}
      />
    );
  };

  render() {
    const { eventItemId } = this.props.match.params;
    return (
      <div className={styles.eventPage}>
        <h2 className={styles.pageHeader}>
          { eventItemId ? 'Edit Event:' : 'Create Event:' }
        </h2>
        <EventForm />
      </div>
    );
  }
}

EventPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  modalActions: PropTypes.object,
  isMessageModalOpen: PropTypes.bool,
  addEventError: PropTypes.bool,
  eventCreated: PropTypes.bool,
  currentDate: PropTypes.string,
  eventsList: PropTypes.array,
  eventActions: PropTypes.object,
  errorStatusCode: PropTypes.string,
  addEventPending: PropTypes.bool,
  saveEventChangesPending: PropTypes.bool,
  eventChangesSaved: PropTypes.bool,
  saveEventChangesError: PropTypes.bool
};

const mapStateToProps = state => ({
  isMessageModalOpen: state.modal.isMessageModalOpen,
  addEventError: state.events.addEventError,
  eventCreated: state.events.eventCreated,
  errorStatusCode: state.events.errorText,
  currentDate: state.currentDate.date,
  eventsList: state.events.events,
  addEventPending: state.events.addEventPending,
  saveEventChangesPending: state.events.saveEventChangesPending,
  eventChangesSaved: state.events.eventChangesSaved,
  saveEventChangesError: state.events.saveEventChangesError
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  eventActions: bindActionCreators(eventActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventPage)
);
