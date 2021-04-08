import React from 'react';
import { useSelector } from 'react-redux';
import { evaluate } from 'mathjs';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import History from '../components/History/History';
import { selectCount } from '../actions/mathOperationsSlice';
import FlexTemplate from '../templates/FlexTemplate';

function Check() {
  const mathOperationList = useSelector(selectCount);
  let count = 0;
  let countComplite = 0;

  mathOperationList.map((item) => {
    try {
      const result = evaluate(item.mathOperation);

      count += result;
      if (item.complite) countComplite += result;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      {mathOperationList.length > 0 ? (
        <FlexTemplate>
          <div className="calculator__motto">
            <p>Spain,</p>
            <p fontSize="24px">it's on the way!</p>
          </div>
          <ProgressBar progress={(countComplite / count) * 100} />
          <History details />
        </FlexTemplate>
      ) : (
        <p className="missing-operation">
          Don't wait! <br />
          Add the first element 😀
        </p>
      )}
    </>
  );
}

export default Check;
