import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isMessageModalOpen: false,
  modalBody: null
};

const messageModalState = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MESSAGE_MODAL: {
      return {
        ...state,
        isMessageModalOpen: true,
        modalBody: action.payload
      };
    }
    case actionTypes.HIDE_MESSAGE_MODAL: {
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

export default messageModalState;
