import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import * as styles from './RenderField.scss';

const RenderField = ({ input, placeholder, label, type, meta: { touched, error, warning } }) => (
  <div className={styles.formField}>
    <label className={styles.formLabel} htmlFor={input.name}>{label}</label>
    <div className={cx(styles.formControl, { [styles.notValid]: (touched && error) })}>
      <input {...input} placeholder={placeholder} type={type} id={input.name} />
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

RenderField.propTypes = {
  placeholder: PropTypes.any,
  input: PropTypes.any,
  label: PropTypes.any,
  type: PropTypes.any,
  meta: PropTypes.any
};

export default RenderField;
