import React from 'react';
import Keypad from '../containers/Keypad/Keypad';
import History from '../containers/History';
import CalculatorTemplate from '../templates/CalculatorTemplate';

export default () => {
  return (
    <CalculatorTemplate>
      <>
        <History />
        <Keypad />
      </>
    </CalculatorTemplate>
  );
};
