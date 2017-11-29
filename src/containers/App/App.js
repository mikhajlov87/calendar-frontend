// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import cx from 'classnames';
import { RingLoader } from 'react-spinners';
// Containers
import ModalContainer from '../ModalContainer/ModalContainer';
// Components
import Routes from '../../routing';
import MessageModalBody from '../../components/MessageModalBody/MessageModalBody';
// Helpers
import { setupStorage } from '../../helpers/localStorage';
// Actions
import { eventsActions, modalsActions, calendarActions } from './actions';
// Styles
import * as styles from './App.scss';

class App extends Component {
  componentWillMount() {
    setupStorage();
    this.props.calendarActions.getCurrentDateNow();
    this.props.eventsActions.getEventsList();
  }

  componentWillReceiveProps(nextProps) {
    const getEventsListFailed = (
      nextProps.eventsState.rejected && (nextProps.eventsState.rejected !== this.props.eventsState.rejected)
    );
    if (getEventsListFailed) {
      this.showErrorMessageModal();
    }
  }

  showErrorMessageModal = () => {
    const errorMessageModalBody = this.renderErrorMessageModalBody();
    this.props.modalsActions.showMessageModal(errorMessageModalBody);
  };

  renderErrorMessageModalBody = () => (
    <MessageModalBody
      accepted={this.props.modalsActions.hideMessageModal}
      acceptButtonLabel="close modal"
      modalHeader="Sorry! Something went wrong :("
      modalBody="Need to refresh page!"
    />
  );

  renderApp = date => (
    <div className={styles.appContainer}>
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

  render() {
    const { currentMonthNow } = this.props.currentDate;
    const { getEventsListSuccess, rejected } = this.props.eventsState;
    return (
      <div className={cx(styles.app, { [styles.appPreload]: (!getEventsListSuccess && !rejected) })}>
        {
          (!getEventsListSuccess && !rejected)
            ? (<RingLoader loading />)
            : (this.renderApp(currentMonthNow))
        }
      </div>
    );
  }
}

App.propTypes = {
  calendarActions: PropTypes.object,
  eventsActions: PropTypes.object,
  modalsActions: PropTypes.object,
  currentDate: PropTypes.object,
  eventsState: PropTypes.object
};

const mapStateToProps = state => ({
  currentDate: state.currentDate,
  eventsState: state.events
});

const mapDispatchToProps = dispatch => ({
  calendarActions: bindActionCreators(calendarActions, dispatch),
  eventsActions: bindActionCreators(eventsActions, dispatch),
  modalsActions: bindActionCreators(modalsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
