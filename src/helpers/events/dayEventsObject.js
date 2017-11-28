// Constructor
export const DayEventsObject = () => ({
  fullDayEvents: new Map(),
  transitionalEvents: new Map(),
  hourlyEvents: new Map()
});

export const getDayEventsObject = (dayEventsMapArr, key) => (
  (dayEventsMapArr.get(key)) || (dayEventsMapArr.set(key, new DayEventsObject())).get(key)
);

export const mapInstanceToArray = (mapInstance) => {
  const arr = [];
  mapInstance.forEach(val => arr.push(val));
  return arr;
};
