// Helpers
import { createUniqueStringId } from '../helpers/eventsList';
import { getItemFromStorage, safeItemToStorage } from '../helpers/localStorage';
// Constants
import * as actionTypes from '../constants/actionTypes';
import storage from '../constants/localStorage';

const initialState = {
  events: [],
  currentEventItem: {},
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
    case actionTypes.GET_EVENT_ITEM_BY_ID: {
      const currentEventItem = state.events.find(({ id }) => (id === action.payload));
      return {
        ...state,
        currentEventItem
      };
    }
    case actionTypes.DELETE_EVENT_ITEM: {
      const eventsList = state.events.filter(({ id }) => (id !== action.payload));
      safeItemToStorage(storage.eventsListKey, eventsList);
      return {
        ...state,
        events: eventsList
      };
    }
    case actionTypes.SAVE_EVENT_CHANGES: {
      const eventsList = state.events.filter(({ id }) => (id !== action.payload.id));
      eventsList.push(action.payload);
      safeItemToStorage(storage.eventsListKey, eventsList);
      return {
        ...state,
        created: true,
        events: eventsList
      };
    }
    case actionTypes.CLEAR_CURRENT_EVENT_ITEM: {
      return {
        ...state,
        created: false,
        currentEventItem: {}
      };
    }
    default:
      return state;
  }
};

export default events;
