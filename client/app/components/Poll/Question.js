import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ChoisesInput from './ChoisesInput';
import StringInput from './StringInput';
import RangeInput from './RangeInput';

const INPUTS = {
  radio: 'radio',
  checkbox: 'checkbox',
  range: 'range',
  string: 'string',
  router: 'router',
};

class Question extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    datatype: PropTypes.string,
    variants: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    })),
    min: PropTypes.number,
    max: PropTypes.number,
  };

  static defaultProps = {
    description: '',
    value: '',
    variants: [],
  };

  static state = {
    nextQuestion: false,
  };

  getValue() {
    return this.input.getValue();
  }

  render() {
    return (
      <div className="question">
        <h3 className="question__title">{this.props.title}</h3>
        {
          this.props.description ?
            <p className="question__description">{this.props.description}</p>
            :
            null
        }
        <div className="question__input">{this.renderInput()}</div>
      </div>
    );
  }

  renderInput() {
    if (
      this.props.input === INPUTS.radio ||
      this.props.input === INPUTS.checkbox ||
      this.props.input === INPUTS.router
    ) {
      let multiple = this.props.input === INPUTS.checkbox;
      if (this.props.input === INPUTS.router) {
        multiple = false;
      }
      return (
        <ChoisesInput
          ref={(input) => this.input = input}
          multiple={multiple}
          variants={this.props.variants}
        />
      );
    } else if (this.props.input === INPUTS.string) {
      return (
        <StringInput
          ref={(input) => this.input = input}
          value={this.props.value}
          datatype={this.props.datatype}
        />
      );
    } else if (this.props.input === INPUTS.range) {
      return (
        <RangeInput
          ref={(input) => this.input = input}
          value={this.props.value}
          datatype={this.props.datatype}
          min={this.props.min}
          max={this.props.max}
        />
      );
    }
  }
}

export default Question;
