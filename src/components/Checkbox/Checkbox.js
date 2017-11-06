import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Checkbox.scss';

const CheckBox = ({ label, input, id }) => (
  <div className={styles.formField}>
    {
      !!label && (<label className={styles.formLabel} htmlFor={id}>{ label }</label>)
    }
    <div className={styles.checkboxContainer}>
      <input
        {...input}
        checked={input.value}
        id={id}
        type="checkbox"
        className={styles.checkbox}
      />
      <svg viewBox="0 0 24 24" className={input.value ? styles.checkboxBorderHidden : styles.checkboxBorderVisible}>
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      </svg>
      <svg viewBox="0 0 24 24" className={input.value ? styles.checkboxChecked : styles.checkboxUnchecked}>
        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </div>
  </div>
);

CheckBox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object
};

export default CheckBox;
