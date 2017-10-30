import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as styles from './CheckBox.scss';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckboxChecked: this.props.initialCheckboxState || false
    };
  }

  checkBoxClick = () => this.setState({ isCheckboxChecked: !this.state.isCheckboxChecked });

  render() {
    const { name, label, input } = this.props;
    const { isCheckboxChecked } = this.state;
    return (
      <div className={styles.formGroup}>
        <div className={styles.checkboxContainer}>
          <input
            {...input}
            name={name}
            type="checkbox"
            className={styles.checkbox}
            checked={isCheckboxChecked}
            onChange={this.checkBoxClick}
          />
          <svg viewBox="0 0 24 24" className={isCheckboxChecked ? styles.checkboxBorderHidden : styles.checkboxBorderVisible}>
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
          <svg viewBox="0 0 24 24" className={isCheckboxChecked ? styles.checkboxChecked : styles.checkboxUnchecked}>
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        {
          !!label && (<label className={styles.formLabel} htmlFor={name} onClick={this.checkBoxClick}>{ label }</label>)
        }
      </div>
    );
  }
}

CheckBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  initialCheckboxState: PropTypes.bool
};

export default CheckBox;
