import React, { Component, PropTypes } from 'react';
import ThemeSwitch from './ThemeSwitch'
import { connect } from './Reacr-Redux'

class Content extends React.Component {
  static PropTypes = {
    themeColor: PropTypes.string
  }
  render () {
    return (
      <div>
        <p style={{ color: this.props.themeColor }}>Content Here</p>
        <ThemeSwitch />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

Content = connect(mapStateToProps)(Content)

export default Content;