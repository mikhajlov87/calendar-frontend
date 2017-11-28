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
      this.verifyPermissionToEdit();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { showMessageModal } = this.props.modalsActions;
    const { history, currentDate } = this.props;
    const { eventItemId } = this.props.match.params;

    const eventItemCreated = (
      nextProps.eventItemCreated && (nextProps.eventItemCreated !== this.props.eventItemCreated)
    );

    const eventItemUpdated = (
      nextProps.updateEventItemFulfilled && (nextProps.updateEventItemFulfilled !== this.props.updateEventItemFulfilled)
    );

    const createEventItemFailed = (
      nextProps.createEventItemFailed && (nextProps.createEventItemFailed !== this.props.createEventItemFailed)
    );

    const eventItemCreatedAndConfirmed = (
      (!nextProps.isMessageModalOpen) && (this.props.isMessageModalOpen && nextProps.eventItemCreated)
    );

    const eventItemUpdatedAndConfirmed = (
      (!nextProps.isMessageModalOpen) && (this.props.isMessageModalOpen && nextProps.updateEventItemFulfilled)
    );

    const createEventItemPending = (
      nextProps.createEventItemPending && (nextProps.createEventItemPending !== this.props.createEventItemPending)
    );

    const updateEventItemFailed = (
      nextProps.updateEventItemRejected && (nextProps.updateEventItemRejected !== this.props.updateEventItemRejected)
    );

    const updateEventItemPending = (
      nextProps.updateEventItemPending && (nextProps.updateEventItemPending !== this.props.updateEventItemPending)
    );

    if (eventItemCreated || eventItemUpdated) {
      const message = (eventItemId) ? 'updated' : 'created';
      const modalBody = this.renderMessageModalBody('success', `event was ${message}!`);
      showMessageModal(modalBody);
    }

    if (createEventItemFailed || updateEventItemFailed) {
      const errorMessage = parseServerError(this.props.errorStatusCode);
      const modalBody = this.renderMessageModalBody('error', errorMessage);
      showMessageModal(modalBody);
    }

    if (eventItemCreatedAndConfirmed || eventItemUpdatedAndConfirmed) {
      redirectToCurrentDate(history, currentDate);
    }

    if (createEventItemPending || updateEventItemPending) {
      showMessageModal(this.renderModalBodyWithPreloader());
    }
  }

  componentWillUnmount() {
    const { clearCurrentEventItem } = this.props.eventsActions;
    clearCurrentEventItem();
  }

  verifyPermissionToEdit = () => {
    const { eventsList, history, currentDate } = this.props;
    const { getEventItemById } = this.props.eventsActions;
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
    const { hideMessageModal } = this.props.modalsActions;
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
  modalsActions: PropTypes.object,
  isMessageModalOpen: PropTypes.bool,
  createEventItemFailed: PropTypes.bool,
  eventItemCreated: PropTypes.bool,
  currentDate: PropTypes.string,
  eventsList: PropTypes.array,
  eventsActions: PropTypes.object,
  errorStatusCode: PropTypes.string,
  createEventItemPending: PropTypes.bool,
  updateEventItemPending: PropTypes.bool,
  updateEventItemFulfilled: PropTypes.bool,
  updateEventItemRejected: PropTypes.bool
};

const mapStateToProps = state => ({
  isMessageModalOpen: state.messageModal.isMessageModalOpen,
  createEventItemFailed: state.createEventItem.rejected,
  eventItemCreated: state.createEventItem.fulfilled,
  errorStatusCode: state.createEventItem.errorMessage,
  currentDate: state.currentDate.currentMonthNow,
  eventsList: state.loadEventItem.events,
  createEventItemPending: state.createEventItem.pending,
  updateEventItemPending: state.updateEvents.pending,
  updateEventItemFulfilled: state.updateEvents.fulfilled,
  updateEventItemRejected: state.updateEvents.rejected
});

const mapDispatchToProps = dispatch => ({
  modalsActions: bindActionCreators(modalsActions, dispatch),
  eventsActions: bindActionCreators(eventsActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventPage)
);
