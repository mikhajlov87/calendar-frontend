import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './PageContent.scss';

const PageContent = props => (
  <main className={styles.content}>{props.children}</main>
);

PageContent.propTypes = {
  children: PropTypes.array
};

export default PageContent;
