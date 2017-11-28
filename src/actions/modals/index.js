// Constants
import { SHOW_MESSAGE_MODAL, HIDE_MESSAGE_MODAL } from '../../constants/actions/modals';

export const showMessageModal = modalBody => ({
  type: SHOW_MESSAGE_MODAL,
  payload: modalBody
});

export const hideMessageModal = () => ({
  type: HIDE_MESSAGE_MODAL
});
