import timeConstant from '../constants/dataTime';
import { getMomentYearMonthDayFormat, getMomentYearMonthFormat } from './momentTime';

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

export const redirectToCurrentDate = (history, date) => history.push(`/${date}`);
