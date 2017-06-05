import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const DATA_TYPES_MAPPING = {
  string: 'text',
  integer: 'number'
};

class StringInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    datatype: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    datatype: 'string',
  };

  state = {
    value: this.props.value,
  };

  getValue() {
    return this.state.value;
  }

  handelChangeInput = () => {
    this.setState({ value: this.input.value });
  };

  render() {
    return (
      <div className="string-input">
        <input
          className="string-input__input"
          type={DATA_TYPES_MAPPING[this.props.datatype] || DATA_TYPES_MAPPING.string}
          value={this.state.value}
          ref={(input) => this.input = input}
          onChange={this.handelChangeInput}
        />
      </div>
    );
  }

}

export default StringInput;
