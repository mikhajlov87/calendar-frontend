import * as actionTypes from '../constants/actionTypes';

const initialState = {
  data: null,
  pending: false,
  error: false,
  created: false,
  errorText: ''
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_EVENT_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
        created: false,
        errorText: ''
      };
    }
    case actionTypes.ADD_EVENT_REJECTED: {
      return {
        ...state,
        errorText: action.payload,
        pending: false,
        error: true
      };
    }
    case actionTypes.ADD_EVENT_FULFILLED: {
      return {
        ...state,
        pending: false,
        created: true,
        data: action.payload
      };
    }
    default:
      return state;
  }
};

export default events;
