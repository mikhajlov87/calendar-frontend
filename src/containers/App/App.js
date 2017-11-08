// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
// Containers
import ModalContainer from '../ModalContainer/ModalContainer';
// Components
import Routes from '../../routing';
// Helpers
import { setupStorage } from '../../helpers/localStorage';
// Actions
import * as pageActions from '../../actions';
import * as eventActions from '../../actions/eventsActions';
// Styles
import * as styles from './App.scss';

class App extends Component {
  componentWillMount() {
    const { getCurrentDateNow } = this.props.pageActions;
    const { addSavedEventsListToStorage } = this.props.eventsActions;
    setupStorage();
    getCurrentDateNow();
    addSavedEventsListToStorage();
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
        <ModalContainer />
      </div>
    );
  }
}

App.propTypes = {
  pageActions: PropTypes.object,
  eventsActions: PropTypes.object,
  date: PropTypes.string
};

const mapStateToProps = state => ({
  date: state.currentDate.date
});

const mapDispatchToProps = dispatch => ({
  pageActions: bindActionCreators(pageActions, dispatch),
  eventsActions: bindActionCreators(eventActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
