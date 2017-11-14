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
import { getFullYear, getMonthsInYear, getPreviousYear, getNextYear } from '../../helpers/yearTime';
import { redirectToCurrentDate, validateYear } from '../../helpers/validate';
// Styles
import * as styles from './YearPage.scss';

class YearPage extends Component {
  componentWillMount() {
    const { year } = this.props.params;
    const { history, date } = this.props;
    const yearIsNotValid = !validateYear(year);
    if (yearIsNotValid) {
      redirectToCurrentDate(history, date);
    }
  }
  renderMonthInYear = (year) => {
    const monthsArr = getMonthsInYear(year);
    return monthsArr.map(item => (
      <MonthComponent
        key={item.key}
        monthName={item.name}
        monthUrl={item.url}
        currentMonth={item.isCurrentMonth}
      />
    ));
  };
  render() {
    const { year } = this.props.params;
    return (
      <div className={styles.year}>
        <PageHeader
          prev={getPreviousYear(year)}
          next={getNextYear(year)}
          leftButtonTitle="prev year"
          rightButtonTitle="next year"
        >
          { getFullYear(year) }
        </PageHeader>
        <PageContent>{ this.renderMonthInYear(year) }</PageContent>
      </div>
    );
  }
}

YearPage.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object,
  date: PropTypes.string
};

const mapStateToProps = state => ({
  date: state.currentDate.date
});

export default withRouter(connect(mapStateToProps)(YearPage));
