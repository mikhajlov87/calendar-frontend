// Constants
import storage from '../../constants/localStorage';
import {
  GET_EVENTS_LIST_PENDING,
  GET_EVENTS_LIST_REJECTED,
  GET_EVENTS_LIST_FULFILLED,
  GET_EVENT_ITEM_BY_ID,
  CLEAR_CURRENT_EVENT_ITEM
} from '../../constants/actions/events/load';
import { SORT_EVENTS_LIST } from '../../constants/actions/events/sort';
import { ADD_SAVED_EVENTS_LIST_TO_STORAGE } from '../../constants/actions/events/save';
// Helpers
import { sortEventItemsList } from '../../helpers/events/sort';
import { getItemFromStorage } from '../../helpers/localStorage';

const initialState = {
  events: [],
  calendarDayEvents: new Map(),
  currentEventItem: {},
  sorted: false,
  pending: false,
  rejected: false,
  fulfilled: false
};

const eventsList = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_LIST_PENDING: {
      return {
        ...state,
        pending: true,
        rejected: false,
        fulfilled: false
      };
    }
    case GET_EVENTS_LIST_FULFILLED: {
      return {
        ...state,
        pending: false,
        fulfilled: true
      };
    }
    case GET_EVENTS_LIST_REJECTED: {
      return {
        ...state,
        pending: false,
        rejected: true,
        events: []
      };
    }
    case ADD_SAVED_EVENTS_LIST_TO_STORAGE: {
      const storageKey = storage.eventsListKey;
      const savedEventsList = getItemFromStorage(storageKey);
      return {
        ...state,
        events: savedEventsList || state.events
      };
    }
    case SORT_EVENTS_LIST: {
      const { calendarDayEvents } = state;
      calendarDayEvents.clear();
      state.events.forEach(
        eventItem => sortEventItemsList(eventItem, calendarDayEvents)
      );
      return {
        ...state,
        sorted: true,
        calendarDayEvents
      };
    }
    case GET_EVENT_ITEM_BY_ID: {
      const eventItemId = action.payload;
      const foundEventItem = state.events.find(
        ({ id }) => (id === eventItemId)
      );
      return {
        ...state,
        currentEventItem: foundEventItem
      };
    }
    case CLEAR_CURRENT_EVENT_ITEM: {
      return {
        ...state,
        currentEventItem: {}
      };
    }
    default: {
      return state;
    }
  }
};

export default eventsList;
