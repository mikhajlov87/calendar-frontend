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
import { getMonthName, getDateStringFormatYearMonthDay } from '../../helpers/momentTime';
import {
  getNextDay, getDayNumber, getPreviousDay, getDayHoursArr, convertDateString, makeConvertConfig, isBetweenHour
} from '../../helpers/dayTime';
import { validateDate, redirectToCurrentDate } from '../../helpers/validate';
import { mapInstanceToArray, DayEventObj } from '../../helpers/calendarEvents';
// Styles
import * as styles from './DayPage.scss';

class DayPage extends Component {

  state = { currentDate: '', dayEvents: {} };

  componentWillMount() {
    const { history, date, match: { params: { year, month, day } } } = this.props;
    const dateIsNotValid = !validateDate({ year, month, day });
    if (dateIsNotValid) {
      redirectToCurrentDate(history, date);
    }
    this.setDayEventsToState({ year, month, day });
  }

  componentWillReceiveProps({ location: { pathname }, params }) {
    const isAnotherDay = (pathname !== this.props.location.pathname);
    if (isAnotherDay) {
      this.setDayEventsToState(params);
    }
  }

  setDayEventsToState = ({ year, month, day }) => {
    const { dayEvents } = this.props;
    const currentDate = this.getCurrentDate({ year, month, day });
    const dayEventsObj = dayEvents.get(currentDate) || new DayEventObj();
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
    const { currentDate, dayEvents: { hourlyEvents } } = this.state;
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
  date: PropTypes.string,
  params: PropTypes.object,
  dayEvents: PropTypes.object
};

const mapStateToProps = state => ({
  date: state.currentDate.date,
  dayEvents: state.events.calendarDayEvents
});

export default withRouter(
  connect(mapStateToProps)(DayPage)
);
