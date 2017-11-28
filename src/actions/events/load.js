// Constants
import {
  GET_EVENTS_LIST_PENDING,
  GET_EVENTS_LIST_FULFILLED,
  GET_EVENTS_LIST_REJECTED,
  CLEAR_CURRENT_EVENT_ITEM,
  GET_EVENT_ITEM_BY_ID
} from '../../constants/actions/events/load';
import { ADD_SAVED_EVENTS_LIST_TO_STORAGE } from '../../constants/actions/events/save';
import timeConstants from '../../constants/dateTime';
// Helpers
import mockRequest from '../../helpers/mockRequest';
// Actions
import { sortEventsList } from './sort';

export const getEventsListPending = () => ({
  type: GET_EVENTS_LIST_PENDING
});

export const getEventsListFulfilled = () => ({
  type: GET_EVENTS_LIST_FULFILLED
});

export const getEventsListRejected = () => ({
  type: GET_EVENTS_LIST_REJECTED
});

export const addSavedEventsListToStorage = () => ({
  type: ADD_SAVED_EVENTS_LIST_TO_STORAGE
});

export const getEventsList = () => (dispatch) => {
  dispatch(getEventsListPending());
  mockRequest(null, timeConstants.TWO_SECONDS)
    .then(
      () => {
        dispatch(getEventsListFulfilled());
        dispatch(addSavedEventsListToStorage());
        dispatch(sortEventsList());
      },
      () => dispatch(getEventsListRejected())
    );
};

export const getEventItemById = eventItemId => ({
  type: GET_EVENT_ITEM_BY_ID,
  payload: eventItemId
});

export const clearCurrentEventItem = () => ({
  type: CLEAR_CURRENT_EVENT_ITEM
});
