import React from 'react';
// import PropTypes from 'prop-types';

function ButtonKey({ onClick, children, className, ariaLabel }) {
  function handleClick(e) {
    e.preventDefault();
    onClick(e.target.value);
  }

  return (
    <button
      type="button"
      value={children}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

// ButtonKey.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   children: PropTypes.string.isRequired,
//   className: PropTypes.string.isRequired,
// };

export default ButtonKey;
