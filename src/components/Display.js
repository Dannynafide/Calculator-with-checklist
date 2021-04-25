import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { evaluate } from 'mathjs';

import { selectCurrentToDo } from '../features/calculator/calculatorSlice';
import { openSnackbar } from '../features/snackbar/snackbarSlice';

function Display() {
  const dispatch = useDispatch();
  const toDo = useSelector(selectCurrentToDo);

  let cost = 0;
  if (toDo.length > 0) {
    try {
      cost = toDo.reduce((acc, val) => acc + evaluate(val.cost), 0);
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, type: 'error' }));
    }
  }

  return (
    <StyledDisplay>
      <StyledPrice>
        <StyledPricePrefix>US $</StyledPricePrefix>
        <StyledPriceNumber>{cost}</StyledPriceNumber>
      </StyledPrice>
      <StyledUnderlineText />
    </StyledDisplay>
  );
}
const StyledDisplay = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 15px 0 10px 0;
`;
const StyledUnderlineText = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 35px;
  height: 2px;
  background: ${(props) => props.theme.primaryColor};
`;

const StyledPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const StyledPriceNumber = styled.p`
  font-size: 68px;
  margin: 0;
  padding: 0;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledPricePrefix = styled.span`
  font-size: 14px;
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
`;
export default Display;
