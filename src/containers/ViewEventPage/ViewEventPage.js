// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
// Components
import ButtonDefault from '../../components/ButtonDefault/ButtonDefault';
import ButtonSuccess from '../../components/ButtonSuccess/ButtonSuccess';
// Helpers
import { formatDateString } from '../../helpers/moment';
import { redirectToCurrentDate } from '../../helpers/validation/validate';
// Actions
import { eventsActions, modalsActions } from './actions';
// Styles
import * as styles from './ViewEventPage.scss';

class ViewEventPage extends Component {
  componentWillMount() {
    const { getEventItemById } = this.props.eventsActions;
    const { eventItemId } = this.props.match.params;
    getEventItemById(eventItemId);
  }

  componentWillReceiveProps(nextProps) {
    const deleteEventItemPending = (
      nextProps.deleteEventItemPending && (nextProps.deleteEventItemPending !== this.props.deleteEventItemPending)
    );

    const editEventItemPending = (
      nextProps.editEventItemPending && (nextProps.editEventItemPending !== this.props.editEventItemPending)
    );

    const eventItemDeletedSuccessfully = (
      nextProps.eventItemDeleted && (nextProps.eventItemDeleted !== this.props.eventItemDeleted)
    );

    const deleteEventItemRejected = (
      nextProps.deleteEventItemError && (nextProps.deleteEventItemError !== this.props.deleteEventItemError)
    );

    const editEventItemSuccessfully = (
      nextProps.editEventItemFulfilled && (nextProps.editEventItemFulfilled !== this.props.editEventItemFulfilled)
    );

    const editEventItemRejected = (
      nextProps.editEventItemRejected && (nextProps.editEventItemRejected !== this.props.editEventItemRejected)
    );

    if (deleteEventItemPending || editEventItemPending) {
      this.showMessageModal(this.renderModalBodyWithPreloader());
    }

    if (eventItemDeletedSuccessfully) {
      this.showMessageModal(this.renderDeleteEventSuccessMessage());
    }

    if (deleteEventItemRejected || editEventItemRejected) {
      const message = (
        (deleteEventItemRejected)
          ? ('Server Error! Event item was not deleted!')
          : ('Server Error! Please try again')
      );
      this.showMessageModal(this.renderModalBodyWithMessage(message));
    }

    if (editEventItemSuccessfully) {
      this.redirectToEditEventPage();
    }
  }

  componentWillUnmount() {
    const { clearCurrentEventItem } = this.props.eventsActions;
    clearCurrentEventItem();
  }

  showMessageModal = (message) => {
    const { showMessageModal } = this.props.modalsActions;
    showMessageModal(message);
  };

  hideMessageModal = () => {
    const { hideMessageModal } = this.props.modalsActions;
    hideMessageModal();
  };

  handleSuccessDeleteEvent = () => {
    const { deleteEventItem } = this.props.eventsActions;
    const { eventItemId } = this.props.match.params;
    deleteEventItem(eventItemId);
  };

  redirectToMonthPage = () => {
    const { history, currentDate } = this.props;
    this.hideMessageModal();
    redirectToCurrentDate(history, currentDate);
  };

  redirectToEditEventPage = () => {
    const { history } = this.props;
    const { eventItemId } = this.props.match.params;
    const editEventPageUrl = `edit-event/${eventItemId}`;
    this.hideMessageModal();
    redirectToCurrentDate(history, editEventPageUrl);
  };

  renderModalBodyWithPreloader = () => (
    <div className={styles.modalPreloader}>
      <RingLoader loading />
    </div>
  );

  renderDeleteEventSuccessMessage = () => (
    <div>
      <div className={styles.modalHeader}>Delete event item was successfully</div>
      <ButtonSuccess onClick={this.redirectToMonthPage}>
        Redirect to month page
      </ButtonSuccess>
    </div>
  );

  renderModalBodyWithMessage = message => (
    <div>
      <div className={styles.modalHeader}>{ message }</div>
      <ButtonSuccess onClick={this.hideMessageModal}>
        Close modal
      </ButtonSuccess>
    </div>
  );

  renderConfirmEditModalBodyMessage = () => {
    const { editEventItem } = this.props.eventsActions;
    return (
      <div>
        <div className={styles.modalHeader}>you confirm EDIT event?</div>
        <div>
          <ButtonSuccess onClick={editEventItem}>edit event</ButtonSuccess>
          <ButtonDefault onClick={this.hideMessageModal}>close modal</ButtonDefault>
        </div>
      </div>
    );
  };

