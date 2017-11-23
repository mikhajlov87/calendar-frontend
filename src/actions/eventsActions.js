// Constants
import * as actionTypes from '../constants/actionTypes';
// Helpers
import mockRequest from '../helpers/mockRequest';

export const addSavedEventsListToStorage = () => ({ type: actionTypes.ADD_SAVED_EVENTS_LIST_TO_STORAGE });

export const getEventItemById = eventId => ({ type: actionTypes.GET_EVENT_ITEM_BY_ID, payload: eventId });

export const editEventItemPending = () => ({ type: actionTypes.EDIT_EVENT_ITEM_PENDING });

export const editEventItemFulfilled = eventItem => (
  { type: actionTypes.EDIT_EVENT_ITEM_FULFILLED, payload: eventItem }
);

export const editEventItemRejected = () => ({ type: actionTypes.EDIT_EVENT_ITEM_REJECTED });

export const clearCurrentEventItem = () => ({ type: actionTypes.CLEAR_CURRENT_EVENT_ITEM });

export const addEventPending = () => ({ type: actionTypes.ADD_EVENT_PENDING });

export const sortEventsList = () => ({ type: actionTypes.SORT_EVENTS_LIST });

export const addEventFulfilled = data => ({ type: actionTypes.ADD_EVENT_FULFILLED, payload: data });

export const addEventRejected = error => ({ type: actionTypes.ADD_EVENT_REJECTED, payload: error.message });

export const getEventsListPending = () => ({ type: actionTypes.GET_EVENTS_LIST_PENDING });

export const getEventsListFulfilled = () => ({ type: actionTypes.GET_EVENTS_LIST_FULFILLED });

export const getEventsListRejected = () => ({ type: actionTypes.GET_EVENTS_LIST_REJECTED });

export const deleteEventItemPending = () => ({ type: actionTypes.DELETE_EVENT_ITEM_PENDING });

export const deleteEventItemRejected = () => ({ type: actionTypes.DELETE_EVENT_ITEM_REJECTED });

export const saveEventChangesPending = () => ({ type: actionTypes.SAVE_EVENT_CHANGES_PENDING });

export const saveEventChangesRejected = () => ({ type: actionTypes.SAVE_EVENT_CHANGES_REJECTED });

export const saveEventChangesFulfilled = eventItem => ({
  type: actionTypes.SAVE_EVENT_CHANGES_FULFILLED,
  payload: eventItem
});

export const deleteEventItemFulfilled = eventId => (
  { type: actionTypes.DELETE_EVENT_ITEM_FULFILLED, payload: eventId }
);

export const deleteEventItemRequest = eventId => (dispatch) => {
  dispatch(deleteEventItemPending());
  mockRequest(eventId, 2000)
    .then(
      (res) => {
        dispatch(deleteEventItemFulfilled(res));
        dispatch(sortEventsList());
      },
      () => dispatch(deleteEventItemRejected())
    );
};

export const editEventItemRequest = eventItem => (dispatch) => {
  dispatch(editEventItemPending());
  mockRequest(eventItem, 1000)
    .then(
      res => dispatch(editEventItemFulfilled(res)),
      () => dispatch(editEventItemRejected())
    );
};

export const saveEventChangesRequest = eventObject => (dispatch) => {
  dispatch(saveEventChangesPending());
  mockRequest(eventObject, 1000)
    .then(
      (res) => {
        dispatch(saveEventChangesFulfilled(res));
        dispatch(sortEventsList());
      },
      () => dispatch(saveEventChangesRejected())
    );
};

export const addEventRequest = data => (dispatch) => {
  dispatch(addEventPending());
  mockRequest(data, 1000)
    .then(
      (res) => {
        dispatch(addEventFulfilled(res));
        dispatch(sortEventsList());
      },
      err => dispatch(addEventRejected(err))
    );
};

export const getEventsListRequest = () => (dispatch) => {
  dispatch(getEventsListPending());
  mockRequest(null, 2000)
    .then(
      () => {
        dispatch(getEventsListFulfilled());
        dispatch(addSavedEventsListToStorage());
        dispatch(sortEventsList());
      },
      () => dispatch(getEventsListRejected())
    );
};
