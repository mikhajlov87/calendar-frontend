import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageContent from '../../components/PageContent/PageContent';
import HourComponent from '../../components/Hour/HourComponent';
import { getMonthName, getDateStringFormatYearMonthDay } from '../../helpers/momentTime';
import { getNextDay, getDayNumber, getPreviousDay, getDayHoursArr } from '../../helpers/dayTime';
import { validateDate, redirectToCurrentDate } from '../../helpers/validate';
import * as styles from './DayPage.scss';

class DayPage extends Component {
  componentWillMount() {
    const { year, month, day } = this.props.params;
    const { history, date } = this.props;
    const dateIsNotValid = !validateDate({ year, month, day });
    if (dateIsNotValid) {
      redirectToCurrentDate(history, date);
    }
  }
  renderDayHours = () => {
    const dayHours = getDayHoursArr();
    return dayHours.map(
      item => (
        <HourComponent key={item.key} hour={item.hour}>{}</HourComponent>
      )
    );
  };
  render() {
    console.log(this);
    const { year, month, day } = this.props.params;
    const dateStr = getDateStringFormatYearMonthDay({ year, month, day });
    return (
      <div className={styles.day}>
        <PageHeader
          leftButtonTitle="prev day"
          rightButtonTitle="next day"
          prev={getPreviousDay(dateStr)}
          next={getNextDay(dateStr)}
        >
          {`${getDayNumber(dateStr)} ${getMonthName(dateStr)}`}
        </PageHeader>
        <PageContent>{ this.renderDayHours() }</PageContent>
      </div>
    );
  }
}

DayPage.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object,
  date: PropTypes.string
};

const mapStateToProps = state => ({
  date: state.currentDate.date
});

export default withRouter(connect(mapStateToProps)(DayPage));
