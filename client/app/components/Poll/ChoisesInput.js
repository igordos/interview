import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

let nextName = 1;

class ChoisesInput extends PureComponent {
  static propTypes = {
    multiple: PropTypes.bool,
    variants: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    })).isRequired,
  };

  static defaultProps = {
    multiple: false,
    variants: [],
  };

  state = {
    values: [],
  };

  inputs = {};

  componentDidMount() {
    nextName += 1;
  }

  handelChangeInput = () => {
    const values = [];

    Object.keys(this.inputs).forEach(value => {
      const input = this.inputs[value];
      if (input.checked) {
        values.push(input.value);
      }
    });

    this.setState({ values });
  };

  getValue() {
    if (!this.props.multiple) {
      return this.state.values[0] || '';
    }
    return this.state.values;
  }

  render() {
    return (
      <div className="choises-input">
        {
          this.props.variants.length === 0 ?
            <div key="no-variants" className="choises-input__no-variants">Нет вариантов ответа</div>
            :
            this.renderVariants()
        }
      </div>
    );
  }

  renderVariants() {
    const variants = this.props.variants.sort((a, b) => {
      return a.position - b.position;
    });

    return variants.map((variant, key) =>
      (<label className="choises-input__label" key={key}>
        {this.renderInput(variant)}
        <span className="choises-input__title">{variant.title}</span>
        </label>)
    );
  }

  renderInput(variant) {
    const inputType = this.props.multiple ? 'checkbox' : 'radio';
    return (<input
      type={inputType}
      name={nextName.toString()}
      value={variant.value}
      checked={this.state.values.indexOf(variant.value) > -1}
      ref={(input) => { this.inputs[variant.value] = input; }}
      onChange={this.handelChangeInput}/>);
  }

}

export default ChoisesInput;
