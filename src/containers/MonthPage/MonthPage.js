// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// Components
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import DayComponent from '../../components/DayComponent/DayComponent';
// Actions
import * as pageActions from '../../actions';
// Helpers
import { getDateStringFormatYearMonth } from '../../helpers/momentTime';
import { getPreviousMonth, getNextMonth, getMonthDaysArr, getMonthName } from '../../helpers/monthTime';
import { redirectToCurrentDate, validateYearMonth } from '../../helpers/validate';
import { getFullYear } from '../../helpers/yearTime';
import { DayEventObj } from '../../helpers/calendarEvents';
// Styles
import * as styles from './MonthPage.scss';

class MonthPage extends Component {
  componentWillMount() {
    const { year, month } = this.props.params;
    const { history, date } = this.props;
    const dateIsNotValid = !validateYearMonth({ year, month });
    if (dateIsNotValid) {
      redirectToCurrentDate(history, date);
    }
  }

  renderDayComponent = ({ key, isCurrentDay, calendarDay, weekday, day }) => {
    const { dayEvents } = this.props;
    const { fullDayEvents, hourlyEvents, transitionalEvents } = dayEvents.get(calendarDay) || new DayEventObj();
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
  date: PropTypes.string,
  dayEvents: PropTypes.object
};

const mapStateToProps = state => ({
  date: state.currentDate.date,
  eventsList: state.events.events,
  dayEvents: state.events.calendarDayEvents
});

const mapDispatchToProps = dispatch => ({
  pageActions: bindActionCreators(pageActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonthPage));
