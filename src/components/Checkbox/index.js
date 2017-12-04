import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class Checkbox extends React.PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    const { checked } = props;

    this.state = {
      checked: checked !== undefined ? checked : ''
    };
  }

  componentWillReceiveProps(props) {
    const checked = props.checked;

    if (checked !== undefined) {
      this.setState({
        checked
      });
    }
  }

  handleChange = event => {
    const checked = event.target.checked;
    const { onChange } = this.props;

    this.setState({
      checked
    });

    if (onChange === undefined) {
      return;
    }

    onChange(checked);
  };

  render() {
    const { readOnly, disabled, label } = this.props;
    const { checked } = this.state;
    const inputProps = { type: 'checkbox', readOnly, disabled, checked: checked ? 'checked' : '' };

    const input = (
      <input
        className={label ? 'form-check-input' : ''}
        onChange={this.handleChange}
        {...inputProps}
      />
    );

    if (label) {
      return (
        <div className="form-check">
          <label className="form-check-label">
            {input}
            {label}
          </label>
        </div>
      );
    }

    return input;
  }
}
