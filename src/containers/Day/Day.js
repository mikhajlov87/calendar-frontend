import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as styles from './Day.scss';

class Day extends Component {
  componentDidMount() {
    console.log(); // TODO: remove that
  }
  render() {
    return (
      <div className={styles.day}>
        <p className={styles.number}>
          {this.props.dayNumber}
        </p>
      </div>
    );
  }
}

Day.propTypes = {
  dayNumber: PropTypes.number
};

const mapStateToProps = state => ({ dayNumber: state.dayNumber });

export default connect(mapStateToProps)(Day);
