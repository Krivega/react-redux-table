import React from 'react';
import PropTypes from 'prop-types';

const Tr = ({ children, className }) => <tr className={className}>{children}</tr>;

Tr.propTypes = {
  className: PropTypes.string
};

export default Tr;