  renderConfirmDeleteModalBodyMessage = () => (
    <div>
      <div className={styles.modalHeader}>you confirm DELETE event?</div>
      <div>
        <ButtonSuccess onClick={this.handleSuccessDeleteEvent}>delete event</ButtonSuccess>
        <ButtonDefault onClick={this.hideMessageModal}>close modal</ButtonDefault>
      </div>
    </div>
  );

  renderEventName = ({ eventName }) => {
    const editEventModalBodyMessage = this.renderConfirmEditModalBodyMessage();
    const deleteModalBodyMessage = this.renderConfirmDeleteModalBodyMessage();
    const handleClickEditButton = () => this.showMessageModal(editEventModalBodyMessage);
    const handleClickDeleteButton = () => this.showMessageModal(deleteModalBodyMessage);
    return (
      <div className={styles.eventName}>
        <h1 className={styles.header}>{ eventName }</h1>
        <div>
          <button onClick={handleClickEditButton} className={styles.button}>edit</button>{' '}
          <button onClick={handleClickDeleteButton} className={styles.button}>delete</button>
        </div>
      </div>
    );
  };

  renderStartEventDate = ({ isFullDay, startTime, startDate }) => (
    <div className={styles.startEvent}>
      {
        (isFullDay)
          ? (<div>That event is full day</div>)
          : (startTime && (
            <div>
              <h2 className={styles.eventHeader}>Start:</h2>
              <p className={styles.dateTime}>
                { formatDateString(`${startDate} ${startTime}`) }
              </p>
            </div>
          ))
      }
    </div>
  );

  renderEndEventDate = ({ isFullDay, endTime, endDate }) => (
    <div className={styles.startEvent}>
      {
        (!isFullDay && endTime) && (
          <div>
            <h2 className={styles.eventHeader}>End:</h2>
            <p className={styles.dateTime}>
              { formatDateString(`${endDate} ${endTime}`) }
            </p>
          </div>
        )
      }
    </div>
  );

  renderEventCaption = ({ eventCaption }) => (
    <div className={styles.eventCaption}>
      <h2 className={styles.eventHeader}>Description:</h2>
      { eventCaption }
    </div>
  );

  renderEventItemHeader = currentEventItem => (
    <div className={styles.headerContainer}>
      <h2 className={styles.eventHeader}>Name:</h2>
      { this.renderEventName(currentEventItem) }
    </div>
  );

  renderEventItemBody = currentEventItem => (
    <div className={cx(styles.bodyContainer, { [styles.fullDayEvent]: currentEventItem.isFullDay })}>
      { this.renderStartEventDate(currentEventItem) }
      { this.renderEndEventDate(currentEventItem) }
    </div>
  );

  render() {
    const { currentEventItem } = this.props;
    return (
      <div className={styles.eventPage}>
        <div className={styles.eventItem}>
          { this.renderEventItemHeader(currentEventItem) }
          { this.renderEventItemBody(currentEventItem) }
          { this.renderEventCaption(currentEventItem) }
        </div>
      </div>
    );
  }
}

ViewEventPage.propTypes = {
  match: PropTypes.object,
  eventsActions: PropTypes.object,
  modalsActions: PropTypes.object,
  currentEventItem: PropTypes.object,
  history: PropTypes.object,
  currentDate: PropTypes.string,
  eventItemDeleted: PropTypes.bool,
  deleteEventItemError: PropTypes.bool,
  deleteEventItemPending: PropTypes.bool,
  editEventItemPending: PropTypes.bool,
  editEventItemFulfilled: PropTypes.bool,
  editEventItemRejected: PropTypes.bool
};

const mapStateToProps = state => ({
  currentEventItem: state.loadEventItem.currentEventItem,
  currentDate: state.currentDate.currentMonthNow,
  deleteEventItemError: state.deleteEventItem.rejected,
  eventItemDeleted: state.deleteEventItem.fulfilled,
  deleteEventItemPending: state.deleteEventItem.pending,
  editEventItemPending: state.editEventItem.pending,
  editEventItemFulfilled: state.editEventItem.fulfilled,
  editEventItemRejected: state.editEventItem.rejected
});

const mapDispatchToProps = dispatch => ({
  eventsActions: bindActionCreators(eventsActions, dispatch),
  modalsActions: bindActionCreators(modalsActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewEventPage)
);
