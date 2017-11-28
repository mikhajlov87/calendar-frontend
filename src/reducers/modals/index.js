// Constants
import { SHOW_MESSAGE_MODAL, HIDE_MESSAGE_MODAL } from '../../constants/actions/modals';

const initialState = {
  isMessageModalOpen: false,
  modalBody: null
};

const messageModal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE_MODAL: {
      return {
        ...state,
        isMessageModalOpen: true,
        modalBody: action.payload
      };
    }
    case HIDE_MESSAGE_MODAL: {
      return {
        ...state,
        isMessageModalOpen: false,
        modalBody: null
      };
    }
    default:
      return state;
  }
};

export default messageModal;
