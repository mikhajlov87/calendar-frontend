// Modules
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Styles
import * as styles from './EventLink.scss';

const EventLink = props => (
  <Link
    className={cx(styles.event, props.eventClassName)}
    to={`/event-page/${props.id}`}
    onClick={(event) => { event.stopPropagation(); }}
  >
    { props.children }
  </Link>
);

EventLink.propTypes = {
  id: PropTypes.string,
  eventClassName: PropTypes.string,
  children: PropTypes.any
};

export default EventLink;
