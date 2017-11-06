import moment from 'moment';
import timeConstant from '../constants/dataTime';
import { supportedDateStringFormats } from '../constants/stringFormats';
import { getMomentYearMonthDayFormat, getMomentYearMonthFormat } from './momentTime';

export const validateDateString = str => moment(str, supportedDateStringFormats, true).isValid();

export const validateYear = year => (+year > 0) && (year.length <= timeConstant.YEAR_STRING_LENGTH);

export const validateMonth = month => (+month > 0) && (month.length <= timeConstant.MONTH_STRING_LENGTH);

export const validateDay = day => (+day > 0) && (day.length <= timeConstant.DAY_STRING_LENGTH);

export const validateYearMonth = ({ year, month }) => (
  validateYear(year)
  && validateMonth(month)
  && getMomentYearMonthFormat(`${year} ${month}`).isValid()
);

export const validateDate = ({ year, month, day }) => (
  validateYear(year)
  && validateMonth(month)
  && validateDay(day)
  && getMomentYearMonthDayFormat(`${year} ${month} ${day}`).isValid()
);

export const checkDatePastTime = (startDate, endDate) => {
  const start = moment(startDate, supportedDateStringFormats, true);
  const end = moment(endDate, supportedDateStringFormats, true);
  if (start.isSame(end)) {
    return true;
  }
  return start.isBefore(end);
};

export const redirectToCurrentDate = (history, date) => history.push(`/${date}`);
