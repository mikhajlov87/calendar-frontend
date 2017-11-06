import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import DayComponent from '../../components/DayComponent/DayComponent';
import * as pageActions from '../../actions';
import { getDateStringFormatYearMonth } from '../../helpers/momentTime';
import { getPreviousMonth, getNextMonth, getMonthDaysArr, getMonthName } from '../../helpers/monthTime';
import { redirectToCurrentDate, validateYearMonth } from '../../helpers/validate';
import { getFullYear } from '../../helpers/yearTime';
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

  renderDaysInMonth = (dateStr) => {
    const monthDaysArr = getMonthDaysArr(dateStr);
    return monthDaysArr.map(
      item => (
        <DayComponent
          key={item.key}
          day={item.day}
          weekday={item.weekDay}
          today={item.isCurrentDay}
        />
      )
    );
  };

  render() {
    const { year, month } = this.props.params;
    const dateStr = getDateStringFormatYearMonth({ year, month });
    return (
      <div className={styles.month}>
        <PageHeader
          prev={getPreviousMonth(dateStr)}
          next={getNextMonth(dateStr)}
          leftButtonTitle="prev month"
          rightButtonTitle="next month"
        >
          {`${getMonthName(dateStr)} ${getFullYear(dateStr)}`}
        </PageHeader>
        <PageContent>{ this.renderDaysInMonth(dateStr) }</PageContent>
      </div>
    );
  }
}

MonthPage.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object,
  date: PropTypes.string
};

const mapStateToProps = state => ({
  date: state.currentDate.date
});

const mapDispatchToProps = dispatch => ({
  pageActions: bindActionCreators(pageActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonthPage));
