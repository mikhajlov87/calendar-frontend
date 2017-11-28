// Helpers
import { getCurrentMonthNow } from '../../helpers/moment';
// Constants
import { GET_CURRENT_DATE_NOW } from '../../constants/actions/calendar';

const initialState = {
  currentMonthNow: ''
};

const currentDate = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_DATE_NOW: {
      const currentMonthNow = getCurrentMonthNow();
      return {
        ...state,
        currentMonthNow
      };
    }
    default:
      return state;
  }
};

export default currentDate;
