import React from 'react';
import PropTypes from 'prop-types';

export default class HandleUsername extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func
  }
  render() {
    return (
      <div>
        <input
          placeholder="输入账户名"
          type="text"
          style={{ border: '1px solid #ccc', marginBottom: '20px' }}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
