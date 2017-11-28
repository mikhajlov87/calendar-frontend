// Helpers
import { createEventItemObject } from '../../helpers/events/create';
import { saveItemToStorage, getItemFromStorage } from '../../helpers/localStorage';
// Constants
import {
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_FULFILLED,
  UPDATE_EVENT_REJECTED
} from '../../constants/actions/events/update';
import storage from '../../constants/localStorage';

const initialState = {
  pending: false,
  rejected: false,
  fulfilled: false
};

const updateEvents = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EVENT_PENDING: {
      return {
        ...state,
        pending: true,
        rejected: false,
        fulfilled: false
      };
    }
    case UPDATE_EVENT_REJECTED: {
      return {
        ...state,
        pending: false,
        rejected: true
      };
    }
    case UPDATE_EVENT_FULFILLED: {
      const updatedEventItemObject = action.payload;
      const eventItemId = updatedEventItemObject.id;
      const storageKey = storage.eventsListKey;
      const eventsList = getItemFromStorage(storageKey);
      const filteredEventsList = eventsList.filter(
        ({ id }) => (id !== eventItemId)
      );
      const eventItemObject = createEventItemObject(updatedEventItemObject);
      filteredEventsList.push(eventItemObject);
      saveItemToStorage(storage.eventsListKey, filteredEventsList);
      return {
        ...state,
        pending: false,
        fulfilled: true
      };
    }
    default: {
      return state;
    }
  }
};

export default updateEvents;
