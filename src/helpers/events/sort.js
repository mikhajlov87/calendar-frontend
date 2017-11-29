// Helpers
import { getDayEventsObject } from './dayEventsObject';
import { createTransitionalEventsLists } from './transitionalEvents';

export const setItemIntoMapInstanceByEventType = (eventItem, calendarDayEvents) => {
  if (eventItem) {
    const { isFullDayEvent, isTransitionalEvent, isHourlyEvent, startDate, id } = eventItem;
    const { fullDayEvents, hourlyEvents } = getDayEventsObject(calendarDayEvents, startDate);
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
        createTransitionalEventsLists(calendarDayEvents, eventItem, eventItem);
        break;
      }
      default:
        break;
    }
  }
  return false;
};

export default setItemIntoMapInstanceByEventType;
