import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';
import * as styles from './MonthComponent.scss';

const MonthComponent = props => (
  <div className={cx(styles.month, { [styles.currentMonth]: props.currentMonth })}>
    <Link className={styles.link} to={`${props.match.url}/${props.monthUrl}`}>
      { props.monthName }
    </Link>
  </div>
);

MonthComponent.propTypes = {
  monthUrl: PropTypes.string,
  monthName: PropTypes.string,
  match: PropTypes.object,
  currentMonth: PropTypes.bool
};

export default withRouter(MonthComponent);
