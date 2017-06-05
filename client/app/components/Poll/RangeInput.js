import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class RangeInput extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    datatype: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
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
        <span>{this.state.value}</span>
        <br />
        <input
          className="string-input__input"
          type="range"
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          ref={(input) => this.input = input}
          onChange={this.handelChangeInput}
        />
      </div>
    );
  }

}

export default RangeInput;
