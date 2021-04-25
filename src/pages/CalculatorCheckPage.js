import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { evaluate } from 'mathjs';

import { selectCurrentToDo } from '../features/calculator/calculatorSlice';
import CalculatorTemplate from '../templates/CalculatorTemplate';
import ProgressBar from '../components/ProgressBar';
import History from '../containers/History';
import { openSnackbar } from '../features/snackbar/snackbarSlice';

function Check() {
  const dispatch = useDispatch();
  const toDo = useSelector(selectCurrentToDo);
  let count = 0;
  let countFinish = 0;

  toDo.forEach((item) => {
    try {
      const result = evaluate(item.cost);

      count += result;
      if (item.complite) countFinish += result;
    } catch (error) {
      dispatch(openSnackbar({ message: error.message, type: 'error' }));
    }
  });

  return (
    <CalculatorTemplate>
      {toDo.length > 0 ? (
        <>
          <StyledMotto>
            <p>Spain,</p>
            <p>it&apos;s on the way!</p>
          </StyledMotto>
          <ProgressBar progress={(countFinish / count) * 100} />
          <History details />
        </>
      ) : (
        <StyledNoMathOperation>
          Don&apos;t wait! <br />
          Add the first element 😀
        </StyledNoMathOperation>
      )}
    </CalculatorTemplate>
  );
}

const StyledMotto = styled.div`
  margin: 30px 0 10px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1px;
  p {
    line-height: 25px;
  }

  & :nth-child(2) {
    font-size: 24px;
  }
`;

const StyledNoMathOperation = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin: 30px 0px 100px 0;
  line-height: 32px;
`;

export default Check;
