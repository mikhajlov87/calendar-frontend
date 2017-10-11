// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Styles
import * as styles from './App.scss';

class App extends Component {
  componentDidMount() {
    console.log('Hello'); // TODO remove that
  }

  render() {
    return (
      <div className={styles.app}>
        Hello user
      </div>
    );
  }
}

App.propTypes = {
  testProp: PropTypes.number
};

const mapStateToProps = state => ({ testProp: state.testProp });

export default connect(mapStateToProps)(App);
