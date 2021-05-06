import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { evaluate } from 'mathjs';

import { MdArrowBack, MdKeyboardReturn } from 'react-icons/md';
import { addMathOperation } from '../../features/calculator/calculatorSlice';
import ButtonKey from './ButtonKey';
import { openSnackbar } from '../../features/snackbar/snackbarSlice';
import {
  InputKeypad,
  StyledBracketKeys,
  StyledInputKeys,
  StyledDigitKeys,
  StyledOperatorKeys,
  ButtonKeyDivide,
  ButtonKeyAdd,
  ButtonKeyEquals,
  ButtonKeyPercent,
} from './Keypad.styled';

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
      try {
        const result = evaluate(value + displayValue);
        if (result === undefined || Number.isNaN(result)) {
          dispatch(
            openSnackbar({ message: 'Operation impossible', type: 'error' })
          );
          return;
        }
        dispatch(addMathOperation(value + displayValue));
      } catch (error) {
        dispatch(
          openSnackbar({ message: 'Operation impossible', type: 'error' })
        );
      }

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
    } else if (['/', '*', '+', '-', '%', '='].includes(key)) {
      inputOperator(key);
    } else if (['(', ')'].includes(key)) {
      inputBracket(key);
    } else if (key === '.') {
      inputDot();
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
    <>
      <InputKeypad
        onChange={focus}
        ref={inputFocusRef}
        value={value + operator + displayValue}
        type="text"
      />

      <StyledBracketKeys>
        <ButtonKey onClick={() => inputBracket('(')}>[</ButtonKey>
        <ButtonKey onClick={() => inputBracket(')')}>]</ButtonKey>
      </StyledBracketKeys>
      <StyledInputKeys>
        <StyledDigitKeys>
          <ButtonKey onClick={() => inputDigit(7)}>7</ButtonKey>
          <ButtonKey onClick={() => inputDigit(8)}>8</ButtonKey>
          <ButtonKey onClick={() => inputDigit(9)}>9</ButtonKey>
          <ButtonKey onClick={() => inputDigit(4)}>4</ButtonKey>
          <ButtonKey onClick={() => inputDigit(5)}>5</ButtonKey>
          <ButtonKey onClick={() => inputDigit(6)}>6</ButtonKey>
          <ButtonKey onClick={() => inputDigit(1)}>1</ButtonKey>
          <ButtonKey onClick={() => inputDigit(2)}>2</ButtonKey>
          <ButtonKey onClick={() => inputDigit(3)}>3</ButtonKey>
          <ButtonKey onClick={() => inputDigit(0)}>0</ButtonKey>
          <ButtonKey onClick={() => inputDot()}>.</ButtonKey>
          <ButtonKey onClick={() => clearLastChar()}>
            <MdArrowBack fontSize="inherit" />
          </ButtonKey>
        </StyledDigitKeys>
        <StyledOperatorKeys>
          <ButtonKeyDivide onClick={() => inputOperator('/')}>
            <span>/</span>
          </ButtonKeyDivide>
          <ButtonKey onClick={() => inputOperator('*')}>
            <span>&#215;</span>
          </ButtonKey>
          <ButtonKeyAdd onClick={() => inputOperator('+')}>
            <span>&#43;</span>
          </ButtonKeyAdd>
          <ButtonKey onClick={() => inputOperator('-')}>
            <span>&#8722;</span>
          </ButtonKey>
          <ButtonKeyPercent onClick={() => inputOperator('%')}>
            <span>&#37;</span>
          </ButtonKeyPercent>
          <ButtonKeyEquals onClick={() => inputOperator('=')}>
            <MdKeyboardReturn fontSize="inherit" />
          </ButtonKeyEquals>
        </StyledOperatorKeys>
      </StyledInputKeys>
    </>
  );
}

export default Keypad;
