// Actions
import { hideMessageModal, showMessageModal } from '../../actions/modals';
import { createEventItem } from '../../actions/events/create';
import { updateEventItem } from '../../actions/events/update';

export const modalsActions = {
  hideMessageModal,
  showMessageModal
};

export const eventsActions = {
  createEventItem,
  updateEventItem
};
