// Modules
import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Styles
import * as styles from './ModalContainer.scss';

const MessageModal = props => (
  <ReactModal
    isOpen={props.isMessageModalOpen}
    className={styles.modalMessage}
    overlayClassName={styles.modalOverlay}
  >
    <div className={styles.modalBody}>{ props.modalBody }</div>
  </ReactModal>
);

const mapStateToProps = state => ({
  isMessageModalOpen: state.modal.isMessageModalOpen,
  modalBody: state.modal.modalBody
});

MessageModal.propTypes = {
  isMessageModalOpen: PropTypes.bool.isRequired,
  modalBody: PropTypes.any
};

export default connect(mapStateToProps)(MessageModal);
