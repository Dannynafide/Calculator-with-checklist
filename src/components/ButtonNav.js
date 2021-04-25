import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonNav({ exact, to, label }) {
  return (
    <>
      <StyledNavLink exact={exact} to={to}>
        <div>{label}</div>
        <StyledNavLinkUnderline className="underline" />
      </StyledNavLink>
    </>
  );
}

const StyledNavLink = styled(NavLink)`
  align-self: end;

  /* Text */
  text-align: center;
  text-transform: uppercase;
  color: #545c62;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-decoration: none;

  &.active {
    color: #fff;
    font-size: 12px;

    .underline {
      box-shadow: 0 5px 0 0 #9eacb7;
    }
  }
`;

const StyledNavLinkUnderline = styled.div`
  border-radius: 5px;
  height: 3px;
  box-shadow: 0 5px 0 0 #565e63;
  margin-bottom: 10px;
`;

ButtonNav.propTypes = {
  exact: PropTypes.bool,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

ButtonNav.defaultProps = {
  exact: false,
};

export default ButtonNav;
