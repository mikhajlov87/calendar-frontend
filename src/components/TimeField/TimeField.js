import React from 'react';
import PropTypes from 'prop-types';
import TimeInput from 'react-time-input';
import cx from 'classnames';
import * as styles from './TimeField.scss';

const TimeField = ({ input, initTime, placeholder, type, label, meta: { touched, error, warning } }) => (
  <div className={cx(styles.formField, { [styles.notValid]: (touched && error) })}>
    { !!label && (<label htmlFor={input.name} className={styles.formLabel}>{ label }</label>) }
    <TimeInput
      {...input}
      initTime={initTime}
      type={type}
      placeholder={placeholder}
      className={styles.formControl}
      onTimeChange={() => {}}
      onFocusHandler={input.onFocus}
      onBlurHandler={input.onBlur}
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
);

TimeField.propTypes = {
  initTime: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string
};

export default TimeField;
