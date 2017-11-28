// Helpers
import { getMomentByISOString } from '../moment';
import { getDayEventsObject } from './dayEventsObject';
import { getNextDayEventItem } from './dayEventItem';

export const checkIsSameOrBeforeMoment = ({ startEventISOString, endEventISOString }) => {
  const startMoment = getMomentByISOString(startEventISOString);
  const endMoment = getMomentByISOString(endEventISOString);
  return startMoment.isSameOrBefore(endMoment);
};

const setEventItemToTransitionalEventsList = (mapInstance, currentEventItemObject, nextDayEventItem) => {
  const { id, startDate } = nextDayEventItem;
  const dayEventsObj = getDayEventsObject(mapInstance, startDate);
  const { transitionalEvents } = dayEventsObj;
  transitionalEvents.set(id, currentEventItemObject);
};

// Recursion inside!
export const checkNextDayIsSameOrBeforeDayEvent = (mapInstance, currentEventItemObject, nextDay) => {
  const nextDayEventItem = getNextDayEventItem(nextDay);
  const isSameOrBeforeDayEventMoment = checkIsSameOrBeforeMoment(nextDayEventItem);

  if (isSameOrBeforeDayEventMoment) {
    createTransitionalEventsLists(mapInstance, currentEventItemObject, nextDayEventItem); // eslint-disable-line
  }
  return false;
};

export const createTransitionalEventsLists = (mapInstance, currentEventItemObject, nextDayEventItem) => {
  setEventItemToTransitionalEventsList(mapInstance, currentEventItemObject, nextDayEventItem);
  checkNextDayIsSameOrBeforeDayEvent(mapInstance, currentEventItemObject, nextDayEventItem);
};
