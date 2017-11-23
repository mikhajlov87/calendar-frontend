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
import * as pageActions from '../../actions';
import * as eventActions from '../../actions/eventsActions';
import * as modalActions from '../../actions/modalActions';
// Styles
import * as styles from './App.scss';

class App extends Component {
  componentWillMount() {
    const { getCurrentDateNow } = this.props.pageActions;
    const { getEventsListRequest } = this.props.eventsActions;
    setupStorage();
    getCurrentDateNow();
    getEventsListRequest();
  }

  componentWillReceiveProps({ eventsListRejected }) {
    const eventsListRequestError = (eventsListRejected && eventsListRejected !== this.props.eventsListRejected);
    const { showMessageModal } = this.props.modalActions;
    if (eventsListRequestError) {
      showMessageModal(this.renderErrorMessageModalBody());
    }
  }

  renderErrorMessageModalBody = () => {
    const { hideMessageModal } = this.props.modalActions;
    return (
      <MessageModalBody
        accepted={hideMessageModal}
        acceptButtonLabel="close modal"
        modalHeader="Sorry! Something went wrong"
        modalBody="Please, try again later"
      />
    );
  };

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
    const { date, eventsListPending, eventsListSorted, eventsListRejected } = this.props;
    return (
      <div className={cx(styles.app, { [styles.appPreload]: eventsListPending })}>
        {
          (!eventsListSorted && !eventsListRejected)
            ? (<RingLoader loading={!eventsListSorted && !eventsListRejected} />)
            : (this.renderApp(date))
        }
      </div>
    );
  }
}

App.propTypes = {
  pageActions: PropTypes.object,
  eventsActions: PropTypes.object,
  modalActions: PropTypes.object,
  date: PropTypes.string,
  eventsListPending: PropTypes.bool,
  eventsListSorted: PropTypes.bool,
  eventsListRejected: PropTypes.bool
};

const mapStateToProps = state => ({
  date: state.currentDate.date,
  eventsListPending: state.events.eventsListPending,
  eventsListSorted: state.events.eventsListSorted,
  eventsListRejected: state.events.eventsListRejected
});

const mapDispatchToProps = dispatch => ({
  pageActions: bindActionCreators(pageActions, dispatch),
  eventsActions: bindActionCreators(eventActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
