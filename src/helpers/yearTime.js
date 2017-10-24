import moment from 'moment';
import { getMomentYearFormat } from './momentTime';
import stringFormats from '../constants/stringFormats';
import timeConstant from '../constants/dataTime';

export const getFullYear = dateStr => (
  getMomentYearFormat(dateStr).format(stringFormats.fullYear_YYYY)
);

export const getMonthsInYear = (year) => {
  const now = moment();
  const currentYear = moment([year], stringFormats.fullYear_YYYY);
  const monthsArr = [];
  for (let i = 0; i < timeConstant.COUNT_MONTHS_IN_YEAR; i++) {
    const currentMonth = currentYear.month(i);
    const monthKey = currentMonth.format('x');
    monthsArr.push({
      key: parseInt(monthKey, 16),
      name: currentMonth.format(stringFormats.fullMonthName_MMMM),
      url: currentMonth.format(stringFormats.MM),
      isCurrentMonth: now.isSame(currentMonth, 'month')
    });
  }
  return monthsArr;
};

export const getNextYear = year => (
  getMomentYearFormat(year)
    .add(1, 'years')
    .format(stringFormats.fullYear_YYYY)
);

export const getPreviousYear = year => (
  getMomentYearFormat(year)
    .subtract(1, 'years')
    .format(stringFormats.fullYear_YYYY)
);
