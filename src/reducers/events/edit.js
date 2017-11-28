// Constants
import {
  EDIT_EVENT_ITEM_PENDING,
  EDIT_EVENT_ITEM_REJECTED,
  EDIT_EVENT_ITEM_FULFILLED
} from '../../constants/actions/events/edit';

const initialState = {
  pending: false,
  rejected: false,
  fulfilled: false
};

const editEventItem = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_EVENT_ITEM_PENDING: {
      return {
        ...state,
        pending: true,
        fulfilled: false,
        rejected: false
      };
    }
    case EDIT_EVENT_ITEM_FULFILLED: {
      return {
        ...state,
        pending: false,
        fulfilled: true
      };
    }
    case EDIT_EVENT_ITEM_REJECTED: {
      return {
        ...state,
        pending: false,
        rejected: true
      };
    }
    default: {
      return state;
    }
  }
};

export default editEventItem;
