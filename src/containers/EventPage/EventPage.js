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
import { redirectToCurrentDate } from '../../helpers/validation/validate';
import { parseServerError } from '../../helpers/mockRequest';
import { checkIsEventItemExist } from '../../helpers/events/create';
// Actions
import { modalsActions, eventsActions } from './actions';
// Styles
import * as styles from './EventPage.scss';

class EventPage extends Component {
  componentWillMount() {
    const { eventItemId } = this.props.match.params;
    if (eventItemId) {
      this.verifyPermissionToEdit(eventItemId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { showMessageModal } = this.props.modalsActions;
    const { history } = this.props;
    const { currentMonthNow } = this.props.currentDate;
    const { eventItemId } = this.props.match.params;

    const shouldShowSuccessMessage = (
      nextProps.eventsState.fulfilled && (nextProps.eventsState.fulfilled !== this.props.eventsState.fulfilled)
    );

    const shouldShowErrorMessage = (
      nextProps.eventsState.rejected && (nextProps.eventsState.rejected !== this.props.eventsState.rejected)
    );

    const messageModalShownAndConfirmed = (
      (!nextProps.modalState.isMessageModalOpen)
        && (this.props.modalState.isMessageModalOpen)
        && (nextProps.eventsState.fulfilled)
    );

    const shouldShowPreloader = (
      nextProps.eventsState.pending && (nextProps.eventsState.pending !== this.props.eventsState.pending)
    );

    if (shouldShowSuccessMessage) {
      const message = (eventItemId) ? 'updated' : 'created';
      const modalBody = this.renderMessageModalBody('success', `event was ${message}!`);
      showMessageModal(modalBody);
    }

    if (shouldShowErrorMessage) {
      const errorMessage = parseServerError(nextProps.eventsState.errorStatusCode);
      const modalBody = this.renderMessageModalBody('error', errorMessage);
      showMessageModal(modalBody);
    }

    if (messageModalShownAndConfirmed) {
      redirectToCurrentDate(history, currentMonthNow);
    }

    if (shouldShowPreloader) {
      showMessageModal(this.renderModalBodyWithPreloader());
    }
  }

  componentWillUnmount() {
    this.props.eventsActions.clearCurrentEventItem();
  }

  verifyPermissionToEdit = (eventItemId) => {
    const { history } = this.props;
    const { currentMonthNow } = this.props.currentDate;
    const { getEventItemById } = this.props.eventsActions;
    const { eventsList } = this.props.eventsState;
    const isEventItemExist = checkIsEventItemExist(eventsList, eventItemId);
    if (isEventItemExist) {
      getEventItemById(eventItemId);
    } else {
      redirectToCurrentDate(history, currentMonthNow);
    }
  };

  renderModalBodyWithPreloader = () => (
    <div className={styles.modalPreloader}>
      <RingLoader loading />
    </div>
  );

  renderMessageModalBody = (status, message) => (
    <MessageModalBody
      modalHeader={status}
      modalBody={message}
      acceptButtonLabel="ok"
      accepted={this.props.modalsActions.hideMessageModal}
    />
  );

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
  modalsActions: PropTypes.object,
  currentDate: PropTypes.object,
  eventsActions: PropTypes.object,
  modalState: PropTypes.object,
  eventsState: PropTypes.object
};

const mapStateToProps = state => ({
  modalState: state.messageModal,
  currentDate: state.currentDate,
  eventsState: state.events
});

const mapDispatchToProps = dispatch => ({
  modalsActions: bindActionCreators(modalsActions, dispatch),
  eventsActions: bindActionCreators(eventsActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventPage)
);
