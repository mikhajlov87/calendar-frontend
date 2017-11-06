// Modules
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import currentDate from './currentDate';
import events from './events';
import modal from './modal';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  currentDate,
  events,
  modal
});
