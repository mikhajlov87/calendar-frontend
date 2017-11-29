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
    const shouldShowPreloader = (
      this.props.modalState.isMessageModalOpen && nextProps.eventsState.pending
        && (nextProps.eventsState.pending !== this.props.eventsState.pending)
    );

    const eventItemDeletedSuccessfully = (
      nextProps.eventsState.deleteSuccess
        && (nextProps.eventsState.deleteSuccess !== this.props.eventsState.deleteSuccess)
    );

    const shouldShowErrorMessage = (
      nextProps.eventsState.rejected && (nextProps.eventsState.rejected !== this.props.eventsState.rejected)
    );

    if (shouldShowPreloader) {
      this.showMessageModal(this.renderModalBodyWithPreloader());
    }

    if (eventItemDeletedSuccessfully) {
      this.showMessageModal(this.renderDeleteEventSuccessMessage());
    }

    if (shouldShowErrorMessage) {
      const message = 'Server Error! Please try again';
      this.showMessageModal(this.renderModalBodyWithMessage(message));
    }
  }

  componentWillUnmount() {
    this.props.eventsActions.clearCurrentEventItem();
  }

  showMessageModal = (message) => {
    this.props.modalsActions.showMessageModal(message);
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
    const { history } = this.props;
    const { currentMonthNow } = this.props.currentDate;
    this.hideMessageModal();
    redirectToCurrentDate(history, currentMonthNow);
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
    const deleteModalBodyMessage = this.renderConfirmDeleteModalBodyMessage();
    const handleClickDeleteButton = () => this.showMessageModal(deleteModalBodyMessage);
    return (
      <div className={styles.eventName}>
        <h1 className={styles.header}>{ eventName }</h1>
        <div>
          <button onClick={this.redirectToEditEventPage} className={styles.button}>edit</button>{' '}
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
    const { currentEventItem } = this.props.eventsState;
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
  history: PropTypes.object,
  currentDate: PropTypes.object,
  eventsState: PropTypes.object,
  modalState: PropTypes.object
};

const mapStateToProps = state => ({
  currentDate: state.currentDate,
  eventsState: state.events,
  modalState: state.messageModal
});

const mapDispatchToProps = dispatch => ({
  eventsActions: bindActionCreators(eventsActions, dispatch),
  modalsActions: bindActionCreators(modalsActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewEventPage)
);
