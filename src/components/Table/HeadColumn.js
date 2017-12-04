import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'components/Draggable';

export default class HeadColumn extends React.PureComponent {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colSpan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rowSpan: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  constructor(props) {
    super(props);

    const { width } = props;

    this.state = {
      width
    };
  }

  setWidth(width) {
    this.setState({ width });
  }

  handleDrag = (e, { deltaX }) => {
    const width = this.state.width + deltaX;

    this.setWidth(width);
  };

  handleDragStart = (e, { deltaX }) => {
    this.setWidth(this.el.offsetWidth);
  };

  setRefEl = el => {
    this.el = el;
  };

  render() {
    const { children, colSpan, rowSpan } = this.props;
    const { width } = this.state;
    const style = { width: `${width}px`, minWidth: `${width}px` };

    return (
      <th style={style} colSpan={colSpan} rowSpan={rowSpan} ref={this.setRefEl}>
        {children}
        <Draggable onDrag={this.handleDrag} onStart={this.handleDragStart} />
      </th>
    );
  }
}
