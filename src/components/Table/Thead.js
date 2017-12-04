import React from 'react';
import PropTypes from 'prop-types';

const Thead = ({ children, onClick }) => <thead onClick={onClick}>{children}</thead>;

Thead.propTypes = {
  onClick: PropTypes.func
};

export default Thead;
