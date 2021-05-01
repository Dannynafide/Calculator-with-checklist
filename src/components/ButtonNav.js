import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonNav({ exact, to, label }) {
  return (
    <StyledNavLink exact={exact} to={to}>
      <p>{label}</p>
      <StyledUnderline className="underline" />
    </StyledNavLink>
  );
}

const StyledNavLink = styled(NavLink)`
  align-self: end;

  /* Text */
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.fontColor.hidden};
  font-size: ${(props) => props.theme.fontSize.xs};

  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.1s ease;

  &.active {
    color: ${(props) => props.theme.fontColor.primary};
    font-weight: 600;
    letter-spacing: 2px;

    .underline {
      :after {
        backface-visibility: hidden;
        border-color: ${(props) => props.theme.color.borderActive};
        width: 95%;
      }
    }
  }

  :hover {
    color: #fff;
    font-weight: 600;
    letter-spacing: 2px;

    .underline {
      :after {
        backface-visibility: hidden;
        border-color: ${(props) => props.theme.color.borderActive};
        transition: width 250ms ease-in-out;
        width: 95%;
      }
    }
  }
`;

const StyledUnderline = styled.div`
  :before,
  :after {
    backface-visibility: hidden;
    border: 1.5px solid rgba(255, 255, 255, 0);
    border-radius: 2px;
    bottom: -2px;
    content: '';
    display: block;
    margin: 0 auto;
    position: relative;
    transition: all 180ms ease-in-out;
    width: 30px;
  }

  :before {
    top: 5px;
    width: 95%;
    border-color: ${(props) => props.theme.fontColor.hidden};
  }
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
