// Helpers
import { getMoment, getMomentYearMonthFormat } from './momentTime';
// Constants
import stringFormats from '../constants/stringFormats';

export const getPreviousMonth = dateStr => (
  getMomentYearMonthFormat(dateStr)
    .subtract(1, stringFormats.months)
    .format(stringFormats.separateSlash_YYYY_MM)
);

export const getNextMonth = dateStr => (
  getMomentYearMonthFormat(dateStr)
    .add(1, stringFormats.months)
    .format(stringFormats.separateSlash_YYYY_MM)
);

export const getMonthName = dateStr => (
  getMomentYearMonthFormat(dateStr)
    .format(stringFormats.fullMonthName_MMMM)
);

export const getMonthDaysArr = (dateStr) => {
  const now = getMoment();
  const monthMoment = getMomentYearMonthFormat(dateStr);
  const daysInMonth = monthMoment.daysInMonth();
  const daysArr = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = monthMoment.date(i);
    const dateKey = date.format('x');
    daysArr.push({
      key: parseInt(dateKey, 16),
      day: date.format(stringFormats.D),
      weekday: date.format(stringFormats.shortWeekday_ddd),
      isCurrentDay: now.isSame(date, stringFormats.day),
      calendarDay: date.format(stringFormats.separateSlash_YYYY_MM_DD)
    });
  }
  return daysArr;
};

export const sortEvents = (eventsArr) => {
  const fullDayEvents = [];
  const hourlyEvents = [];
  const transitionalEvents = [];
  eventsArr.forEach((eventItem) => {
    const { isFullDay, startDate, endDate } = eventItem;
    if (isFullDay) {
      return fullDayEvents.push(eventItem);
    }
    if (startDate === endDate) {
      return hourlyEvents.push(eventItem);
    }
    if (startDate !== endDate) {
      return transitionalEvents.push(eventItem);
    }
    return false;
  });
  return { fullDayEvents, hourlyEvents, transitionalEvents };
};
