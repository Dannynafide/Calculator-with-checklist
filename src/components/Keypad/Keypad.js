import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { addMathOperation } from '../../reducers/mathOperationsSlice';
import ButtonKey from './ButtonKey/ButtonKey';
import './Keypad.scss';
import InputKeypad from './InputKeypad/InputKeypad';

function Keypad() {
  const dispatch = useDispatch();
  const inputFocusRef = useRef(null);

  const [value, setValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  function focus() {
    inputFocusRef.current.focus();
  }

  const clearAll = () => {
    setValue('');
    setDisplayValue('');
    setOperator('');
    setWaitingForOperand(false);
  };

  const clearLastChar = () => {
    if (operator) {
      setOperator('');
      return;
    }
    if (displayValue) {
      setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '');
      return;
    }
    setValue(value.substring(0, value.length - 1) || '');
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
      setValue(value + operator);
      setOperator('');
    } else {
      setDisplayValue(
        displayValue === '0' ? String(digit) : displayValue + String(digit)
      );
    }
  };

  const inputDot = () => {
    if (!/\./.test(displayValue)) {
      setDisplayValue(`${displayValue}.`);
      setWaitingForOperand(false);
    }
  };

  const inputOperator = (nextOperator) => {
    if (!waitingForOperand) {
      setValue(value + displayValue);
      setDisplayValue('');
    }

    if (nextOperator === '=') {
      dispatch(addMathOperation(value + displayValue));
      clearAll();
      return;
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const inputBracket = (bracket) => {
    if (bracket === ')' && waitingForOperand) return;

    setValue(value + displayValue + operator + bracket);
    setDisplayValue('');
    setOperator('');
  };

  const handleKeyDown = (event) => {
    let { key } = event;

    if (key === 'Enter') key = '=';

    event.preventDefault();

    if (/\d/.test(key)) {
      inputDigit(parseInt(key, 10));
    } else if (['/', '*', '+', '-', '='].includes(key)) {
      inputOperator(key);
    } else if (['(', ')'].includes(key)) {
      inputBracket(key);
    } else if (key === '.') {
      inputDot();
    } else if (key === '%') {
      // TODO: Zrobić
      inputPercent();
    } else if (key === 'Backspace') {
      clearLastChar();
    }
  };

  useEffect(() => {
    focus();
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <InputKeypad
        onChange={focus}
        ref={inputFocusRef}
        value={value + operator + displayValue}
      />
      <div className="calculator-keypad">
        <div className="bracket-keys">
          <ButtonKey
            className="key-leftSquareBracket"
            onClick={() => inputBracket('(')}
          >
            [
          </ButtonKey>
          <ButtonKey
            className="key-rightSquareBracket"
            onClick={() => inputBracket(')')}
          >
            ]
          </ButtonKey>
        </div>
        <div className="input-keys">
          <div className="digit-keys">
            <ButtonKey className="key-7" onClick={() => inputDigit(7)}>
              7
            </ButtonKey>
            <ButtonKey className="key-8" onClick={() => inputDigit(8)}>
              8
            </ButtonKey>
            <ButtonKey className="key-9" onClick={() => inputDigit(9)}>
              9
            </ButtonKey>
            <ButtonKey className="key-4" onClick={() => inputDigit(4)}>
              4
            </ButtonKey>
            <ButtonKey className="key-5" onClick={() => inputDigit(5)}>
              5
            </ButtonKey>
            <ButtonKey className="key-6" onClick={() => inputDigit(6)}>
              6
            </ButtonKey>
            <ButtonKey className="key-1" onClick={() => inputDigit(1)}>
              1
            </ButtonKey>
            <ButtonKey className="key-2" onClick={() => inputDigit(2)}>
              2
            </ButtonKey>
            <ButtonKey className="key-3" onClick={() => inputDigit(3)}>
              3
            </ButtonKey>
            <ButtonKey className="key-0" onClick={() => inputDigit(0)}>
              0
            </ButtonKey>
            <ButtonKey className="key-dot" onClick={() => inputDot()}>
              .
            </ButtonKey>
            <ButtonKey
              className="key-backspace"
              onClick={() => clearLastChar()}
            >
              <ArrowBackIcon fontSize="inherit" />
            </ButtonKey>
          </div>
          <div className="operator-keys">
            <ButtonKey
              className="key-divide"
              onClick={() => inputOperator('/')}
            >
              <span>/</span>
            </ButtonKey>
            <ButtonKey
              className="key-multiply"
              onClick={() => inputOperator('*')}
            >
              <span>&#215;</span>
            </ButtonKey>
            <ButtonKey className="key-add" onClick={() => inputOperator('+')}>
              <span>&#43;</span>
            </ButtonKey>
            <ButtonKey
              className="key-subtract"
              onClick={() => inputOperator('-')}
            >
              <span>&#8722;</span>
            </ButtonKey>
            <ButtonKey className="key-percent">
              <span>&#37;</span>
            </ButtonKey>
            <ButtonKey
              className="key-equals"
              aria-label="Add Math Operation"
              onClick={() => inputOperator('=')}
            >
              <KeyboardReturnIcon fontSize="inherit" />
            </ButtonKey>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keypad;
