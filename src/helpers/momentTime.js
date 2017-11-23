// Modules
import moment from 'moment';
// Constants
import stringFormats, { supportedDateTimeStringFormats } from '../constants/stringFormats';

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

export const getMomentFullDateTimeFormat = dateStr => moment(dateStr, stringFormats.separateSlash_YYYY_MM_DD_HH_mm);

export const formatDateString = dateStr => (
  getMomentFullDateTimeFormat(dateStr).format(stringFormats.HH_mm_MMMM_Do_YYYY)
);

export const convertMomentObjToYearMonthDayFormat = momentObj => (
  momentObj.format(stringFormats.separateSlash_YYYY_MM_DD)
);

export const convertMomentObjToHHmmFormat = momentObj => momentObj.format(stringFormats.HH_mm);

export const getMomentFromDateTimeString = dateTimeString => moment(dateTimeString, supportedDateTimeStringFormats);

export const checkMomentObjectsIsSameDay = (startMomentObj, endMomentObj) => (
  startMomentObj.isSame(endMomentObj, stringFormats.day)
);

export const checkMomentObjectsIsAfterDay = (startMomentObj, endMomentObj) => (
  endMomentObj.isAfter(startMomentObj, stringFormats.day)
);

export const convertMomentObjToISOString = momentObj => momentObj.toISOString();

export const getMomentByISOString = ISOString => moment(ISOString);

export const getNextDayMoment = prevDayMoment => prevDayMoment.add(1, stringFormats.day);
