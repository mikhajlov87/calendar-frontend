// Helpers
import { createUniqueStringId } from '../helpers/eventsList';
import { getItemFromStorage, safeItemToStorage } from '../helpers/localStorage';
// Constants
import * as actionTypes from '../constants/actionTypes';
import storage from '../constants/localStorage';

const initialState = {
  events: [],
  pending: false,
  error: false,
  created: false,
  errorText: ''
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SAVED_EVENTS_LIST_TO_STORAGE: {
      const savedEventsList = getItemFromStorage(storage.eventsListKey);
      return {
        ...state,
        events: savedEventsList || state.events
      };
    }
    case actionTypes.ADD_EVENT_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
        created: false,
        errorText: ''
      };
    }
    case actionTypes.ADD_EVENT_REJECTED: {
      return {
        ...state,
        errorText: action.payload,
        pending: false,
        error: true
      };
    }
    case actionTypes.ADD_EVENT_FULFILLED: {
      const eventObject = { ...action.payload, id: createUniqueStringId() };
      const eventsList = [...state.events, eventObject];
      safeItemToStorage(storage.eventsListKey, eventsList);
      return {
        ...state,
        events: eventsList,
        pending: false,
        created: true
      };
    }
    default:
      return state;
  }
};

export default events;
