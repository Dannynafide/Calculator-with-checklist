import React from 'react';
import { useSelector } from 'react-redux';
import { evaluate } from 'mathjs';
import Price from './Price/Price';
import './Display.scss';
import { selectCount } from '../../actions/mathOperationsSlice';

function Display() {
  const list = useSelector(selectCount);

  let count = 0;
  list.map((item) => {
    try {
      const expr = evaluate(item.mathOperation);
      count += expr;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="display">
      <p className="title">My trip to Spain</p>
      <Price value={count} />
      <span className="underlineText" />
    </div>
  );
}

export default Display;
