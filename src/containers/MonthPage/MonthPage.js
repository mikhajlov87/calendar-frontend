// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// Components
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import DayComponent from '../../components/DayComponent/DayComponent';
// Helpers
import { getDateStringFormatYearMonth } from '../../helpers/moment';
import { getPreviousMonth, getNextMonth, getMonthDaysArr, getMonthName } from '../../helpers/calendar/month';
import { redirectToCurrentDate, validateYearMonth } from '../../helpers/validation/validate';
import { getFullYear } from '../../helpers/calendar/year';
import { getDayEventsObject } from '../../helpers/events/dayEventsObject';
// Styles
import * as styles from './MonthPage.scss';

class MonthPage extends Component {
  componentWillMount() {
    const { year, month } = this.props.params;
    const { history, currentDate } = this.props;
    const dateIsNotValid = !validateYearMonth({ year, month });
    if (dateIsNotValid) {
      redirectToCurrentDate(history, currentDate);
    }
  }

  renderDayComponent = ({ key, isCurrentDay, calendarDay, weekday, day }) => {
    const { dayEvents } = this.props;
    const { fullDayEvents, hourlyEvents, transitionalEvents } = getDayEventsObject(dayEvents, calendarDay);
    return (
      <DayComponent
        key={key}
        isCurrentDay={isCurrentDay}
        day={day}
        weekday={weekday}
        calendarDay={calendarDay}
        hourlyEvents={hourlyEvents}
        fullDayEvents={fullDayEvents}
        transitionalEvents={transitionalEvents}
      />
    );
  };

  renderDaysInMonth = (dateStr) => {
    const monthDaysArr = getMonthDaysArr(dateStr);
    return monthDaysArr.map(dayItem => this.renderDayComponent(dayItem));
  };

  renderPageHeader = dateStr => (
    <PageHeader
      prev={getPreviousMonth(dateStr)}
      next={getNextMonth(dateStr)}
      leftButtonTitle="prev month"
      rightButtonTitle="next month"
    >
      {`${getMonthName(dateStr)} ${getFullYear(dateStr)}`}
    </PageHeader>
  );

  render() {
    const { year, month } = this.props.params;
    const dateStr = getDateStringFormatYearMonth({ year, month });
    return (
      <div className={styles.month}>
        { this.renderPageHeader(dateStr) }
        <PageContent>{ this.renderDaysInMonth(dateStr) }</PageContent>
      </div>
    );
  }
}

MonthPage.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object,
  currentDate: PropTypes.string,
  dayEvents: PropTypes.object
};

const mapStateToProps = state => ({
  currentDate: state.currentDate.currentMonthNow,
  dayEvents: state.loadEventItem.calendarDayEvents
});

export default withRouter(
  connect(mapStateToProps)(MonthPage)
);
