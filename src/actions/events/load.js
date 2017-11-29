// Constants
import {
  GET_EVENTS_LIST_PENDING,
  GET_EVENTS_LIST_FULFILLED,
  GET_EVENTS_LIST_REJECTED,
  CLEAR_CURRENT_EVENT_ITEM,
  GET_EVENT_ITEM_BY_ID
} from '../../constants/actions/events/load';
import timeConstants from '../../constants/dateTime';
// Helpers
import mockRequest from '../../helpers/mockRequest';

export const getEventsListPending = () => ({
  type: GET_EVENTS_LIST_PENDING
});

export const getEventsListFulfilled = () => ({
  type: GET_EVENTS_LIST_FULFILLED
});

export const getEventsListRejected = () => ({
  type: GET_EVENTS_LIST_REJECTED
});

export const getEventsList = () => (dispatch) => {
  dispatch(getEventsListPending());
  mockRequest(null, timeConstants.TWO_SECONDS)
    .then(
      () => dispatch(getEventsListFulfilled()),
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
