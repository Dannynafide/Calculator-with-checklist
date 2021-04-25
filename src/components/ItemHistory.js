import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemHistory = ({ removeMathOperation, item }) => {
  const { cost } = item;

  return (
    <StyledItem>
      <StyledRemoveBtn onClick={removeMathOperation}>
        <span>&#215;</span>
      </StyledRemoveBtn>
      <div>{cost}</div>
    </StyledItem>
  );
};
const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
`;

const StyledRemoveBtn = styled.button`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.4);
  background: transparent;
  border: none;
  cursor: pointer;

  :hover {
    color: red;
  }
`;
ItemHistory.propTypes = {
  removeMathOperation: PropTypes.func.isRequired,
  item: PropTypes.shape({
    cost: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemHistory;
