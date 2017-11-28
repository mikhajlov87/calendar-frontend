import { validateDateString, checkDatePastTime } from './validate';

export const validate = (values) => {
  const errors = {};
  if (!values.eventName) {
    errors.eventName = 'Required';
  } else if (values.eventName.length > 25) {
    errors.eventName = 'Must be 25 characters or less';
  }
  if (!values.startTime) {
    errors.startTime = 'Required';
  } else if (values.startTime.length < 5) {
    errors.startTime = 'Not valid';
  }
  if (!values.startDate) {
    errors.startDate = 'Required';
  } else if (values.startDate && !validateDateString(values.startDate)) {
    errors.startDate = 'Not valid Date';
  }
  if (values.endDate && !validateDateString(values.endDate)) {
    errors.endDate = 'Not valid Date';
  }
  if (values.endDate && !checkDatePastTime(values.startDate, values.endDate)) {
    errors.endDate = 'You enter Past Date';
  }
  if (values.endTime && values.endTime.length < 5) {
    errors.endTime = 'Not valid';
  }
  return errors;
};

export default validate;
