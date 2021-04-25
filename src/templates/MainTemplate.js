import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import AppBar from '../containers/AppBar';
import { theme } from '../theme/mainTheme';

import { GlobalStyles } from '../theme/GlobalStyle';
import Snackbar from '../features/snackbar/Snackbar';

const MainTemplate = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledCalculator>
        <AppBar />
        <StyledComponent>{children}</StyledComponent>
      </StyledCalculator>
      <Snackbar timeout={6000} />
    </ThemeProvider>
  );
};
const StyledCalculator = styled.div`
  position: relative;
  width: 270px;
  margin: auto;
  background-color: #3e4246;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const StyledComponent = styled.div`
  padding: 25px;
  background-color: ${(props) => props.theme.backgroundColor}; ;
`;
MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};
export default MainTemplate;
