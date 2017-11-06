import React from 'react';
import * as styles from './NotFound.scss';

const NotFound = () => (
  <div className={styles.error}>
    <h1 className={styles.title}>Not Found</h1>
    <h2 className={styles.caption}>404</h2>
  </div>
);

export default NotFound;
