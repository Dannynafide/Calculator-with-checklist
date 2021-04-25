import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => (
  <StyledWrapperProgressBar>
    <StyledProgressBar
      className="progressBar"
      style={{
        width: `${progress}%`,
      }}
    />
  </StyledWrapperProgressBar>
);

const StyledWrapperProgressBar = styled.div`
  height: 4px;
  width: 100%;
  background-color: black;
  border-radius: 2px;
  margin: 20px 0 30px 0;
`;

const StyledProgressBar = styled.div`
  height: 100%;
  background-color: rgb(219, 239, 180);
  border-radius: 2px;
`;

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

ProgressBar.defaultProps = {
  progress: 0,
};

export default ProgressBar;
