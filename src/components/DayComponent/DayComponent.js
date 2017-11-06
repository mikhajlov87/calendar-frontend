import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';
import * as styles from './DayComponent.scss';

const DayComponent = props => (
  <div className={cx(styles.day, { [styles.today]: props.today })}>
    <Link className={styles.link} to={`${props.match.url}/${props.day}`}>
      <p className={styles.header}>
        <span>{props.weekday}</span>
        <span>{props.day}</span>
      </p>
    </Link>
  </div>
);

DayComponent.propTypes = {
  day: PropTypes.string,
  weekday: PropTypes.string,
  match: PropTypes.object,
  today: PropTypes.bool
};

export default withRouter(DayComponent);
