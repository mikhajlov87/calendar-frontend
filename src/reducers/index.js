// Modules
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import updateEvents from './events/update';
import editEventItem from './events/edit';
import createEventItem from './events/create';
import deleteEventItem from './events/delete';
import loadEventItem from './events/load';
import messageModal from './modals';
import currentDate from './calendar/date';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  messageModal,
  updateEvents,
  editEventItem,
  createEventItem,
  deleteEventItem,
  loadEventItem,
  currentDate
});
