import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import cx from 'classnames';
import 'react-day-picker/lib/style.css';
import * as styles from './DateField.scss';

const DateField = ({ input, placeholder, label, type, format, meta: { touched, error, warning } }) => (
  <div className={styles.formGroup}>
    <label className={styles.formLabel} htmlFor={input.name}>{label}</label>
    <div className={cx(styles.formControl, { [styles.notValid]: (touched && error) })}>
      <DayPickerInput
        {...input}
        placeholder={placeholder}
        format={format}
        type={type}
        id={input.name}
        className={styles.dateField}
        classNames={{
          container: styles.container,
          overlay: styles.overlay,
          overlayWrapper: styles.wrapper
        }}
      />
      {
        touched && (
          (error && <div className={styles.error}>{`Error: ${error}`}</div>)
          || (warning && <div className={styles.warn}>{warning}</div>)
        )
      }
    </div>
  </div>
);


DateField.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default DateField;
