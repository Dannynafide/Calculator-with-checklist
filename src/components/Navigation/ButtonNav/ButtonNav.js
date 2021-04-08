import React from 'react';
import './ButtonNav.scss';
import PropTypes from 'prop-types';

function ButtonNav({ children, addClassName }) {
  return (
    <li className={`button-nav ${addClassName}`}>
      {children}
      <div className="button-nav-underline" />
    </li>
  );
}

ButtonNav.propTypes = {
  children: PropTypes.element.isRequired,
  addClassName: PropTypes.string,
};

ButtonNav.defaultProps = {
  addClassName: '',
};

export default ButtonNav;
