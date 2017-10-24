import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as styles from './PageHeader.scss';

const PageHeader = props => (
  <header className={styles.header}>
    <Link className={styles.button} to={`/${props.prev}`}>{props.leftButtonTitle}</Link>
    <span className={styles.title}>
      { props.children }
    </span>
    <Link className={styles.button} to="/create-event">add event</Link>
    <Link className={styles.button} to={`/${props.next}`}>{props.rightButtonTitle}</Link>
  </header>
);

PageHeader.propTypes = {
  children: PropTypes.string,
  prev: PropTypes.string,
  leftButtonTitle: PropTypes.string,
  next: PropTypes.string,
  rightButtonTitle: PropTypes.string
};

export default PageHeader;
