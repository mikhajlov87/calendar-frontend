import React from 'react';
import PropTypes from 'prop-types';
import TimeInput from 'react-time-input';
import cx from 'classnames';
import * as styles from './TimeField.scss';

const TimeField = ({ input, initTime, label, name, placeholder, meta: { touched, error, warning } }) => (
  <div className={cx(styles.formControl, { [styles.notValid]: (touched && error) })}>
    { !!label && (<label htmlFor={name} className={styles.formLabel}>{ label }</label>) }
    <TimeInput
      {...input}
      name={name}
      initTime={initTime}
      className={styles.formField}
      onTimeChange={() => {}}
      placeholder={placeholder}
    />
    {
      touched && (
        (error && <div className={styles.error}>{`Error: ${error}`}</div>)
        || (warning && <div className={styles.warn}>{warning}</div>)
      )
    }
  </div>
);

TimeField.propTypes = {
  initTime: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object
};

export default TimeField;
