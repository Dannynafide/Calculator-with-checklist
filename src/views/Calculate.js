import React from 'react';
import Keypad from '../components/Keypad/Keypad';
import History from '../components/History/History';
import FlexTemplate from '../templates/FlexTemplate';

function Calculate() {
  return (
    <FlexTemplate>
      <History />
      <Keypad />
    </FlexTemplate>
  );
}

export default Calculate;
