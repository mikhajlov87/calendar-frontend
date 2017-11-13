// Constants
import * as actionTypes from '../constants/actionTypes';
// Helpers
import mockRequest from '../helpers/mockRequest';

export const addEvent = data => (dispatch) => {
  dispatch({ type: actionTypes.ADD_EVENT_PENDING });
  mockRequest(data)
    .then(
      res => dispatch({ type: actionTypes.ADD_EVENT_FULFILLED, payload: res }),
      err => dispatch({ type: actionTypes.ADD_EVENT_REJECTED, payload: err.message })
    );
};

export const addSavedEventsListToStorage = () => ({ type: actionTypes.ADD_SAVED_EVENTS_LIST_TO_STORAGE });

export const getEventItemById = eventId => ({ type: actionTypes.GET_EVENT_ITEM_BY_ID, payload: eventId });

export const editEventItem = eventId => ({ type: actionTypes.EDIT_EVENT_ITEM, payload: eventId });

export const deleteEventItem = eventId => ({ type: actionTypes.DELETE_EVENT_ITEM, payload: eventId });
