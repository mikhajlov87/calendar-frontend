import actionTypes from '../constants/actionTypes';

export const getCurrentDateNow = () => ({ type: actionTypes.GET_CURRENT_DATE_NOW });

export const getCurrentDate = ({ year, month }) => ({ type: actionTypes.GET_CURRENT_DATE, payload: { year, month } });
