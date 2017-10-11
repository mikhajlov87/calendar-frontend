// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Month from '../Month/Month';
// Styles
import * as styles from './App.scss';

const App = () => (
  <div className={styles.app}>
    <Month />
  </div>
);

App.propTypes = {
  testProp: PropTypes.number
};

const mapStateToProps = state => ({ testProp: state.testProp });

export default connect(mapStateToProps)(App);
