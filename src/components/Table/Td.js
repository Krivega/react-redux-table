import React from 'react';
import PropTypes from 'prop-types';

const Td = ({ children, className, collspan }) => (
  <td className={className} collspan={collspan}>
    {children}
  </td>
);

Td.propTypes = {
  collspan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};

export default Td;
