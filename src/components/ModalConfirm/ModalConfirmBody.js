// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import ButtonSuccess from '../ButtonSuccess/ButtonSuccess';
import ButtonDefault from '../ButtonDefault/ButtonDefault';
// Styles
import * as styles from './ModalConfirmBody.scss';

const ModalConfirmBody = props => (
  <div>
    <h2 className={styles.modalHeader}>{ props.modalHeader }</h2>
    <p className={styles.modalBody}>{ props.modalBody }</p>
    <div className={styles.modalFooter}>
      <ButtonSuccess onClick={props.accepted}>{ props.acceptButtonLabel }</ButtonSuccess>
      <ButtonDefault onClick={props.rejected}>{ props.rejectButtonLabel }</ButtonDefault>
    </div>
  </div>
);

ModalConfirmBody.propTypes = {
  acceptButtonLabel: PropTypes.string,
  rejectButtonLabel: PropTypes.string,
  accepted: PropTypes.func,
  rejected: PropTypes.func,
  modalBody: PropTypes.string,
  modalHeader: PropTypes.string
};

export default ModalConfirmBody;
