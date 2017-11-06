import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './HourComponent.scss';

const HourComponent = props => (
  <div className={styles.hour}>
    <div className={styles.time}>{props.hour}</div>
    <div className={styles.caption}>{props.children}</div>
  </div>
);

HourComponent.propTypes = {
  children: PropTypes.object,
  hour: PropTypes.string
};

export default HourComponent;
