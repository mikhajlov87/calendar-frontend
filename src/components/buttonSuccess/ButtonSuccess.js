import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './ButtonSuccess.scss';

const ButtonSuccess = props => (
  <button
    className={cx(styles.buttonSuccess, props.className)}
    onClick={props.onClick}
    type={props.type ? props.type : 'button'}
  >
    { props.children }
  </button>
);

ButtonSuccess.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};

export default ButtonSuccess;
