// Constants
import {
  DELETE_EVENT_ITEM_PENDING,
  DELETE_EVENT_ITEM_FULFILLED,
  DELETE_EVENT_ITEM_REJECTED
} from '../../constants/actions/events/delete';
import timeConstants from '../../constants/dateTime';
// Helpers
import mockRequest from '../../helpers/mockRequest';
// Actions
import { addSavedEventsListToStorage } from './save';
import { sortEventsList } from './sort';

export const deleteEventItemPending = () => ({
  type: DELETE_EVENT_ITEM_PENDING
});

export const deleteEventItemRejected = () => ({
  type: DELETE_EVENT_ITEM_REJECTED
});

export const deleteEventItemFulfilled = eventId => ({
  type: DELETE_EVENT_ITEM_FULFILLED,
  payload: eventId
});

export const deleteEventItem = eventItemId => (dispatch) => {
  dispatch(deleteEventItemPending());
  mockRequest(eventItemId, timeConstants.ONE_SECOND)
    .then(
      (res) => {
        dispatch(deleteEventItemFulfilled(res));
        dispatch(addSavedEventsListToStorage());
        dispatch(sortEventsList());
      },
      () => dispatch(deleteEventItemRejected())
    );
};

