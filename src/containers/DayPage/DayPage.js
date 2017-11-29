// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
// Components
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import HourComponent from '../../components/Hour/HourComponent';
// Helpers
import { getMonthName, getDateStringFormatYearMonthDay } from '../../helpers/moment';
import {
  getNextDay,
  getDayNumber,
  getPreviousDay,
  getDayHoursArr,
  convertDateString,
  makeConvertConfig,
  isBetweenHour
} from '../../helpers/calendar/day';
import { validateDate, redirectToCurrentDate } from '../../helpers/validation/validate';
import { mapInstanceToArray, getDayEventsObject } from '../../helpers/events/dayEventsObject';
// Styles
import * as styles from './DayPage.scss';

class DayPage extends Component {
  state = {
    currentDate: '',
    dayEvents: {}
  };

  componentWillMount() {
    const { history } = this.props;
    const { currentMonthNow } = this.props.currentDate;
    const { year, month, day } = this.props.match.params;
    const dateIsNotValid = !validateDate({ year, month, day });
    if (dateIsNotValid) {
      redirectToCurrentDate(history, currentMonthNow);
    }
    this.setDayEventsToState({ year, month, day });
  }

  componentWillReceiveProps(nextProps) {
    const isAnotherDay = (nextProps.location.pathname !== this.props.location.pathname);
    if (isAnotherDay) {
      this.setDayEventsToState(nextProps.match.params);
    }
  }

  setDayEventsToState = ({ year, month, day }) => {
    const { calendarDayEvents } = this.props.eventsState;
    const currentDate = this.getCurrentDate({ year, month, day });
    const dayEventsObj = getDayEventsObject(calendarDayEvents, currentDate);
    const { fullDayEvents, hourlyEvents, transitionalEvents } = dayEventsObj;

    this.setState({
      currentDate,
      dayEvents: {
        fullDayEvents: mapInstanceToArray(fullDayEvents),
        hourlyEvents: mapInstanceToArray(hourlyEvents),
        transitionalEvents: mapInstanceToArray(transitionalEvents)
      }
    });
  };

  getCurrentDate = ({ year, month, day }) => {
    const convertConfig = makeConvertConfig({ year, month, day });
    return convertDateString(convertConfig);
  };

  renderHourlyEvent = currentHourEvents => (
    currentHourEvents.map(
      ({ id, eventName, endTime }) => (
        <Link to={`/event-page/${id}`} key={id} className={styles.eventWrapper}>
          <div className={cx(styles.eventItem, styles.hourlyEvents)}>
            <span className={styles.hourlyEventName}>{ eventName }</span>
            <span className={styles.endTimeHourlyEvent}>End event time { endTime }</span>
          </div>
        </Link>
      )
    )
  );

  renderDayHours = () => {
    const { currentDate } = this.state;
    const { hourlyEvents } = this.state.dayEvents;
    const dayHours = getDayHoursArr();
    return dayHours.map(({ key, hour }) => {
      const currentHourEvents = hourlyEvents.filter(
        ({ startTime }) => isBetweenHour({
          startTime: `${currentDate} ${startTime}`,
          endTime: `${currentDate} ${hour}`
        }));
      return (
        <HourComponent key={key} hour={hour}>
          { (!!currentHourEvents.length) && (this.renderHourlyEvent(currentHourEvents)) }
        </HourComponent>);
    });
  };

  renderPageHeader = dateStr => (
    <PageHeader
      leftButtonTitle="prev day"
      rightButtonTitle="next day"
      prev={getPreviousDay(dateStr)}
      next={getNextDay(dateStr)}
    >
      {`${getDayNumber(dateStr)} ${getMonthName(dateStr)}`}
    </PageHeader>
  );

  renderPageContent = ({ fullDayEvents, transitionalEvents, hourlyEvents }) => (
    <PageContent>
      <div className={styles.eventsContainer}>
        {this.renderFullDayEvents(fullDayEvents)}
        {this.renderTransitionalEvents(transitionalEvents)}
      </div>
      {this.renderDayHours(hourlyEvents)}
    </PageContent>
  );

  renderFullDayEvent = ({ id, eventName }) => (
    <Link to={`/event-page/${id}`} key={id} className={styles.eventWrapper}>
      <div className={cx(styles.eventItem, styles.fullDayEvents)}>{ eventName }</div>
    </Link>
  );

  renderFullDayEvents = fullDayEvents => fullDayEvents.map(this.renderFullDayEvent);

  renderLeftCorner = (endEventDay, transitionalDay) => (
    (endEventDay || transitionalDay) && (<div className={cx(styles.corner, styles.leftCorner)} />)
  );

  renderRightCorner = (startEventDay, transitionalDay) => (
    (startEventDay || transitionalDay) && (<div className={cx(styles.corner, styles.rightCorner)} />)
  );

  renderTransitionalEventCaption = (eventItem, { startEventDay, endEventDay }) => {
    const { startTime, startDate, eventName, endTime, endDate } = eventItem;
    return (
      <div className={cx(styles.eventItem, styles.transitionalEvents)}>
        <span>{ (startEventDay) ? (`Start time: ${startTime}`) : (`${startTime} ${startDate}`) }</span>
        <span>{ eventName }</span>
        <span>{ (endEventDay) ? (`${endTime} End time:`) : (`${endTime} ${endDate}`) }</span>
      </div>
    );
  };

  renderTransitionalEvent = (eventItem) => {
    const { id, startDate, endDate } = eventItem;
    const { currentDate } = this.state;
    const startEventDay = (currentDate === startDate);
    const endEventDay = (currentDate === endDate);
    const transitionalDay = (!startEventDay && !endEventDay);
    return (
      <Link to={`/event-page/${id}`} key={id} className={styles.eventWrapper}>
        { this.renderLeftCorner(endEventDay, transitionalDay) }
        { this.renderTransitionalEventCaption(eventItem, { startEventDay, endEventDay }) }
        { this.renderRightCorner(startEventDay, transitionalDay) }
      </Link>
    );
  };

  renderTransitionalEvents = transitionalEvents => transitionalEvents.map(this.renderTransitionalEvent);

  render() {
    const { dayEvents } = this.state;
    const { year, month, day } = this.props.match.params;
    const dateStr = getDateStringFormatYearMonthDay({ year, month, day });
    return (
      <div className={styles.day}>
        { this.renderPageHeader(dateStr) }
        { this.renderPageContent(dayEvents) }
      </div>
    );
  }
}

DayPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  currentDate: PropTypes.object,
  params: PropTypes.object,
  eventsState: PropTypes.object
};

const mapStateToProps = state => ({
  currentDate: state.currentDate,
  eventsState: state.events
});

export default withRouter(
  connect(mapStateToProps)(DayPage)
);
