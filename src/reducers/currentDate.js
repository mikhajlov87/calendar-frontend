import { getMoment } from '../helpers/momentTime';
import * as actionTypes from '../constants/actionTypes';
import stringFormats from '../constants/stringFormats';

const initialState = { date: '' };

const currentDate = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_DATE_NOW: {
      const now = getMoment();
      return {
        ...state,
        date: now.format(stringFormats.separateSlash_YYYY_MM)
      };
    }
    default:
      return state;
  }
};

export default currentDate;
