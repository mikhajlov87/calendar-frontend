import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import currentDate from './currentDate';

export default combineReducers({
  routing: routerReducer,
  currentDate
});
