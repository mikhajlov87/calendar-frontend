import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './ButtonDefault.scss';

const ButtonDefault = props => (
  <button
    className={cx(styles.buttonDefault, props.className)}
    onClick={props.onClick}
    type={props.type ? props.type : 'button'}
  >
    { props.children }
  </button>
);

ButtonDefault.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};

export default ButtonDefault;
