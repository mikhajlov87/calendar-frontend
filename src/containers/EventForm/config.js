// Constants
import stringFormats from '../../constants/stringFormats';

const formFieldsProps = {
  nameField: {
    name: 'eventName',
    placeholder: 'event Name',
    label: 'Event Name *'
  },
  startDate: {
    label: 'Start Event Date *',
    name: 'startDate',
    placeholder: 'start event time',
    stringFormat: {
      stringFormat: stringFormats.separateSlash_YYYY_MM_DD
    }
  },
  startTime: {
    label: 'Start Event Time',
    name: 'startTime',
    placeholder: 'time'
  },
  isFullDay: {
    name: 'isFullDay',
    label: 'Full Day?'
  },
  endDate: {
    label: 'End Event Date',
    name: 'endDate',
    placeholder: 'end event time',
    stringFormat: {
      stringFormat: stringFormats.separateSlash_YYYY_MM_DD
    }
  },
  endTime: {
    label: 'End Event Time',
    name: 'endTime',
    placeholder: 'time'
  },
  eventCaption: {
    name: 'eventCaption',
    placeholder: 'event caption',
    label: 'description'
  },
  createEventConfirmModal: {
    modalHeader: 'You are confirm create event?',
    modalBody: '...and add it in your calendar'
  }
};

export default formFieldsProps;
