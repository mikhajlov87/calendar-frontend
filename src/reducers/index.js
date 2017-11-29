// Modules
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import messageModal from './modals';
import events from './events/index';
import currentDate from './calendar/date';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  messageModal,
  events,
  currentDate
});
