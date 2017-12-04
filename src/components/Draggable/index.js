import React from 'react';
import PropTypes from 'prop-types';
import { DraggableCore } from 'react-draggable';

import './style.css';

const Draggable = ({ onStart, onDrag }) => (
  <DraggableCore onStart={onStart} onDrag={onDrag}>
    <div
      className="draggable"
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
    />
  </DraggableCore>
);

Draggable.propTypes = {
  onStart: PropTypes.func,
  onDrag: PropTypes.func
};

export default Draggable;
