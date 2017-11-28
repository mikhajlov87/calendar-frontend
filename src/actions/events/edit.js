// Constants
import {
  EDIT_EVENT_ITEM_PENDING,
  EDIT_EVENT_ITEM_FULFILLED,
  EDIT_EVENT_ITEM_REJECTED
} from '../../constants/actions/events/edit';
import timeConstants from '../../constants/dateTime';
// Helpers
import mockRequest from '../../helpers/mockRequest';

export const editEventItemPending = () => ({
  type: EDIT_EVENT_ITEM_PENDING
});

export const editEventItemFulfilled = eventItem => ({
  type: EDIT_EVENT_ITEM_FULFILLED,
  payload: eventItem
});

export const editEventItemRejected = () => ({
  type: EDIT_EVENT_ITEM_REJECTED
});

export const editEventItem = eventItem => (dispatch) => {
  dispatch(editEventItemPending());
  mockRequest(eventItem, timeConstants.ONE_SECOND)
    .then(
      res => dispatch(editEventItemFulfilled(res)),
      () => dispatch(editEventItemRejected())
    );
};
