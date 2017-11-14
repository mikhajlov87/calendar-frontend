// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

  componentWillReceiveProps({ eventCreated, isServerResponseError, errorStatusCode, isMessageModalOpen }) {
    const { modalActions: { showMessageModal }, history, currentDate, match: { params: { eventItemId } } } = this.props;

    if (eventCreated && eventCreated !== this.props.eventCreated) {
      const message = (eventItemId) ? 'updated' : 'created';
      const modalBody = this.renderMessageModalBody('success', `event was ${message}!`);
      showMessageModal(modalBody);
    }

    if (isServerResponseError && isServerResponseError !== this.props.isServerResponseError) {
      const errorMessage = parseServerError(errorStatusCode);
      const modalBody = this.renderMessageModalBody('error', errorMessage);
      showMessageModal(modalBody);
    }

    if (!isMessageModalOpen && this.props.isMessageModalOpen && eventCreated) {
      redirectToCurrentDate(history, currentDate);
    }
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
  isServerResponseError: PropTypes.bool,
  eventCreated: PropTypes.bool,
  currentDate: PropTypes.string,
  eventsList: PropTypes.array,
  eventActions: PropTypes.object
};

const mapStateToProps = state => ({
  isMessageModalOpen: state.modal.isMessageModalOpen,
  isServerResponseError: state.events.error,
  eventCreated: state.events.created,
  errorStatusCode: state.events.errorText,
  currentDate: state.currentDate.date,
  eventsList: state.events.events
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  eventActions: bindActionCreators(eventActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventPage)
);
