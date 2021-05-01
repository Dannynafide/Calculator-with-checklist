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
      <StyledCost>{cost}</StyledCost>
    </StyledItem>
  );
};
const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.fontColor.secondary};
`;

const StyledRemoveBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.m};
  color: ${(props) => props.theme.fontColor.hidden};
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 10px;

  :hover {
    color: ${(props) => props.theme.color.error};
  }
`;
const StyledCost = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

ItemHistory.propTypes = {
  removeMathOperation: PropTypes.func.isRequired,
  item: PropTypes.shape({
    cost: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemHistory;
