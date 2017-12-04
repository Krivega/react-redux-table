import React from 'react';
import PropTypes from 'prop-types';

const Thead = ({ children, onClick, theadRef }) => (
  <thead ref={theadRef} onClick={onClick}>
    {children}
  </thead>
);

Thead.propTypes = {
  onClick: PropTypes.func
};

export default Thead;
