// Actions
import { clearCurrentEventItem, getEventItemById } from '../../actions/events/load';
import { showMessageModal, hideMessageModal } from '../../actions/modals';

export const eventsActions = {
  clearCurrentEventItem,
  getEventItemById
};

export const modalsActions = {
  showMessageModal,
  hideMessageModal
};
