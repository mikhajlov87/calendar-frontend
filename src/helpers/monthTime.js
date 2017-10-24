import { getMoment, getMomentYearMonthFormat } from './momentTime';
import stringFormats from '../constants/stringFormats';

export const getPreviousMonth = dateStr => (
  getMomentYearMonthFormat(dateStr)
    .subtract(1, stringFormats.months)
    .format(stringFormats.separateSlash_YYYY_MM)
);

export const getNextMonth = dateStr => (
  getMomentYearMonthFormat(dateStr)
    .add(1, stringFormats.months)
    .format(stringFormats.separateSlash_YYYY_MM)
);

export const getMonthName = dateStr => (
  getMomentYearMonthFormat(dateStr)
    .format(stringFormats.fullMonthName_MMMM)
);

export const getMonthDaysArr = (dateStr) => {
  const now = getMoment();
  const monthMoment = getMomentYearMonthFormat(dateStr);
  const daysInMonth = monthMoment.daysInMonth();
  const daysArr = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = monthMoment.date(i);
    const dateKey = date.format('x');
    daysArr.push({
      key: parseInt(dateKey, 16),
      day: date.format(stringFormats.D),
      weekDay: date.format(stringFormats.shortWeekday_ddd),
      isCurrentDay: now.isSame(date, 'day')
    });
  }
  return daysArr;
};
