// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// Components
import ButtonDefault from '../../components/ButtonDefault/ButtonDefault';
import ButtonSuccess from '../../components/ButtonSuccess/ButtonSuccess';
// Helpers
import { formatDateString } from '../../helpers/momentTime';
import { redirectToCurrentDate } from '../../helpers/validate';
// Actions
import * as eventsActions from '../../actions/eventsActions';
import * as modalActions from '../../actions/modalActions';
// Styles
import * as styles from './ViewEventPage.scss';

class ViewEventPage extends Component {

  componentWillMount() {
    const { eventsActions: { getEventItemById }, match: { params: { eventItemId } } } = this.props;
    getEventItemById(eventItemId);
  }

  componentWillUnmount() {
    const { clearCurrentEventItem } = this.props.eventsActions;
    clearCurrentEventItem();
  }

  handleSuccessDeleteEvent = () => {
    const { eventsActions: { deleteEventItem }, modalActions: { showMessageModal } } = this.props;
    const { eventItemId } = this.props.match.params;
    const modalBodyDeleteEventSuccessMessage = this.renderModalBodyDeleteEventSuccessMessage();
    deleteEventItem(eventItemId);
    showMessageModal(modalBodyDeleteEventSuccessMessage);
  };

  redirectToMonthPage = () => {
    const { history, currentDate, modalActions: { hideMessageModal } } = this.props;
    hideMessageModal();
    redirectToCurrentDate(history, currentDate);
  };

  redirectToEditEventPage = () => {
    const { history, modalActions: { hideMessageModal } } = this.props;
    const { eventItemId } = this.props.match.params;
    const editEventPageUrl = `edit-event/${eventItemId}`;
    hideMessageModal();
    redirectToCurrentDate(history, editEventPageUrl);
  };

  renderModalBodyDeleteEventSuccessMessage = () => (
    <div>
      <div className={styles.modalHeader}>event item was deleted</div>
      <ButtonSuccess onClick={this.redirectToMonthPage}>
        Redirect to month page
      </ButtonSuccess>
    </div>
  );

  renderConfirmEditModalBodyMessage = () => {
    const { hideMessageModal } = this.props.modalActions;
    return (
      <div>
        <div className={styles.modalHeader}>you confirm EDIT event?</div>
        <div>
          <ButtonSuccess onClick={this.redirectToEditEventPage}>edit event</ButtonSuccess>
          <ButtonDefault onClick={hideMessageModal}>close modal</ButtonDefault>
        </div>
      </div>
    );
  };

  renderConfirmDeleteModalBodyMessage = () => {
    const { hideMessageModal } = this.props.modalActions;
    return (
      <div>
        <div className={styles.modalHeader}>you confirm DELETE event?</div>
        <div>
          <ButtonSuccess onClick={this.handleSuccessDeleteEvent}>delete event</ButtonSuccess>
          <ButtonDefault onClick={hideMessageModal}>close modal</ButtonDefault>
        </div>
      </div>
    );
  };

  renderEventName = () => {
    const { currentEventItem: { eventName }, modalActions: { showMessageModal } } = this.props;
    const editEventModalBodyMessage = this.renderConfirmEditModalBodyMessage();
    const deleteModalBodyMessage = this.renderConfirmDeleteModalBodyMessage();
    return (
      <div className={styles.eventName}>
        <h1 className={styles.header}>{ eventName }</h1>
        <div>
          <button onClick={() => showMessageModal(editEventModalBodyMessage)} className={styles.button}>edit</button>{' '}
          <button onClick={() => showMessageModal(deleteModalBodyMessage)} className={styles.button}>delete</button>
        </div>
      </div>
    );
  };

  renderStartEventDate = () => {
    const { isFullDay, startTime, startDate } = this.props.currentEventItem;
    const formattedDate = formatDateString(`${startDate} ${startTime}`);
    return (
      <div className={styles.startEvent}>
        {
          isFullDay
            ? <div>That event is full day</div>
            : startTime && (
              <div>
                <h2 className={styles.eventHeader}>Start event:</h2>
                <p className={styles.dateTime}>{ formattedDate }</p>
              </div>
            )
        }
      </div>
    );
  };

  renderEndEventDate = () => {
    const { isFullDay, endTime, endDate } = this.props.currentEventItem;
    const formattedDate = formatDateString(`${endDate} ${endTime}`);
    return (
      <div className={styles.startEvent}>
        {
          !isFullDay && endTime && (
            <div>
              <h2 className={styles.eventHeader}>End event:</h2>
              <p className={styles.dateTime}>{ formattedDate }</p>
            </div>
          )
        }
      </div>
    );
  };

  renderEventCaption = () => {
    const { eventCaption } = this.props.currentEventItem;
    return (
      <div className={styles.eventCaption}>
        <h2 className={styles.eventHeader}>Event caption:</h2>
        { eventCaption || 'That event has no caption' }
      </div>
    );
  };

  renderEventItemHeader = () => (
    <div className={styles.headerContainer}>
      <h2 className={styles.eventHeader}>Event name:</h2>
      { this.renderEventName() }
    </div>
  );

  renderEventItemBody = () => {
    const { isFullDay } = this.props.currentEventItem;
    return (
      <div className={cx(styles.bodyContainer, { [styles.fullDayEvent]: isFullDay })}>
        { this.renderStartEventDate() }
        { this.renderEndEventDate() }
      </div>
    );
  };

  render() {
    return (
      <div className={styles.eventPage}>
        <div className={styles.eventItem}>
          { this.renderEventItemHeader() }
          { this.renderEventItemBody() }
          { this.renderEventCaption() }
        </div>
      </div>
    );
  }
}

ViewEventPage.propTypes = {
  match: PropTypes.object,
  eventsActions: PropTypes.object,
  modalActions: PropTypes.object,
  currentEventItem: PropTypes.object,
  history: PropTypes.object,
  currentDate: PropTypes.string
};

const mapStateToProps = state => ({
  currentEventItem: state.events.currentEventItem,
  currentDate: state.currentDate.date
});

const mapDispatchToProps = dispatch => ({
  eventsActions: bindActionCreators(eventsActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewEventPage)
);
