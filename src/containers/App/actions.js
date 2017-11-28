// Actions
import { getCurrentDateNow } from '../../actions/calendar';
import { getEventsList } from '../../actions/events/load';
import { showMessageModal, hideMessageModal } from '../../actions/modals';

export const eventsActions = {
  getEventsList
};

export const modalsActions = {
  showMessageModal,
  hideMessageModal
};

export const calendarActions = {
  getCurrentDateNow
};
