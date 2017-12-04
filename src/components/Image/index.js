import React from 'react';
import PropTypes from 'prop-types';
import { stringify as bem } from 'rebem-classname';

import './style.css';

const block = 'image';

const getBemMods = ({ responsive, fit, small, circle }) => {
  return {
    responsive: !!responsive,
    fit: !!fit,
    small: !!small,
    circle: !!circle
  };
};

const Image = ({ src, alt, responsive, fit, small, circle }) => {
  const mods = getBemMods({ responsive, fit, small, circle });

  return <img className={bem({ block, mods })} src={src} alt={alt} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  responsive: PropTypes.bool,
  fit: PropTypes.bool,
  small: PropTypes.bool,
  circle: PropTypes.bool
};

export default Image;
