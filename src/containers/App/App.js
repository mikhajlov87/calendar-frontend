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
    const { getCurrentDateNow } = this.props.calendarActions;
    const { getEventsList } = this.props.eventsActions;
    setupStorage();
    getCurrentDateNow();
    getEventsList();
  }

  componentWillReceiveProps(nextProps) {
    const getEventsListFailed = (
      nextProps.getEventsListFailed && (nextProps.getEventsListFailed !== this.props.getEventsListFailed)
    );
    if (getEventsListFailed) {
      this.showErrorMessageModal();
    }
  }

  showErrorMessageModal = () => {
    const { showMessageModal, hideMessageModal } = this.props.modalsActions;
    const errorMessageModalBody = this.renderErrorMessageModalBody(hideMessageModal);
    showMessageModal(errorMessageModalBody);
  };

  renderErrorMessageModalBody = acceptedFuncCallback => (
    <MessageModalBody
      accepted={acceptedFuncCallback}
      acceptButtonLabel="close modal"
      modalHeader="Sorry! Something went wrong"
      modalBody="Please, try again later"
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
    const { currentMonthNow, getEventsListPending, eventsListSorted, getEventsListFailed } = this.props;
    return (
      <div className={cx(styles.app, { [styles.appPreload]: getEventsListPending })}>
        {
          (!eventsListSorted && !getEventsListFailed)
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
  currentMonthNow: PropTypes.string,
  getEventsListPending: PropTypes.bool,
  eventsListSorted: PropTypes.bool,
  getEventsListFailed: PropTypes.bool
};

const mapStateToProps = state => ({
  currentMonthNow: state.currentDate.currentMonthNow,
  getEventsListPending: state.loadEventItem.pending,
  eventsListSorted: state.loadEventItem.sorted,
  getEventsListFailed: state.loadEventItem.rejected
});

const mapDispatchToProps = dispatch => ({
  calendarActions: bindActionCreators(calendarActions, dispatch),
  eventsActions: bindActionCreators(eventsActions, dispatch),
  modalsActions: bindActionCreators(modalsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
