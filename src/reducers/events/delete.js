// Constants
import {
  DELETE_EVENT_ITEM_PENDING,
  DELETE_EVENT_ITEM_FULFILLED,
  DELETE_EVENT_ITEM_REJECTED
} from '../../constants/actions/events/delete';
import storage from '../../constants/localStorage';
// Helpers
import { saveItemToStorage, getItemFromStorage } from '../../helpers/localStorage';

const initialState = {
  pending: false,
  rejected: false,
  fulfilled: false
};

const deleteEventItem = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EVENT_ITEM_PENDING: {
      return {
        ...state,
        pending: true,
        rejected: false,
        fulfilled: false
      };
    }
    case DELETE_EVENT_ITEM_REJECTED: {
      return {
        ...state,
        pending: false,
        rejected: true
      };
    }
    case DELETE_EVENT_ITEM_FULFILLED: {
      const eventItemId = action.payload;
      const storageKey = storage.eventsListKey;
      const eventsList = getItemFromStorage(storageKey);
      const filteredEventsList = eventsList.filter(
        ({ id }) => (id !== eventItemId)
      );
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

export default deleteEventItem;
