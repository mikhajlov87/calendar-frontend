import * as actionTypes from '../constants/actionTypes';

export const showMessageModal = modalBody => ({ type: actionTypes.SHOW_MESSAGE_MODAL, payload: modalBody });

export const hideMessageModal = () => ({ type: actionTypes.HIDE_MESSAGE_MODAL });
