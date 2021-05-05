import React from 'react';
import PropTypes from 'prop-types';

import { StyledButtonNav, StyledUnderline } from './ButtonNav.styled';

function ButtonNav({ exact, to, label }) {
  return (
    <StyledButtonNav exact={exact} to={to}>
      <p>{label}</p>
      <StyledUnderline className="underline" />
    </StyledButtonNav>
  );
}

ButtonNav.propTypes = {
  exact: PropTypes.bool,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

ButtonNav.defaultProps = {
  exact: false,
};

export default ButtonNav;
