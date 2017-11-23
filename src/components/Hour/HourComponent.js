// Modules
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// Styles
import * as styles from './HourComponent.scss';

const HourComponent = (props) => {
  const isMultipleItems = props.children.length > 1;
  return (
    <div className={styles.hour}>
      <div className={styles.time}>{props.hour}</div>
      <div className={cx(styles.caption, { [styles.multipleItems]: isMultipleItems })}>{props.children}</div>
    </div>
  );
};

HourComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  hour: PropTypes.string
};

export default HourComponent;
