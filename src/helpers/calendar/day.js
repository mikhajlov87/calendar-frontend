// Modules
import moment from 'moment';
// Helpers
import { getMomentYearMonthDayFormat } from '../moment';
// Constants
import timeConstant from '../../constants/dateTime';
import stringFormats from '../../constants/stringFormats';

export const getPreviousDay = dateStr => (
  getMomentYearMonthDayFormat(dateStr)
    .subtract(1, stringFormats.days)
    .format(stringFormats.separateSlash_YYYY_MM_DD)
);

export const getDayNumber = dateStr => (
  getMomentYearMonthDayFormat(dateStr)
    .format(stringFormats.D)
);

export const getNextDay = dateStr => (
  getMomentYearMonthDayFormat(dateStr)
    .add(1, stringFormats.days)
    .format(stringFormats.separateSlash_YYYY_MM_DD)
);

export const getDayHoursArr = () => {
  const hoursArr = [];
  for (let i = 0; i < timeConstant.COUNT_HOURS_IN_DAY; i++) {
    const hour = moment(`${i}:00`, stringFormats.HH_mm);
    const key = hour.format('x');
    hoursArr.push({
      key: parseInt(key, 16),
      hour: hour.format(stringFormats.HH_mm)
    });
  }
  return hoursArr;
};

export const makeConvertConfig = ({ year, month, day }) => ({
  dateStr: `${year} ${month} ${day}`,
  from: stringFormats.separateSpace_YYYY_MM_D,
  to: stringFormats.separateSlash_YYYY_MM_DD
});

export const convertDateString = ({ dateStr, from, to }) => moment(dateStr, from).format(to);

export const convertToDefaultFormat = dateString => dateString.split('/').join('-');

export const isBetweenHour = ({ startTime, endTime }) => (
  moment(convertToDefaultFormat(startTime))
    .isBetween(convertToDefaultFormat(endTime), convertToDefaultFormat(endTime), 'hour', '[]')
);
