// Helpers
import {
  convertMomentObjToYearMonthDayFormat, convertMomentObjToHHmmFormat, getMomentFromDateTimeString, getMomentByISOString,
  checkMomentObjectsIsSameDay, checkMomentObjectsIsAfterDay, convertMomentObjToISOString, getNextDayMoment
} from './momentTime';
import { createUniqueStringId } from './eventsList';
// Constants
import timeConstants from '../constants/dataTime';
// Constructor
export const DayEventObj = () => ({
  fullDayEvents: new Map(),
  transitionalEvents: new Map(),
  hourlyEvents: new Map()
});

export const getDayEventsObj = (dayEventsMapArr, key) => (
  (dayEventsMapArr.get(key)) || (dayEventsMapArr.set(key, new DayEventObj())).get(key)
);

const createNextDayEventItemObj = (ISOString) => {
  const startDayEventItemMoment = getMomentByISOString(ISOString);
  const nextDayEventItemMoment = getNextDayMoment(startDayEventItemMoment);
  return {
    startDate: convertMomentObjToYearMonthDayFormat(nextDayEventItemMoment),
    startEventISOString: convertMomentObjToISOString(nextDayEventItemMoment)
  };
};

export const checkIsSameOrBeforeMoment = ({ startEventISOString, endEventISOString }) => {
  const startMoment = getMomentByISOString(startEventISOString);
  const endMoment = getMomentByISOString(endEventISOString);
  return startMoment.isSameOrBefore(endMoment);
};

export const setTransitionalEventsLists = (mapInstance, eventItem) => {
  const { id, endEventISOString } = eventItem;
  let iterationCounter = 0;

  const setEventItemToTransitionalEventsList = ({ startDate }) => {
    const dayEventsObj = getDayEventsObj(mapInstance, startDate);
    const { transitionalEvents } = dayEventsObj;
    transitionalEvents.set(id, eventItem);
  };

  const setTransitionalEventsList = ({ startEventISOString }) => {
    const getNextDayEventItem = () => {
      if (iterationCounter) {
        const nextDayEventItemObj = createNextDayEventItemObj(startEventISOString);
        return { ...nextDayEventItemObj, endEventISOString, id };
      }
      return eventItem;
    };

    const nextDayEventItem = getNextDayEventItem();
    const isSameOrBeforeDayEventMoment = checkIsSameOrBeforeMoment(nextDayEventItem);

    if (isSameOrBeforeDayEventMoment) {
      iterationCounter += 1;
      setEventItemToTransitionalEventsList(nextDayEventItem);
      setTransitionalEventsList(nextDayEventItem);
    }
    return false;
  };

  setTransitionalEventsList(eventItem);
};

export const mapInstanceToArray = (mapInstance) => {
  const arr = [];
  mapInstance.forEach(val => arr.push(val));
  return arr;
};

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

export const sortEventItemsList = (eventItem, calendarDayEvents) => {
  const { isFullDayEvent, isTransitionalEvent, isHourlyEvent, startDate, id } = eventItem;
  const { fullDayEvents, hourlyEvents } = getDayEventsObj(calendarDayEvents, startDate);
  switch (true) {
    case isFullDayEvent: {
      fullDayEvents.set(id, eventItem);
      break;
    }
    case isHourlyEvent: {
      hourlyEvents.set(id, eventItem);
      break;
    }
    case isTransitionalEvent: {
      setTransitionalEventsLists(calendarDayEvents, eventItem);
      break;
    }
    default:
      break;
  }
  return false;
};
