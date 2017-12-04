import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class Button extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool
  };

  getBemMods() {
    return {
      primary: !!this.props.primary,
      secondary: !!this.props.secondary
    };
  }

  handleClick = event => {
    const { onClick } = this.props;

    if (onClick === undefined) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    onClick();
  };

  getClassName() {
    const { primary, secondary } = this.props;
    const classNames = ['btn'];

    if (primary) {
      classNames.push('btn-primary');
    }

    if (secondary) {
      classNames.push('btn-secondary');
    }

    return classNames.join(' ');
  }

  render() {
    const { children } = this.props;

    return (
      <button className={this.getClassName()} onClick={this.handleClick}>
        {children}
      </button>
    );
  }
}
