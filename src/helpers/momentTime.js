import moment from 'moment';
import stringFormats from '../constants/stringFormats';

export const getMoment = () => moment();

export const getDateStringFormatYearMonthDay = ({ year, month, day }) => `${year} ${month} ${day}`;

export const getDateStringFormatYearMonth = ({ year, month }) => `${year} ${month}`;

export const getMomentYearMonthDayFormat = dateStr => moment(dateStr, stringFormats.separateSpace_YYYY_MM_D);

export const getMomentYearMonthFormat = dateStr => moment(dateStr, stringFormats.separateSpace_YYYY_MM);

export const getMomentYearFormat = dateStr => moment(dateStr, stringFormats.fullYear_YYYY);

export const getMonthName = dateStr => (
  getMomentYearMonthDayFormat(dateStr)
    .format(stringFormats.fullMonthName_MMMM)
);
