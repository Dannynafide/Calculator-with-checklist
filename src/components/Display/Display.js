import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { evaluate } from 'mathjs';

import AutoTextSize from './AutoTextSize';
import { selectCurrentToDo } from '../../features/calculator/calculatorSlice';
import { openSnackbar } from '../../features/snackbar/snackbarSlice';

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
        <StyledPriceNumber>
          <AutoTextSize>{cost}</AutoTextSize>
        </StyledPriceNumber>
      </StyledPrice>
      <StyledUnderlineText />
    </StyledDisplay>
  );
}
const StyledDisplay = styled.div`
  position: relative;
  margin: 10px 0px 15px 0px;
  padding: 5px 0px;
`;
const StyledUnderlineText = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 35px;
  height: 2px;
  background: ${(props) => props.theme.color.primary};
`;

const StyledPrice = styled.div`
  position: relative;
`;

const StyledPriceNumber = styled.div`
  font-size: 68px;
  /* text-overflow: ellipsis; */
  /* overflow: auto; */

  text-align: right;
  position: relative;
`;

export default Display;
