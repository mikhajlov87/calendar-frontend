import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './ModalConfirm.scss';

const ModalConfirm = props => (
  <ReactModal
    isOpen={props.showModal}
    contentLabel="modalConfirm"
    onRequestClose={props.closeModal}
    className={styles.modalConfirm}
    overlayClassName={styles.modalOverlay}
  >
    <h2 className={styles.modalHeader}>{ props.modalHeader }</h2>
    <p className={styles.modalBody}>{ props.modalBody }</p>
    <div className={styles.modalFooter}>
      <button className={cx(styles.button, styles.confirm)} onClick={props.accepted}>
        { props.acceptButtonLabel }
      </button>
      <button className={cx(styles.button, styles.cancel)} onClick={props.rejected}>
        { props.rejectButtonLabel }
      </button>
    </div>
  </ReactModal>
);

ModalConfirm.propTypes = {
  acceptButtonLabel: PropTypes.string,
  rejectButtonLabel: PropTypes.string,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  accepted: PropTypes.func,
  rejected: PropTypes.func,
  modalBody: PropTypes.string,
  modalHeader: PropTypes.string
};

export default ModalConfirm;
