// Modules
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// Styles
import * as styles from './ButtonSuccess.scss';

const ButtonSuccess = props => (
  <button
    className={cx(styles.buttonSuccess, props.className)}
    onClick={props.onClick}
    type={props.type ? props.type : 'button'}
    disabled={props.disabled}
  >
    { props.children }
  </button>
);

ButtonSuccess.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default ButtonSuccess;
