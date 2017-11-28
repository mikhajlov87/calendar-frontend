// Modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// Components
import MonthComponent from '../../components/MonthComponent/MonthComponent';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
// Helpers
import { getFullYear, getMonthsInYear, getPreviousYear, getNextYear } from '../../helpers/calendar/year';
import { redirectToCurrentDate, validateYear } from '../../helpers/validation/validate';
// Styles
import * as styles from './YearPage.scss';

class YearPage extends Component {
  componentWillMount() {
    const { year } = this.props.params;
    const { history, currentMonthNow } = this.props;
    const yearIsNotValid = !validateYear(year);
    if (yearIsNotValid) {
      redirectToCurrentDate(history, currentMonthNow);
    }
  }

  renderMonthComponent = ({ key, name, url, isCurrentMonth }) => (
    <MonthComponent
      key={key}
      monthName={name}
      monthUrl={url}
      currentMonth={isCurrentMonth}
    />
  );

  renderMonthInYear = (year) => {
    const monthsArr = getMonthsInYear(year);
    return monthsArr.map(this.renderMonthComponent);
  };

  renderPageHeader = year => (
    <PageHeader
      prev={getPreviousYear(year)}
      next={getNextYear(year)}
      leftButtonTitle="prev year"
      rightButtonTitle="next year"
    >
      { getFullYear(year) }
    </PageHeader>
  );

  render() {
    const { year } = this.props.params;
    return (
      <div className={styles.year}>
        { this.renderPageHeader(year) }
        <PageContent>{ this.renderMonthInYear(year) }</PageContent>
      </div>
    );
  }
}

YearPage.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object,
  currentMonthNow: PropTypes.string
};

const mapStateToProps = state => ({
  currentMonthNow: state.currentDate.currentMonthNow
});

export default withRouter(
  connect(mapStateToProps)(YearPage)
);
