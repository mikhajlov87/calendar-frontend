// Constants
import {
  CREATE_EVENT_ITEM_PENDING,
  CREATE_EVENT_ITEM_FULFILLED,
  CREATE_EVENT_ITEM_REJECTED
} from '../../constants/actions/events/create';
import storage from '../../constants/localStorage';
// Helpers
import { createEventItemObject } from '../../helpers/events/create';
import { saveItemToStorage, getItemFromStorage } from '../../helpers/localStorage';

const initialState = {
  pending: false,
  rejected: false,
  fulfilled: false,
  errorMessage: ''
};

const createEventItem = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT_ITEM_PENDING: {
      return {
        ...state,
        pending: true,
        rejected: false,
        fulfilled: false,
        errorMessage: ''
      };
    }
    case CREATE_EVENT_ITEM_REJECTED: {
      const mockErrorStatusCode = action.payload;
      return {
        ...state,
        errorMessage: mockErrorStatusCode,
        pending: false,
        rejected: true
      };
    }
    case CREATE_EVENT_ITEM_FULFILLED: {
      const eventItemObjectData = action.payload;
      const eventItemObject = createEventItemObject(eventItemObjectData);
      const storageKey = storage.eventsListKey;
      const eventsList = getItemFromStorage(storageKey);
      eventsList.push(eventItemObject);
      saveItemToStorage(storage.eventsListKey, eventsList);
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

export default createEventItem;
