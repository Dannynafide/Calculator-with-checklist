import React from 'react';
import PropTypes from 'prop-types';

import Ripple from './Ripple';
import { StyledButton } from './Button.styled';

export default function Button(props) {
  const { children } = props;

  return (
    <StyledButton {...props}>
      {children}
      <Ripple color="#fff" duration={1000} />
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Button.defaultProps = {
  children: undefined,
};
