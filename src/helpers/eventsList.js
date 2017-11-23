export const createUniqueStringId = () => {
  const radix = 16;
  const date = new Date().getTime();
  return date.toString(radix);
};

export const checkIsEventItemExist = (eventsList, eventItemId) => eventsList.some(({ id }) => (eventItemId === id));
