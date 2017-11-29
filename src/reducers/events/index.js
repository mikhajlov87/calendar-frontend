// Constants
import storage from '../../constants/localStorage';
import * as actionTypesCreate from '../../constants/actions/events/create';
import * as actionTypesDelete from '../../constants/actions/events/delete';
import * as actionTypesLoad from '../../constants/actions/events/load';
import * as actionTypesUpdate from '../../constants/actions/events/update';
// Helpers
import { createEventItemObject, convertEventListToMapInstance } from '../../helpers/events/create';
import { saveItemToStorage, getItemFromStorage } from '../../helpers/localStorage';

const initialState = {
  pending: false,
  rejected: false,
  fulfilled: false,
  deleteSuccess: false,
  getEventsListSuccess: false,
  eventsList: [],
  calendarDayEvents: new Map(),
  currentEventItem: {},
  errorStatusCode: ''
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesCreate.CREATE_EVENT_ITEM_PENDING:
    case actionTypesDelete.DELETE_EVENT_ITEM_PENDING:
    case actionTypesUpdate.UPDATE_EVENT_PENDING: {
      return {
        ...state,
        pending: true,
        rejected: false,
        fulfilled: false,
        deleteSuccess: false,
        errorStatusCode: ''
      };
    }

    case actionTypesLoad.GET_EVENTS_LIST_PENDING: {
      return {
        ...state,
        getEventsListSuccess: false,
        pending: true
      };
    }

    case actionTypesCreate.CREATE_EVENT_ITEM_REJECTED:
    case actionTypesDelete.DELETE_EVENT_ITEM_REJECTED:
    case actionTypesLoad.GET_EVENTS_LIST_REJECTED:
    case actionTypesUpdate.UPDATE_EVENT_REJECTED: {
      const mockErrorStatusCode = action.payload;

      return {
        ...state,
        errorStatusCode: mockErrorStatusCode,
        pending: false,
        rejected: true
      };
    }

    case actionTypesCreate.CREATE_EVENT_ITEM_FULFILLED: {
      const eventItemObjectData = action.payload;
      const eventItemObject = createEventItemObject(eventItemObjectData);
      const eventsList = [...state.eventsList, eventItemObject];
      const calendarDayEvents = convertEventListToMapInstance(eventsList);
      saveItemToStorage(storage.eventsListKey, eventsList);

      return {
        ...state,
        eventsList,
        calendarDayEvents,
        pending: false,
        fulfilled: true
      };
    }

    case actionTypesDelete.DELETE_EVENT_ITEM_FULFILLED: {
      const eventItemId = action.payload;
      const filteredEventsList = state.eventsList.filter(({ id }) => (id !== eventItemId));
      const calendarDayEvents = convertEventListToMapInstance(filteredEventsList);
      saveItemToStorage(storage.eventsListKey, filteredEventsList);

      return {
        ...state,
        eventsList: filteredEventsList,
        calendarDayEvents,
        pending: false,
        deleteSuccess: true
      };
    }

    case actionTypesLoad.GET_EVENTS_LIST_FULFILLED: {
      const savedEventsList = getItemFromStorage(storage.eventsListKey);
      const eventsList = savedEventsList || state.eventsList;
      const calendarDayEvents = convertEventListToMapInstance(eventsList);

      return {
        ...state,
        eventsList,
        calendarDayEvents,
        pending: false,
        getEventsListSuccess: true
      };
    }

    case actionTypesLoad.CLEAR_CURRENT_EVENT_ITEM:
    case actionTypesLoad.GET_EVENT_ITEM_BY_ID: {
      const eventItemId = action.payload;
      const currentEventItem = (
        (eventItemId)
          ? (state.eventsList.find(({ id }) => (id === eventItemId)))
          : {}
      );

      return {
        ...state,
        currentEventItem
      };
    }

    case actionTypesUpdate.UPDATE_EVENT_FULFILLED: {
      const updatedEventItemObject = action.payload;
      const eventItemObject = createEventItemObject(updatedEventItemObject);
      const eventItemId = updatedEventItemObject.id;
      const filteredEventsList = state.eventsList.filter(({ id }) => (id !== eventItemId));
      const eventsList = [...filteredEventsList, eventItemObject];
      const calendarDayEvents = convertEventListToMapInstance(eventsList);
      saveItemToStorage(storage.eventsListKey, eventsList);

      return {
        ...state,
        eventsList,
        calendarDayEvents,
        pending: false,
        fulfilled: true
      };
    }

    default: {
      return state;
    }
  }
};

export default events;
