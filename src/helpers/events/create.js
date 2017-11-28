// Constants
import timeConstants from '../../constants/dateTime';
// Helpers
import {
  getMomentFromDateTimeString,
  convertMomentObjToHHmmFormat,
  convertMomentObjToISOString,
  convertMomentObjToYearMonthDayFormat,
  checkMomentObjectsIsAfterDay,
  checkMomentObjectsIsSameDay
} from '../moment';

export const createUniqueStringId = () => {
  const radix = 16;
  const date = new Date().getTime();
  return date.toString(radix);
};

export const checkIsEventItemExist = (eventsList, eventItemId) => (
  eventsList.some(({ id }) => (eventItemId === id))
);

const getStartDateTimeStr = ({ startDate, startTime, isFullDay }) => (
  (isFullDay)
    ? (`${startDate} ${timeConstants.START_DAY_TIME}`)
    : (`${startDate} ${startTime}`)
);

const getEndDateTimeStr = ({ startDate, endDate, endTime, isFullDay }, startDateStr) => {
  if (!isFullDay) {
    const eventEndTimeStr = (endTime || timeConstants.END_DAY_TIME);
    const endEventDateStr = (endDate || startDate);
    return (`${endEventDateStr} ${eventEndTimeStr}`);
  }
  return startDateStr;
};

export const createEventItemObject = (eventItem) => {
  const startDateTimeStr = getStartDateTimeStr(eventItem);
  const endDateTimeStr = getEndDateTimeStr(eventItem, startDateTimeStr);
  const startEventMoment = getMomentFromDateTimeString(startDateTimeStr);
  const endEventMoment = getMomentFromDateTimeString(endDateTimeStr);
  const defaultEventDescription = 'No Descriptions here';
  return {
    eventName: eventItem.eventName,
    startDate: convertMomentObjToYearMonthDayFormat(startEventMoment),
    startTime: convertMomentObjToHHmmFormat(startEventMoment),
    endDate: convertMomentObjToYearMonthDayFormat(endEventMoment),
    endTime: convertMomentObjToHHmmFormat(endEventMoment),
    eventCaption: (eventItem.eventCaption || defaultEventDescription),
    id: (eventItem.id || createUniqueStringId()),
    isFullDay: (eventItem.isFullDay || false),
    startEventISOString: convertMomentObjToISOString(startEventMoment),
    endEventISOString: convertMomentObjToISOString(endEventMoment),
    isFullDayEvent: (eventItem.isFullDay || false),
    isTransitionalEvent: (!eventItem.isFullDay && (checkMomentObjectsIsAfterDay(startEventMoment, endEventMoment))),
    isHourlyEvent: (!eventItem.isFullDay && (checkMomentObjectsIsSameDay(startEventMoment, endEventMoment)))
  };
};
