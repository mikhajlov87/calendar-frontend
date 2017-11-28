// Modules
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import cx from 'classnames';
// Styles
import 'react-day-picker/lib/style.css';
import * as styles from './DateField.scss';

const DateField = ({ input, placeholder, label, type, stringFormat, meta: { touched, error, warning } }) => (
  <div className={styles.formField}>
    <label className={styles.formLabel} htmlFor={input.name}>{label}</label>
    <div className={cx(styles.formControl, { [styles.notValid]: (touched && error) })}>
      <DayPickerInput
        {...input}
        placeholder={placeholder}
        format={stringFormat}
        type={type}
        id={input.name}
        className={styles.dateField}
        classNames={{
          container: styles.container,
          overlay: styles.overlay,
          overlayWrapper: styles.wrapper
        }}
      />
      <div className={styles.errorField}>
        {
          touched && (
            (error && <div className={styles.error}>{`Error: ${error}`}</div>)
            || (warning && <div className={styles.warn}>{warning}</div>)
          )
        }
      </div>
    </div>
  </div>
);


DateField.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  stringFormat: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default DateField;
