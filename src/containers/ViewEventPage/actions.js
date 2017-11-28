// Actions
import { editEventItem } from '../../actions/events/edit';
import { deleteEventItem } from '../../actions/events/delete';
import { clearCurrentEventItem, getEventItemById } from '../../actions/events/load';
import { showMessageModal, hideMessageModal } from '../../actions/modals';

export const modalsActions = {
  showMessageModal,
  hideMessageModal
};

export const eventsActions = {
  getEventItemById,
  clearCurrentEventItem,
  deleteEventItem,
  editEventItem
};
