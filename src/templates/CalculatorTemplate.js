import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Display from '../components/Display';
import Nav from '../containers/Nav';

function CalculatorTemplate({ children }) {
  return (
    <>
      <Nav />
      <StyledBodyCalculator>
        <Display />
        {children}
      </StyledBodyCalculator>
    </>
  );
}

const StyledBodyCalculator = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

CalculatorTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CalculatorTemplate;
