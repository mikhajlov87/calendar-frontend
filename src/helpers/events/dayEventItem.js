// Helpers
import {
  getMomentByISOString,
  getNextDayMoment,
  convertMomentObjToISOString,
  convertMomentObjToYearMonthDayFormat
} from '../moment';

export const createNextDayEventItemObject = (ISOString) => {
  const startDayEventItemMoment = getMomentByISOString(ISOString);
  const nextDayEventItemMoment = getNextDayMoment(startDayEventItemMoment);
  return {
    startDate: convertMomentObjToYearMonthDayFormat(nextDayEventItemMoment),
    startEventISOString: convertMomentObjToISOString(nextDayEventItemMoment)
  };
};

export const getNextDayEventItem = (eventItem) => {
  const { startEventISOString, endEventISOString, id } = eventItem;
  const nextDayEventItemObject = createNextDayEventItemObject(startEventISOString);
  return {
    ...nextDayEventItemObject,
    endEventISOString,
    id
  };
};
