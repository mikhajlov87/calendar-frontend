// Modules
import moment from 'moment';
// Helpers
import { checkIsSameDate, getMomentFullDateTimeFormat, checkIsBeforeMomentToMinutes } from './momentTime';
// Constants
import stringFormats, { supportedDateStringFormats } from '../constants/stringFormats';

export const createUniqueStringId = () => {
  const radix = 16;
  const date = new Date().getTime();
  return date.toString(radix);
};

export const findMonthEvents = (eventsList, currentDate) => (
  eventsList.filter(({ startDate }) => checkIsSameDate(currentDate, startDate, stringFormats.month))
);

export const compareEvents = (firstEvent, secondEvent) => {
  const firstEventMoment = getMomentFullDateTimeFormat(`${firstEvent.startDate} ${firstEvent.startTime}`);
  const secondEventMoment = getMomentFullDateTimeFormat(`${secondEvent.startDate} ${secondEvent.startTime}`);
  if (checkIsBeforeMomentToMinutes(firstEventMoment, secondEventMoment)) { return -1; }
  if (checkIsBeforeMomentToMinutes(secondEventMoment, firstEventMoment)) { return 1; }
  return 0;
};

export const checkIsBetweenMoment = (currentDate, { startDate, endDate }) => {
  const currentDateMoment = moment(currentDate, supportedDateStringFormats);
  const startDateMoment = moment(startDate, supportedDateStringFormats);
  const endDateMoment = moment(endDate, supportedDateStringFormats);
  return currentDateMoment.isBetween(startDateMoment, endDateMoment, null, '[]');
};
