// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import ButtonSuccess from '../ButtonSuccess/ButtonSuccess';
// Styles
import * as styles from './MessageModalBody.scss';

const MessageModalBody = props => (
  <div>
    <h2 className={styles.modalHeader}>{ props.modalHeader }</h2>
    <p className={styles.modalBody}>{ props.modalBody }</p>
    <div className={styles.modalFooter}>
      <ButtonSuccess onClick={props.accepted}>{ props.acceptButtonLabel }</ButtonSuccess>
    </div>
  </div>
);

MessageModalBody.propTypes = {
  acceptButtonLabel: PropTypes.string,
  accepted: PropTypes.func,
  modalBody: PropTypes.string,
  modalHeader: PropTypes.string
};

export default MessageModalBody;
