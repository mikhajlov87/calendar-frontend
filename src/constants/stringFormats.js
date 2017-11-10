const stringFormats = {
  separateSlash_YYYY_MM_DD_HH_mm: 'YYYY/MM/DD HH:mm',
  separateSlash_YYYY_MM_D: 'YYYY/MM/D',
  separateSlash_YYYY_MM_DD: 'YYYY/MM/DD',
  separateSlash_YYYY_MM: 'YYYY/MM',
  separateSpace_MMMM_YYYY: 'MMMM YYYY',
  separateSpace_YYYY_MM_D: 'YYYY MM_D',
  separateSpace_YYYY_MM: 'YYYY MM',
  separateSpace_D_MMMM: 'D MMMM',
  fullMonthName_MMMM: 'MMMM',
  fullYear_YYYY: 'YYYY',
  shortWeekday_ddd: 'ddd',
  MM: 'MM',
  D: 'D',
  months: 'months',
  month: 'month',
  days: 'days',
  day: 'day',
  minute: 'minute'
};

export const supportedDateStringFormats = [
  'YYYY/MM/D',
  'YYYY/MM/DD',
  'YYYY MM D',
  'YYYY MM DD',
  'YYYY-MM-D',
  'YYYY-MM-DD'
];

export default stringFormats;
