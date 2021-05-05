import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { evaluate } from 'mathjs';

import { MdArrowBack, MdKeyboardReturn } from 'react-icons/md';
import { addMathOperation } from '../../features/calculator/calculatorSlice';
import ButtonKey from './ButtonKey';
import { openSnackbar } from '../../features/snackbar/snackbarSlice';

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

      <StyledKeypad>
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
      </StyledKeypad>
    </>
  );
}

const InputKeypad = styled.input`
  width: 100%;
  text-align: right;
  font-size: ${(props) => props.theme.fontSize.m};
  background: transparent;
  overflow: hidden;
  caret-color: ${(props) => props.theme.color.primary};
  border: none;
  color: ${(props) => props.theme.fontColor.primary};

  :focus {
    outline: none;
  }
`;

const StyledBracketKeys = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;

  > * {
    line-height: 20px;
    color: ${(props) => props.theme.color.primary};
    background: transparent;
    border: 1px solid ${(props) => props.theme.color.border};
    border-radius: 4px;
  }
`;

const StyledKeypad = styled.div`
  margin: 15px 0 20px 0;
`;

const StyledInputKeys = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 7fr 4fr;
  column-gap: 12px;
`;

const StyledDigitKeys = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 12px;

  > * {
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.fontColor.primary};
    font-size: ${(props) => props.theme.fontSize.m};
  }
`;

const StyledOperatorKeys = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 36px);
  grid-template-rows: repeat(4, 36px);
  column-gap: 12px;
  row-gap: 12px;
  justify-content: end;

  > * {
    background-color: ${(props) => props.theme.color.primary};
    border: none;
    border-radius: 30px;
    color: ${(props) => props.theme.color.background};
    font-size: ${(props) => props.theme.fontSize.m};
  }
`;

const ButtonKeyDivide = styled(ButtonKey)`
  transform: rotate(10deg);
  font-size: ${(props) => props.theme.fontSize.xxs};
  font-weight: bold;
`;

const ButtonKeyAdd = styled(ButtonKey)`
  grid-row: 2 / 4;
`;
const ButtonKeyEquals = styled(ButtonKey)`
  grid-column: span 2;
  background: ${(props) => props.theme.color.secondary};

  display: flex;
  justify-content: center;

  > * {
    align-self: center;
  }
`;

const ButtonKeyPercent = styled(ButtonKey)`
  font-size: ${(props) => props.theme.fontSize.s};
`;

export default Keypad;
