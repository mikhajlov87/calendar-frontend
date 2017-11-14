// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
// Components
import EventLink from '../EventLink/EventLink';
// Helpers
import { redirectToCurrentDate } from '../../helpers/validate';
import { compareEvents } from '../../helpers/eventsList';
// Styles
import * as styles from './DayComponent.scss';

class DayComponent extends Component {

  redirectToDayPage = () => {
    const { history, day, match: { params: { year, month } } } = this.props;
    redirectToCurrentDate(history, `${year}/${month}/${day}`);
  };

  renderDayCardHeader = () => {
    const { isCurrentDay, weekday, day } = this.props;
    return (
      <div className={cx(styles.header, { [styles.todayHeader]: isCurrentDay })}>
        <span>{ weekday }</span>
        <span>{ day }</span>
      </div>
    );
  };

  renderEventsCounter = (eventsCount, eventClassName) => (
    <div className={cx(styles.event, eventClassName)}>
      <p>That field has</p>
      <p>{ eventsCount } events</p>
    </div>
  );

  renderFullDayEvent = ({ id, eventName }) => (
    <EventLink key={id} id={id} eventClassName={styles.fullDayEvent}>
      <p>{ eventName }</p>
      <p>Duration: All day</p>
    </EventLink>
);

  renderFullDayEvents = () => {
    const { fullDayEvents } = this.props;
    const fullDayEventsLength = fullDayEvents.length;
    return (
      (fullDayEventsLength > 1)
        ? (this.renderEventsCounter(fullDayEventsLength, styles.fullDayEvent))
        : (fullDayEvents.map(this.renderFullDayEvent))
    );
  };

  renderHourlyDayEvent = ({ id, startTime, endTime, eventName }) => (
    <EventLink key={id} id={id} eventClassName={styles.hourlyEvent}>
      <p>{ eventName }</p>
      <p>{`${startTime} - ${endTime}`}</p>
    </EventLink>
  );

  renderHourlyDayEvents = () => {
    const { hourlyEvents } = this.props;
    const hourlyEventsLength = hourlyEvents.length;
    const sortedHourlyEventsArr = hourlyEvents.sort(compareEvents);
    return (
      (hourlyEventsLength > 1)
        ? (this.renderEventsCounter(hourlyEventsLength, styles.hourlyEvent))
        : (sortedHourlyEventsArr.map(this.renderHourlyDayEvent))
    );
  };

  renderTransitionalDayEvent = ({ id, startDate, endDate, startTime, endTime, eventName }, calendarDay) => (
    <EventLink key={id} id={id} eventClassName={styles.transitionalEvent}>
      <p>{ eventName }</p>
      <p>
        { (calendarDay === startDate) && (`start time ${startTime}`)}
        { (calendarDay === endDate) && (`end time ${endTime}`)}
        { (calendarDay !== startDate) && (calendarDay !== endDate) && (`${startDate}-${endDate}`) }
      </p>
    </EventLink>
  );

  renderTransitionalDayEvents = () => {
    const { transitionalEvents, calendarDay } = this.props;
    const transitionalEventsLength = transitionalEvents.length;
    return (
      (transitionalEventsLength > 1)
      ? (this.renderEventsCounter(transitionalEventsLength, styles.transitionalEvent))
      : (transitionalEvents.map(eventItem => this.renderTransitionalDayEvent(eventItem, calendarDay)))
    );
  };

  renderDayCardBody = () => (
    <div className={styles.dayCardBody}>
      { this.renderFullDayEvents() }
      { this.renderHourlyDayEvents() }
      { this.renderTransitionalDayEvents() }
    </div>
  );

  render() {
    const { isCurrentDay } = this.props;
    return (
      <div onClick={this.redirectToDayPage} className={cx(styles.day, { [styles.today]: isCurrentDay })}>
        { this.renderDayCardHeader() }
        { this.renderDayCardBody() }
      </div>
    );
  }
}

DayComponent.propTypes = {
  day: PropTypes.string,
  weekday: PropTypes.string,
  match: PropTypes.object,
  isCurrentDay: PropTypes.bool,
  history: PropTypes.object,
  fullDayEvents: PropTypes.array,
  hourlyEvents: PropTypes.array,
  transitionalEvents: PropTypes.array,
  calendarDay: PropTypes.string
};

export default withRouter(DayComponent);
