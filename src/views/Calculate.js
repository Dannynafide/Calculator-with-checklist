import React, { useState, useEffect } from 'react';
import Keypad from '../components/Keypad/Keypad';
import History from '../components/History/History';
import CalculatorTemplate from '../templates/CalculatorTemplate';
import firebase from '../firebase';

function Calculate(props) {
  // const [quote, setQuote] = useState('');

  // useEffect(() => {
  //   firebase.getCurrentUserQuote().then(setQuote);
  // });

  return (
    <CalculatorTemplate>
      <History />
      <Keypad />
    </CalculatorTemplate>
  );
}

export default Calculate;
