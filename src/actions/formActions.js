import * as actionTypes from '../constants/actionTypes';
import mockRequest from '../helpers/mockRequest';

export const addEvent = data => (dispatch) => {
  dispatch({ type: actionTypes.ADD_EVENT_PENDING });
  mockRequest(data)
    .then(
      res => dispatch({ type: actionTypes.ADD_EVENT_FULFILLED, payload: res }),
      err => dispatch({ type: actionTypes.ADD_EVENT_REJECTED, payload: err.message })
    );
};

export default addEvent;
