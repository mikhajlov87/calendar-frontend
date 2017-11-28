// Constants
import {
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_FULFILLED,
  UPDATE_EVENT_REJECTED
} from '../../constants/actions/events/update';
import timeConstants from '../../constants/dateTime';
// Helpers
import mockRequest from '../../helpers/mockRequest';
// Actions
import { addSavedEventsListToStorage } from './save';
import { sortEventsList } from './sort';

export const updateEventPending = () => ({
  type: UPDATE_EVENT_PENDING
});

export const updateEventRejected = () => ({
  type: UPDATE_EVENT_REJECTED
});

export const updateEventFulfilled = eventObject => ({
  type: UPDATE_EVENT_FULFILLED,
  payload: eventObject
});

export const updateEventItem = eventItem => (dispatch) => {
  dispatch(updateEventPending());
  mockRequest(eventItem, timeConstants.ONE_SECOND)
    .then(
      (res) => {
        dispatch(updateEventFulfilled(res));
        dispatch(addSavedEventsListToStorage());
        dispatch(sortEventsList());
      },
      () => dispatch(updateEventRejected())
    );
};

