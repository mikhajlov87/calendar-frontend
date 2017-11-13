// Modules
import moment from 'moment';
// Constants
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

export const checkIsSameDate = (initialDateValue, verificationDate, dateFormatString) => {
  const initialDateMoment = getMomentYearMonthFormat(initialDateValue);
  const verificationMoment = getMomentYearMonthDayFormat(verificationDate);
  return initialDateMoment.isSame(verificationMoment, dateFormatString);
};

export const getMomentFullDateTimeFormat = dateStr => moment(dateStr, stringFormats.separateSlash_YYYY_MM_DD_HH_mm);

export const checkIsBeforeMomentToMinutes = (firstEventMoment, secondEventMoment) => (
  firstEventMoment.isBefore(secondEventMoment, stringFormats.minute)
);

export const formatDateString = dateStr => (
  getMomentFullDateTimeFormat(dateStr).format(stringFormats.HH_mm_MMMM_Do_YYYY)
);
