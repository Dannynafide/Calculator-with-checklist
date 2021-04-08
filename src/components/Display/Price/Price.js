import React, { useState, useEffect, useRef } from 'react';
import './Price.scss';
import PropTypes from 'prop-types';

function Price({ value }) {
  return (
    <div className="price">
      <span className="price-prefix">US $</span>
      <p className="price-number">{value}</p>
    </div>
  );
}

Price.propTypes = {
  // value: PropTypes.string.isRequired,
};

export default Price;
