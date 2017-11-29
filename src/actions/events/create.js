// Constants
import {
  CREATE_EVENT_ITEM_PENDING,
  CREATE_EVENT_ITEM_FULFILLED,
  CREATE_EVENT_ITEM_REJECTED
} from '../../constants/actions/events/create';
import timeConstants from '../../constants/dateTime';
// Helpers
import mockRequest from '../../helpers/mockRequest';

export const createEventItemPending = () => ({
  type: CREATE_EVENT_ITEM_PENDING
});

export const createEventItemFulfilled = data => ({
  type: CREATE_EVENT_ITEM_FULFILLED,
  payload: data
});

export const createEventItemRejected = error => ({
  type: CREATE_EVENT_ITEM_REJECTED,
  payload: error.message
});

export const createEventItem = data => (dispatch) => {
  dispatch(createEventItemPending());
  mockRequest(data, timeConstants.ONE_SECOND)
    .then(
      res => dispatch(createEventItemFulfilled(res)),
      err => dispatch(createEventItemRejected(err))
    );
};

