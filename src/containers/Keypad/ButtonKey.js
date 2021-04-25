import React from 'react';
import PropTypes from 'prop-types';

function ButtonKey({ onClick, children, className }) {
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
    >
      {children}
    </button>
  );
}
ButtonKey.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  className: PropTypes.string,
};
ButtonKey.defaultProps = {
  className: null,
};
export default ButtonKey;
