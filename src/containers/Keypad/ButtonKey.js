import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ripple from '../../components/Button/Ripple';

function ButtonKey({ onClick, children, className }) {
  function handleClick(e) {
    e.preventDefault();
    onClick(e.target.value);
  }

  return (
    <Button
      type="button"
      value={children}
      onClick={handleClick}
      className={className}
    >
      {children}
      <Ripple color="#fff" duration={1000} />
    </Button>
  );
}

const Button = styled.button`
  position: relative;
  overflow: hidden;
  mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
`;

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
