// Helpers
import { getItemFromStorage, safeItemToStorage } from '../helpers/localStorage';
import { createEventItemObject, sortEventItemsList } from '../helpers/calendarEvents';
// Constants
import * as actionTypes from '../constants/actionTypes';
import storage from '../constants/localStorage';

const initialState = {
  events: [],
  currentEventItem: {},
  calendarDayEvents: new Map(),
  eventsListSorted: false,
  eventsListPending: false,
  eventsListRejected: false,
  deleteEventItemError: false,
  eventItemDeleted: false,
  deleteEventItemPending: false,
  editEventItemPending: false,
  editEventItemFulfilled: false,
  editEventItemRejected: false,
  addEventPending: false,
  addEventError: false,
  eventCreated: false,
  errorText: ''
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS_LIST_PENDING: {
      return {
        ...state,
        eventsListPending: true,
        eventsListSorted: false,
        eventsListRejected: false
      };
    }
    case actionTypes.GET_EVENTS_LIST_FULFILLED: {
      return {
        ...state,
        eventsListPending: false,
        eventsListRejected: false
      };
    }
    case actionTypes.GET_EVENTS_LIST_REJECTED: {
      return {
        ...state,
        eventsListPending: false,
        eventsListRejected: true
      };
    }
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
        addEventPending: true,
        addEventError: false,
        eventCreated: false,
        errorText: ''
      };
    }
    case actionTypes.ADD_EVENT_REJECTED: {
      return {
        ...state,
        errorText: action.payload,
        addEventPending: false,
        addEventError: true
      };
    }
    case actionTypes.ADD_EVENT_FULFILLED: {
      const eventObject = createEventItemObject(action.payload);
      const eventsList = [...state.events, eventObject];
      safeItemToStorage(storage.eventsListKey, eventsList);
      return {
        ...state,
        events: eventsList,
        addEventPending: false,
        eventCreated: true
      };
    }
    case actionTypes.GET_EVENT_ITEM_BY_ID: {
      const currentEventItem = state.events.find(({ id }) => (id === action.payload));
      return {
        ...state,
        currentEventItem
      };
    }
    case actionTypes.DELETE_EVENT_ITEM_PENDING: {
      return {
        ...state,
        deleteEventItemPending: true,
        deleteEventItemError: false,
        eventItemDeleted: false
      };
    }
    case actionTypes.DELETE_EVENT_ITEM_REJECTED: {
      return {
        ...state,
        deleteEventItemPending: false,
        deleteEventItemError: true,
        eventItemDeleted: false
      };
    }
    case actionTypes.DELETE_EVENT_ITEM_FULFILLED: {
      const eventsList = state.events.filter(({ id }) => (id !== action.payload));
      safeItemToStorage(storage.eventsListKey, eventsList);
      return {
        ...state,
        deleteEventItemPending: false,
        deleteEventItemError: false,
        eventItemDeleted: true,
        events: eventsList
      };
    }
    case actionTypes.SAVE_EVENT_CHANGES_PENDING: {
      return {
        ...state,
        saveEventChangesPending: true,
        saveEventChangesError: false,
        eventChangesSaved: false
      };
    }
    case actionTypes.SAVE_EVENT_CHANGES_REJECTED: {
      return {
        ...state,
        saveEventChangesPending: false,
        saveEventChangesError: true,
        eventChangesSaved: false
      };
    }
    case actionTypes.SAVE_EVENT_CHANGES_FULFILLED: {
      const filteredEventsList = state.events.filter(({ id }) => (id !== action.payload.id));
      const eventObject = createEventItemObject(action.payload);
      const eventsList = [...filteredEventsList, eventObject];
      state.calendarDayEvents.clear();
      safeItemToStorage(storage.eventsListKey, eventsList);
      return {
        ...state,
        saveEventChangesPending: false,
        saveEventChangesError: false,
        eventChangesSaved: true,
        eventCreated: true,
        events: eventsList
      };
    }
    case actionTypes.EDIT_EVENT_ITEM_PENDING: {
      return {
        ...state,
        editEventItemPending: true,
        editEventItemFulfilled: false,
        editEventItemRejected: false
      };
    }
    case actionTypes.EDIT_EVENT_ITEM_FULFILLED: {
      return {
        ...state,
        editEventItemPending: false,
        editEventItemFulfilled: true,
        editEventItemRejected: false
      };
    }
    case actionTypes.EDIT_EVENT_ITEM_REJECTED: {
      return {
        ...state,
        editEventItemPending: false,
        editEventItemFulfilled: false,
        editEventItemRejected: true
      };
    }
    case actionTypes.CLEAR_CURRENT_EVENT_ITEM: {
      return {
        ...state,
        eventCreated: false,
        currentEventItem: {}
      };
    }
    case actionTypes.SORT_EVENTS_LIST: {
      const { calendarDayEvents } = state;
      calendarDayEvents.clear();
      state.events.forEach(
        eventItem => sortEventItemsList(eventItem, calendarDayEvents)
      );
      return {
        ...state,
        eventsListSorted: true,
        calendarDayEvents
      };
    }
    default:
      return state;
  }
};

export default events;
