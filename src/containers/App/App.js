import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import * as pageActions from '../../actions';
import * as styles from './App.scss';
import Routes from '../../routing';

class App extends Component {
  componentWillMount() {
    const { getCurrentDateNow } = this.props.pageActions;
    getCurrentDateNow();
  }

  render() {
    const date = this.props.date;
    return (
      <div className={styles.app}>
        <Route
          exact
          path="/"
          render={() => (
            (date)
              ? (<Redirect to={`/${date}`} />)
              : (<div>loading current date...</div>)
            )
          }
        />
        <Routes />
      </div>
    );
  }
}

App.propTypes = {
  pageActions: PropTypes.object,
  date: PropTypes.string
};

const mapStateToProps = state => ({
  date: state.currentDate.date
});

const mapDispatchToProps = dispatch => ({
  pageActions: bindActionCreators(pageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
